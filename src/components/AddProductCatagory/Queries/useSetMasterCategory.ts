import { useQueryClient } from "react-query";
import { apiCall } from "../../../utils/apiCall";
import { QueryKeys } from "../../../utils/QueryKeys";

export interface ISetMasterCatReq {
    userid: string;
    mastercat: string;
}

interface ISetMasterCatResponse {
    data: string,
}


async function MasterCatSet(request: ISetMasterCatReq): Promise<ISetMasterCatResponse | null> {
    try {
        const response: ISetMasterCatResponse = await apiCall(request);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}


const useSetMasterCatategory = () => {
    const queryClient = useQueryClient();

    const setMasterCat = async (request: ISetMasterCatReq) => {
        try {
            const response = await MasterCatSet(request)
            queryClient.invalidateQueries([QueryKeys.getCategoriesData])
            return response;
        } catch (error) {
            console.log("error", error)
        }
    }
    return { setMasterCat }
}

export default useSetMasterCatategory;