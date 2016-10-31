/**
 * 获取收货地址Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
  data:''
}

export default function address(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_ADDRESS_ACTION:
                  return Object.assign({}, state, {
                       data: action.data,
                       addressList: action.addressList,
                       refresh: false
                  });
        case types.RECEIVE_NLL_ADDRESS_ACTION:
                  return Object.assign({}, state, {
                       data:{status:false},
                       refresh: false
                  });
        case types.RECEIVE_ADDRESS_REFRESH_ACTION:
                  return Object.assign({}, state, {
                       refresh: true
                  });
        default:
            return state;
    }
}
