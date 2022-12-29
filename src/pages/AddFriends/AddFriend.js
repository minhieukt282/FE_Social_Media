import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import MultiActionAreaCard from "../../components/cardFriend/card";

export default function AddFriend() {
    return (
        <div>
            <div className={'home'}>
                <Navbar/>
            </div>
            <div className="row">
                <Sidebar></Sidebar>
                <div className="col-6">
                    <h2>Lời mời kết bạn</h2>
                    <hr/>
                    <div className="row">
                        <MultiActionAreaCard></MultiActionAreaCard>
                    </div>
                </div>
            </div>
        </div>
    )
}