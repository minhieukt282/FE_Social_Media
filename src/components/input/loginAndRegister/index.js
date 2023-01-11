import "../../../pages/login/style.css"
import Login from "../../../pages/login/Login";
import Register from "../../../pages/register/Register";

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