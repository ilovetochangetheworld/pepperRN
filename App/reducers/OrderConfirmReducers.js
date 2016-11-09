/**
 * IndexReducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    data:'',
    loading: false
}

export default function orderconfirm(state = initialState, action){
    switch (action.type) {
        case types.PERFORM_ORDER_CONFIRM_ACTION:
                  return Object.assign({}, state, {
                       data: '',
                       loading: true
                  })
        case types.RECEIVE_ORDER_CONFIRM_ACTION:
                  return Object.assign({}, state, {
                       data: action.data,
                       loading: false
                  })
        default:
            return state;
    }
}
