export const getLogin = async () => {
    const response = await fetch('http://localhost:8080/api/staff/all')
    return response.json();
}
