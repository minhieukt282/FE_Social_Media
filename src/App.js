import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div >
            <Routes>
                <Route path="/">
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="" element={<Home/>}/>
                    <Route path=":username">
                        {/*<Route path=":userId" element={<Profile/>}/>*/}
                        {/*<Route path=":userId/edit" element={<EditProfile/>}/>*/}
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
