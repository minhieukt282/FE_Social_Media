import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {useEffect} from "react";
import SearchAccount from "../../components/searchAccount/searchAccount";

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
                <Sidebar></Sidebar>
                <div className="col-6">
                    <h2 style={{paddingTop: 40}}>Result</h2>
                    <hr/>
                    <div className="row">
                        <SearchAccount socket={socket}/>
                    </div>
                </div>
            </div>
        </div>
    )
}