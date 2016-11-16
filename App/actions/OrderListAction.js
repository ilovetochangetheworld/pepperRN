/**
 * 订单列表Action操作
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performOrderListAction(token){
     return dispatch => {
        dispatch(performOrderList());
        fetch(HOST+'MemberOrder/getOrders?token='+token+'&pageIndex=1&pageSize=40')
        .then((response) => response.json())
        .then((responseData)=>{
           if(responseData.status){
             dispatch(receiveOrderList(responseData));
           }else{
               toastShort(responseData.msg);
           }
        })
        .catch((error) => {
           toastShort('网络发生错误,请重试!')
        });
     }
}

function performOrderList() {
        return {
            type: types.PERFORM_ORDER_LIST_ACTION,
        }
}

function receiveOrderList(data) {
        console.log(data);
        return {
            type: types.RECEIVE_ORDER_LIST_ACTION,
            data: data
        }
}
