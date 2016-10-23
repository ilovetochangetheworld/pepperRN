/**
 * 默认收货地址更改Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';
import {ListView} from 'react-native';

export function performDefaultAddressAction(type,address,index,token){
    console.log(address.data[index]);
     return dispatch => {
         switch (type) {
           //type:1 修改默认地址 type:2 删除地址
           case 1:
           fetch(HOST+'MemberInfo/updateAddress?token='+token, {
             method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({
               "address_id":address.data[index].address_id,
               "consignee":address.data[index].consignee,//联系人
               "phone":address.data[index].phone,//联系电话
               "zip_code":address.data[index].zip_code,//邮编
               "provice":address.data[index].provice, //省级地区ID
               "city":address.data[index].city, //市级地区ID
               "county":address.data[index].county,//区级地区ID
               "address":address.data[index].address,
               "is_default":1 //是否设置成默认地址
               })
             })
             .then((response) => response.json())
             .then((responseData)=>{
               console.log(responseData);
                if(responseData.status){
                    toastShort('修改默认地址成功');
                    // dispatch(receiveAddressResult());
                    fetch(HOST+'MemberInfo/getAddress?token='+token)
                    .then((response) => response.json())
                    .then((responseData)=>{
                      if(Number(responseData.code)==200){
                        dispatch(receiveAddressResult(responseData));
                      }else{
                        toastShort(responseData.msg);
                      }
                    })
                }else{
                    toastShort(responseData.msg);
                }
          })
        break;
        case 2:
          fetch(HOST+'MemberInfo/delAddress?token='+token, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "address_id":address.data[index].address_id,
              })
            })
            .then((response) => response.json())
            .then((responseData)=>{
              console.log(responseData);
               if(responseData.status){
                   toastShort('删除地址成功');
                   // dispatch(receiveAddressResult());
                   fetch(HOST+'MemberInfo/getAddress?token='+token)
                   .then((response) => response.json())
                   .then((responseData)=>{
                     if(Number(responseData.code)==200){
                       dispatch(receiveAddressResult(responseData));
                     }else{
                       toastShort(responseData.msg);
                     }
                   })
               }else{
                   toastShort(responseData.msg);
               }
         })
        break;
       }

   }
}

function receiveAddressResult(result){
        return {
          type: types.RECEIVE_ADDRESS_ACTION,
          data: result,
          addressList: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
          .cloneWithRows(result.data),
        }

}
