import { apiCall } from "../../../utils/apiCall";

export interface ISetUnitReq {
    userid: string;
    unit: string;
}

interface ISetUnitResponse {
    data: any,
}

async function UnitSet(request: ISetUnitReq): Promise<ISetUnitResponse | null> {
    try {
        const response: ISetUnitResponse = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useSetUnit = () => {

    const setUnit = async (request: ISetUnitReq) => {
        try {
            const response = await UnitSet(request)
            return response;
        } catch (error) {
            console.log("error", error)
        }
    }
    return { setUnit }
}


export default useSetUnit;