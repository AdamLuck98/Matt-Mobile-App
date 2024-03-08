import { Dispatch } from "redux";
import { UserTypes } from "./UserTypes";
import { showSnackbar } from "../../../utils/SnackBar";
import { apiCall } from "../../../utils/apiCall";

export const userLogin = (data: any) => {
  return async (dispatch: Dispatch<any>) => {
    return dispatch({
      type: UserTypes.LOGIN,
      payload: async () => {
        try {
          const response: any = await apiCall(data);
          if (response?.ResponseMsg === "Sucessfull") {
            return Promise.resolve(response);
          }
          showSnackbar({ message: response.ResponseMsg, type: "danger" });
          return Promise.reject();
        } catch (error: any) {
          showSnackbar({ message: error.ResponseMsg, type: "danger" });
          return Promise.reject(error);
        }
      },
    });
  };
};
