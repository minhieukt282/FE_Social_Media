import "../../../pages/Login/style.css"
import Login from "../../../pages/Login/Login";
import Register from "../../../pages/Register/Register";

export default function MenuLogin(){
    return(
        <div className="login">
            <div className="login_wrapper">
                <Login/>
                <Register/>
            </div>

        </div>
    )
}