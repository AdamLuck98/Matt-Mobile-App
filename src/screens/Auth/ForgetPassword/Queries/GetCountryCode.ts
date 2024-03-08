import { useQuery } from "react-query";
import { QueryKeys } from "../../../../utils/QueryKeys";
import { apiCall } from "../../../../utils/apiCall";

export interface ICodeReq {
    do:undefined;
}

interface ICodeResponse {
    data: any;
}

async function fetchCodeData(request: ICodeReq): Promise<ICodeResponse | null> {
    try {
        const data = {
            do: "GetCountry",
        };
        const response: ICodeResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useCodeData = (request: ICodeReq) => {
    const catchKey = [QueryKeys.countrycode];
    return useQuery(catchKey, () => fetchCodeData(request));
};

export { useCodeData };