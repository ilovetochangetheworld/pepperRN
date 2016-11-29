/**
 * 2016/11/27 yixin
 */
import {HOST} from  '../common/request';

//获取分佣明细
export function getUserCommission(token) {
  return fetch(HOST+'MemberInfoExt/userCommission?token='+token+'&pageIndex=1&pageSize=100')
  .then((response) => response.json())
  .then((userCommissionData)=>{
    return userCommissionData;
  })
}
