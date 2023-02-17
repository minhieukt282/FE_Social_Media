import {Link} from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className='col-12' style={{textAlign: "center"}}>
            <h1 style={{position: "relative", fontSize: 100, marginTop: 100}}>404 <br/> Page not
                found !!</h1>
            <h1> Something wrong here :(</h1>
            <Link to="/" className='displayName'><h4>Back to Home</h4></Link>
        </div>
    )
}