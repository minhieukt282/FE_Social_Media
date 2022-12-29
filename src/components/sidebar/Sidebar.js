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
                <button className="sidebarButton">ShowMore</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    {/*<li className="sidebarFriend">*/}
                    {/*    <img style={{maxWidth:40,}} className="sidebarFriendImg" src="https://www.clipartmax.com/png/small/204-2045091_group-together-teamwork-icon-people-icon-flat-png.png" alt=""/>*/}
                    {/*    <span className="sidebarFriendName">Jane doe</span>*/}
                    {/*</li>*/}

                    {/*<li className="sidebarFriend">*/}
                    {/*    <img style={{maxWidth:40,}} className="sidebarFriendImg" src="https://www.clipartmax.com/png/small/204-2045091_group-together-teamwork-icon-people-icon-flat-png.png" alt=""/>*/}
                    {/*    <span className="sidebarFriendName">Jane doe</span>*/}
                    {/*</li>*/}

                    {/*<li className="sidebarFriend">*/}
                    {/*    <img style={{maxWidth:40,}} className="sidebarFriendImg" src="https://www.clipartmax.com/png/small/204-2045091_group-together-teamwork-icon-people-icon-flat-png.png" alt=""/>*/}
                    {/*    <span className="sidebarFriendName">Jane doe</span>*/}
                    {/*</li>*/}
                </ul>
               <span></span>
            </div>
        </div>
    );
};

