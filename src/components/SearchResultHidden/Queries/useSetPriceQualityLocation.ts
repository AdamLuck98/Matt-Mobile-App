import { useQueryClient } from "react-query";
import { apiCall } from "../../../utils/apiCall";
import { QueryKeys } from "../../../utils/QueryKeys";

export interface IPriceQtyLocReq {
    UserId: string;
    listingid: string;
    qty: string;
    price: string;
    cost: string;
    location: string;
}

interface IPriceQtyLocResponse {
    data: string,
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
    const queryClient = useQueryClient()
    const editPriceQtyLoc = async (request: IPriceQtyLocReq) => {
        try {
            const response = await pricsQtyLocSet(request)
            queryClient.invalidateQueries([QueryKeys.products])
            return response;
        } catch (error) {
            console.log("error", error)
        }
    }
    return { editPriceQtyLoc }
}


export default useSetPriceQtyLoc;