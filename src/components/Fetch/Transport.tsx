export const getTypes = async () => {
    const response = await fetch(`http://localhost:8080/api/transport/type`)
    return response.json();
}

export const getBoardNumber = async (type: string) => {
    const response = await fetch(`http://localhost:8080/api/transport/type/${type}`)
    return response.json();
}

export const getSchedules = async (boardNumber: string) => {
    const response = await fetch(`http://localhost:8080/api/transport/schedules/${boardNumber}`)
    return response.json();
}
