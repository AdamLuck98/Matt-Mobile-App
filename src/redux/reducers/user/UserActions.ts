import {Dispatch} from 'redux';
import {UserTypes} from './UserTypes';

export const userLoginRequest = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: UserTypes.LOGIN_PENDING,
    });
  };
};

export const userLoginSuccess = (token: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: UserTypes.LOGIN_FULFILLED,
      payload: {token},
    });
  };
};

export const userLoginError = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: UserTypes.LOGIN_REJECTED,
    });
  };
};

export const userLogout = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: UserTypes.LOGOUT,
    });
  };
};
