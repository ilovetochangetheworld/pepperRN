/**
 * 分类列表Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performClassifyAction(type,active,index){

     return dispatch => {
       //广告请求
       if(type==0){
         fetch(HOST+'basic/categorys')
         .then((response) => response.json())
         .then((responseData)=>{
            if(responseData.status){
                //获取数据成功
                dispatch(receiveClassifyResult(responseData));
            }else{
                toastShort(responseData.msg);
            }
         });
       }
       if(type==1){
         dispatch(receiveMenuActive(active,index));
       }
        // dispatch(receiveGoodsDetailResult(responseData));
     }
}

function receiveClassifyResult(result){
        return {
            type: types.RECEIVE_CLASSIFY_ACTION,
            data: result,
        }
}

function receiveMenuActive(active,index){
        console.log(active);
        return {
            type: types.RECEIVE_ACTIVE_ACTION,
            active: active,
            index: index
        }
}
