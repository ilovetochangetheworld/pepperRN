/**
 * 商品详情Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performGoodsDetailAction(type,data){
  // performGoodsDetailAction type: 1:商品数据请求 2:webView高度回调
     return dispatch => {
       switch (type) {
         case 1:
           fetch(HOST+'product/productDetail?id='+data)
           .then((response) => response.json())
           .then((responseData)=>{
              dispatch(receiveGoodsDetailResult(responseData));
              if(responseData.status){
                  //获取数据成功
              }else{
                  toastShort(responseData.msg);
              }
           })
           break;
           case 2:

             break;
         default:

       }

     }
}

function receiveGoodsDetailResult(result){
        return {
            type: types.RECEIVE_GOODSDETAIL_ACTION,
            data: result
        }

}
