import React from 'react'
import "./Message.css";

const Message = ({user, item, classs}) => {
    if (user) {
        return (
            <div className={`messageBox ${classs}`}>
                {item.message}
            </div>
        )
    } else {
        return (
            <div className={`messageBox ${classs}`}>
                {item.message}
            </div>
        )
    }
}

export default Message