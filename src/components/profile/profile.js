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
import {addFriend, getFriend, getRelationship, unfriend} from "../../services/FriendServices";
import {createNotification, deleteNotification} from "../../services/notificationService";

export default function ProfileItem({socket}) {
    const {accountId} = useParams()
    const dispatch = useDispatch();
    const [isFriend, setIsFriend] = useState(false)
    const [isWaitRes, setIsWaitRes] = useState(false)
    const userId = JSON.parse(localStorage.getItem("accountId"))
    const displayName = JSON.parse(localStorage.getItem("displayName"))

    useEffect(() => {
        dispatch(getAccount(accountId))
    }, [accountId, dispatch])

    useEffect(() => {
        dispatch(getFriend(accountId))
    }, [accountId, dispatch])

    useEffect(() => {
        dispatch(getRelationship())
    }, [accountId, dispatch])

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
        let check = false
        for (let i = 0; i < relationship.length; i++) {
            if (relationship[i].accountReq === userId && relationship[i].accountRes === accountId && relationship[i].isAccept === true) {
                check = true
                break
            } else if (relationship[i].accountReq === accountId && relationship[i].accountRes === userId && relationship[i].isAccept === true) {
                check = true
                break
            }
        }
        setIsFriend(check)
        setIsWaitRes(check)
    }, [accountId])


    let isProfile = false
    if (userId === accountId) {
        isProfile = true
    }

    const handleUnfriend = async () => {
        setIsFriend(false)
        setIsWaitRes(false)
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
                                isProfile ? (<button className="editProfile"><CreateIcon/>Edit Profile</button>) : (
                                    isFriend ? (<button onClick={() => {
                                        handleUnfriend()
                                    }}>Unfriend</button>) : (isWaitRes ? (<button onClick={() => {
                                        handleUnfriend()
                                    }}>Wait | Cancel</button>) : (<button onClick={() => {
                                        handleAddFriend()
                                    }}>Add friend</button>)))
                            }
                        </div>
                    </div>
                </div>
                <div className="profileRightBottom">

                </div>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="row">
                            <div style={{paddingTop: 30}} className="col-4">
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
                                <h2>Friend List</h2>
                                <div className="infoTable col-12">
                                    <div className="row">
                                        <div className="col-4">
                                            <Card sx={{maxWidth: 120}}>
                                                <CardMedia
                                                    sx={{height: 120}}
                                                    image="https://i.pinimg.com/564x/36/18/c5/3618c544af9803004da77bf7847ce217.jpg"
                                                    title="Đào Anh"
                                                />
                                            </Card>
                                        </div>

                                        <div className="col-4">
                                            <Card sx={{maxWidth: 120}}>
                                                <CardMedia
                                                    sx={{height: 120}}
                                                    image="https://i.pinimg.com/564x/94/6c/42/946c423df85bcd08c44d1bf43b721670.jpg"
                                                    title="Thị Hà"
                                                />
                                            </Card>
                                        </div>

                                        <div className="col-4">
                                            <Card sx={{maxWidth: 120}}>
                                                <CardMedia
                                                    sx={{height: 120}}
                                                    image="https://i.pinimg.com/564x/27/3e/32/273e3261d80014ecb374bb48a208562f.jpg"
                                                    title="Minh Hiếu"
                                                />
                                            </Card>
                                        </div>

                                        <div className="col-4">
                                            <Card sx={{maxWidth: 120}}>
                                                <CardMedia
                                                    sx={{height: 120}}
                                                    image="https://i.pinimg.com/564x/6e/f6/d3/6ef6d39d021da8f183fd337310970d5e.jpg"
                                                    title="green iguana"
                                                />
                                            </Card>
                                        </div>
                                    </div>
                                <hr/>
                                {/*<div className="friendList">*/}
                                {/*    <Link to={`/friends/${accountId}`}><h2>Friends list</h2></Link>*/}
                                {/*    {*/}
                                {/*        listFriends?.map((item, index) => {*/}
                                {/*            if (item.accountId !== accountId) {*/}
                                {/*                return (*/}
                                {/*                    <Link to={`/${item.accountId}`}*/}
                                {/*                          key={index}>{item.displayName}</Link>*/}
                                {/*                )*/}
                                {/*            }*/}
                                {/*        })*/}
                                {/*    }*/}
                                {/*</div>*/}
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