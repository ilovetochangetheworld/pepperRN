/**
 * 删除购物车商品Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performDelCartAction(cart,index,proIndex){
     return dispatch => {
       fetch(HOST+'MemberMall/delCartItem?token='+cart.data.token, {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           type: 1,
           "shop_id":cart.data.data[index].products[proIndex].shop_id, //店铺ID
           "prod_id":cart.data.data[index].products[proIndex].prod_id, //产品ID
           "goods_id":cart.data.data[index].products[proIndex].goods_id,//货品ID
         })
       })
       .then((response) => response.json())
       .then((responseData)=>{
         console.log(responseData);
          if(responseData.status){
              //删除成功..
              cart.data.data[index].products.splice(proIndex,1);
              toastShort('删除成功！');
          }else{
              toastShort(responseData.msg);
          }
       dispatch(receiveDelCartResult(cart.data));
    })
  }
}

function receiveDelCartResult(result){
        return {
            type: types.RECEIVE_CART_ACTION,
            data: result
        }

}
