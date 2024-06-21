import { useState,createContext,useContext } from "react";
import { getUser } from "./sessionStorage/auth";

const UserContext = createContext();

export const UserProvider = ({children}) =>{
    const loggedInUser = getUser();
    const [user, setUser] = useState(loggedInUser);

    return(
        <UserContext.Provider value={{user, setUser}} >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);