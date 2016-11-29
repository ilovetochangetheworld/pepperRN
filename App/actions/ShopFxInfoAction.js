/**
 * 合伙人中心个人信息
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performShopFxInfoAction(token){
     return dispatch => {
        fetch(`${HOST}MemberInfoExt/shopFxInfo?token=${token}`)
        .then((response) => response.json())
        .then((shopFxData)=>{
           if(shopFxData.status){
               //获取数据成功
               dispatch(receiveShopFxInfoResult(shopFxData));
           }else{
               toastShort(responseData.msg);
           }

        });
     }
}

function receiveShopFxInfoResult(result){
        return {
            type: types.RECEIVE_SHOP_FX_INFO_ACTION,
            data: result,
        }

}
