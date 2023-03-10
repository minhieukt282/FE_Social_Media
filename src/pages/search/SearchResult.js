import React, {useEffect} from "react";
import SearchAccount from "../../components/searchAccount/SearchAccount";
import SearchPost from "../../components/searchPost/SearchPost";

export default function SearchResult({socket}) {
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
            <h2 style={{paddingTop: 20, paddingLeft: 10}}>Search result</h2>
            <hr style={{backgroundColor: '#FFFAFA'}}/>
            <div className="row">
                <SearchAccount socket={socket}/>
                <SearchPost socket={socket}/>
            </div>
        </>
    )
}