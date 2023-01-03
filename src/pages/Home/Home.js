import './home.css'
import Navbar from "../../components/navbar/Navbar";
import Post from "../../components/post/Post";
import Sidebar from "../../components/sidebar/Sidebar";
import RightBar from "../../components/rightBar/rightBar";

export default function Home() {
    return (
        <>
            <div className={'home'}>
                <Navbar/>
            </div>
            <div className="row">
                    <Sidebar></Sidebar>
                <div className="col-6">
                    <Post/>
                </div>
                <div className="col-3">
                    <RightBar/>
                </div>
            </div>
        </>
    )
}