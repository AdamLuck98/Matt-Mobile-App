
import { Platform } from "react-native";
import { apiCall } from "../../../utils/apiCall";

export interface IDelSizeReq {
    UserId: string;
    subcat_1: any;
    subcat_2: any
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
            osname: Platform.OS === "android" ? "and" : "ios",
            mastercat: request.mastercat ? request.mastercat : "",
            subcat_1: request.subcat_1 ? request.subcat_1 : "",
            subcat_2: request.subcat_2 ? request.subcat_2 : "",
        };
        // console.log('delete req>>', JSON.stringify(request, null, 2))
        const response: IDeleteCatResponse = await apiCall(data);
        // console.log('delete res>>', JSON.stringify(response, null, 2))
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useDropDownOperation = () => {
    const deleteSize = async (request: IDelSizeReq) => {
        // console.log('request>>',JSON.stringify(request,null,2))
        try {
            const response = await sizeDelete(request)
            // console.log('response>>',JSON.stringify(response,null,2))
            return response;
        } catch (error) {

        }
    }
    return { deleteSize }


};

export default useDropDownOperation;
