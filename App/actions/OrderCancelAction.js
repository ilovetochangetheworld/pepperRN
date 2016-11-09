/**
 * 用户登录Action操作
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST,LOGIN_ACTION} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';
import { performOrderListAction } from './OrderListAction';

export function performOrderCancelAction(token,order_id){
     return dispatch => {
        dispatch(performOrderCancel());
        fetch(HOST+'MemberOrder/orderCancel?token='+token, {
          method: 'POST',
          headers: {
          },
          body:  JSON.stringify({
            'order_id':order_id
          })
        })
        .then((response) => response.json())
        .then((responseData)=>{
          console.log(responseData);
           if(responseData.status){
              //登录成功..
              toastShort('已取消订单');
              dispatch(receiveOrderCancel());
              dispatch(performOrderListAction(token));
           }else{
               toastShort(responseData.msg);
           }
        })
        .catch((error) => {
          console.log(error);
           toastShort('网络发生错误,请重试!')
        });
     }
}

function performOrderCancel(){
        return {
            type: types.PERFORM_ORDER_CANCEL_ACTION,
        }
}

function receiveOrderCancel(){
        return {
            type: types.RECEIVE_ORDER_CANCEL_ACTION,
        }
}
