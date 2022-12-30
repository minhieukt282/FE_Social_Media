import Navbar from "../../components/navbar/Navbar";

export default function Profile() {
    return (
        <div className="profile">
            <Navbar></Navbar>
            <div className="profileRight">
                <div className="profileRightTop">
                    <img className="profileCoverImg" style={{width: 325}}
                         src='https://i0.wp.com/www.socialmediaexplorer.com/wp-content/uploads/2013/03/facebook-logo-reversed.png?zoom=2'
                         alt="clear"/>

                    <img className="profileUserImg" style={{width: 325, height: 160}}
                         src='https://1.bp.blogspot.com/-S8HTBQqmfcs/XN0ACIRD9PI/AAAAAAAAAlo/FLhccuLdMfIFLhocRjWqsr9cVGdTN_8sgCPcBGAYYCw/s1600/f_logo_RGB-Blue_1024.png'
                         alt="clear"/>
                </div>
                <div className="profileRightBottom"></div>

            </div>
        </div>
    )
}