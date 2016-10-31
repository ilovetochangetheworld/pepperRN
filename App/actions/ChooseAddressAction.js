/**
 * 商品列表Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performChooseAddressAction(data){
     return dispatch => {
       dispatch(receiveChooseAddressResult(data));
     }
}

function receiveChooseAddressResult(data){
        return {
            type: types.RECEIVE_CHOOSE_ADDRESS_ACTION,
            data: data
        }

}
