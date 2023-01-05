import Card from "@mui/material/Card";
import {CardActionArea, CardActions} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import * as React from "react";
import {addFriend, unfriend} from "../../services/FriendServices";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {createNotification, deleteNotification} from "../../services/notificationService";

export default function AccountResult({item, initIsFriend, initIsWaitRes, socket}) {
    const dispatch = useDispatch()
    const [isFriend, setIsFriend] = useState(initIsFriend)
    const [isWaitRes, setIsWaitRes] = useState(initIsWaitRes)
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    const displayName = JSON.parse(localStorage.getItem("displayName"))

    const handleAddFriend = async (accountRes) => {
        setIsWaitRes(true)
        const data = {
            accountReq: accountId,
            accountRes: accountRes
        }
        const dataNotice = {
            displayName: displayName,
            accountSent: accountId,
            accountReceiver: item.accountId,
            postId: 0,
            type: "addFriends"
        }
        await dispatch(addFriend(data))
        await dispatch(createNotification(dataNotice))
        socket.emit("addFriends", dataNotice)
    }

    const handleCancel = async (accountRes) => {
        setIsFriend(false)
        setIsWaitRes(false)
        const data = {
            accountReq: accountId,
            accountRes: accountRes
        }
        const dataNotice = {
            displayName: displayName,
            accountSent: accountId,
            accountReceiver: item.accountId,
            postId: 0,
            type: "addFriends"
        }
        await dispatch(unfriend(data))
        await dispatch(deleteNotification(dataNotice))
    }

    return (
        <>
            <Card sx={{maxWidth: 300}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="160"
                        image={item.img}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <Link to={`/${item.accountId}`}>{item.displayName}</Link>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.location}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {
                        isFriend ? (<button onClick={() => {
                            handleCancel(item.accountId)
                        }}>Unfriend</button>) : (isWaitRes ? (<button onClick={() => {
                            handleCancel(item.accountId)
                        }}>Wait | Cancel</button>) : (<button onClick={() => {
                            handleAddFriend(item.accountId)
                        }}>Add friend</button>))
                    }
                </CardActions>
            </Card>
        </>
    )
}