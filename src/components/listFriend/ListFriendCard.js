import * as React from "react";
import "./listFriendCard.css"
import {getFriend} from "../../services/FriendServices";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AccountResult from "../searchAccount/AccountResult";
import {Link, useParams} from "react-router-dom";
import Card from "@mui/material/Card";
import {CardActionArea, CardActions} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ListFriendCard({socket}) {
    const dispatch = useDispatch()
    const userId = JSON.parse(localStorage.getItem("accountId"))
    const {accountId} = useParams()

    useEffect(() => {
        dispatch(getFriend(accountId))
    }, [])

    const listFriends = useSelector(state => {
        return state.listFriend.listFriend
    })

    const relationship = useSelector(state => {
        return state.relationship.relationship
    })

    const isRelationship = (accountRes) => {
        let data = {
            isFriend: false,
            isWaitRes: false,
        }
        for (let i = 0; i < relationship.length; i++) {
            if ((relationship[i].accountReq === accountRes && relationship[i].accountRes === userId)||
                (relationship[i].accountReq === userId && relationship[i].accountRes === accountRes)) {
                data.isFriend = relationship[i].isFriend
                data.isWaitRes = true
                break
            }
        }
        return data
    }

    return (
        <>
            {
                listFriends?.map((item, index) => {
                    const data = isRelationship(item?.accountId)
                    if (item.accountId !== accountId) {
                        if (item.accountId !== userId) {
                            return (
                                <div className="col-4" key={index}>
                                    <AccountResult item={item} initIsFriend={data.isFriend}
                                                   initIsWaitRes={data.isWaitRes}
                                                   socket={socket}/>
                                </div>
                            )
                        } else {
                            return (
                                <div className="col-4 cardFriend" key={index}>
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
                                                    <Link to={`/profile/${item.accountId}`}>{item.displayName}</Link>
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.location}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                        </CardActions>
                                    </Card>
                                </div>
                            )
                        }
                    }
                })
            }
        </>
    )

}