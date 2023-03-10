import React, {useEffect} from "react";
import ListFriendCard from "../../components/listFriend/ListFriendCard";

export default function ListFriend({socket}) {
    useEffect(() => {
        if (socket != null) {
            socket.emit("refresh", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })
            socket.emit("findUser", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })
        }
    }, [socket])

    return (
        <>
            <h2 style={{paddingTop: 20, paddingLeft: 10}}>Friends list</h2>
            <hr style={{backgroundColor: '#FFFAFA'}}/>
            <div className="row">
                <ListFriendCard socket={socket}/>
            </div>
        </>
    )
}