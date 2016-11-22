/**
 * 2016/11/12 yixin
 */
import {HOST} from  '../common/request';

//添加收藏
export function bePartner(token,username,phone,address) {
  return fetch(HOST+'MemberInfo/applyDistributor?token='+token,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "real_name":username, //联系人
      "mobile":phone, //联系电话
      "address":address,  //联系地址
    })
  })
  .then((response) => response.json())
  .then((partnerData)=>{
    return partnerData;
  })
}
