/**
 * Token状态判断 Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
  loading: false
}

export default function userinform(state = initialState, action){
    switch (action.type) {
        case types.PERFORM_UPDATE_USERINFORM_ACTION:
                  return Object.assign({}, state, {
                      loading: false
                  });
        case types.RECEIVE_UPDATE_USERINFORM_ACTION:
                  return Object.assign({}, state, {
                      loading: true,
                  });
        default:
            return state;
    }
}
