/**
 * 购物车Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
  data:''
}

export default function cart(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_CART_ACTION:
                  return Object.assign({}, state, {
                       data: action.data,
                       refresh: false,
                       needLogin: false,
                  });
        case types.CHANGE_CART_ACTION:
                  return Object.assign({}, state, {
                       refresh: true,
                       needLogin: false,
                  });
        case types.RECEIVE_NLL_CART_ACTION:
                  return Object.assign({}, state, {
                        refresh: false,
                        data:{nullCart:true},
                        needLogin: false,
                  });
        default:
            return state;
    }
}
