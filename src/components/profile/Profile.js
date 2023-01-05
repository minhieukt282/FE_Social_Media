import CreateIcon from "@mui/icons-material/Create";
import PortraitIcon from "@mui/icons-material/Portrait";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Post from "../post/Post";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAccount} from "../../services/accountService";
import AddPost from "../post/AddPost";


export default function ProfileItem({socket}) {
    const {accountId} = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAccount(accountId))
    }, [])

    const accountInfo = useSelector(state => {
        return state.accountInfo.accountInfo
    })

    return (
        <>
            <div className="profile">
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg"
                                 src='https://wallup.net/wp-content/uploads/2016/01/73809-nature-lake-reflection-mountain-trees-748x468.jpg'
                                 alt="clear"/>
                            <img className="profileUserImg"
                                 src={accountInfo.img} alt="clear"/>
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{accountInfo.displayName}</h4>
                            {/*<button className="editProfile"><CreateIcon/>Edit Profile</button>*/}
                        </div>
                    </div>
                </div>
                <br/>
                <div className="profileRightBottom">
                </div>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="row">
                            <div style={{paddingTop: 30}} className="col-4">
                                <div className="infoTable">
                                    <h3>Information</h3>
                                    <div className="detailInfo">
                                        <div className="detailInfoItem">
                                            <PortraitIcon/>
                                            <span className="detailInfoKey">Real name: {accountInfo.displayName}</span>
                                        </div>
                                        <div className="detailInfoItem">
                                            <PortraitIcon/>
                                            <span className="detailInfoKey">Birthday: {accountInfo.birthday}</span>
                                        </div>
                                        <div className="detailInfoItem">
                                            <LocationCityIcon/>
                                            <span className="detailInfoKey">City: {accountInfo.location}</span>
                                        </div>

                                        <button className="editButton"><CreateIcon/>Edit Profile</button>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                <div className="friendList">
                                    <h4>Friend 1</h4>
                                    <h4>Friend 1</h4>
                                    <h4>Friend 1</h4>
                                    <h4>Friend 1</h4>
                                </div>
                            </div>
                            <div className="col-8">
                                <AddPost/>
                                <Post socket={socket} url={accountId}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </>
    )
}