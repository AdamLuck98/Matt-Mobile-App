import { useQuery, useQueryClient } from "react-query";
import { config } from "../../../config";
import { apiCall } from "../../../utils/apiCall";
import { QueryKeys } from "../../../utils/QueryKeys";

export interface IDelItemReq {
    userid: string;
    location: string;
}

interface IDelItemResponse {
    data: string,
}


async function ItemDelete(request: IDelItemReq): Promise<IDelItemResponse | null> {
    try {
        const response: IDelItemResponse = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useDeleteItems = () => {
    const queryClient = useQueryClient()

    const deleteItem = async (request: IDelItemReq) => {
        try {
            const response = await ItemDelete(request)
            queryClient.invalidateQueries([QueryKeys.products])
            queryClient.invalidateQueries([QueryKeys.dashboard])
            return response;
        } catch (error) {
        }
    }
    return { deleteItem }
}


export default useDeleteItems;