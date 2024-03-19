import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { createContext, useEffect, useState } from "react";

import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser"

export type AuthContentDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    isLoadingStorageData: boolean
    signOut: () => Promise<void>;
}

type AuthContentProviderProps = {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContentDataProps>({} as AuthContentDataProps)

export function AuthContextProvider({ children }: AuthContentProviderProps) {
    const [user, setUser] = useState({} as UserDTO)
    const [isLoadingStorageData, setIsLoadingStorageData] = useState(true)

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', { email, password })

            if (data.user) {
                setUser(data.user)
                storageUserSave(data.user)
            }
        }
        catch (error) {
            throw error
        }
    }

    async function signOut(){
        try {
            setIsLoadingStorageData(true)
            setUser({} as UserDTO)

            await storageUserRemove()

        } catch (error) {
            throw error
        } finally {
            setIsLoadingStorageData(false)
        }
    }

    async function loadUserData() {
        try {
            const userLogged = await storageUserGet()
            if (userLogged) {
                setUser(userLogged)
                setIsLoadingStorageData(false)
            }

        } catch (error) {
            throw error
        } finally {
            setIsLoadingStorageData(false)
        }
    }

    useEffect(() => {
        loadUserData()
    }, [])

    return (
        <AuthContext.Provider value={{ user, signIn, isLoadingStorageData, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}