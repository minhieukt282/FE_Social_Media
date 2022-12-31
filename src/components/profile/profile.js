import CreateIcon from "@mui/icons-material/Create";
import PortraitIcon from "@mui/icons-material/Portrait";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Post from "../post/Post";

export default function ProfileItem(){
    return(
        <>
            <div className="profile">
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg"
                                 src='https://wallup.net/wp-content/uploads/2016/01/73809-nature-lake-reflection-mountain-trees-748x468.jpg'
                                 alt="clear"/>

                            <img className="profileUserImg"
                                 src='https://1.bp.blogspot.com/-S8HTBQqmfcs/XN0ACIRD9PI/AAAAAAAAAlo/FLhccuLdMfIFLhocRjWqsr9cVGdTN_8sgCPcBGAYYCw/s1600/f_logo_RGB-Blue_1024.png'
                                 alt="clear"/>
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Name here</h4>
                            <button className="editProfile"><CreateIcon/>Edit Profile</button>
                        </div>
                    </div>
                </div>
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
                                    <h3>User Detail</h3>
                                    <div className="detailInfo">
                                        <div className="detailInfoItem">
                                            <PortraitIcon/>
                                            <span className="detailInfoKey">Real Name : Dao Anh</span>
                                        </div>

                                        <div className="detailInfoItem">
                                            <LocationCityIcon/>
                                            <span className="detailInfoKey">City : Ha noi</span>
                                        </div>

                                        <div className="detailInfoItem">
                                            <div className="detailInfoKey">City :</div>
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
                            <div className="col-8"><Post/></div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </>
    )
}