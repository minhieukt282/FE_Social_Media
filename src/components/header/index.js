import "./style.css";
import {Link} from "react-router-dom";
import {Logo} from "../../../public/image/logo"
import React from "react";
export default function Header(){
    return <header>
        <div className="header_left">

                <div className="circle">
                    <Link to="/" style={{textDecoration: "none"}}>
                    <span className="logo"><img src="image/logo/Facebook_Logo.png"
                                                style={{width: 50, height: 50, marginTop: 5}}/></span>
                    </Link>
                </div>
        </div>
        <div className="header_middle"></div>
        <div className="header_right"></div>
    </header>

}