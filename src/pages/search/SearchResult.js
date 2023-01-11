import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import React, {useEffect} from "react";
import SearchAccount from "../../components/searchAccount/SearchAccount";
import SearchPost from "../../components/searchPost/SearchPost";

export default function SearchResult({socket}) {
    useEffect(() => {
        if (socket != null)
            socket.emit("refresh", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })
    }, [socket])

    return (
        <div>
            <div className={'home'}>
                <Navbar socket={socket}/>
            </div>
            <div className="row">
                <div className="col-3">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-6">
                    <h2 style={{paddingTop: 40}}>Result</h2>
                    <hr/>
                    <div className="row">
                        <SearchAccount socket={socket}/>
                        <SearchPost socket={socket}></SearchPost>
                    </div>
                </div>
            </div>
        </div>
    )
}