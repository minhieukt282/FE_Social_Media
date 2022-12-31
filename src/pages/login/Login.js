import {Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import './style.css';
import LoginInput from "../../components/input/LoginInput";
import {useState} from "react";
import * as Yup from "yup"
import {useDispatch} from "react-redux";
import {loginWed} from "../../services/loginServices";

const loginInfos = {
    username: "",
    password: "",
}

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [login, setLogin] = useState(loginInfos)
    const {username, password} = login;
    const handleLoginChange = (e) => {
        const {name, value} = e.target;
        setLogin({...login, [name]: value})
    };

    const loginValidation = Yup.object({
        username: Yup.string()
            .required("Email is required.")
            .min(1)
            .max(15),
        password: Yup.string()
            .required("Password is Required")
            .min(1)
            .max(15)
    })

    const handleLogin = async (values) => {
        let result = await dispatch(loginWed(values))
        let message = result.payload.data.message
        if (message === "success") {
            navigate("/home")
        } else {
            setMessage(message)
        }
    }

    return (
        <div className={"login"}>
            <div className={"login_wrapper"}>
                <div className="login_wrap">
                    <div className="login_1">
                        <img style={{width: 325, height: 160}} src="Image/Facebook-Logo-650x366.png" alt="clear"/>
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
                                    handleLogin(values)
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
                                    <button type={"submit"} className={"blue_btn"}>Log In</button>
                                </Form>
                            </Formik>

                            <div>{message}</div>

                            <div className="sign_splitter"></div>
                            <Link style={{textDecoration: "none", color: "white", width: "75%", marginLeft: 80}}
                                  to={"/register"}>
                                <button className="blue_btn open_signup">Create Account</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}