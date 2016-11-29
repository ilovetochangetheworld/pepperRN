/**
 * IndexReducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    data:'',
    loading: true
}

export default function shopFxInfo(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_SHOP_FX_INFO_ACTION:
                  return Object.assign({}, state, {
                       data: action.data,
                       loading: false
                  })
        default:
            return state;
    }
}
