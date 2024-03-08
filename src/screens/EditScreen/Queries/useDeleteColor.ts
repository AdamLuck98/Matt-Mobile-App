
import { Alert } from "react-native";
import { apiCall } from "../../../utils/apiCall";

export interface IDelColorReq {
    UserId: string;
    supplier: string;
}

interface IDeleteColorResponse {
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


async function colorDelete(request: IDelColorReq): Promise<IDeleteColorResponse | null> {
    try {
        const data = {
            do: "DelColor",
            userid: request.UserId,
            supplier: request.supplier,
        };
        const response: IDeleteColorResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



const useDropDownDelColor = () => {
    const deleteColorData = async (request: IDelColorReq) => {
        try {
            const response = await colorDelete(request)
            return response;
        } catch (error) {
            console.log('this is errr>>>', error)
        }
    }
    return { deleteColorData }


};

export default useDropDownDelColor;