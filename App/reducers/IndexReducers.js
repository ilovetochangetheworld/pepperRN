/**
 * IndexReducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    data: '',
    goodsListDataSource: '',
}

export default function index(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_INDEX_ACTION:
                  console.log(action);
                  return Object.assign({}, state, {
                       data: action.data,
                       goodsListDataSource: action.goodsListDataSource
                  })
        default:
            return state;
    }
}
