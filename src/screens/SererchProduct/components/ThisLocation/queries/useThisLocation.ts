import { useQuery } from "react-query";
import { QueryKeys } from "../../../../../utils/QueryKeys";
import { apiCall } from "../../../../../utils/apiCall";

export interface IThisLocationReq {
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

interface IThisLocationResponse { }


export async function fetchThisLocation(
  request: IThisLocationReq
): Promise<IThisLocationResponse | null> {
  try {
    // console.log("request this loc>>>", JSON.stringify(request, null, 2))
    const response: IThisLocationResponse = await apiCall(request);
    console.log("response this loc>>>", JSON.stringify(response, null, 2))
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useThisLocation = (request: IThisLocationReq, enable = true) => {
  const catchKey = [QueryKeys.thilocation];
  return useQuery(catchKey, () => fetchThisLocation(request));
};

export { useThisLocation };
