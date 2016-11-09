/**
 * IndexReducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    loading: false
}

export default function ordercancel(state = initialState, action){
    switch (action.type) {
        case types.PERFORM_ORDER_CANCEL_ACTION:
                  return Object.assign({}, state, {
                       loading: true
                  })
        case types.RECEIVE_ORDER_CANCEL_ACTION:
                  return Object.assign({}, state, {
                       loading: false
                  })
        default:
            return state;
    }
}
