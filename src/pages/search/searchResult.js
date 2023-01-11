import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import React, {useEffect} from "react";
import SearchAccount from "../../components/searchAccount/searchAccount";
import SearchPost from "../../components/searchPost/searchPost";
import RightBar from "../../components/rightBar/rightBar";

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
        <div>
            <div className={'home'}>
                <Navbar socket={socket}/>
            </div>
            <div className="row">
                <div className="col-3">
                    <Sidebar/>
                </div>
                <div className="col-6">
                    <h2 style={{paddingTop: 20, paddingLeft: 10}}>Sreach result</h2>
                    <hr/>
                    <div className="row">
                        <SearchAccount socket={socket}/>
                        <SearchPost socket={socket}></SearchPost>
                    </div>
                </div>
                <div className="col-3 mediaRight">
                    <RightBar socket={socket}/>
                </div>
            </div>
        </div>
    )
}