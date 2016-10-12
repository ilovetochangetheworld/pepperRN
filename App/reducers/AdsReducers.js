/**
 * 广告轮播图Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    imgDataSource:'',
}

export default function ads(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_ADS_ACTION:
                  return Object.assign({}, state, {
                       imgDataSource: action.imgDataSource,
                  });
        default:
            return state;
    }
}
