import {combineReducers} from 'redux';
// import {Provider, connect} from 'react-redux'

import authReducer from './authReducer'
import itemReducer from './itemReducer';

export default combineReducers({
    item: itemReducer,
    // error: errorReducer,
    auth: authReducer
  });