import './home.css'
import Navbar from "../../components/navbar/Navbar";
import Post from "../../components/post/Post";

export default function Home() {
    return (
        <>
            <div className={'home'}>
                <Navbar/>
            </div>
            <div className="row">
                <div className="col-3">

                </div>
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