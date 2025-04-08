export const getAll = async () => {
    const response = await fetch('http://localhost:8080/api/staff/all')
    return response.json();
}

const toBase64 = (str: string) => {
    return window.btoa(str);
};

export const getAuth = async (): Promise<boolean> => {
    const savedLogin = localStorage.getItem('login');
    const savedPassword = localStorage.getItem('password');
    if (!savedLogin || !savedPassword) return false;

    const base64Credentials = toBase64(`${savedLogin}:${savedPassword}`);
    const URL = 'http://localhost:8080/api/staff/login/' + savedLogin;

    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64Credentials}`,
            },
        });

        if (!response.ok) {
            console.clear()
            return false;
        }
        return true;
    } catch {
        return false;
    }
};

