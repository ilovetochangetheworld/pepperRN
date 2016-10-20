/**
 * 个人信息Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
}

export default function goodsList(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_USER_ACTION:
                  return Object.assign({}, state, {
                       data: action.data,
                       tokenRefresh: false,
                  });
        case types.TOKEN_REFRESH:
                  return Object.assign({}, state, {
                       data: action.data,
                       tokenRefresh: true,

                  });
        default:
            return state;
    }
}
