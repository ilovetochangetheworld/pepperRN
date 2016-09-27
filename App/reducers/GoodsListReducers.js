/**
 * 商品列表Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    data:'',
    imgDataSource:'',
    goodsListDataSource:''
}

export default function goodsList(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_GOODSLIST_ACTION:
                  return Object.assign({}, state, {
                       data: action.data,
                       imgDataSource: action.imgDataSource,
                       goodsListDataSource: action.goodsListDataSource
                  });
        default:
            return state;
    }
}
