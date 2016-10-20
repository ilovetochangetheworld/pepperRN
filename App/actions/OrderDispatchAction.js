/**
 * 订单配送方式选择
 */
'use strict';

import * as types from '../common/ActionTypes';
import { toastShort } from '../utils/ToastUtil';

export function performOrderDispatchAction(num){
  return dispatch => {
    dispatch(receiveOrderDispatchAction(num));
  }
}

function receiveOrderDispatchAction(type){
        return {
            type: types.RECEIVE_ORDER_DISPATCH_ACTION,
            data: type,
        }

}
