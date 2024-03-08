import { apiCall } from "../../../utils/apiCall";

export interface ISetSIzeReq {
    userid: string;
    size: string;
}

interface ISetSizeResponse {
    data: string,
}


async function SizeSet(request: ISetSIzeReq): Promise<ISetSizeResponse | null> {
    try {
        const response: ISetSizeResponse = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



const useSetSize = () => {

    const setSize = async (request: ISetSIzeReq) => {
        try {
            const response = await SizeSet(request)
            return response;
        } catch (error) {
            console.log("error", error)
        }
    }
    return { setSize }
}


export default useSetSize;