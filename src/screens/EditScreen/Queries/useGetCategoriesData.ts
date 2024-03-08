import { useQuery } from "react-query";
import client from "../../../utils/ApiClient";
// import {config} from '../../../config/index';
import { QueryKeys } from "../../../utils/QueryKeys";
import { config } from "../../../config";
import { apiCall } from "../../../utils/apiCall";

export interface IGetCateReq {
  UserId: string;
}

interface IGetCateResponse {
  CatData: string;
}


async function fetchGetCategoriesData(request: IGetCateReq): Promise<IGetCateResponse | null> {
  try {
    const url = `${config.BASE_URL}`;
    const data = {
      do: "GetCategories",
      userid: request.UserId,
      suball: 1,

    };
    const response: IGetCateResponse = await apiCall(data);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

const useGetCategoriesData = (request: IGetCateReq, enable = true) => {
  const catchKey = [QueryKeys.getCategoriesData];
  return useQuery(catchKey, () => fetchGetCategoriesData(request));
};

export { useGetCategoriesData };
