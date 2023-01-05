import * as React from "react";
import {getFriend} from "../../services/FriendServices";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AccountResult from "../searchAccount/AccountResult";
import {useParams} from "react-router-dom";

export default function ListFriendCard({socket}) {
    const dispatch = useDispatch()
    // const accountId = JSON.parse(localStorage.getItem("accountId"))
    const {accountId} = useParams()

    useEffect(() => {
        dispatch(getFriend(accountId))
    }, [])

    const listFriends = useSelector(state => {
        return state.listFriend.listFriend
    })

    return (
        <>
            {
                listFriends?.map((item, index) => {
                    if (item.accountId !== accountId) {
                        return (
                            <div className="col-4" key={index}>
                                <AccountResult item={item} initStatus={true} isFriend={true}
                                               socket={socket}/>
                            </div>
                        )
                    }
                })
            }
        </>
    )

}