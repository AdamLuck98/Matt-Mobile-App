import { apiCall } from "../../../utils/apiCall";

export interface IPriceQtyLocReq {
    UserId: string;
    listingid: string;
    qty: string;
    price: string;
    cost: string;
    location: string;
}

interface IPriceQtyLocResponse {
    data: any,
}


async function pricsQtyLocSet(request: IPriceQtyLocReq): Promise<IPriceQtyLocResponse | null> {
    try {
        const response: IPriceQtyLocResponse = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



const useSetPriceQtyLoc = () => {

    const editPriceQtyLoc = async (request: IPriceQtyLocReq) => {
        try {
            const response = await pricsQtyLocSet(request)
            return response;
        } catch (error) {
            console.log("error", error)
        }
    }
    return { editPriceQtyLoc }
}


export default useSetPriceQtyLoc;