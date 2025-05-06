import styles from "../TypeTransport/TypeTransport.module.scss";
import {useQuery} from "@tanstack/react-query";
import {getStarts} from "../Fetch/Transport.tsx";
import {useState} from "react";
import PageUpdate from "../PageUpdate/PageUpdate.tsx";

function TableAdmin({transport}: { transport: string }) {
    const [showPageUpdate, setShowPageUpdate] = useState(false);
    const [time, setTime] = useState('');
    const {data, error, isLoading} = useQuery<string[]>({
        queryKey: ['allStart', transport],
        queryFn: () => getStarts(transport)
    })
    const funShowPageUpdate = (selectTime: string) => {
        setShowPageUpdate(!showPageUpdate);
        setTime(selectTime);
    }

    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка загрузки данных</div>
    return (
        <>
            <div className={styles.content}>
                {showPageUpdate ? (
                    <PageUpdate time={time} transport={transport} />
                ) : (
                    (data ?? []).map((start: string) => (
                        <div
                            key={start}
                            className={styles.type}
                            onClick={() => funShowPageUpdate(start)}
                        >
                            {start}
                        </div>
                    ))
                )}
            </div>

        </>
    )
}

export default TableAdmin;
