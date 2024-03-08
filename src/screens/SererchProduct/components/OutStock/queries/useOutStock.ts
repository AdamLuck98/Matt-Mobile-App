import { useQuery } from "react-query";
import { QueryKeys } from "../../../../../utils/QueryKeys";
import { apiCall } from "../../../../../utils/apiCall";

export interface IOutStockReq {
  do: string
  osname:string
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

interface IOutStockResponse {}


export async function fetchOutStock(
  request: IOutStockReq
): Promise<IOutStockResponse | null> {
  try {
    const response: IOutStockResponse = await apiCall(request);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useOutStock = (request: IOutStockReq, enable = true) => {
  const catchKey = [QueryKeys.useOutStock];
  return useQuery(catchKey, () => fetchOutStock(request));
};

export { useOutStock };
