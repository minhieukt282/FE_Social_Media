import {Route, Routes} from "react-router-dom";
// import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPost} from "./services/postServices";
import {login, loginWed} from "./services/loginServices";

function App() {
    // const dispatch = useDispatch();
    // const store = useSelector(state => {
    //     return state
    // });
    // console.log(store)
    // useEffect(()=>{
    //     dispatch(getPost());
    // },[])
    // useEffect(()=>{
    //     dispatch(loginWed({
    //         username:'1',
    //         password:'1'
    //     }));
    // },[])
    return (
        <div >
            <Routes>
                <Route path="/">
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    {/*<Route path="" element={<Home/>}/>*/}
                    <Route path="/profile" element={<Profile/>}/>
                </Route>
            </Routes>
        </div>
    );
}
export default App;
