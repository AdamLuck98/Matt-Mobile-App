import { string } from "yup";

export interface ILoginRequestData {
  do: "Login";
  username: string;
  password: string;
  osname: string;
  device_id: string;
  token: string;
}

export interface IUserInfo {
  CurrentCall: string;
  UserId: string;
  UserName: string;
  UserType: number;
  Created: string;
  SellerType: string;
  Associate: string;
  CompanyName: string;
  ContactName: string;
  BillingType: string;
  trial_expires: number;
  PasswordUser: string;
  PasswordLimit: string;
  ResponseCode: string;
  ResponseMsg: string;
}

export interface IUserState {
  loading: boolean;
  isLoggedIn: boolean;
  isFirstLogin: boolean;
  token: string | null;
  refreshToken: string | null;
  documentId: string | null;
  username: string | null;
  verifyingEmail: boolean;
  gallery: string;
  userInfo: IUserInfo | null;
}
