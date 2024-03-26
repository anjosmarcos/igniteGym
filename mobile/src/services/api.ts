import { storageAuthTokenGet } from "@storage/storageAuthToken";
import { AppError } from "@utils/appError";
import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
    baseURL: "http://192.168.1.107:3333",   
    timeout: 5000,
}) as APIInstanceProps;


api.registerInterceptTokenManager = signOut => {
    const interceptTokenManager = api.interceptors.response.use(response => response, async(requestError) => {
        if(requestError?.response?.status === 401) {
            if(requestError.response.data?.message === "token.expired" || requestError.response.data?.message === "token.invalid") {
                const {refresh_token} = await storageAuthTokenGet()

                if(!refresh_token) {
                    signOut()
                    return Promise.reject(requestError)
                }
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

