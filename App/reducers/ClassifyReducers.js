/**
 * 商品列表Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    data: '',
    active: 0,
    index: 0,
}

export default function classify(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_CLASSIFY_ACTION:
                  return Object.assign({}, state, {
                       data: action.data,
                       active: action.data.data[0].cate_id,
                  })
        case types.RECEIVE_ACTIVE_ACTION:
                  return Object.assign({}, state, {
                       active: action.active,
                       index: action.index
                  });
        default:
            return state;
    }
}
