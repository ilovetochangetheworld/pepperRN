/**
 * 购物车商家选择Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performShopSelectAction(cart,index){
  return dispatch => {
    cart.data.data[index].select=!cart.data.data[index].select;
      cart.data.data[index].products.map((product,proIndex) => {
        product.select=cart.data.data[index].select;
      })
      dispatch(receiveShopSelectResult(cart.data));
  }

}

function receiveShopSelectResult(result){
        return {
            type: types.RECEIVE_CART_ACTION,
            data: result,
        }

}
