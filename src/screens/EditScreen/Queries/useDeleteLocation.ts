
import { apiCall } from "../../../utils/apiCall";

export interface IDelLocationReq {
    UserId: string;
    location: string;
}

interface IDeleteLocationResponse {
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


async function locationDelete(request: IDelLocationReq): Promise<IDeleteLocationResponse | null> {
    try {
        const data = {
            do: "DelLocation",
            userid: request.UserId,
            location: request.location,
        };
        const response: IDeleteLocationResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



const useDropDownDelLocation = () => {
    const deleteLocationData = async (request: IDelLocationReq) => {
        try {
            const response = await locationDelete(request)
            return response;
        } catch (error) {
        }
    }
    return { deleteLocationData }


};

export default useDropDownDelLocation;