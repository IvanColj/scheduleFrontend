import {useQuery} from "@tanstack/react-query";
import {getSchedulesTime} from "../Fetch/Transport.tsx";
import {useState} from "react";
import stylesPageUpdate from "./PageUpdate.module.scss";
import stylesTransport from "../TypeTransport/TypeTransport.module.scss"
import {Dialog} from "@headlessui/react";

type PageUpdateProps = {
    time: string;
    transport: string;
}

type Stops = {
    route: number;
    stopStart: string;
    stopEnd: string;
    startTime: string;
    endTime: string;
    time: string;
    weekday: boolean;
}

function PageUpdate({time, transport}: PageUpdateProps) {
    const [count, setCount] = useState(0)
    const [insert, setInsert] = useState(false)

    const {data, isLoading, error} = useQuery({
        queryKey: ['', transport],
        queryFn: () => getSchedulesTime(transport, time),
    })


    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка загрузки данных</div>

    const stops: Stops[] = (typeof data === "object" && data !== null)
        ? data as Stops[]
        : [];

    const isFirst = count === 0;
    const isLast = count === stops.length - 1;

    const handleClick = () => {
        if (isLast) {
            setCount(count - 1);
        } else {
            setCount(count + 1);
        }
    };

    return (
        <>
            <div className={stylesPageUpdate.container}>
                <div className={stylesPageUpdate.firstColumn}>
                    <div className={stylesPageUpdate.secondColumn}>
                        <div className={stylesPageUpdate.textWrapper}>
                            <a>Начало</a>
                            <a>Время: {stops[count].startTime}</a>
                            <a>Остановка: {stops[0].stopStart}</a>
                        </div>
                    </div>
                    <div className={stylesPageUpdate.secondColumn}>
                        <div className={stylesPageUpdate.textWrapper}>
                            <a>{count + 1} остановка</a>
                            <a>Время: {stops[count].time}</a>
                            <a>Остановка: {stops[count].stopStart}</a>
                        </div>
                    </div>
                    <div>
                        <div className={stylesPageUpdate.buttons}>
                            <div className={stylesTransport.type} onClick={handleClick}>{isLast ? "Назад" : "Вперёд"}</div>
                            {isLast && <div className={stylesTransport.type} onClick={() => setInsert(true)}>Добавить</div>}
                            <Dialog open={insert} onClose={() => setInsert(false)}>
                                <div className={stylesPageUpdate.bg}>
                                    <Dialog.Panel className={stylesPageUpdate.popup}>
                                        <Dialog.Title>
                                            Добавить остановку в конец пути
                                        </Dialog.Title>
                                        <div></div>
                                        <div className={stylesPageUpdate.input}>
                                            <input type="text" className={stylesPageUpdate.in}/>
                                        </div>
                                        <div className={stylesTransport.type} onClick={() => setInsert(false)}>Закрыть</div>
                                    </Dialog.Panel>
                                </div>
                            </Dialog>
                        </div>
                        {isFirst && <a>Это первая остановка</a>}
                        {isLast && <a>Это последняя остановка</a>}
                    </div>
                </div>
                <div className={stylesPageUpdate.secondColumn}>
                    <div className={stylesPageUpdate.textWrapper}>
                        <a>Конец</a>
                        <a>Время: {stops[count].endTime}</a>
                        <a>Остановка: {stops[stops.length - 1].stopEnd}</a>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PageUpdate;
