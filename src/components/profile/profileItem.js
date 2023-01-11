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
import EditProfile from "./editProfile";

const IS_FRIEND = 1
const IS_ADD = 2
const IS_WAIT = 3;
const IS_ACCEPT = 4;
export default function ProfileItem({socket}) {
    const {accountId} = useParams()
    const dispatch = useDispatch();
    const [isFriend, setIsFriend] = useState(null)
    const [relationshipId, setRelationshipId] = useState(null)
    const [isReload, setIsReLoad] = useState(false)
    const userId = JSON.parse(localStorage.getItem("accountId"))
    const displayName = JSON.parse(localStorage.getItem("displayName"))

    useEffect(() => {
        dispatch(getAccount(accountId))
    }, [accountId, dispatch])

    useEffect(() => {
        dispatch(getFriend(accountId))
    }, [accountId, isReload, dispatch])

    useEffect(() => {
        dispatch(getRelationship())
    }, [accountId, isReload, dispatch])

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
        let checkFriend = IS_ADD
        for (let i = 0; i < relationship.length; i++) {
            if ((relationship[i].accountReq === userId && relationship[i].accountRes === accountId) ||
                (relationship[i].accountReq === accountId && relationship[i].accountRes === userId)) {
                if (relationship[i].isFriend) {
                    checkFriend = IS_FRIEND
                    setIsReLoad(true)
                    break
                } else {
                    checkFriend = IS_WAIT
                    if (relationship[i].accountRes === userId) {
                        checkFriend = IS_ACCEPT
                        setRelationshipId(relationship[i].relationshipId)
                    }
                    setIsReLoad(true)
                    break
                }
            }
        }
        setIsFriend(checkFriend)
    }, [accountId, isReload, relationship])

    let isProfile = false
    if (userId === accountId) {
        isProfile = true
    }

    const handleUnfriend = async () => {
        setIsFriend(IS_ADD)
        const data = {
            accountReq: userId,
            accountRes: accountId
        }
        const dataNotice = {
            displayName: displayName,
            accountSent: userId,
            accountReceiver: accountId,
            postPostId: 0,
            type: "addFriends"
        }
        await dispatch(unfriend(data))
        await dispatch(deleteNotification(dataNotice))
        await setIsReLoad(!isReload)
    }

    const handleAccept = async (relationshipId) => {
        console.log(relationshipId)
        setIsFriend(IS_FRIEND)
        const dataNotice = {
            displayName: displayName,
            accountSent: userId,
            accountReceiver: accountId,
            postPostId: 0,
            type: "friends"
        }
        await dispatch(acceptFriends(relationshipId))
        await dispatch(createNotification(dataNotice))
        socket.emit("acceptFriend", dataNotice)
        await setIsReLoad(!isReload)

    }

    const handleAddFriend = async () => {
        setIsFriend(IS_WAIT)
        const data = {
            accountReq: userId,
            accountRes: accountId
        }
        const dataNotice = {
            displayName: displayName,
            accountSent: userId,
            accountReceiver: accountId,
            postPostId: 0,
            type: "addFriends"
        }
        await dispatch(addFriend(data))
        await dispatch(createNotification(dataNotice))
        socket.emit("addFriends", dataNotice)
    }

    const buttonRender = () => {
        if (isFriend === IS_FRIEND) {
            return (
                <button style={{width: "15%"}} className="btn-req" onClick={() => {
                    handleUnfriend()
                }}>Unfriend</button>
            )
        } else if (isFriend === IS_ADD) {
            return (
                <button style={{width: "15%"}} className="btn-req" onClick={() => {
                    handleAddFriend()
                }}>Add friend</button>
            )
        } else if (isFriend === IS_WAIT) {
            return (
                <button style={{width: "15%"}} className="btn-req" onClick={() => {
                    handleUnfriend()
                }}>Wait | Cancel</button>
            )
        } else if (isFriend === IS_ACCEPT) {
            return (
                <span style={{width: "15%"}}>
                    <button style={{width: "50%"}} className="btn-req"
                            onClick={() => {
                                handleAccept(relationshipId)
                            }}>Accept
                    </button>
                    <button style={{width: "50%"}} className="btn-req"
                            onClick={() => {
                                handleUnfriend()
                            }}>Reject
                    </button>
                </span>
            )
        }
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
                                isProfile ? (<></>) : (<>{buttonRender()}</>)
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
                                            <span
                                                className="detailInfoKey">Birthday: {new Date(accountInfo.birthday).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})}</span>
                                        </div>
                                        <div className="detailInfoItem">
                                            <LocationCityIcon/>
                                            <span className="detailInfoKey">City: {accountInfo.location}</span>
                                        </div>
                                        {
                                            isProfile ? (<button className="editButton"><CreateIcon/>
                                                <EditProfile accountInfo={accountInfo}/>
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
