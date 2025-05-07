import {useQuery} from "@tanstack/react-query";
import {getSchedulesTime} from "../Fetch/Transport.tsx";
import {getStopStartEnd, saveStop} from "../Fetch/Stop.tsx";
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

type StopsAdd = {
    stage: number;
    stopStart: string;
    stopEnd: string;
    weekday: string;
    weekend: string;
}

type StopData = {
    orderNum: number;
    number: number;
    route: number;
}

function PageUpdate({time, transport}: PageUpdateProps) {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Остановки")
    const [count, setCount] = useState(0)
    const [insert, setInsert] = useState(false)
    const [stopData, setStopData] = useState<StopData>();

    const {data: dataStops, isLoading: isLoadingStops, error: errorStops} = useQuery({
        queryKey: ['', transport],
        queryFn: () => getSchedulesTime(transport, time),
    })

    const {data: dataStopsAdd, isLoading: isLoadingStopsAdd, error: errorStopsAdd} = useQuery({
        queryKey: ['stopAdd'],
        queryFn: () => getStopStartEnd(stops[stops.length - 1].stopEnd),
    })

    const {isLoading} = useQuery({
        queryKey: ['stopData', stopData],
        queryFn: () => saveStop(stopData!),
        enabled: Boolean(stopData),
        });

    if (isLoading) return <div>Загрузка...</div>

    if (isLoadingStops) return <div>Загрузка...</div>
    if (errorStops) return <div>Ошибка загрузки данных</div>

    const stops: Stops[] = (typeof dataStops === "object" && dataStops !== null)
        ? dataStops as Stops[]
        : [];


    if (isLoadingStopsAdd) return <div>Загрузка...</div>
    if (errorStopsAdd) return <div>Ошибка загрузки данных</div>

    const stopsAdd: StopsAdd[] = (typeof dataStopsAdd === "object" && dataStopsAdd !== null)
        ? dataStopsAdd as StopsAdd[]
        : [];
    const options = stopsAdd.map(stop => stop.stopEnd);

    const isFirst = count === 0;
    const isLast = count === stops.length - 1;

    const toggleOpen = () => setOpen(!open);

    const onSelect = (option: string) => {
        setSelected(option);
        setOpen(false);
    };

    const handleNext = () => {
        if (!isLast) setCount(count + 1);
    };

    const handlePrev = () => {
        if (!isFirst) setCount(count - 1);
    };

    const saveStopClick = () => {
        console.log(stopsAdd[0]);
        console.log(stops[0]);
        setStopData({
            orderNum: stops.length + 1,
            number: stopsAdd[0].number,
            route: stops[0].number
        });
    };

    const dropdowns = document.getElementsByClassName("dropdown");

    Array.from(dropdowns).forEach(dropdown => {
        const select = dropdown.querySelector<HTMLElement>(".select");
        const caret = dropdown.querySelector<HTMLElement>(".caret");
        const menu = dropdown.querySelector<HTMLElement>(".menu");
        const options = menu?.querySelectorAll<HTMLLIElement>("li");
        const selected = select?.querySelector<HTMLElement>(".selected");

        if (!select || !caret || !menu || !options || !selected) return;

        select.addEventListener("click", () => {
            select.classList.toggle("select-clicked");
            caret.classList.toggle("caret-rotate");
            menu.classList.toggle("menu-open");
        });

        options.forEach(option => {
            option.addEventListener("click", () => {
                selected.innerText = option.innerText;
                select.classList.remove("select-clicked");
                caret.classList.remove("caret-rotate");
                menu.classList.remove("menu-open");

                options.forEach(opt => opt.classList.remove("active"));
                option.classList.add("active");
            });
        });
    });


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
                            <button className={stylesTransport.type} onClick={handlePrev} disabled={isFirst}>
                                Назад
                            </button>
                            <button className={stylesTransport.type} onClick={handleNext} disabled={isLast}>
                                Вперёд
                            </button>
                            {isLast && <div className={stylesTransport.type} onClick={() => setInsert(true)}>Добавить</div>}
                            <Dialog open={insert} onClose={() => setInsert(false)}>
                                <div className={stylesPageUpdate.bg}>
                                    <Dialog.Panel className={stylesPageUpdate.popup}>
                                        <Dialog.Title>
                                            Добавить остановку в конец пути
                                        </Dialog.Title>
                                        <div className={stylesPageUpdate.box}>
                                            <div className={stylesPageUpdate.dropdown}>
                                                <div
                                                    className={`${stylesPageUpdate.select} ${open ? stylesPageUpdate["select-clicked"] : ""}`}
                                                    onClick={toggleOpen}
                                                >
                                                    <span className={stylesPageUpdate.selected}>{selected}</span>
                                                    <div className={`${stylesPageUpdate.caret} ${open ? stylesPageUpdate["caret-rotate"] : ""}`}></div>
                                                </div>
                                                <ul className={`${stylesPageUpdate.menu} ${open ? stylesPageUpdate["menu-open"] : ""}`}>
                                                    {options.map((option, idx) => (
                                                        <li
                                                            key={idx}
                                                            className={option === selected ? stylesPageUpdate.active : ""}
                                                            onClick={() => onSelect(option)}
                                                        >
                                                            {option}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className={stylesPageUpdate.type} onClick={saveStopClick}>Добавить</div>
                                            <div className={stylesPageUpdate.type} onClick={() => setInsert(false)}>Закрыть</div>
                                        </div>
                                    </Dialog.Panel>
                                </div>
                            </Dialog>
                        </div>
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
