import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPosts} from "./services/postServices";

export function Check() {
    const dispatch = useDispatch();
    const handleGetPost = async () => {
        let data = await dispatch(getPosts())
        console.log(data.payload.data)
    }
    return (
        <div>
            <button onClick={handleGetPost}>Click</button>
            <h1>hello</h1>
        </div>
    )
}