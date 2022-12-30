import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Post from "./components/post/Post";
import AddFriend from "./pages/AddFriends/AddFriend";
import AddPost from "./components/post/AddPost";
import PostStatus from "./components/post/PostStatus";

function App() {
    return (
        <div >
            <Routes>
                <Route path="/">
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/home" element={<Home/>}>

                    </Route>
                    <Route path="/addFriend" element={<AddFriend/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/show" element={<Post/>}/>
                    {/*<Route path="/add-post" element={<AddPost/>}/>*/}
                    {/*<Route path="/test" element={<PostStatus/>}/>*/}

                    {/*<Route path=":username">*/}
                    {/*    <Route path=":userId" element={<Profile/>}/>*/}
                    {/*    /!*<Route path=":userId/edit" element={<EditProfile/>}/>*!/*/}
                    {/*</Route>*/}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
