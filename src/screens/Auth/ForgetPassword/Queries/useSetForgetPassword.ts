import { Platform } from "react-native";
import { apiCall } from "../../../../utils/apiCall";

export interface ISetForgwtPasswordReq {
    FirstName: string;
    PrePhone: string;
    CellPhone: string;
}

interface IForgetPasswordResponse {
    data: any,
}

export interface IDeleteCatReq {
    data: any;
}

async function setPassword(request: ISetForgwtPasswordReq): Promise<IForgetPasswordResponse | null> {
    try {
        const response: IForgetPasswordResponse = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



const useSetForgetPassword = () => {
    const setNewPassword = async (request: ISetForgwtPasswordReq) => {
        try {
            const response = await setPassword(request)
            return response;
        } catch (error) {

        }
    }
    return { setNewPassword }

};



export default useSetForgetPassword;
