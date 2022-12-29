import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import AddFriend from "./pages/AddFriends/AddFriend";

function App() {
    // const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messageRec, setMessageRec] = useState('')
    const [count, setCount] = useState(0)
    const tokenDefault = 123456
    const sendMessage = () => {
        // setRoom("1")
        socket.emit("join_room", 1)
        // setMessage("tymmmmmmmm")
        socket.emit("send_message", {message: count, room: 1, id: tokenDefault})
        setCount(count + 1)
    }

    useEffect(() => {
        socket.on("receive_message", (data => {
            setMessageRec(data.message)
        }))
    }, [socket])

    return (
        <div >
            <Routes>
                <Route path="/">
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/addFriend" element={<AddFriend/>}/>
                    <Route path=":username">
                        <Route path=":userId" element={<Profile/>}/>
                        {/*<Route path=":userId/edit" element={<EditProfile/>}/>*/}
                    </Route>
                </Route>
            </Routes>
        <div>
            <div className="container">
                <img
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhUTEhIVFRIXFxUaFRUWFRUXFhUWGBUXFhUXGBgaHSggGBolGxYVITEhJSktLjAuFx81ODMtNygtLisBCgoKDg0OGhAQGzImICUtLS8vLy8tLS0tLi0tLS0vLy0xMi8tLS0vLy0tLS0tMC8tLS0tMC0tLS0tLS8tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEDBAUHAgj/xAA/EAACAQICBwQHBgQGAwAAAAAAAQIDEQQhBRIxQVFhcQYigZETIzJScqGxB0KCwdHwU5LC4TNDYqKy0hUWg//EABsBAQACAwEBAAAAAAAAAAAAAAAEBQIDBgEH/8QAMhEAAgEBBQUIAgMAAwEAAAAAAAECAwQFETFBEiFRYaETInGBkbHR8DLhI0LBM1KCU//aAAwDAQACEQMRAD8A7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa/F6Up08m7y92Ob8eBhUqQpx2ptJczKEJTeEVibAEXxOn6j9hai4+0/nl8jXV8ZUl7U5Pk27eWwq6l80YvCCcui67+hNhd9R75PDr7fJMZ4mC2zinzkkWVpCgv8AMj4O5DYx5HsiSvuppBerfwSFdsNZP76kx/8AI0P4kfMuQxdN7JxfSSf5kKPLR4r7qawXq18h3bDSTJ+CDUMROPsylHxaXkZ+H07Vj7VprmrPzX6EulfVGX5xceq+ehond81+LT6frqSoGrwmmaM8m9SXCX5PYbQtKVaFWO1B4rl93eZCnTlB4SWAABsMAAAAAeZSAKOXmILeUjHj+2XAAAAAAAAAAAAAAYmMxtOkrzfRLa+iMXSulFS7sc58Ny5v9CM1qkpScpNuT2tlVbryjR7kN8ui+Xy9eBNs1jdTvS3L3M3HaXqVMk9SHC+b6s15UtV60YRc5tRjFNyb2JI5upVnVltTeL+5aLwWCLiEI01hFYIulihWhO7hJSSbV07q6ydnsdndO29NbUyBaR05Wx1aOHpN06M5KNvvSX3pT5KKb1dmWd9230p2poYaKo4aKm4JRWfq4Wys2s5vpzzubnZJrCOHeenBc9N/3fgjHtESxFmti6UPbqQj8U4x+rOVaQ05ia1/SVZW92L1YdNVbfG5r4U7tJLN7EiRC7nh3pei/wBMXV5HY6WPoy9mrSl8M4P6MyTleC0ZhV3sViYRX8Ol62f4pQUox6K/VEl0dp/RmHjq0VNLjqzbfjJ3NE7L/wDPGX/l4euPsZKpxJeCP0+2GBe2pKPWnU/JM22D0hRq/wCFUhPioyTa6raiPKlOH5JryZmpJmSZmC0nUpZRd4+7u8OBiAU6s6ctqDwfEThGa2ZLFEuwGkadVZO0t8Xt8OKM8gUJNNNOzWxraiR6K0tr2hPKe57pfozorDeiqtQq7paPR/D99OBUWmxOHehl7G6ABcEAHm2Z6AAAAAAAAAAB4csz2AADV6X0l6JasfbezkuLMrH4pUoOT6JcXuRDq1WUpOUneT2lVedu7GOxD8n0XHxenqTbHZu0e1LJdTzKTbbbu3tb2tgA5cuy1KtFTjBvvSUpJcVFxUv+cfMg/wBoOlXKaw8X3Y2lUtvk1eKfJJp9ZLgZHajSzoY+hLbGFPvLjGpKSnbnaMWucURDSeJ9JWqVL31pza+Fyer8rFnYrPhJVHlhj54/G9Gic8dxZpVZRd4tptNXW2zVmr81deJ5ALQ0gAAAAAArF2aaya2NZNdHuKHqnOzTsnyaTXintPQSDQ/a/EUrKq/TU/8AU/WLpPf0lfqie6L0nRxENelK63rZKL4SW76Pdc53gNPU45VMDhJx4qlGMvNpp+SJh2fxWj6stahThTq2d4qMac7b8o5Tjs2XWwp7VSSW12ezzTTX39m6EtMSQgArjeSLQulNfuTff+6/eXPmbsgUZNO6dmtj4Mlmisd6WGftrKS+j6P9Tpbrtzqrsqj7yyfFfK9WvBsp7bZlDvxy9jYgAuSvAAAAAAAAAABrtMYr0dNte0+7Hq9/grswqVI04ucsksTKEXOSitTRabxvpKll7Eclze/98jAKHmTOIq1ZVZucs396LcuR0cIKEVFZIq2ejzGIZgZnPvtEotYiE90qSS6xnK/ylEjE6TSjJ7JX1Xx1XaS6rLLhKPFEy7YaQwuIo9yqvS0pexKMoSs+7UjaaWaydv8ARY1nZvAPFYfE4eKvVhqV6CyTcl6urHNpWlF01nldRe4vrJJ9ilJYNbiHUeDxI8e6NKU5asIynL3YRcpeUbs6PoD7O6cUp4uXpJ/woNqmvikrSm+ll1JrhMLTpR1KUI04e7CKivJG9zSNTqLQ41Q7I6Rmrxws18bhTfipyTRlf+h6S/gx6elpf9jsJUx22Ydozi1XsbpGO3DS/DOlL5Rm2anF4KtS/wAWlUp7vWQnDy1krnfij4bt6HaHqqvgfPYO0aT7IYGtfWoxhJ/fperlfjZd2T+JMhmmfs6rwvLDzVaPuStCp4P2ZecehkpJmaqJ5kKPUJNNON1JNarjfWvu1bZ3vssesRQnCThOMoTW2Mk4yXVPM2nZzSOFw8/SVoVJzXsOKg4wyzk7yXe29PonJwi2li+BsW86Por0yo0/TtOrq9+ySz4O2V0rJtZXTsZpYw89aKnZrWSdpK0lfNXW58i+c3LNkuOQMjR2LdOopbtklxjv/XwMcHsJyhJTjmt55KKknF5MncJJq62M9Gn7PYrWp6r2wy/C9n5rwRuDtqFZVqcakdV9Xlkc5UpunNxegABtMAAAAAAARjtJiL1FDdHb1ln9LEnIPjKuvUnLjJ26X/SxUXzV2aCgv7Pot/vgT7vhjUcuC993yWGyiiewcyXIAB4CC9vtDpNYmCybUaq57IT8cov8PMsfZjO2O+KlUXzhL+lE5xuGjUpypz9mcXF9Gtq5rb4EL+znDSjpCUJe1Tp1tbrGcKb8LyLiw1tum4PNe36e4iV44JnVQASSGVPIB4AAACoKFQDmv2tT9Zh1whUf80o/9TUdh9DKtVdWavTpNWW6VTal+FWl4xNv9rcLVMPLjCqv5ZQf9ZINA6PVChTpfeSvPnN5y+bsuSRptdbs6Sis37akuhHFI2IAKUmAAAGdoLEataPCXdfjs+dvMl5AVJrNbVmuq2E6pVFKKktjSfmrnR3JVxhOnwePru6NdSovGGEoy47vQuAAuyuAAAAAALGJnqwlLhGT8lcg6RM9KP1M/hfzyIcc5fb/AJILk+rXwW92ruSfP77gAFIWIAABsMClqeLv++hHsHgfR6YqTS7tbCSknu1o1aEJr/bGX4jdYGp9179nX9/Qv1sMnOnU+9DXV9+pNd5L8UaT/CXdlmnSWHDAraycZvHUyShUobTUAAAAAAVAABFu1WA9NjNHQauoyxFSfKNP0Es+Tkox8SSYpLUd+Hz3FtYdOr6RrNQ1IvetaWtU8Hq0v5Dxj6uWr59NxhXmo023w9zOmnKUUYQAKItAeUwwkeg9Eu0RPWo0+St/K3H8iIko7Pv1C5OX1v8AmW9yyaryjxi+jXyyBeK/iT5/4zagA6YpgAAAAADE0n/gz+FkNJri43hNcYyXmmQhHOX2v5IPk+j/AGW92tbElzPQAKQsQAAChl0ca1lLPnv/ALmKDZCrKDxizGcIz3SNwgWcFUvG29Zfp++RfLqElKKktSrlFxbTKAFTI8KAAAFQWsRU1Yt793X9/Q8k1FNs9SbeCMevjd0V4v8AJGE2VBS1KsqjxkWcKcYZAAGozAAABKOzy9Svil9bEXJboSFqEFyb823+Zb3NF9vJ8Iv3RAvF/wASXP8AxmwAB05TAAAAAAAguJpas5R92TXgnkToinaKhq1FLdNX8Vk/lq+ZT31S2qMZ/wDV9H+8Cwu+eE3Hivb9YmtAKI5ouAVKMqAAAeA94erqu+7f0NqnfYacycHWaut30/sTrFWwexoyLaae7aM5yEUUit57LMhAoVB4AazF1tZ5bFs58y9jcRuWze/yMMr7bW39mvMmWan/AHAARXksoCrB6AADwFEuG0nNClqxiuCS8lYiehqOtWityes/w5r52JfKR0VyUmozqcWl6Y/JU3jPFxjw3+olOxSN9p5jHPP9sul4VoAAAAAANXp3Da9Jte1HvLp95eX0NoDXWpRqwcJZNYffDMzpzcJKS0ICGZml8J6Ko0vZfs/vls8jEOJq05U5uEs1uOjhNTSksmACzVrxiryaS57+i3mMISnJRim28kk234Jb35CUlFYyeCK4ivGEXObUYxTcm9iSOc6e7V1qzcabdOjwTtOfOTWz4V43Nj230hOrGMYJuineb4y+7de6vrbgiGnS2O6pWfvWiOE9E9Fo/F+eGWaeFPaLbGtupSxjxWv37oIaRxWH71CtOC3xTvDrqSvH5HS/sx7Q18Z6f00Yer9FaUYta2v6S6km2rrUWy23Yc0aOhfY9RjGniVdazqQdr5qOo9VtcLuS8CTaqVNxc3FbXHU00pyT2U93AnMm4PLOJcjiI9C7JXyZhVqDWzNfTqQMyQZDxEePyMerXby2L6loHuAI52703VwmHjUpRg5Sqxh302opwnK9k1f2Etu85lW0zjMS261ebh7iepB8nGNlJdbnRvtLpKWBauk/S09W+93d0uLUXJ+BzWEUkktiJtmo02ttxW1jnru9vIj1Zy/HHdwN3oPtHXw7Su50t9OT2L/AEP7r+XI6To/HU61ONSm7xfmnvTW5o46SbsRjqlKcsm6Ml3vjWxx4u2T5W4JGq2XY7TvoR7/AAX9uPBY64+XA2ULYqH/ACPu+33gjowLGHxVOp7EovlvXVPMvnM1KU6U3CompLNNNNeKe/7iXUJxnFSi8U9VvQALuCwzqTUFv2vgt7MYxcpKMc3uPZSUVize9nMNaDqPbLJfCv1d/JG5cTzSgopRSskkkuS2Fw7WzUVRpRprRddeuJzlWo6k3LiAAbzWAAAAAAeZSPQABgaUwSqwt95ZxfPh0ZEZRabTVmsmuDJ6aXTWjNf1kF30s17yX5lNetidSPawXeS3rivlaccuBYWK0bD2JPc+jIXpPSKp5LOb2LclxZHatWUnrSbb4/vYuQxFZzm5Pa35cF4bPAtnd3Nc9O7qOGH8jXelrjqk/wDqnktc3vOWvC8J2upj/VfitPF89eWm4W4mj0poi15Uldb4rNr4eK5G8BPtNlp2iOzPyeqItGvOlLGPnzIUZuhtKVcNWjWpPvLJp7JxftQlydvBpPcbfSOi4z70e7P5S68HzNBXoyg9WSaf7zXFHK2uxVLO8JrGL10fw+TL6z2mFZd3Phr98DuWhtKUsTSjVpPuvan7UJLbCXBr55NZNGccS7MdoKmDq68bypysqtO/tLiuE1d2fhvOy4DG061ONWlJShJXTXzTW5p5NPYyhrUXTfIsqc9rPMuSpRe78ixjKlGjCVWo1GEFeUnd2XTe27JLe2kZNarGEXKclGMU3KTdkks229yOQdsu1EsXPVheOHg+4nk5vZ6SS+i3J8W7eUaTqPkJz2UYPafT08XW12tWnG6pU/cjztlrOybfRbEjUnunTcmlFNt7Eje6P0Oo2lUs3ujuXXi/l1L2yWOdZ7NNblrovvBFdXtMKSxnnw1f3i8DC0Zot1LSldQ+cunBc/LiSGEEkklZLYkeih1VlsdOzRwjnq9X8LkUNe0TrPGWWi4fvmeoTad02mtjWTRv9E6T1+5PKW5+9/cjxWLazTs1mnwa2Mj3pdVC8KXZ1F3v6y1i/LfhxWvjgzbYrdUsk9uGWq0f+Y4ZPPxJqSnQ2B9HHWku/LbyW5fr/Y1/ZzANqNaatdJxi+eetb6efAkp8+u275Um6lZYSyS4cX56cvHd11stamtiD3ceIABdFcAAAAAAAAAAAAADzOVgCIdq+yyq3rUUlV2yhsVTmuE/k/mc+qQcW4yTUk7NNWae9NPYzt8VvZpdP9nKOJV33KlsqkVnyUl95fPg0W9ivN00qdXfHR6r5XVc9xX2qxbffhnw4nKAbLTOg8Rhn6yPcvlUjnF8M/uvk/ma06GE4zjtReK4lRKLi8JLBgt16EZq0kmvp0e4uFT2UVJYPI8TaeKI/jNCyjnTesuD9pfkzI7L9oquCqbHKjJ+tpbHw1o32TXk0rPc1uUjHxWEp1Pbjfg9kl4lHa7lhPHsnhyeXrmuvIs6F5Sjgp7+ev76cyx2z7WSxcvR0rxwyeS2SqyWyUluV9kfF52UdVg9D1J5y7keftPw3ePkbnCYCnT9mOfvPOX9vAyjGx3JCCXavyX+vP0w8xaLylJvs/V/GhYwuEhTVoq3F/efVl4AvYQUFsxWCKxycni3vABmaM0ZWxEtWjBy4y2Qj8Uti6beR7KSitqTwQSbeCzMNsnHZXsg01WxMbb4Un8nNf0+fA23Z3spSw9pz9ZW95ruw+CP5vPpsJMUFtvXaThRy4/HDxz8NbazWHZe1Uz4fIABSlkAAAAAAAAAAAAAAAUbPCjdZlwAAAAFupBNNNJp5NPNNcGiMaW7FYepd026UuSvD+Xd4NLkSsG2lXqUXjTlh96+ZhUpQqLCSxOU6R7I4yldqn6SPGD1v9vtX6JmklBxdpJxlwkmmvB5ncSzXoQmrTjGS4SSa8mWlO+ZrdUjj4bvkgTu2L/CWHjvOJNg61iOzOCntw8Pw3h/xaMOXYrA7oTXSpN/VsmRvmzvNS9F8kd3dU0a6/DOYA6euxWC3wm//pL8mZVHstgo7KCfxSnL/k2HfFn0UvRfIV3VdWuvwcmWbSWbexb30RusB2WxlX/KcI+9Puryfe8kdRw2Ep01anThBcIRUfoZJFqX1J/8cMPHf03f6b4XbFflL03fehDdGdhaMLSrzdV+6rwiutu8/NLkSnD0IxiowioxWSjFJRS5JZGSCqrWirWeNSWPt6ZE+nRhTXcWAABpNgAAAAAAAAAAAAAAAAAAAAAAAABRoJAFQAAAAAAAAAAAAAAAAACiYaKRjYA9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q=="
                    alt=""
                />
                {/*<input placeholder="message....." onChange={(event) => {*/}
                {/*    setMessage(event.target.value)*/}
                {/*}}/>*/}
                <button onClick={sendMessage}>tym</button>
                <h1>Message</h1>
                {messageRec}
            </div>
        </div>
    );
}

export default App;
