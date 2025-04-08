import styles from "./Table.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getSchedules } from "../Fetch/Transport.tsx";

type Stop = {
    stop: string;
    time: string;
};

type IncomingData = {
    [routeId: string]: Stop[];
};

function Table({ transport }: { transport: string }) {
    const { data, error, isLoading } = useQuery({
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

    return (
        <>
            {Object.entries(schedules).map(([routeId, stops]) => {
                const stopNames = stops.map(stop => stop.stop);
                const times = stops.map(stop => stop.time);

                return (
                    <div className={styles.container} key={routeId}>
                        <div className={styles.content}>
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

export default Table;
