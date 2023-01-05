import "./rightBar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import HomeIcon from '@mui/icons-material/Home';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ChatIcon from '@mui/icons-material/Chat';
import {Link} from "react-router-dom";

export default function RightBar() {
    return (
        <div style={{top: 20}} className="rightBar col-3">
            <div className="rightBarWrapper">
                <ul className="rightBarList">
                    <li className="rightBarListItem">
                        <RssFeedIcon className="rightBarIcon"></RssFeedIcon>
                        <span className="rightBarListItemText">Feed</span>
                    </li>

                    <li className="rightBarListItem">
                        <HomeIcon className="rightBarIcon"></HomeIcon>
                        <span className="rightBarListItemText">Home</span>
                    </li>

                    <li className="rightBarListItem">
                        <YouTubeIcon className="rightBarIcon"></YouTubeIcon>
                        <span className="rightBarListItemText">Video</span>
                    </li>
                </ul>
                <hr className="rightBarHr"/>
                <span></span>
            </div>
        </div>
    );
};

