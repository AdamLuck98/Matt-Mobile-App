import { apiCall } from "../../../utils/apiCall";

export interface ISetLocReq {
    userid: string;
    location: string;
}

interface ISetLocResponse {
    data: string,
}


async function locationSet(request: ISetLocReq): Promise<ISetLocResponse | null> {
    try {
        const response: ISetLocResponse = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



const useSetLocations = () => {

    const setLocations = async (request: ISetLocReq) => {
        try {
            const response = await locationSet(request)
            return response;
        } catch (error) {
            console.log("error", error)
        }
    }
    return { setLocations }
}


export default useSetLocations;