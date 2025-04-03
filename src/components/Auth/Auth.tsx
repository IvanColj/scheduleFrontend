import styles from './Auth.module.scss'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function Auth({isAuth, setIsAuth, isQuery, setIsQuery}) {
    return (
        <>
            <div>
                <a className={styles.textRight} onClick={() => setIsAuth(!isAuth)}>
                    {isAuth ? 'Выйти' : 'Войти'}
                </a>
                <a className={styles.textLeft} onClick={() => setIsQuery(!isQuery)}>
                    {isQuery ? 'Незапрос' : 'Запрос'}
                </a>
            </div>
        </>
    )
}

export default Auth;
