/**
 * 获取地址Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performEditAddressAction(token,address_id,consignee,phone,zip_code,provice,city,county,address,is_default){
     return dispatch => {
       fetch(HOST+'MemberInfo/updateAddress?token='+token,{
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           "address_id": address_id,
           "consignee": consignee,
           "phone":phone,
           "zip_code":zip_code,
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
       dispatch(receiveAddressRefresh());
    })
     }
}

function receiveAddressRefresh(){
  return {
      type: types.RECEIVE_ADDRESS_REFRESH_ACTION
  }
}
