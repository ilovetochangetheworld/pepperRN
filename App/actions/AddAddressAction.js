/**
 * 获取地址Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performAddAddressAction(token,consignee,phone,zip_code,provice,city,county,address,is_default){
     return dispatch => {
       fetch(HOST+'MemberInfo/addAddress?token='+token,{
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           "consignee": consignee,
           "phone":phone,
           "prod_id":zip_code,
           "provice":provice,
           "city":city,
           "county":county,
           "address":address,
           "is_default":is_default
         })
       })
       .then((response) => response.json())
       .then((responseData)=>{
         console.log(responseData);
          if(responseData.status){
              //登录成功..
              toastShort('添加成功...');
          }else{
              toastShort(responseData.msg);
          }
      //  dispatch(receiveGoodsDetailResult(responseData));
    })
     }
}
