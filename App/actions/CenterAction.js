/**
 * 个人中心Action
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
               result.status=true;
               result.userInfo = responseData;
               dispatch(receiveUserResult(result));
           }else{
               toastShort(responseData.msg);
               dispatch(tokenRefresh());
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

function tokenRefresh(){
    return {
      type: types.TOKEN_REFRESH,
    }
}
