import { useQuery } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import { config } from "../../../config";
import { apiCall } from "../../../utils/apiCall";

export interface ISubCatReq {
  userid: string;
  mastercat: string;
  suball: number,
}

interface ISubCatResponse {
  CatData: string
}

async function fetchSubCatData(request: ISubCatReq): Promise<ISubCatResponse | null> {
  try {
    const data = {
      do: "GetSubCat",
      userid: request.userid,
      mastercat: request.mastercat,
      suball: request.suball
    };
    const response: ISubCatResponse = await apiCall(data);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useGetSubCatData = (request: ISubCatReq, enable = true) => {
  const catchKey = [QueryKeys.getSubaCategoryData];
  return useQuery(catchKey, () => fetchSubCatData(request));
};

export { useGetSubCatData };
