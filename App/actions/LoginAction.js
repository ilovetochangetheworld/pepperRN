/**
 * 用户登录Action操作
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST,LOGIN_ACTION} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performLoginAction(username,password){
     return dispatch => {
        dispatch(performLogin());
        fetch(HOST+'login/loginIn', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 1,
            user_name: username,
            password: password,
          })
        })
        .then((response) => response.json())
        .then((responseData)=>{
          // console.log(responseData);

           if(responseData.status){
               //登录成功..
               dispatch(receiveLoginResult(responseData));
                dispatch(receiveLoginResult());
               toastShort('登录成功...');
           }else{
               toastShort(responseData.msg);
           }
        })
        // .catch((error) => {
        //    toastShort('网络发生错误,请重试!')
        // });
     }
}

function performLogin() {
        return {
            type: types.PERFORM_LOGIN_ACTION,
        }
}

function isLogin() {
        return {
            type: types.IS_LOGIN,
        }
}

function receiveLoginResult(result){
        return {
            type: types.RECEIVE_LOGIN_ACTION,
            data: result,
        }
}
