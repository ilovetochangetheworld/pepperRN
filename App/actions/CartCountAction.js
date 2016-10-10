/**
 * 加入购物车Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performCartCountAction(cart,index,proIndex,num){
     return dispatch => {
       console.log(cart);
       fetch(HOST+'MemberMall/addToCart?token='+cart.data.token, {
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
           "num":Number(num),
         })
       })
       .then((response) => response.json())
       .then((responseData)=>{
         console.log(responseData);
          if(responseData.status){
            cart.data.data[index].products[proIndex].num=Number(cart.data.data[index].products[proIndex].num)+Number(num);
            console.log(cart.data.data[index].products[proIndex].num);
          }else{
              toastShort(responseData.msg);
          }
       console.log(cart.data.data[index].products[proIndex].num);
       dispatch(receiveCartCountResult(cart.data));
    })
  }
}

function receiveCartCountResult(result){
        return {
            type: types.RECEIVE_CART_ACTION,
            data: result
        }

}
