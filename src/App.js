import {Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Login from "./pages/login/Login";
import AddFriend from "./pages/AddFriends/AddFriend";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {io} from "socket.io-client";
import SearchResult from "./pages/search/searchResult";
import ListFriend from "./pages/listFriend/listFriend";
import Home from "./pages/home/Home";
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from "./pages/pageNotFound/pageNotFound";
import Message from "./pages/message/message";
import Init from "./pages/init";

function App() {
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket)
    }, [setSocket])

    return (
        <>
            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login socket={socket}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={<Init socket={socket}/>}>
                        <Route path="/" element={<Home socket={socket}/>}/>
                        <Route path="/friends" element={<AddFriend socket={socket}/>}/>
                        <Route path="/friends/:accountId" element={<ListFriend socket={socket}/>}/>
                        <Route path="/search" element={<SearchResult socket={socket}/>}/>
                        <Route path="/message/:relationshipId" element={<Message socket={socket}/>}/>
                    </Route>
                    <Route path="/profile/:accountId" element={<Profile socket={socket}/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App;
