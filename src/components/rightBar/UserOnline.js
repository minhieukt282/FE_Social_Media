import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {Link} from "react-router-dom";
import React from "react";

export default function UserOnline({item, isOnline}) {
    return (
        <Link style={{textDecoration: "none"}} to={`/message/${item.relationshipId}`} className="profile_link">
            {
                isOnline ? (<>
                        <img src={item.img} alt="" className="navbarImg" style={{border: "2px solid #05c605"}}/>
                        <FiberManualRecordIcon className="rightBarOnline" style={{color: "05c605"}}/>
                    </>) :
                    (<>
                        <img src={item.img} alt="" className="navbarImg" style={{border: "2px solid #ab9d9d"}}/>
                        <FiberManualRecordIcon className="rightBarOnline" style={{color: "ab9d9d"}}/>
                    </>)
            }
            <span className="rightBarListItemText">{item.displayName}</span>
        </Link>
    )
}