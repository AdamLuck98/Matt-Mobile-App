import { useQuery } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import { apiCall } from "../../../utils/apiCall";
import { Platform } from "react-native";

export interface IGetLocationReq {
  UserId: string;

}

interface IGetLocationResponse {
  CurrentCall: string;
  UserId: string;
  LocData: string;
}


async function fetchGetLocationData(request: IGetLocationReq): Promise<IGetLocationResponse | null> {
  try {
    const data = {
      do: "GetLocation",
      userid: request.UserId,
      suball: 1,
      osname: Platform.OS === "android" ? "and" : "ios"
    };
    const response: IGetLocationResponse = await apiCall(data);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useGetLocationData = (request: IGetLocationReq, enable = true) => {
  const catchKey = [QueryKeys.getLocationl];
  return useQuery(catchKey, () => fetchGetLocationData(request));
};

export { useGetLocationData };
