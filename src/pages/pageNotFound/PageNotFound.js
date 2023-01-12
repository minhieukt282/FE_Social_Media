import {Link} from "react-router-dom";

export default function PageNotFound() {
    return (
        <div>
            <h1 style={{textAlign: "center",position:"relative",fontSize:100,marginTop:100}}>404 <br/> Page not found !!</h1>
            <h1 style={{textAlign:"center"}}> Something Wrong here :(</h1>
            <h1 style={{textAlign:"center"}}> We gonna try to find your GirlFriend  :(</h1>
            <Link style={{marginLeft:700}} to="/">Back to Home</Link>
        </div>)
}