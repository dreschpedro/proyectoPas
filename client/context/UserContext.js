import React, { createContext, useState} from "react";
import { jwtVerify } from "jose";

export const UserContext = createContext();

const usuario = payload

export const UserProvider = ({ children }) => {
    const [user, serUser] = useState(usuario);

    return (
        <UserContext.Provider value={{
            user,
            serUser
        }}>

            { children }
        </UserContext.Provider>
    )
}
