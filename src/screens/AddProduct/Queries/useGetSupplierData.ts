import { useQuery } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import { apiCall } from "../../../utils/apiCall";
import { Platform } from "react-native";

export interface IGetSupplierReq {
  UserId: string;

}

interface IGetSupplierResponse {
  SupData: string;
}

async function fetchGetSupplierData(request: IGetSupplierReq): Promise<IGetSupplierResponse | null> {
  try {
    const data = {
      do: "GetSupplier",
      userid: request.UserId,
      suball: 1,
      osname: Platform.OS === "android" ? "and" : "ios"
    };
    const response: IGetSupplierResponse = await apiCall(data);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useGetSupplierData = (request: IGetSupplierReq, enable = true) => {
  const catchKey = [QueryKeys.getSupplier];
  return useQuery(catchKey, () => fetchGetSupplierData(request));
};

export { useGetSupplierData };
