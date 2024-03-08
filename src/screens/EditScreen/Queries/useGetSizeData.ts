import { useQuery } from "react-query";
import client from "../../../utils/ApiClient";
import { QueryKeys } from "../../../utils/QueryKeys";
import { config } from "../../../config";
import { apiCall } from "../../../utils/apiCall";

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
    const url = `${config.BASE_URL}`;
    const data = {
      do: "GetSize",
      userid: request.UserId,
      suball: 1,
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
