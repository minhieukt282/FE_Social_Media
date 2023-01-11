import {Route, Routes, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Login from "./pages/login/Login";
import AddFriend from "./pages/AddFriends/AddFriend";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {io} from "socket.io-client";
import SearchResult from "./pages/search/searchResult";
import ListFriend from "./pages/listFriend/listFriend";
import Home from "./pages/Home/Home";
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import PageNotFound from "./pages/pageNotFound/pageNotFound";
import Message from "./pages/message/message";

function App() {
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket)
    }, [setSocket])

    const user = useSelector(state => {
        return state.loginWed.token
    })

    const { pathname } = useLocation();

    useEffect(()=>{
        window.scrollTo(0,0)
    },[pathname]);

    return (
        <>
            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login socket={socket}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    {
                        user != null ?
                                <Route path="/">
                                    <Route path="/home" element={<Home socket={socket}/>}/>
                                    <Route path="/friends" element={<AddFriend socket={socket}/>}/>
                                    <Route path="/friends/:accountId" element={<ListFriend socket={socket}/>}/>
                                    <Route path="/search" element={<SearchResult socket={socket}/>}/>
                                    <Route path="/message" element={<Message socket={socket}/>}/>
                                    <Route path="/profile/:accountId" element={<Profile socket={socket}/>}/>
                                    <Route path="*" element={<PageNotFound/>}/>
                                </Route>
                            :
                            <Route path="*" element={<PageNotFound/>}/>
                    }
                </Routes>
            </div>
        </>
    )
}

export default App;
