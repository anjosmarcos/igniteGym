import { UserDTO } from "@dtos/UserDTO";
import { createContext, useState } from "react";

export type AuthContentDataProps = {
    user: UserDTO;
}

type AuthContentProviderProps = {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContentDataProps>({} as AuthContentDataProps)

export function AuthContextProvider({ children }: AuthContentProviderProps) {
    const [user, setUser] = useState({
        id: '1',
        name: 'Marcos Alexandre',
        email: 'marcos@gmail.com',
        avatar: 'marcos.png'
    })
    return (
        <AuthContext.Provider value={{ user: user }}>
            {children}
        </AuthContext.Provider>
    )
}