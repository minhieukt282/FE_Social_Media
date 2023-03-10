import {Route, Routes, useLocation} from "react-router-dom";
import React, {createContext, useEffect, useState} from "react";
import Login from "./pages/login/Login";
import AddFriend from "./pages/addFriends/AddFriend";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {io} from "socket.io-client";
import SearchResult from "./pages/search/SearchResult";
import ListFriend from "./pages/listFriend/ListFriend";
import Home from "./pages/home/Home";
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Message from "./pages/message/Message";
import Init from "./pages/init";
import "./App.css"
import {constants} from "./constants";
import Post from "./components/post/Post";
import HomePage from "./pages/homePage";

export const ThemeContext = createContext(null);

function App() {
    const [socket, setSocket] = useState(null)
    const {pathname} = useLocation();
    const [theme, setTheme] = useState(localStorage.getItem('darkMode'));

    useEffect(() => {
        const newSocket = io(constants.SOCKET_URL);
        setSocket(newSocket)
    }, [setSocket])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <div className="container" id={`${theme}`}>
                <Routes>
                    <Route path="/login" element={<Login socket={socket}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={<Init socket={socket}/>}>
                        <Route path="/profile/:accountId" element={<Profile socket={socket}/>}/>
                        <Route path="/" element={<HomePage socket={socket}/>}>
                            <Route path="/" element={<Home socket={socket}/>}/>
                            <Route path="/friends" element={<AddFriend socket={socket}/>}/>
                            <Route path="/friends/:accountId" element={<ListFriend socket={socket}/>}/>
                            <Route path="/search" element={<SearchResult socket={socket}/>}/>
                            <Route path="/message/:relationshipId" element={<Message socket={socket}/>}/>
                            <Route path="/posts/:urlPostId" element={<Post socket={socket} url={null}/>}/>
                        </Route>
                    </Route>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </div>
        </ThemeContext.Provider>
    )
}

export default App;
