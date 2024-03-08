import { IUserState, IUserInfo } from "./UserInterface";
import { UserTypes } from "./UserTypes";

const initialState: IUserState = {
  loading: false,
  isLoggedIn: false,
  token: null,
  documentId: null,
  username: null,
  verifyingEmail: false,
  isFirstLogin: false,
  refreshToken: null,
  gallery: "",
  userInfo: null,
};

const userReducer = (state: IUserState = initialState, action: any) => {
  switch (action.type) {
    case UserTypes.LOGIN_PENDING:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    case UserTypes.LOGIN_FULFILLED:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        userInfo: action.payload,
      };
    case UserTypes.LOGIN_REJECTED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };
    case UserTypes.LOGOUT:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
