import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Post from "./components/post/Post";
import AddFriend from "./pages/AddFriends/AddFriend";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/">
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/addFriend" element={<AddFriend/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/show" element={<Post/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;