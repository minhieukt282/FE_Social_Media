import React from 'react';
import "./Story.css"
import {Avatar} from "@mui/joy";

function StoryElements({image, profileSrc, user}) {
    return (
        <div className="story">
            <Avatar src={profileSrc}/>
            <h4>{user}</h4>
        </div>
    );
}

export default StoryElements;