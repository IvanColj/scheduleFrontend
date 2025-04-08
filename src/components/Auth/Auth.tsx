import styles from './Auth.module.scss'
import {getAuth} from '../Fetch/Staff.tsx';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function Auth({isAuth, setIsAuth, setIsAdmin}) {
    const checkAuth = async () => {
        if (isAuth) {
            localStorage.removeItem('login');
            localStorage.removeItem('password');
        }
        else {
            const isAdminResult = await getAuth()
            setIsAdmin(isAdminResult)
        }
        setIsAuth(!isAuth)
    }
    return (
        <>
            <div>
                <a className={styles.textRight} onClick={checkAuth}>
                    {isAuth ? 'Выйти' : 'Войти'}
                </a>
            </div>
        </>
    )
}

export default Auth;
