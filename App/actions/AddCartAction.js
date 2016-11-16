/**
 * 加入购物车Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performAddCartAction(token,goodsList,index,num){
     return dispatch => {
       fetch(HOST+'MemberMall/addToCart?token='+token, {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           type: 1,
           "shop_id":goodsList.shop.shop_id, //店铺ID
           "prod_id":goodsList.goods_list[index].prod_id, //产品ID
           "goods_id":goodsList.goods_list[index].goods_id,//货品ID
           "num":num  //数量
         })
       })
       .then((response) => response.json())
       .then((responseData)=>{
         console.log(responseData);
          if(responseData.status){
              //登录成功..
              toastShort('添加成功...');
              dispatch(changeCartAction());
          }else{
              toastShort(responseData.msg);
          }
      //  dispatch(receiveGoodsDetailResult(responseData));
    })
  }
}

function receiveGoodsDetailResult(result){
        return {
            type: types.RECEIVE_GOODSDETAIL_ACTION,
            data: result
        }
}

function changeCartAction(){
        return {
            type: types.CHANGE_CART_ACTION,
        }

}
