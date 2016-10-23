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
                       addressList: action.addressList
                  })
        default:
            return state;
    }
}
