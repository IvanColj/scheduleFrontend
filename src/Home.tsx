import Auth from "./components/Auth/Auth.tsx";
import App from "./components/App/App.tsx";
import TypeTransport from "./components/TypeTransport/TypeTransport.tsx";
import {useState} from "react";

function Home() {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    return (
        <>
            {isAuth ?
                <App />
                : <TypeTransport />}
            <Auth isAuth={isAuth} setIsAuth={setIsAuth}/>
        </>
    )
}

export default Home;
