import { useQueries, useQuery } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import { config } from "../../../config";
import { apiCall } from "../../../utils/apiCall";

export interface ISaveUser {
  mastercat: any;
  userId:string;

}

interface ISaveUserResponse {

}


async function fetchAddData(request :ISaveUser):  Promise<ISaveUserResponse | null >{
  try {
    const url = `${config.BASE_URL}`;
    const data ={
      do: "saveuser",
      userId:request.userId,
   
    };

    const  response :ISaveUserResponse = await apiCall(data);
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

const useSaveUserData = (request : ISaveUser, enable = true) => {
const catchKey= [ QueryKeys.SaveUserData]
return useQuery(catchKey, ()=> fetchAddData(request));
}
export { useSaveUserData};  