import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import AddFriend from "./pages/AddFriends/AddFriend";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {io} from "socket.io-client";
import Post from "./components/post/Post";

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
                        <Route path="/addFriend" element={<AddFriend socket={socket}/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        {/*<Route path="/show" element={<Post/>}/>*/}
                    </Route>
                </Routes>
            </div>
        </>
    )
}

export default App;
