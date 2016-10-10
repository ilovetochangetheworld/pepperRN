/**
 * 购物车商品选择Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performProductSelectAction(cart,index,proIndex){
  return dispatch => {
    // let allSelect=true
    var allSelect=true;
    cart.data.data[index].products[proIndex].select=!cart.data.data[index].products[proIndex].select;
    cart.data.data[index].products.map((product,proIndex) => {
      if(!product.select){
        allSelect=product.select;
      }
    });
    if(allSelect){
      cart.data.data[index].select=true;
    }else{
      cart.data.data[index].select=false;
    }
    dispatch(receiveProductSelectResult(cart.data));
  }

}

function receiveProductSelectResult(result){
        return {
            type: types.RECEIVE_CART_ACTION,
            data: result,
        }

}
