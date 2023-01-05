import "./rightBar.css";
import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
export default function RightBar() {
    const imgAvt = useSelector(state => {
        return state.loginWed.imgAvt
    })
    return (

            <div style={{top: 60}} className="rightBar col-12">
                <div className="rightBarWrapper">
                    <ul className="rightBarList">
                        <li className="rightBarListItem">
                            <Link style={{textDecoration: "none"}} to="/profile" className="profile_link">
                                <img src={imgAvt} alt="" className="navbarImg"/>
                                <span className="rightBarListItemText">User Name</span>
                            </Link>

                        </li>

                        <li className="rightBarListItem">
                            <Link style={{textDecoration: "none"}} to="/profile" className="profile_link">
                                <img src={imgAvt} alt="" className="navbarImg"/>
                                <span className="rightBarListItemText">User Name</span>
                            </Link>

                        </li>

                        <li className="rightBarListItem">
                            <Link style={{textDecoration: "none"}} to="/profile" className="profile_link">
                                <img src={imgAvt} alt="" className="navbarImg"/>
                                <span className="rightBarListItemText">User Name</span>
                            </Link>

                        </li>
                    </ul>
                    <span></span>
                </div>
            </div>
    );
};

