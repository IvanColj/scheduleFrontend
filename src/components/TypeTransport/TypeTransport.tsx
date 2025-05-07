import styles from "./TypeTransport.module.scss";
import TableUser from "../Schedule/TableUser.tsx";
import {useQuery} from "@tanstack/react-query";
import {getBoardNumber, getTypes} from "../Fetch/Transport.tsx";
import {useState, useEffect, useMemo} from "react";
import TableAdmin from "../TableAdmin/TableAdmin.tsx";

type Transport = {
    number: string;
    type: string;
    model: string;
    boardNumber: string;
}

type Transports = {
    list: Transport[];
}

type TypeTransportProps = {
    showTable: string;
    setShowTable: (value: string) => void;
    user: boolean;
    showTableAdminTransport: boolean;
};

function TypeTransport({showTable, setShowTable, user, showTableAdminTransport}: TypeTransportProps) {
    const [hookShowTableAdminTransport, setHookShowTableAdminTransport] = useState(showTableAdminTransport)
    const [selectedBoardNumber, setSelectedBoardNumber] = useState('')
    const [selectedType, setSelectedType] = useState('')

    const showTableClick = (boardNumber: string) => {
        if (user) {
            setShowTable('showTable');
            setHookShowTableAdminTransport(false)
        }
        else {
            setShowTable('showTableAdmin')
            setHookShowTableAdminTransport(true)
        }
        setSelectedBoardNumber(boardNumber)
    }


    const {data: dataTypes, error: errorTypes, isLoading: loadingTypes} = useQuery({
        queryKey: ['allTypes'],
        queryFn: getTypes
    });

    const typesTransports = useMemo(() => {
        return (typeof dataTypes === "object" && dataTypes !== null)
            ? dataTypes as string[]
            : [];
    }, [dataTypes]);

    // Установка selectedType после получения данных
    useEffect(() => {
        if (typesTransports.length > 0) {
            setSelectedType(typesTransports[0]); // Устанавливаем первый тип по умолчанию
        }
    }, [typesTransports]);

    // Получение данных о транспорте на основе выбранного типа
    const {data: dataTransports, error: errorTransports, isLoading: loadingTransports} = useQuery({
        queryKey: ['allTransport', selectedType],
        queryFn: () => getBoardNumber(selectedType),
        enabled: !!selectedType // Запрос выполняется только если selectedType не пустой
    });

    if (loadingTransports || loadingTypes) return <div>Загрузка...</div>;
    if (errorTransports || errorTypes) return <div>Ошибка загрузки данных</div>;

    const transports: Transports = (typeof dataTransports === "object" && dataTransports !== null)
        ? {list: Array.isArray(dataTransports) ? dataTransports : [dataTransports]}
        : {list: []};

    return (
        <>
            {showTable === 'showTable' && user && (
                <>
                    <TableUser transport={selectedBoardNumber}/>
                </>
            )}
            {(showTable === 'showTableAdmin' && !hookShowTableAdminTransport && !user || (showTable === 'notShowTable')) &&  (
                <>
                    <div className={styles.content}>
                        {typesTransports.map((type, index) => (
                            <div key={index} className={`${styles.type} ${selectedType === type ? styles.selected : ""}`}
                                 onClick={() => setSelectedType(type)}>
                                {type}
                            </div>
                        ))}
                    </div>
                    <div className={styles.content}>
                        {transports.list.map((transport, index) => (
                            <div key={index} className={styles.boardNumber}
                                 onClick={() => showTableClick(transport.boardNumber)}>
                                {transport.boardNumber}
                            </div>
                        ))}
                    </div>
                </>
            )}
            {showTable === 'showTableAdmin' && hookShowTableAdminTransport && !user && (
                <TableAdmin transport={selectedBoardNumber}/>
            )}
        </>
    );
}

export default TypeTransport;
