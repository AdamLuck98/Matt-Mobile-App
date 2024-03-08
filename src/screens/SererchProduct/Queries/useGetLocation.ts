import { Platform } from "react-native";
import { useQuery } from "react-query";
import { config } from "../../../config";
import { apiCall } from "../../../utils/apiCall";
import { QueryKeys } from "../../../utils/QueryKeys";


export interface IGetLocReq {
    userid: string;
    suball: number
}

interface IGetLocResponse {
    LocData: string;
}

async function fetchGetLocationData(request: IGetLocReq): Promise<IGetLocResponse | null> {
    try {
        const url = `${config.BASE_URL}`;
        const data = {
            do: "GetLocation",
            userid: request.userid,
            suball: request.suball,
            osname: Platform.OS === "android" ? "and" : "ios"
        };
        // console.log("serch", data)

        const response: IGetLocResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useGetLocations = (request: IGetLocReq, enable = true) => {
    const catchKey = [QueryKeys.getLocation];
    return useQuery(catchKey, () => fetchGetLocationData(request));
};

export { useGetLocations };
