/**
 * 用户登录Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    data:'home',
}

export default function appMain(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_APPMAIN_ACTION:
                  console.log('goodsDetailReducers');
                  return Object.assign({}, state, {
                       data: action.data,
                  });
        default:
            return state;
    }
}
