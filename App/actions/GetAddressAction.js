/**
 * 收货地址Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';
import {ListView} from 'react-native';

export function performGetAddressAction(token){
  return dispatch => {
    fetch(HOST+'MemberInfo/getAddress?token='+token)
    .then((response) => response.json())
    .then((responseData)=>{
      if(Number(responseData.code)==200){
        dispatch(receiveAddressResult(responseData));
      }else{
        if(Number(responseData.code)==400){
          dispatch(receiveNullCartResult());
        }else{
          toastShort(responseData.msg);
        }
      }
    })
  }
}

function receiveAddressResult(result){
        return {
            type: types.RECEIVE_ADDRESS_ACTION,
            data: result,
            addressList: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            .cloneWithRows(result.data),
        }
}

function receiveNullCartResult(){
        return {
            type: types.RECEIVE_NLL_ADDRESS_ACTION,
        }
}
