import { UserDTO } from "@dtos/UserDTO";
import { createContext } from "react";

export type AuthContentDataProps = {
    user: UserDTO;
}

type AuthContentProviderProps = {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContentDataProps>({} as AuthContentDataProps)

export function AuthContextProvider({ children }: AuthContentProviderProps) {
    return (
        <AuthContext.Provider value={{
            user: {
                id: '1',
                name: 'Marcos Alexandre',
                email: 'marcos@gmail.com',
                avatar: 'marcos.png'
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}