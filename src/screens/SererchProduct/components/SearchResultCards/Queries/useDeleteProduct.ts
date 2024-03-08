import { useQueryClient } from "react-query";
import { apiCall } from "../../../../../utils/apiCall";
import { QueryKeys } from "../../../../../utils/QueryKeys";


export interface IDelItemReq {
    do: string;
    userid: string;
    listingid: any
}

interface IDelItemResponse {
    data: string,
}


async function ItemDelete(request: IDelItemReq): Promise<IDelItemResponse | null> {
    try {
        console.log("request", JSON.stringify(request, null, 2))
        const response: IDelItemResponse = await apiCall(request);
        console.log("response", JSON.stringify(response, null, 2))

        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useDeleteProduct = () => {
    const queryClient = useQueryClient()

    const deleteProduct = async (request: IDelItemReq) => {
        try {
            const response = await ItemDelete(request)
            queryClient.invalidateQueries([QueryKeys.thilocation])
            queryClient.invalidateQueries([QueryKeys.useAllLocation])
            queryClient.invalidateQueries([QueryKeys.useOutStock])
            queryClient.invalidateQueries([QueryKeys.dashboard])
            return response;
        } catch (error) {
        }
    }
    return { deleteProduct }
}


export default useDeleteProduct;