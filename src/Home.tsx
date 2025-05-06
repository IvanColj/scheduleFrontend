import Auth from "./components/Auth/Auth.tsx";
import App from "./components/App/App.tsx";
import TypeTransport from "./components/TypeTransport/TypeTransport.tsx";
import {useState} from "react";
import styles from "./components/Auth/Auth.module.scss";
import icon from "./components/images/Иконка.png";

function Home() {
    const [isAuth, setIsAuth] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [showTable, setShowTable] = useState('notShowTable');
    const handleClick = () => {
        setShowTable('notShowTable')
        setIsAuth(false)
    }

    return (
        <>
            {isAuth ? <App isAdmin={isAdmin} setIsAdmin={setIsAdmin} showTable={showTable} setShowTable={setShowTable} /> : <TypeTransport showTable={showTable} setShowTable={setShowTable} user={true} showTableAdminTransport={false}/>}
            <Auth isAuth={isAuth} setIsAuth={setIsAuth} setIsAdmin={setIsAdmin} />
            <img className={styles.textLeft} src={icon} alt={'Иконка'} onClick={handleClick}/>
        </>
    )
}

export default Home;
