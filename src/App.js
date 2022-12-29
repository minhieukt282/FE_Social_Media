import {Route, Routes} from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import {Check} from "./Check";
function App() {
    return (
        <div >
            <Routes>
                <Route path="/">
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    {/*<Route path={'/check'} element={<Check/>}/>*/}
                    <Route path="home" element={<Home/>}>

                    </Route>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
