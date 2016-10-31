/**
 * Token状态判断 Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {

}

export default function token(state = initialState, action){
    switch (action.type) {
        case types.TOKEN_REFRESH:
                  return Object.assign({}, state, {
                      tokenRefresh: true
                  });
        case types.IS_LOGIN:
                  return Object.assign({}, state, {
                      tokenRefresh: false
                  });
        default:
            return state;
    }
}
