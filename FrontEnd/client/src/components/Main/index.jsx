import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Main = () => {
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }
    
    const [ users , setUser ] = useState([]);
    

    useEffect(() => {
        traerUsuarios();
    }, [])
    

    const traerUsuarios = async () => {
            const response = await axios.get("http://localhost:8080/api/users/fetchdata")
            console.log(response.data);
            setUser(response.data);
};

    
    
    return (
        <div className={styles.main__container}>
            <nav className={styles.navbar}></nav>
            <h1>Users List</h1>
            {users.map(( user ) => (<li key={user.id}>{user.email}</li>))}
            <button className={styles.white_btn} onClick={handleLogout}>Logout</button>
        </div>
    )
}


export default Main;