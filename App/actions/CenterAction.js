/**
 * 商品列表Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';
import ViewPager from 'react-native-viewpager';
import {ListView} from 'react-native';

export function performCenterAction(token){

     return dispatch => {
       //用户信息请求
        var result = {};
        fetch(HOST+'MemberInfo/getUserInfo?token='+token)
        .then((response) => response.json())
        .then((responseData)=>{
           if(responseData.status){
               //获取数据成功
               console.log(responseData);
               result.userInfo = responseData;
               //微信钱包数据请求
               fetch(HOST+'MemberInfo/wallet?token='+token)
               .then((response) => response.json())
               .then((responseData)=>{
                   if(responseData.status){
                       //获取数据成功
                       console.log(responseData);
                       result.wallet = responseData;
                       dispatch(receiveUserResult(result));
                   }else{
                       toastShort(responseData.msg);
                   }
                 })
           }else{
               toastShort(responseData.msg);
           }

        });
        // dispatch(receiveGoodsDetailResult(responseData));
     }
}

function receiveUserResult(result){
        return {
            type: types.RECEIVE_USER_ACTION,
            data: result,
        }

}
