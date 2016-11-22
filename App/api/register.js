/**
 * by yixin 16/11/13
 */
import {HOST} from  '../common/request';

//注册
export function register(username,password) {
  return fetch(HOST+'login/regist',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "user_name":username,
      "passwrod":password,
    })
  })
  .then((response) => response.json())
  .then((registStatus)=>{
    return registStatus;
  })
}
