import { useQuery } from "react-query";
import { QueryKeys } from "../../../../../utils/QueryKeys";
import { apiCall } from "../../../../../utils/apiCall";

export interface IAllLocationReq {
  do: string
  osname: string
  userid: string
  maincat: string
  subcat_1: string
  subcat_2: string,
  tags: string,
  stock_no: string,
  listype: number,
  associate: number,
  sortby: number,
  Current_Page: number,
  barcode: string,
  size: string,
  color: string,
}

interface IAllLocationResponse { }


export async function fetchAllLocation(
  request: IAllLocationReq
): Promise<IAllLocationResponse | null> {
  // console.log("request all loc>>>", JSON.stringify(request, null, 2))
  try {
    const response: IAllLocationResponse = await apiCall(request);
    // console.log("response all loc>>>", JSON.stringify(response, null, 2))
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useAllLocation = (request: IAllLocationReq, enable = true) => {
  const catchKey = [QueryKeys.useAllLocation];
  return useQuery(catchKey, () => fetchAllLocation(request));
};

export { useAllLocation };
