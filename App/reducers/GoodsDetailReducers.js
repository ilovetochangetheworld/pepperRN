/**
 * 用户登录Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    data:'',
}

export default function goodsDetail(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_GOODSDETAIL_ACTION:
                  console.log('goodsDetailReducers');
                  return Object.assign({}, state, {
                       data: action.data,
                  });
        default:
            return state;
    }
}
