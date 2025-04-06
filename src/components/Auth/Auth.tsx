import styles from './Auth.module.scss'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function Auth({isAuth, setIsAuth}) {
    return (
        <>
            <div>
                <a className={styles.textRight} onClick={() => setIsAuth(!isAuth)}>
                    {isAuth ? 'Выйти' : 'Войти'}
                </a>
            </div>
        </>
    )
}

export default Auth;
