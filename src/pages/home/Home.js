import './home.css'
import Post from "../../components/post/Post";
import Sidebar from "../../components/sidebar/Sidebar";
import React, {useEffect} from "react";
import AddPost from "../../components/post/AddPost";
import Navbar from "../../components/navbar/Navbar";
import RightBar from "../../components/rightBar/rightBar";
import styled from "styled-components"
const HomeCss = styled.div`
  div[class^=col] {
    padding-left: 0!important;
    padding-right: 0!important;
  }
`

export default function Home({socket}) {

    useEffect(() => {
        if (socket != null)
            socket.emit("refresh", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })
    }, [socket])
    return (
        <HomeCss>
            <div className={'home'}>
                <Navbar socket={socket}/>
            </div>
            <div className="row">
                <div className="col-3 mediaLeft">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-6">
                    <AddPost/>
                    <Post socket={socket} url={null}/>
                </div>
                <div className="col-3 mediaRight"><RightBar/></div>
            </div>
        </HomeCss>
    )
}