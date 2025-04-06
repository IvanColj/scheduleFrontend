// import styles from './Users.module.scss'
import {useQuery} from "@tanstack/react-query"
import {getLogin} from "../Fetch/Staff.tsx"

type User = {
    id: number;
    login: string;
};

function Users() {

    const {data, error, isSuccess} = useQuery({
        queryKey: ['allUsers'],
        queryFn: getLogin
    })

    console.log(error, isSuccess)

    return (
        <>
            {data?.length ? (
                data.map((user: User) => <div key={user.id}>{user.login}</div>)
            ) : (
                <div>Not Found</div>
            )}
        </>
    )
}

export default Users;
