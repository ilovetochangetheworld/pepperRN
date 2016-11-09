/**
 * 批量删除购物车商品Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performDelCartItemAction(token,goodsList){
     return dispatch => {
       fetch(HOST+'MemberMall/delCartItemBatch?token='+token, {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(goodsList)
       })
       .then((response) => response.json())
       .then((responseData)=>{
          if(responseData.status){
              dispatch(changeCartAction());
          }else{
              toastShort(responseData.msg);
          }
    })
  }
}

function changeCartAction(){
        return {
            type: types.CHANGE_CART_ACTION,
        }

}
