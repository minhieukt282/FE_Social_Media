import CreateIcon from "@mui/icons-material/Create";
import PortraitIcon from "@mui/icons-material/Portrait";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Post from "../post/Post";

export default function ProfileItem() {
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
                                <h2>Friend List</h2>
                                <div className="infoTable col-12">
                                    <div className="row">
                                        <div className="col-4">
                                            <Card sx={{maxWidth: 120}}>
                                                <CardMedia
                                                    sx={{height: 120}}
                                                    image="https://i.pinimg.com/564x/36/18/c5/3618c544af9803004da77bf7847ce217.jpg"
                                                    title="Đào Anh"
                                                />
                                            </Card>
                                        </div>

                                        <div className="col-4">
                                            <Card sx={{maxWidth: 120}}>
                                                <CardMedia
                                                    sx={{height: 120}}
                                                    image="https://i.pinimg.com/564x/94/6c/42/946c423df85bcd08c44d1bf43b721670.jpg"
                                                    title="Thị Hà"
                                                />
                                            </Card>
                                        </div>

                                        <div className="col-4">
                                            <Card sx={{maxWidth: 120}}>
                                                <CardMedia
                                                    sx={{height: 120}}
                                                    image="https://i.pinimg.com/564x/27/3e/32/273e3261d80014ecb374bb48a208562f.jpg"
                                                    title="Minh Hiếu"
                                                />
                                            </Card>
                                        </div>

                                        <div className="col-4">
                                            <Card sx={{maxWidth: 120}}>
                                                <CardMedia
                                                    sx={{height: 120}}
                                                    image="https://i.pinimg.com/564x/6e/f6/d3/6ef6d39d021da8f183fd337310970d5e.jpg"
                                                    title="green iguana"
                                                />
                                            </Card>
                                        </div>
                                    </div>
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