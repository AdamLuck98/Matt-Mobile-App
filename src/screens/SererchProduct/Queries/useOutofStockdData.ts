import { useQuery } from "react-query";
import client from "../../../utils/ApiClient";
import { QueryKeys } from "../../../utils/QueryKeys";
import { config } from "../../../config";
import { apiCall } from "../../../utils/apiCall";
import { keyBy } from "lodash";

export interface IDashReq {
  UserId: string;
  UserName: string;
  password: string;
  isenglish: boolean;
  CompamyName: string;
  Current_Page: number;
}

interface IDashResponse {
  userid: string;
  listingid: string;
  barcode: string;
  description: string;
  prodtitle: string;
  cost: string;
  price: string;
  location: string;
  cat_master: string;
  color: string;
  size: string;
  qty: string;
  created: string;
  supplier: string;
  tags: string;
  units: string;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
  sortby: 5
}

export async function fetchUserDataDirect(request: IDashReq) {
  console.("search result request", JSON.stringify(request, null, 2))

  try {
    const url = `${config.BASE_URL}`;
    const data = {
      do: request.key,
      userid: request.UserId,
      associate: request.code,
      Current_Page: request.Current_Page,
      UserName: request.UserName,
      password: request.password,
      Compamy: request.CompamyName,
      lang: request.isenglish ? "en" : "es",
    };

    const response: IDashResponse = await apiCall(data);
    return response;
  } catch (error) {
    return error;
  }
}
export async function fetchUserData(
  request: IDashReq
): Promise<IDashResponse | null> {
  try {

    const response: IDashResponse = await apiCall(request);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useOutofStockdData = (request: any, enable = true) => {
  const catchKey = [QueryKeys.OutOfStock];
  return useQuery(catchKey, () => fetchUserData(request));
};

export { useOutofStockdData };
