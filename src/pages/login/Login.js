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

export default function Login({socket}) {
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
            .required("Username is required.")
            .matches(/^[a-z0-9]+$/, "Username is a-z,0-9")
            .min(1)
            .max(15),
        password: Yup.string()
            .required("Password is required")
            .min(1)
            .max(15)
    })

    const handleLogin = async (values) => {
        let result = await dispatch(loginWed(values))
        let data = result.payload
        if (data.message === "success") {
            localStorage.setItem('darkMode', 'light')
            socket.emit("online", {
                accountId: data.data.accountId
            })
            navigate("/")
        } else {
            setMessage(data.message)
        }
    }

    return (
        <div className={"login"}>
            <div className={"login_wrapper"}>
                <div className="login_wrap">
                    <div className="login_1">
                        <img style={{width: 325, height: 160}} src="image/Facebook-Logo-650x366.png" alt="clear"/>
                        <span>A Social Page To Make Friendship</span>
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
                                                placeholder={"Username"}
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
                            <div style={{color:"red"}}>{message}</div>
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
