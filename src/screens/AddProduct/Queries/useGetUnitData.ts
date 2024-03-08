import { useQuery } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import { apiCall } from "../../../utils/apiCall";
import { Platform } from "react-native";

export interface IGetUnitReq {
    UserId: string;
}

interface IGetUnitResponse {
    UntData: string;
}

async function fetchGetUnitData(request: IGetUnitReq): Promise<IGetUnitResponse | null> {
    try {
        const data = {
            do: "GetUnit",
            userid: request.UserId,
            suball: 1,
            osname: Platform.OS === "android" ? "and" : "ios"
        };
        const response: IGetUnitResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useGetUnitData = (request: IGetUnitReq) => {
    const catchKey = [QueryKeys.getUnit];
    return useQuery(catchKey, () => fetchGetUnitData(request));
};

export { useGetUnitData };
