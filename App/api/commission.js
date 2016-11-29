/**
 * 2016/11/27 yixin
 */
import {HOST} from  '../common/request';

//获取分佣明细
export function getCommission(token) {
  return fetch(HOST+'MemberInfoExt/userWithdrawSum?token='+token)
  .then((response) => response.json())
  .then((commissionData)=>{
    return commissionData;
  })
}
