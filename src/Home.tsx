import Auth from "./components/Auth/Auth.tsx";
import App from "./components/App/App.tsx";
import {useState} from "react";
import Users from "./components/query/Users.tsx";

function Home() {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [isQuery, setIsQuery] = useState<boolean>(false)
    return (
        <>
            {isAuth ?
                <App />
                : null}
            {isQuery ?
                <Users />
                : null
            }
            <Auth isAuth={isAuth} setIsAuth={setIsAuth} isQuery={isQuery} setIsQuery={setIsQuery}/>
        </>
    )
}

export default Home;
