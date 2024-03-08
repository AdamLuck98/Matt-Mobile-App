import { useQuery } from "react-query";
import client from "../../../utils/ApiClient";
import { QueryKeys } from "../../../utils/QueryKeys";
import { config } from "../../../config";
import { apiCall } from "../../../utils/apiCall";

export interface IGetColorReq {
    userid: string;
    suball: number
}

interface IGetColorResponse {
    ColData: string;
}

async function fetchGetLocationData(request: IGetColorReq): Promise<IGetColorResponse | null> {
    try {
        const url = `${config.BASE_URL}`;
        const data = {
            do: "GetColor",
            userid: request.userid,
            suball: request.suball,
        };
        const response: IGetColorResponse = await apiCall(data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

const useGetColor = (request: IGetColorReq, enable = true) => {
    const catchKey = [QueryKeys.setColorData];
    return useQuery(catchKey, () => fetchGetLocationData(request));
};

export { useGetColor };