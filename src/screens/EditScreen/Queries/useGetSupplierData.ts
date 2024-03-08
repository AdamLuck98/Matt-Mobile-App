import { useQuery } from "react-query";
import client from "../../../utils/ApiClient";
// import {config} from '../../../config/index';
import { QueryKeys } from "../../../utils/QueryKeys";
import { config } from "../../../config";
import { apiCall } from "../../../utils/apiCall";

export interface IGetSupplierReq {
  UserId: string;

}

interface IGetSupplierResponse {
  SupData:string;
}

// const BASE_URL = "https://kizbin.com/AppService/action_kiz.php";

async function fetchGetSupplierData(request: IGetSupplierReq): Promise<IGetSupplierResponse | null> {
  try {
    const url = `${config.BASE_URL}`;
    const data = {
      do: "GetSupplier",
      userid: request.UserId,
      suball: 1,
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
