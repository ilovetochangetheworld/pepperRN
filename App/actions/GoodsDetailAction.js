/**
 * 商品详情Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performGoodsDetailAction(type,data,token){
  // performGoodsDetailAction type: 1:商品数据请求 2:webView高度回调
     return dispatch => {
       switch (type) {
         case 1:
           fetch(HOST+'product/productDetail?id='+data+'&token='+token)
           .then((response) => response.json())
           .then((responseData)=>{
              if(responseData.status){
                  //获取数据成功
                  var ruleJSON=[];
                  responseData.data.goods_list.map((data,index)=>{
                    var arr = JSON.parse(data.rule_json);
                    arr.map((data,zindex)=>{
                      ruleJSON.push(data.attr_value);
                    })
                    responseData.data.goods_list[index].ruleJSON = ruleJSON;
                    responseData.data.goods_list[index].attrs = ruleJSON.toString();
                    ruleJSON=[];
                  })
                  dispatch(receiveGoodsDetailResult(responseData));
              }else{
                  toastShort(responseData.msg);
              }
           })
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
