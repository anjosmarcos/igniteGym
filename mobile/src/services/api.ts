import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";
import { AppError } from "@utils/appError";
import axios, { AxiosError, AxiosInstance } from "axios";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: SignOut) => () => void
}

type PromiseType = {
    onSuccess: (token: string) => void;
    onFailure: (error: AxiosError) => void;
};


const api = axios.create({
    baseURL: "http://192.168.1.107:3333",   
    timeout: 5000,
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = []
let isRefreshing: boolean = false

api.registerInterceptTokenManager = signOut => {
    const interceptTokenManager = api.interceptors.response.use(response => response, async(requestError) => {
        if(requestError?.response?.status === 401) {
            if(requestError.response.data?.message === "token.expired" || requestError.response.data?.message === "token.invalid") {
                const {refresh_token} = await storageAuthTokenGet()

                if(!refresh_token) {
                    signOut()
                    return Promise.reject(requestError)
                }

                const originalRequestConfig = requestError.config

                if(isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            onSuccess: (token: string) => {
                                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` };
                                resolve(api(originalRequestConfig));
                            },
                            onFailure: (error: AxiosError) => {
                                reject(error)
                            }
                        })
                    })
                }

                isRefreshing = true

                return new Promise(async(resolve, reject) => {
                    try {
                        const {data} = await api.post('/sessions/refresh-token', {refresh_token}) 
                        await storageAuthTokenSave({
                            token: data.token,
                            refresh_token: data.refresh_token
                        })

                    } catch (error: any) {
                        failedQueue.forEach(request => {
                            request.onFailure(error)
                        })

                        signOut()
                        return reject(error)
                    } finally {
                        isRefreshing = false
                        failedQueue = []
                    }
                })
            }

            signOut()
        }


        if (requestError.response && requestError.response.data) {
            return Promise.reject(new AppError(requestError.response.data.message));
        } else {
            return Promise.reject(requestError);
        }
    })

    return () => {
        api.interceptors.response.eject(interceptTokenManager)
    }
}

api.interceptors.response.use(response => response, (error) => {
    if(error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message));
    } else {
        return Promise.reject(error);
    }
});


export { api }

