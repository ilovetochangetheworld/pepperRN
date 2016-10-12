/**
 * 商品列表Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performAdsAction(){
     return dispatch => {
       //广告请求
        fetch(HOST+'basic/ads')
        .then((response) => response.json())
        .then((responseData)=>{
           if(responseData.status){
               //获取数据成功
               responseData;
           }else{
               toastShort(responseData.msg);
           }
          dispatch(receiveAdsResult(responseData));
        });
     }
}

function receiveAdsResult(result){
        return {
            type: types.RECEIVE_ADS_ACTION,
            imgDataSource: result.data
        }

}
