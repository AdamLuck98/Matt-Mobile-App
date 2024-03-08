import { useQuery } from "react-query";
import { config } from "../../../config";
import { apiCall } from "../../../utils/apiCall";
import { QueryKeys } from "../../../utils/QueryKeys";

export interface IDelLocReq {
    userid: string;
    location: string;
}

interface IDelLocResponse {
    data: string,
}


async function locationSet(request: IDelLocReq): Promise<IDelLocResponse | null> {
    try {
        const response: IDelLocResponse = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



const useDeleteLocations = () => {

    const deleteLocations = async (request: IDelLocReq) => {
        try {
            const response = await locationSet(request)
            return response;
        } catch (error) {
        }
    }
    return { deleteLocations }
}


export default useDeleteLocations;