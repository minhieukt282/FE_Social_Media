import Card from "@mui/material/Card";
import {Button, CardActionArea, CardActions} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import * as React from "react";
import {addFriend, unfriend} from "../../services/FriendServices";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {createNotification, deleteNotification} from "../../services/notificationService";

export default function AccountResult({item, initStatus, isAccept, socket}) {
    const dispatch = useDispatch()
    const [waitRes, setWaitRes] = useState(initStatus)
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    const displayName = JSON.parse(localStorage.getItem("displayName"))

    const handleAddFriend = async (accountRes) => {
        setWaitRes(!waitRes)
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
        setWaitRes(!waitRes)
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
                        waitRes ? (
                            isAccept ? (<Button size="small" color="primary" onClick={() => {
                                handleCancel(item.accountId)
                            }}>
                                Unfriend
                            </Button>) : (
                                <Button size="small" color="primary" onClick={() => {
                                    handleCancel(item.accountId)
                                }}>
                                    Waiting accept | Cancel
                                </Button>
                            )
                        ) : (<Button size="small" color="primary" onClick={() => {
                            handleAddFriend(item.accountId)
                        }}>
                            Add friend
                        </Button>)
                    }
                </CardActions>
            </Card>
        </>
    )
}