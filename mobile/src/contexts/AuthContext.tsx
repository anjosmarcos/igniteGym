import { UserDTO } from "@dtos/UserDTO";
import { createContext, useState } from "react";

export type AuthContentDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => void
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

    function signIn(email: string, password: string){
        setUser({
            id: '',
            name: '',
            email, 
            avatar: ''
        })  
    }

    return (
        <AuthContext.Provider value={{ user, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}