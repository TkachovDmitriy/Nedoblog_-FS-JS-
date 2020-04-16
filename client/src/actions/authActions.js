import {
    // USER_LOADED,
    // USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    // LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from './types';
  import{ getToken } from '../App'

  export const login =  ( email, password ) =>  async dispatch => {
    console.log('actions', email, password)
    try {
    const loginRequest = await getToken().request(
      `query ($email: String!, $password: String! ){
        login(email: $email, password: $password){
          token
          userId
        }
      }`,
      { email, password })
      console.log(loginRequest)
      
        dispatch({type: LOGIN_SUCCESS, loginRequest})
      } catch (e) {
        dispatch({type: AUTH_ERROR})
      }
  }

  export const logout = () => async dispatch => {
    // console.log('This is Action is work')
     return await dispatch({type: LOGOUT_SUCCESS, logout})
  };

  export const singUp =  ( email, name, password ) =>  async dispatch => {
    console.log('actions', email, name, password)
    try {
    const singUpRequest = await getToken().request(
      `mutation ($email: String!, $name: String!, $password: String!) {
        createUser(userInput: {email: $email, name: $name, password: $password}) {
          _id
          name
          email
        }
      }`,
      { email, name, password })
      // console.log(singUpRequest)
      
        dispatch({type: REGISTER_SUCCESS}, singUpRequest)
      } catch (e) {
        dispatch({type: REGISTER_FAIL})
      }
     

  }