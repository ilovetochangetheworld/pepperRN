/**
 * 用户登录Action操作
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST,LOGIN_ACTION} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';
import { performDelCartItemAction } from './DelCartItemAction';

export function performOrderConfirmAction(token,param){
     return dispatch => {
        dispatch(performOrderConfirm());
        fetch(HOST+'MemberOrder/addOrder?token='+token, {
          method: 'POST',
          headers: {
          },
          body:  JSON.stringify(param)
        })
        .then((response) => response.json())
        .then((responseData)=>{
           if(responseData.status){
              //登录成功..
              toastShort('订单提交成功');
              dispatch(receiveOrderConfirm(responseData));
              //删除购物车数据
              dispatch(performDelCartItemAction(token,param.goods_list));
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

function performOrderConfirm() {
        return {
            type: types.PERFORM_ORDER_CONFIRM_ACTION,
        }
}

function receiveOrderConfirm(data) {
        return {
            type: types.RECEIVE_ORDER_CONFIRM_ACTION,
            data: data
        }
}
