import styles from "./TypeTransport.module.scss";
import Table from "../Schedule/Table.tsx";
import {useQuery} from "@tanstack/react-query";
import {getBoardNumber, getTypes} from "../Fetch/Transport.tsx";
import {useState} from "react";

type Transport = {
    number: string;
    type: string;
    model: string;
    boardNumber: string;
}

type Transports = {
    list: Transport[];
}
function TypeTransport() {
    const [showTable, setShowTable] = useState(false);
    const [selectedBoardNumber, setSelectedBoardNumber] = useState('');
    const [selectedType, setSelectedType] = useState('Автобус');

    const showTableClick = (boardNumber: string) => {
        setSelectedBoardNumber(boardNumber);
        setShowTable(true);
    }

    const selectType = (type: string) => {
        setSelectedType(type);
    }

    const showTransports = () => {
        setShowTable(false);
    }

    const {data: dataTransports, error: errorTransports, isLoading: loadingTransports} = useQuery({
        queryKey: ['allTransport', selectedType],
        queryFn: () => getBoardNumber(selectedType)
    });

    const {data: dataTypes, error: errorTypes, isLoading: loadingTypes} = useQuery({
        queryKey: ['allTypes'],
        queryFn: getTypes
    })

    if (loadingTransports || loadingTypes) return <div>Загрузка...</div>;
    if (errorTransports || errorTypes) return <div>Ошибка загрузки данных</div>;

    const typesTransports = (typeof dataTypes === "object" && dataTypes !== null)
        ? dataTypes as string[]
        : [];

    const transports: Transports = (typeof dataTransports === "object" && dataTransports !== null)
        ? {list: Array.isArray(dataTransports) ? dataTransports : [dataTransports]}
        : {list: []};

    return (
        <>
            {showTable ? (
                <>
                    <Table transport={selectedBoardNumber}/>
                    <a className={styles.textLeft} onClick={showTransports}>Назад</a>
                </>
            ) : (<>
                    <div className={styles.content}>
                        {typesTransports.map((type, index) => (
                            <div key={index} className={styles.type}
                                 onClick={() => selectType(type)}>
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
        </>
    )
}


export default TypeTransport;
