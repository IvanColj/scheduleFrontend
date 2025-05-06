import styles from "../AdminMain/AdminMain.module.scss";
import TypeTransport from "../TypeTransport/TypeTransport.tsx";
import Exits from "../Exits/Exits.tsx";
import {useState} from "react";
import Routes from "../Routes/Routes.tsx";
import Stops from "../Stops/Stops.tsx";
import Intervals from "../Intervals/Intervals.tsx";
import Drivers from "../Drivers/Drivers.tsx";

type ShowTable = {
    showTable: string;
    setShowTable: (value: string) => void;
};

function AdminMain({showTable, setShowTable}: ShowTable) {
    const [page, setPage] = useState('transport');
    const login = localStorage.getItem('login');
    return (
        <>
            <div className={styles.main}>
                <div className={styles.rectangle}>
                    <div className={styles.login}>
                        <span className={styles.text}>{login}</span>
                    </div>
                    <div className={styles.textBlock}>
                        <span className={styles.text} onClick={() => setPage('exits')}>Выезды</span>
                        <span className={styles.text} onClick={() => setPage('routes')}>Маршруты</span>
                        <span className={styles.text} onClick={() => setPage('drivers')}>Водители</span>
                        <span className={styles.text} onClick={() => {
                            setPage('')
                            setTimeout(() => setPage('transport'), 0)
                        }}>Транспорт</span>
                        <span className={styles.text} onClick={() => setPage('intervals')}>Промежутки</span>
                        <span className={styles.text} onClick={() => setPage('stops')}>Остановки</span>
                    </div>
                </div>
                <div className={styles.transport}>
                    {page === 'exits' && <Exits />}
                    {page === 'routes' && <Routes />}
                    {page === 'drivers' && <Drivers />}
                    {page === 'transport' && <TypeTransport showTable={showTable} setShowTable={setShowTable} user={false} showTableAdminTransport={false}/>}
                    {page === 'intervals' && <Intervals />}
                    {page === 'stops' && <Stops />}
                </div>
            </div>
        </>
    )
}

export default AdminMain;
