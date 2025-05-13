import styles from "./TableUser.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getSchedules } from "../Fetch/Transport.tsx";
import {SetStateAction, useState} from "react";

type Stop = {
    stop: string;
    time: string;
    weekday: boolean;
};

type IncomingData = {
    [routeId: string]: Stop[];
};

function TableUser({transport}: { transport: string }) {
    const [searchTerm, setSearchTerm] = useState('');
    const {data, error, isLoading} = useQuery({
        queryKey: ['allSchedule', transport],
        queryFn: () => getSchedules(transport)
    });

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка загрузки данных</div>;

    const schedules: IncomingData = (typeof data === "object" && data !== null)
        ? data as IncomingData
        : {};

    if (Object.keys(schedules).length === 0) {
        return <div className={styles.text}>Расписания для данного транспорта пока отсутствуют</div>;
    }

    const handleSearch = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
    };

    function normalizeString(str: string) {
        return str
            .toLowerCase()
            .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
            .trim();
    }

    const filteredSchedules = Object.entries(schedules)
        .filter(([, stops]) => {
            const normalizedSearch = normalizeString(searchTerm);
            return stops.some(stop =>
                normalizeString(stop.stop).includes(normalizedSearch)
            );
        });


    return (
        <>
            <div className={styles.input}>
                <input
                    type="text"
                    className={styles.in}
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className={styles.labelLine}>Поиск остановки</div>
            </div>
            {filteredSchedules.map(([routeId, stops]) => {
                const stopNames = stops.map(stop => stop.stop);
                const times = stops.map(stop => stop.time);
                const weekday = stops[0].weekday;
                return (
                    <div className={styles.container} key={routeId}>
                        <div className={styles.content}>
                            {weekday ? (<a  className={styles.text}>Будни</a>) : (<a  className={styles.text}>Выходные</a>)}
                            <table className={styles.table}>
                                <thead className={styles.thead}>
                                <tr className={styles.tr}>
                                    {stopNames.map((name, index) => (
                                        <th key={index} className={styles.th}>{name}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className={styles.tbody}>
                                <tr className={styles.tr}>
                                    {times.map((time, index) => (
                                        <td key={index} className={styles.td}>{time}</td>
                                    ))}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default TableUser;
