type StopData = {
    orderNum: number,
    number: number,
    route: number
};

export const getStopStartEnd = async (stop: string) => {
    const response = await fetch(`http://localhost:8080/api/stop/startEnd/${encodeURIComponent(stop)}`)
    return response.json();
}

export const saveStop = async (stopData: StopData) => {
    const response = await fetch('http://localhost:8080/api/stages/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stopData)
    });

    if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    return response.json();
};

export const stopDelete = async (stopData: StopData) => {
    const response = await fetch(`http://localhost:8080/api/stages/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stopData)
    });
    return response.json();
};


