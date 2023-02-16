import Sidebar from "../components/sidebar/Sidebar";
import {Outlet} from "react-router-dom";
import RightBar from "../components/rightBar/RightBar";

export default function HomePage({socket}) {
    return (
        <div className="row">
            <div className="col-3">
                <Sidebar/>
            </div>
            <div className="col-6">
                <Outlet/>
            </div>
            <div className="col-3 mediaRight">
                <RightBar socket={socket}/>
            </div>
        </div>
    )
}