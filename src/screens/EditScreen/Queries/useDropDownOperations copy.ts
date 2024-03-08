
import { Alert } from "react-native";
import { apiCall } from "../../../utils/apiCall";

export interface IDelSizeReq {
    UserId: string;
    subcat_1: any
    mastercat: any;
    catagory: any;
    Datamaster: any;
    SubselectData: any
}

interface IDeleteCatResponse {
    Datamaster: any,
    data: string,
    SubselectData: any
}




export interface IDeleteCatReq {
    UserId: string;
    UserName: string;
    password: string;
    isenglish: boolean;
    CompamyName: string;
    MastercaId: any;
    catagoryId: any;
    isLoading: string,
    data: string,
    isError: string,
    refetch: string,
}


async function sizeDelete(request: IDelSizeReq): Promise<IDeleteCatResponse | null> {
    try {
        const data = {
            do: "deleteCategory",
            userid: request.UserId,
            mastercat: request.mastercat ? request.mastercat : "",
            catagory: request.catagory ? request.catagory : "",
            subcat_1: request.subcat_1 ? request.subcat_1 : ""
        };
        const response: IDeleteCatResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



const useDropDownOperation = () => {
    const deleteSize = async (request: IDelSizeReq) => {
        try {
            const response = await sizeDelete(request)
            return response;
        } catch (error) {

        }
    }
    return { deleteSize }


};



export default useDropDownOperation;
