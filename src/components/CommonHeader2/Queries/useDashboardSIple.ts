import { useQuery } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import { apiCall } from "../../../utils/apiCall";

export interface IDashReq {
  do: "GetDash";
  userid: string;
  UserName: string;
  password: string;
  lang: string;
}

interface IDashResponse {
  CurrentCall: string;
  UserId: string;
  extra: any;
  Catch: any;
  activeOrders: number;
  inStock: any;
  outstock: number;
  hit_week: string;
  hit_total: string;
  ord_week: string;
  ord_total: string;
  ResponseCode: string;
  ResponseMsg: string;
  CompanyName: string;
  Associate: string;
}

async function fetchUserData(request: IDashReq): Promise<IDashResponse | null> {
  try {

    const response: IDashResponse = await apiCall(request);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useDashboardSIple = (request: IDashReq, enable = true) => {
  const catchKey = [QueryKeys.useDashboardSIple];
  return useQuery(catchKey, () => fetchUserData(request));
};
export { useDashboardSIple };