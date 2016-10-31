/**
 * 购物车Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performCartAction(token){
     return dispatch => {
       //购物车数据请求
        fetch(HOST+'MemberMall/getShoppingCart?token='+token)
        .then((response) => response.json())
        .then((responseData)=>{
           if(responseData.status){
               //获取数据成功
               responseData.totalNum=0;
               responseData.totalPrice=0;
               responseData.token=token;
               if(responseData.data){
                 responseData.data.map((data,index) => {
                   data.select=true;
                   data.products.map((product,index) => {
                     product.select=true;
                   })
                 })
               }
               dispatch(receiveCartResult(responseData));
           }else{
              if(Number(responseData.code)==400){
                if(responseData.msg==='登录超时，请重新登录'){
                  dispatch(tokenRefresh());
                }else{
                  dispatch(receiveNullCartResult());
                }
              }else{
                toastShort(responseData.msg);
              }
           }
        });

     }
}

function receiveCartResult(result){
        return {
            type: types.RECEIVE_CART_ACTION,
            data: result,
        }
}

function receiveNullCartResult(){
        return {
            type: types.RECEIVE_NLL_CART_ACTION,
        }
}

function tokenRefresh(){
    return {
      type: types.TOKEN_REFRESH,
    }
}
