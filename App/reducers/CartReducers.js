/**
 * 购物车Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    data:false,
    cartloading:false
}

export default function cart(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_CART_ACTION:
                  return Object.assign({}, state, {
                       data: action.data,
                       cartloading: false
                  });
        case types.CHANGE_CART_ACTION:
                  return Object.assign({}, state, {
                       cartloading: true
                  });
        case types.RECEIVE_NLL_CART_ACTION:
                  return Object.assign({}, state, {
                       data:{status:false},
                  });

        default:
            return state;
    }
}
