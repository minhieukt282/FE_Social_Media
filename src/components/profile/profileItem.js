import CreateIcon from "@mui/icons-material/Create";
import PortraitIcon from "@mui/icons-material/Portrait";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CakeIcon from '@mui/icons-material/Cake';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Post from "../post/Post";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAccount} from "../../services/accountService";
import AddPost from "../post/AddPost";
import {acceptFriends, addFriend, getFriend, getRelationship, unfriend} from "../../services/FriendServices";
import {createNotification, deleteNotification} from "../../services/notificationService";

export default function ProfileItem({socket}) {
    const {accountId} = useParams()
    const dispatch = useDispatch();
    const [isFriend, setIsFriend] = useState(false)
    const [isAccept, setIsAccept] = useState(false)
    const [isWaitRes, setIsWaitRes] = useState(false)
    const [relationshipId, setRelationshipId] = useState(null)
    const userId = JSON.parse(localStorage.getItem("accountId"))
    const displayName = JSON.parse(localStorage.getItem("displayName"))

    useEffect(() => {
        dispatch(getAccount(accountId))
    }, [accountId, dispatch])

    useEffect(() => {
        dispatch(getFriend(accountId))
    }, [accountId, dispatch, isAccept, isFriend, isWaitRes])

    useEffect(() => {
        dispatch(getRelationship())
    }, [accountId, dispatch, isAccept, isFriend, isWaitRes])

    const listFriends = useSelector(state => {
        return state.listFriend.listFriend
    })

    const accountInfo = useSelector(state => {
        return state.accountInfo.accountInfo
    })

    const relationship = useSelector(state => {
        return state.relationship.relationship
    })

    useEffect(() => {
        let checkFriend
        let checkWait = false
        let checkAccept = false
        for (let i = 0; i < relationship.length; i++) {
            if ((relationship[i].accountReq === userId && relationship[i].accountRes === accountId) ||
                (relationship[i].accountReq === accountId && relationship[i].accountRes === userId)) {
                checkFriend = relationship[i].isFriend
                if (relationship[i].isFriend === false) {
                    if (relationship[i].accountRes === userId) {
                        setRelationshipId(relationship[i].relationshipId)
                        checkAccept = true
                    }
                    checkWait = !relationship[i].isFriend
                } else {
                    checkWait = relationship[i].isFriend
                }
                break
            }
        }
        setIsFriend(checkFriend)
        setIsWaitRes(checkWait)
        setIsAccept(checkAccept)
    }, [accountId, isAccept, isFriend, isWaitRes])

    let isProfile = false
    if (userId === accountId) {
        isProfile = true
    }

    const handleUnfriend = async () => {
        setIsFriend(false)
        setIsWaitRes(false)
        setIsAccept(false)
        const data = {
            accountReq: userId,
            accountRes: accountId
        }
        const dataNotice = {
            displayName: displayName,
            accountSent: userId,
            accountReceiver: accountId,
            postId: 0,
            type: "addFriends"
        }
        await dispatch(unfriend(data))
        await dispatch(deleteNotification(dataNotice))
    }

    const handleAccept = async (relationshipId) => {
        setIsFriend(true)
        const dataNotice = {
            displayName: displayName,
            accountSent: userId,
            accountReceiver: accountId,
            postId: 0,
            type: "friends"
        }
        await dispatch(acceptFriends(relationshipId))
        await dispatch(createNotification(dataNotice))
        socket.emit("acceptFriend", dataNotice)
    }

    const handleAddFriend = async () => {
        setIsWaitRes(true)
        const data = {
            accountReq: userId,
            accountRes: accountId
        }
        const dataNotice = {
            displayName: displayName,
            accountSent: userId,
            accountReceiver: accountId,
            postId: 0,
            type: "addFriends"
        }
        await dispatch(addFriend(data))
        await dispatch(createNotification(dataNotice))
        socket.emit("addFriends", dataNotice)
    }

    return (
        <>
            <div className="profile">
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg"
                                 src='https://wallup.net/wp-content/uploads/2016/01/73809-nature-lake-reflection-mountain-trees-748x468.jpg'
                                 alt="clear"/>
                            <img className="profileUserImg"
                                 src={accountInfo.img} alt="clear"/>
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{accountInfo.displayName}</h4>
                            {
                                isProfile ? (<></>) : (
                                    isFriend ? (
                                        <button style={{width: "15%"}} className="btn-req" onClick={() => {
                                            handleUnfriend()
                                        }}>Unfriend</button>) : (
                                        isWaitRes ? (isAccept ? (
                                            <span style={{width: "15%"}}>
                                            <button style={{width: "50%"}} className="btn-req" onClick={() => {
                                                handleAccept(relationshipId)
                                            }}>Accept
                                            </button>
                                            <button style={{width: "50%"}} className="btn-req" onClick={() => {
                                                handleUnfriend()
                                            }}>Reject
                                            </button>
                                        </span>
                                        ) : (
                                            <button style={{width: "15%"}} className="btn-req" onClick={() => {
                                                handleUnfriend()
                                            }}>Wait | Cancel</button>)) : (
                                            <button style={{width: "15%"}} className="btn-req" onClick={() => {
                                                handleAddFriend()
                                            }}>Add friend</button>)))
                            }
                        </div>
                    </div>
                </div>
                <br/>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-4">
                                <div className="infoTable">
                                    <h3>Information</h3>
                                    <div className="detailInfo">
                                        <div className="detailInfoItem">
                                            <PortraitIcon/>
                                            <span className="detailInfoKey">Real name: {accountInfo.displayName}</span>
                                        </div>
                                        <div className="detailInfoItem">
                                            <CakeIcon/>
                                            <span className="detailInfoKey">Birthday: {accountInfo.birthday}</span>
                                        </div>
                                        <div className="detailInfoItem">
                                            <LocationCityIcon/>
                                            <span className="detailInfoKey">City: {accountInfo.location}</span>
                                        </div>
                                        {
                                            isProfile ? (<button className="editButton"><CreateIcon/>Edit Profile
                                            </button>) : (<></>)
                                        }
                                    </div>
                                </div>
                                <br/>
                                <Link to={`/friends/${accountId}`}><h2>Friends list</h2></Link>
                                <div className="infoTableFriend">
                                    <div className="row">
                                        {
                                            listFriends?.map((item, index) => {
                                                if (item.accountId !== accountId) {
                                                    return (
                                                        <div className="col-4" key={index}>
                                                            <Link to={`/profile/${item.accountId}`}>
                                                                <Card sx={{maxWidth: 120}}>
                                                                    <CardMedia
                                                                        sx={{height: 120}}
                                                                        image={`${item.img}`}
                                                                        title={`${item.displayName}`}
                                                                    />
                                                                </Card>
                                                            </Link>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                {isProfile ? (<AddPost/>) : (<></>)}
                                <Post socket={socket} url={accountId}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </>
    )
}




