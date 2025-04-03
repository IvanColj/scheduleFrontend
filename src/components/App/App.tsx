import styles from './App.module.scss';
import React, { useState, useRef } from 'react';

function App() {

    const [auth, setAuth] = useState({
        login: '',
        password: '',
    });

    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const toBase64 = (str: string) => {
        return window.btoa(str);
    };

    const fetchStaffs = (e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
        if (e) e.preventDefault();
        const { login, password } = auth;

        const base64Credentials = toBase64(`${login}:${password}`);
        const URL = 'http://localhost:8080/api/staff/login/' + auth.login
        fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64Credentials}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 403) {
                        console.clear();
                        alert('У вас недостаточно прав');
                        return;
                    } else {
                        throw new Error(`Ошибка авторизации: ${res.statusText}`);
                    }
                }
                return res.json();
            })
            .then((json) => {
                console.log(json);
            })
            .catch(() => {
            });
    };


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (e.currentTarget.name === 'login') {
                passwordRef.current?.focus();
            } else if (e.currentTarget.name === 'password') {
                submitButtonRef.current?.click();
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuth((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>

            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.input}>
                        <input
                            type="text"
                            className={styles.in}
                            name="login"
                            ref={loginRef}
                            value={auth.login}
                            onKeyDown={handleKeyPress}
                            onChange={handleInputChange}
                        />
                        <div className={styles.labelLine}>Логин</div>
                    </div>
                    <div className={styles.input}>
                        <input
                            type="password"
                            className={styles.in}
                            name="password"
                            ref={passwordRef}
                            value={auth.password}
                            onKeyDown={handleKeyPress}
                            onChange={handleInputChange}
                        />
                        <div className={styles.labelLine}>Пароль</div>
                    </div>
                    <button
                        className={styles.btn}
                        ref={submitButtonRef}
                        onClick={fetchStaffs}
                    >
                        Войти
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
