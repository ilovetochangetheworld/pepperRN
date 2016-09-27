/**
 * 个人信息Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    data:'',
}

export default function goodsList(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_USER_ACTION:
                  return Object.assign({}, state, {
                       data: action.data,
                  });
        default:
            return state;
    }
}
