import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import AddFriend from "./pages/AddFriends/AddFriend";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {io} from "socket.io-client";
import SearchResult from "./pages/search/searchResult";
import ListFriend from "./pages/listFriend/listFriend";

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
                    <Route path="/">
                        <Route path="/login" element={<Login socket={socket}/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/home" element={<Home socket={socket}/>}/>
                        <Route path="/friends" element={<AddFriend socket={socket}/>}/>
                        <Route path="/friends/:accountId" element={<ListFriend socket={socket}/>}/>
                        <Route path="/search" element={<SearchResult socket={socket}/>}/>
                        <Route path="/:accountId" element={<Profile socket={socket}/>}/>
                    </Route>
                </Routes>
            </div>
        </>
    )
}

export default App;
