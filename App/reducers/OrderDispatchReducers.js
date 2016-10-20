/**
 * 订单配送方式Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    data:1,
}

export default function orderdispatch(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_ORDER_DISPATCH_ACTION:
                  return Object.assign({}, state, {
                       data: action.data,
                  });
        default:
            return state;
    }
}
