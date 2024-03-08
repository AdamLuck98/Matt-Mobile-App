import { apiCall } from "../../../utils/apiCall";

export interface ISetColorReq {
    userid: string;
    color: string;
}

interface ISetColorResponse {
    data: string,
}


async function ColorSet(request: ISetColorReq): Promise<ISetColorResponse | null> {
    try {
        const response: ISetColorResponse = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}


const useSetColor = () => {

    const setColor = async (request: ISetColorReq) => {
        try {
            const response = await ColorSet(request)
            return response;
        } catch (error) {
            console.log("error", error)
        }
    }
    return { setColor }
}


export default useSetColor;