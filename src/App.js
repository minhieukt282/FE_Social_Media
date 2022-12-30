import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import AddFriend from "./pages/AddFriends/AddFriend";

function App() {
    return (
        <div >
            <Routes>
                <Route path="/">
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/addFriend" element={<AddFriend/>}/>
                    <Route path="/profile" element={<Profile/>}/>
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
