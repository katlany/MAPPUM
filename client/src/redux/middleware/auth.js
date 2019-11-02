import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  AUTO_LOGIN,
  SET_AUTH_TIME,
  LOGOUT,
  setAuth,
  setAuthTime,
  logout,
} from '../actions/auth';
import { apiRequest } from '../actions/api';
import { setMessage, clearUi, redirectTo } from '../actions/ui';

export const autoLogin = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === AUTO_LOGIN) {
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('userToken');

    if (!adminToken && !userToken) {
      return dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirseIn'));
      if (expirationDate <= new Date()) {
        return dispatch(logout());
      } else {
        const user = {
          token: adminToken ? adminToken : userToken ? userToken : null,
          admin: adminToken ? true : false,
          user: userToken ? true : false,
        };
        const updateDate =
          (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(setAuthTime(updateDate));
        dispatch(setAuth(user));
      }
    }
  }
};
export const loginStart = ({ dispatch }) => next => action => {
  next(action);
  const URL = 'auth/login';
  if (action.type === LOGIN_START) {
    dispatch(
      apiRequest('POST', URL, action.payload, LOGIN_SUCCESS, LOGIN_ERROR),
    );
  }
};

export const loginSuccess = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LOGIN_SUCCESS) {
    const { userToken = null, adminToken = null, expiresIn } = action.payload;
    if (adminToken) {
      const user = {
        token: adminToken,
        admin: true,
      };
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem('adminToken', adminToken);
      localStorage.setItem('expirseIn', expirationDate);
      dispatch(setAuthTime(expiresIn));
      dispatch(setAuth(user));
      dispatch(redirectTo('/'));
      dispatch(clearUi());
    }
    if (userToken) {
      const user = {
        token: adminToken,
        user: true,
      };
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem('userToken', userToken);
      localStorage.setItem('expirseIn', expirationDate);
      dispatch(setAuthTime(expiresIn));
      dispatch(setAuth(user));
      dispatch(redirectTo('/'));
      dispatch(clearUi());
    }
  }
};
export const loginFail = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LOGIN_ERROR) {
    dispatch(setMessage(action.payload));
  }
};

export const onLogout = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LOGOUT) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('expirseIn');
    dispatch(setAuth(null));
  }
};

export const checkAuthTimeout = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === SET_AUTH_TIME) {
    setTimeout(() => {
      dispatch(logout());
    }, action.payload * 1000);
  }
};

export const authMdl = [
  loginStart,
  loginSuccess,
  loginFail,
  checkAuthTimeout,
  onLogout,
  autoLogin,
];