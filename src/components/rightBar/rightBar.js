import "./rightBar.css";
import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

export default function RightBar() {
    const imgAvt = useSelector(state => {
        return state.loginWed.imgAvt
    })
    return (
        <div style={{top: 80}} className="rightBar">
            <div className="rightBarWrapper">
                    <h2>Online</h2>
                    <hr/>
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

