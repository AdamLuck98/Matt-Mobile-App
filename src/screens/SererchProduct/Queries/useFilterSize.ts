import { useQuery } from "react-query";
import client from "../../../utils/ApiClient";
import { IUserData } from "../../../redux/reducers/user/UserInterface";
import { QueryKeys } from "../../../utils/QueryKeys";
import { config } from "../../../config";
import { apiCall } from "../../../utils/apiCall";

export interface IDashReq {
  UserId: string;
  UserName: string;
  password: string;
  isenglish: boolean;
  CompamyName:string;
}

interface IDashResponse {
  CurrentCall: string;
  UserId: string;
  extra: number;
  Catch: string;
  activeOrders: number;
  inStock: number;
  outstock: number;
  hit_week: string;
  hit_total: string;
  ord_week: string;
  ord_total: string;
  ResponseCode: string;
  ResponseMsg: string;
  CompanyName:string;
  Associate:string;
}

async function fetchUserData(request: IDashReq): Promise<IDashResponse | null> {
  try {
    const url = `${config.BASE_URL}`;
    const data = {
      do: "GetSize",
      userid: request.UserId,
      suball: 1,
    };
    const response: IDashResponse = await apiCall(data);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useFilterSize = (request: IDashReq, enable = true) => {
  const catchKey = [QueryKeys.filetsize];
  return useQuery(catchKey, () => fetchUserData(request));
};

export { useFilterSize };
