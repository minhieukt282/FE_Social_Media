import React from "react";
import "./menuLink.css";

export default function ({Icon, text}) {
    return (
        <div className="menuLink">
            {Icon}
            <span className="menuLinkText">{text}</span>
            <span className="menuLinkTextName">{text === "Logout" && "(Amber)"}</span>
        </div>
    );
};


