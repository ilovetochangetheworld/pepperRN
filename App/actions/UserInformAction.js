/**
 * 个人信息更新
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performUserInformAction(token,name,sex,mobile,email){
     return dispatch => {
       dispatch(performUpdateUserInformResult());
       fetch(HOST+'/MemberInfo/updateUserInfo?token='+token, {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           "real_name": name,
           "sex":sex,
           "mobile":mobile,
           "emall":email
         })
       })
       .then((response) => response.json())
       .then((responseData)=>{
          if(responseData.status){
              //登录成功..
              toastShort('修改成功...');
              dispatch(receiveUpdateUserInformResult());
          }else{
              toastShort(responseData.msg);
          }
      //  dispatch(receiveGoodsDetailResult(responseData));
    })
  }
}

function performUpdateUserInformResult(){
        return {
            type: types.PERFORM_UPDATE_USERINFORM_ACTION,
        }
}

function receiveUpdateUserInformResult(result){
        return {
            type: types.RECEIVE_UPDATE_USERINFORM_ACTION,
            data: result
        }
}
