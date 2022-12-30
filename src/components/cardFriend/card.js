import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {acceptFriends, rejectFriends, waitingFriends} from "../../services/FriendServices";


export default function MultiActionAreaCard() {
    const dispatch = useDispatch()
    // const token = JSON.parse(localStorage.getItem("token"))
    const accountId = JSON.parse(localStorage.getItem("accountId"))

    useEffect(() => {
        dispatch(waitingFriends(accountId))
    }, [])

    const listReqFriends = useSelector((state) => {
        return state.waitingFriend.waitingFriend
    });

    const handleAccept = async (relationshipId) => {
        await dispatch(acceptFriends(relationshipId))
        dispatch(waitingFriends(accountId))
    }

    const handleReject = async (relationshipId) => {
        await dispatch(rejectFriends(relationshipId))
        dispatch((waitingFriends(accountId)))
    }

    return (
        <>
            {
                listReqFriends.data?.map((item) => (
                    <div className="col-4">
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
                                    handleAccept(item?.relationshipId)
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