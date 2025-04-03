// import styles from './Users.module.scss'
import {useQuery} from "@tanstack/react-query";

const getData = async () => {
    const response = await fetch('http://localhost:8080/api/staff/all')
    return response.json();
}

type User = {
    id: number;
    login: string;
};

function Users() {

    const {data, error, isSuccess} = useQuery({
        queryKey: ['allUsers'],
        queryFn: getData
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
