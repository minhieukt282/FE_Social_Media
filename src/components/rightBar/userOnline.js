import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {Link} from "react-router-dom";
import React from "react";

export default function UserOnline({item, isOnline}) {
    return (
        <Link style={{textDecoration: "none"}} to={`/message/${item.relationshipId}`} className="profile_link">
            <img src={item.img} alt="" className="navbarImg"/>
            {
                isOnline ? (<FiberManualRecordIcon className="rightBarOnline" style={{color: "05c605"}}/>) :
                    (<FiberManualRecordIcon className="rightBarOnline" style={{color: "ab9d9d"}}/>)
            }
            <span className="rightBarListItemText">{item.displayName}</span>
        </Link>
    )
}