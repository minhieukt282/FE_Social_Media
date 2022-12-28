import {Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import '../Login/style.css';
import LoginInput from "../../components/input/LoginInput";
import {useEffect, useState} from "react";
import * as Yup from "yup"
import {useDispatch} from "react-redux";
import {loginWed} from "../../services/loginServices";

const loginInfos = {
    username: "",
    password: "",
    repassword:""
}

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [login, setLogin] = useState(loginInfos)
    const {username, password} = login;
    const handleRegisterChange = (e) => {
        const {name, value} = e.target;
        setLogin({...login, [name]: value})
    };

    const loginValidation = Yup.object({
        username: Yup.string()
            .required("Email is required.")
            .email("Must have an email.")
            .max(50),
        password: Yup.string().required("Password is Required"),
        repassword: Yup.string().required("RePassword is Required")
    })
    const handleRegister = async (values) => {
        let result = await dispatch(loginWed(values))
        let message = result.payload.data.message
        // console.log(result)
        if (message =="success") {
            navigate("/profile")
        } else {
            setMessage(message)
        }

    }

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
                                onSubmit={(values) => {
                                    handleRegister(values)
                                }}>
                                <Form>
                                    <LoginInput type={"text"}
                                                name="username"
                                                placeholder={"Email Address"}
                                                onChange={handleRegisterChange}/>

                                    <LoginInput type={"password"}
                                                name="password"
                                                placeholder={"Password"}
                                                onChange={handleRegisterChange}
                                                bottom
                                    />
                                    <LoginInput type={"password"}
                                                name="repassword"
                                                placeholder={"RePassword"}
                                                onChange={handleRegisterChange}
                                                bottom
                                    />
                                    <button type={"submit"} className={"blue_btn"}>Sign Up</button>
                                </Form>
                            </Formik>
                            <div>{message}</div>
                            <div className="sign_splitter"></div>
                            <Link style={{textDecoration: "none", color: "white", width: "75%", marginLeft: 80}}
                                  to={"/login"}>
                                <button className="blue_btn open_signup">Back to Login</button>
                            </Link>
                        </div>
                        <Link to="/" className={"sign_extra"}>
                            <b>Create a Page</b> for a celebrity,brand or business.
                        </Link>
                    </div>
                </div>
                <div className="/register"></div>
            </div>
        </div>
    )
}