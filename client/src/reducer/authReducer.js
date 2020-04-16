import {
    // USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    // LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../actions/types';

  const initialState = {
      token: localStorage.getItem('token'),
      loading: false,
      isAuth: null,
      user: null,
      errorAuth: false,
      errorRegistr:false,
  }

  export default ( state = initialState, action ) => {
      switch (action.type) {
            case  LOGIN_SUCCESS:
                localStorage.setItem('token', action.loginRequest.login.token)
                localStorage.setItem('userId', action.loginRequest.login.userId)
              return {
                  ...state,
                  ...action,
                  token:action.loginRequest.login.token,
                  isAuth: true,
                  loading: false,
                  user: action.loginRequest.login.userId
              };
             case  REGISTER_SUCCESS:
                return {
                    ...state,
                    ...action,
                };
            case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            let newDellState = { ...state }
                return {
                    ...newDellState,
                    user: null,
                    isAuth: false,
                    isLoading: false
                };
            case AUTH_ERROR: 
                return {
                    ...state,
                    errorAuth:true
                }    
                case REGISTER_FAIL: 
                return {
                    ...state,
                    errorRegistr:true
                }
    default:
      return state;
              
      }
  }