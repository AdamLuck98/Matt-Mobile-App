
import { apiCall } from "../../../utils/apiCall";

export interface IDelSizeReq {
    UserId: string;
    supplier: string;
}

interface IDeleteSizeResponse {
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


async function sizeDelete(request: IDelSizeReq): Promise<IDeleteSizeResponse | null> {
    try {
        const data = {
            do: "DelSize",
            userid: request.UserId,
            supplier: request.supplier,
        };
        const response: IDeleteSizeResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



const useDropDownDelSize = () => {
    const deleteSizeData = async (request: IDelSizeReq) => {
        try {
            const response = await sizeDelete(request)
            return response;
        } catch (error) {
            console.log('this is errr>>>', error)
        }
    }
    return { deleteSizeData }


};

export default useDropDownDelSize;