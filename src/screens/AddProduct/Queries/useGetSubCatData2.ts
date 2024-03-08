import { useQuery } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import { apiCall } from "../../../utils/apiCall";

export interface ISubCat2Req {
    userid: string;
    mastercat: string;
    suball: number;
    subcat_1: string;
}

interface ISubCat2Response {
    CatData: any
}

async function fetchSubCat2Data(request: ISubCat2Req): Promise<ISubCat2Response | null> {
    try {
        const data = {
            do: "GetSubCat",
            userid: request.userid,
            mastercat: request.mastercat,
            suball: request.suball,
            subcat_1: request.subcat_1,
        };
        const response: ISubCat2Response = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useGetSubCat2Data = (request: ISubCat2Req, enable = true) => {
    const catchKey = [QueryKeys.getSubaCategoryData2];
    return useQuery(catchKey, () => fetchSubCat2Data(request));
};

export { useGetSubCat2Data };
