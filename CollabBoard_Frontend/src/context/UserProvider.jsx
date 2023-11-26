import { useEffect, useState } from "react";
import { getCurrentUserData, isLoggedIn } from "../services/AuthService";
import { UserContext } from "./UserContext";

const UserProvider = ({children}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        if(!isLoggedIn()) return;

        const data = getCurrentUserData();
        if(data != undefined)
            setUser(data.user);
    }, [])

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider