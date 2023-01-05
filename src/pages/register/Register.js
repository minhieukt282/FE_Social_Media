import {Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import '../login/style.css';
import LoginInput from "../../components/input/LoginInput";
import {useState} from "react";
import * as Yup from "yup"
import {useDispatch} from "react-redux";
import {registerWed} from "../../services/registerServices";

const registerInfos = {
    username: "",
    password: "",
    rePassword: ""
}

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [register, setRegister] = useState(registerInfos)
    const {username, password, rePassword} = register;
    const handleRegisterChange = (e) => {
        const {name, value} = e.target;
        setRegister({...register, [name]: value})
    };

    const loginValidation = Yup.object({
        username: Yup.string()
            .required("Username is required.")
            .matches(/^[a-z0-9]+$/,"Username is a-z,0-9")
            .min(1)
            .max(15),
        password: Yup.string()
            .required("Password is required")
            .min(1)
            .max(15),
        rePassword: Yup.string()
            .required("RePassword is required")
            .min(1)
            .max(15)
    })

    const handleRegister = async (values) => {
        if (values.password === values.rePassword) {
            let result = await dispatch(registerWed(values))
            let message = result.payload.data.message
            if (message === "Account already exists") {
                setMessage(message)
            } else {
                navigate("/login")
            }
        } else {
            setMessage("Check your Repassword!!")
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
                                    password,
                                    rePassword
                                }}
                                validationSchema={loginValidation}
                                onSubmit={(values) => {
                                    handleRegister(values)
                                }}>
                                <Form>
                                    <LoginInput type={"text"}
                                                name="username"
                                                placeholder={"Username"}
                                                onChange={handleRegisterChange}/>

                                    <LoginInput type={"password"}
                                                name="password"
                                                placeholder={"Password"}
                                                onChange={handleRegisterChange}
                                                bottom
                                    />
                                    <LoginInput type={"password"}
                                                name="rePassword"
                                                placeholder={"Confirm password"}
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

                    </div>
                </div>
                <div className="/register"></div>
            </div>
        </div>
    )
}