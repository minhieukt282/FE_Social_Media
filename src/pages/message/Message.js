import React, {useEffect} from "react";
import Chat from "../../components/cardMessage/Chat";

export default function Message({socket}) {
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
            <h2 style={{paddingTop: 20, paddingLeft: 10}}>Message</h2>
            <hr style={{backgroundColor: '#FFFAFA'}}/>
            <Chat socket={socket}/>
        </>
    )
}