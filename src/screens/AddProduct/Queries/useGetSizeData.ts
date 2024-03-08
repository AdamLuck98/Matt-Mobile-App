import { useQuery } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import { apiCall } from "../../../utils/apiCall";
import { Platform } from "react-native";

export interface IGetSizeReq {
  UserId: string;

}

interface IGetSizeResponse {
  CurrentCall: string;
  UserId: string;
  SizData: string;
}



async function fetchGetSizeData(request: IGetSizeReq): Promise<IGetSizeResponse | null> {
  try {
    const data = {
      do: "GetSize",
      userid: request.UserId,
      suball: 1,
      osname: Platform.OS === "android" ? "and" : "ios"
    };
    const response: IGetSizeResponse = await apiCall(data);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useGetSizeData = (request: IGetSizeReq, enable = true) => {
  const catchKey = [QueryKeys.getSizeData];
  return useQuery(catchKey, () => fetchGetSizeData(request));
};

export { useGetSizeData };
