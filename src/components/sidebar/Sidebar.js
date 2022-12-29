import "./sidebar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import HomeIcon from '@mui/icons-material/Home';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ChatIcon from '@mui/icons-material/Chat';
import {Link} from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar col-3">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li  className="sidebarListItem" >
                        <RssFeedIcon className="sidebarIcon"></RssFeedIcon>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <Link style={{textDecoration:"none"}} to="/home">
                    <li  className="sidebarListItem" >
                        <HomeIcon className="sidebarIcon"></HomeIcon>
                        <span className="sidebarListItemText">Home</span>
                    </li>
                    </Link>

                    <li  className="sidebarListItem" >
                        <YouTubeIcon className="sidebarIcon"></YouTubeIcon>
                        <span className="sidebarListItemText">Video</span>
                    </li>

                    <li  className="sidebarListItem" >
                        <ChatIcon className="sidebarIcon"></ChatIcon>
                        <span className="sidebarListItemText">Chat</span>
                    </li>
                </ul>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                </ul>
               <span></span>
            </div>
        </div>
    );
};

