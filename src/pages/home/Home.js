import './home.css'
import Navbar from "../../components/navbar/Navbar";
import Post from "../../components/post/Post";
import Sidebar from "../../components/sidebar/Sidebar";

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
                </div>
            </div>
                {/*<div className="main">*/}



                {/*</div>*/}
        </>
    )
}