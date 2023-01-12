import MultiActionAreaCard from "../../components/cardFriend/MultiActionAreaCard";
import React, {useEffect} from "react";

export default function AddFriend({socket}) {
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
            <h2 style={{paddingTop: 20, paddingLeft: 10}}>Friends request</h2>
            <hr/>
            <div className="row">
                <MultiActionAreaCard socket={socket}></MultiActionAreaCard>
            </div>
        </>
    )
}