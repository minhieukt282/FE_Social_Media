import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {acceptFriends, rejectFriends, waitingFriends} from "../../services/FriendServices";
import {createNotification} from "../../services/notificationService";

export default function MultiActionAreaCard({socket}) {
    const dispatch = useDispatch()
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    const [refreshPage, setRefreshPage] = useState(false)
    useEffect(() => {
        dispatch(waitingFriends(accountId))
    }, [refreshPage])

    const listReqFriends = useSelector((state) => {
        return state.waitingFriend.waitingFriend
    });

    const handleAccept = async (relationshipId, accountReceiver) => {
        const accountSent = JSON.parse(localStorage.getItem("accountId"))
        const displayName = JSON.parse(localStorage.getItem("displayName"))
        const dataNotification = {
            displayName: displayName,
            accountSent: accountSent,
            accountReceiver: accountReceiver,
            postId: 0,
            type: "friends"
        }
        await dispatch(acceptFriends(relationshipId))
        setRefreshPage(!refreshPage)
        await dispatch(createNotification(dataNotification))
        socket.emit("acceptFriend", dataNotification)
    }

    const handleReject = async (relationshipId) => {
        await dispatch(rejectFriends(relationshipId))
        setRefreshPage(!refreshPage)
    }

    return (
        <>
            {
                listReqFriends.data?.map((item, index) => (
                    <div className="col-4" key={index}>
                        <Card sx={{maxWidth: 300}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={item?.img}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item?.displayName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item?.location}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => {
                                    handleAccept(item?.relationshipId, item?.accountId)
                                }}>
                                    Accept
                                </Button>
                                <Button size="small" color="primary" onClick={() => {
                                    handleReject(item?.relationshipId)
                                }}>
                                    Reject
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                ))
            }
        </>
    );
}