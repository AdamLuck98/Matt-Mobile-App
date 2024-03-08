import { apiCall } from "../../../utils/apiCall";

export interface ISetSupplierReq {
    userid: string;
    supplier: string;
}

interface ISetSupplierResponse {
    data: string,
}

async function SizeSet(request: ISetSupplierReq): Promise<ISetSupplierResponse | null> {
    try {
        const response: ISetSupplierResponse = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useSetSupplier = () => {

    const setSupplier = async (request: ISetSupplierReq) => {
        try {
            const response = await SizeSet(request)
            return response;
        } catch (error) {
            console.log("error", error)
        }
    }
    return { setSupplier }
}


export default useSetSupplier;