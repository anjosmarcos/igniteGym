import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { createContext, useEffect, useState } from "react";

import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser"
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { useRoute } from "@react-navigation/native";

export type AuthContentDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    updateUserProfile: (userUpDate: UserDTO) => Promise<void>;
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

    async function userAndTokenUpdate(userData: UserDTO, token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser(userData)
    }

    async function storageUserAndTokenSave(user: UserDTO, token: string, refresh_token: string) {
        try {
            setIsLoadingStorageData(true)

            await storageUserSave(user)
            await storageAuthTokenSave({ token, refresh_token })

        } catch (error) {
            throw error
        } finally {
            setIsLoadingStorageData(false)
        }
    }

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', { email, password })

            console.log(data)
            if (data.user && data.token && data.refresh_token) {
                await storageUserAndTokenSave(data.user, data.token, data.refresh_token)
                userAndTokenUpdate(data.user, data.token)
            }
        }
        catch (error) {
            throw error
        } finally {
            setIsLoadingStorageData(false)
        }
    }

    async function signOut() {
        try {
            setIsLoadingStorageData(true)
            setUser({} as UserDTO)

            await storageUserRemove()
            await storageAuthTokenRemove()

        } catch (error) {
            throw error
        } finally {
            setIsLoadingStorageData(false)
        }
    }

    async function updateUserProfile(userUpDate: UserDTO) {
        try {
            setUser(userUpDate)
            await storageUserSave(userUpDate)
        } catch (error) {
            throw error
        }
    }

    async function loadUserData() {
        try {
            setIsLoadingStorageData(true)

            const userLogged = await storageUserGet()
            const { token } = await storageAuthTokenGet()

            if (token && userLogged) {
                userAndTokenUpdate(userLogged, token)
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

    useEffect(() => {
        const subscribe = api.registerInterceptTokenManager(signOut)

        return () => {
            subscribe()
        }
    }, [signOut]);

    return (
        <AuthContext.Provider value={{ user, signIn, isLoadingStorageData, signOut, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    )
}