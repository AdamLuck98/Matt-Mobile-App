import { useQuery } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import { apiCall } from "../../../utils/apiCall";

export interface IOrderReq {

}

interface IOrderResponse {
  CurrentCall: string;
  Current_Page: number,
  address: string;
  city: string;
  company: string;
  contactname: string;
  country: string;
  custid: string
  dlvrytime: string;
  email: string;
  factura: string;
  invoice_date: string;
  messages: string;
  or_notes: string;
  order_delivery: string;
  order_number: string;
  order_status: string;
  order_tax: string;
  order_type: string;
  order_value: string;
  phone: string;
  state: string;
  zip_postal: string;
  ResponseCode: string;
  Total_Pages: number;
  UserId: number;
  nqty: number;
  stat_closed: number;
  stat_process: number;
  stat_ready: number;
  stat_wait: number;
  InventoryData: undefined;
}

export async function fetchUserDataDirectOrder(request: IOrderReq): Promise<IOrderResponse | null> {
  try {
    const response: IOrderResponse = await apiCall(request);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function fetchUserData(
  request: IOrderReq
): Promise<IOrderResponse | null> {
  try {
    // console.log("search request>>", JSON.stringify(request, null, 2))
    const response: IOrderResponse = await apiCall(request);
    // console.log("search response query>>", JSON.stringify(response, null, 2))
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useOrderData = (request: IOrderReq, enable = true) => {
  const catchKey = [QueryKeys.orderScreen];
  return useQuery(catchKey, () => fetchUserData(request));
};

export { useOrderData };