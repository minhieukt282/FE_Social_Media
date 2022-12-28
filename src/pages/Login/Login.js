import {Form, Formik} from "formik";
import {Link} from "react-router-dom";
import './style.css';
import LoginInput from "../../components/input/LoginInput";
import {useState} from "react";
import * as Yup from "yup"

const loginInfos = {
    username: "",
    password: "",
}

export default function Login() {
    const [login, setLogin] = useState(loginInfos)
    const {username, password} = login;
    const handleLoginChange = (e) => {
        const {name, value} = e.target;
        setLogin({...login, [name]: value})
    };
    const loginValidation = Yup.object({
        username: Yup.string()
            .required("Email is required.")
            .email("Must have an email.")
            .max(50),
        password: Yup.string().required("Password is required")
    })

    return (
        <div className={"login"}>
            <div className={"login_wrapper"}>
                <div className="login_wrap">
                    <div className="login_1">
                        <img style={{width: 325, height: 160}} src="Image/Facebook-Logo-650x366.png" alt=""/>
                        <span>An Social Page to make FriendShip</span>
                    </div>
                    <div className="login_2">
                        <div className="login_2_wrap">
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    username,
                                    password
                                }}
                                validationSchema={loginValidation}
                                onSubmit={() => {
                                }}>
                                <Form>
                                    <LoginInput type={"text"}
                                                name="username"
                                                placeholder={"Email Address"}
                                                onChange={handleLoginChange}/>

                                    <LoginInput type={"password"}
                                                name="password"
                                                placeholder={"Password"}
                                                onChange={handleLoginChange}
                                                bottom
                                    />
                                    <Link style={{textDecoration:"none",color:"white"}} to={"/"}>
                                        <button type={"submit"} className={"blue_btn"}>Log In</button>
                                    </Link>
                                </Form>
                            </Formik>
                            <div className="sign_splitter"></div>
                            <Link style={{textDecoration:"none",color:"white",width:"75%",marginLeft:80}} to={"register"}>
                            <button className="blue_btn open_signup">Create Account</button>
                            </Link>
                        </div>
                        <Link to="/" className={"sign_extra"}>
                            <b>Create a Page</b> for a celebrity,brand or business.
                        </Link>
                    </div>
                </div>
                <div className="register"></div>
            </div>
        </div>
    )
}