/**
 * 用户钱包Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performCenterAction(token){

     return dispatch => {
       //用户信息请求
        var result = {};
        fetch(HOST+'MemberInfo/wallet?token='+token)
        .then((response) => response.json())
        .then((responseData)=>{
           if(responseData.status){
               //获取数据成功
               console.log(responseData);
               result.status=true;
               result.userInfo = responseData;
               dispatch(receiveUserResult(result));
           }else{
               toastShort(responseData.msg);
               result.status=false;
               dispatch(tokenRefresh(result));
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

function tokenRefresh(result){
        return {
          type: types.TOKEN_REFRESH,
        }
}
