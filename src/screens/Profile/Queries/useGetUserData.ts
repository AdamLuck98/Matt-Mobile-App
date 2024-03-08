import { useQueries, useQuery } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import { apiCall } from "../../../utils/apiCall";

export interface IAddReq {
  UserId: string;
}

interface IaddResponse {
  UserName: string;
  whole_password: string;
  CompanyName: string;
  contact_fname: string;
  contact_lname: string;
  associate: string;
  usertype: any;
  flags: string;
  storephone: string;
  cellphone: string;
  address: string;
  city: string;
  zip_postal: string;
  password: string;
  limit_password: string;
  tax_rate: string;
  e_enable: string;
  d_charge: string;
  d_enable: string;
  d_gratuity: string;
  op_hours: string;
  email: string;
  disclaimer: string;
  state_id: string;
  country: string;
  prephone: string;
  state: string;
  trial_expires: string;
  states: [];
}

async function fetchAddData(request: IAddReq): Promise<IaddResponse | null> {
  try {
    const data = {
      do: "getuser",
      userid: request.UserId,
    };
    // console.log('profile get user data req>>', JSON.stringify(data, null, 2))
    const response: IaddResponse = await apiCall(data);
    // console.log('profile get user data response>>', JSON.stringify(response, null, 2))
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

const useGetUserData = (request: IAddReq, enable = true) => {
  const catchKey = [QueryKeys.addProfileData]
  return useQuery(catchKey, () => fetchAddData(request));
}
export { useGetUserData };  