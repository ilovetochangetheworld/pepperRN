/**
 * 2016/11/27 yixin
 */
import {HOST} from  '../common/request';

//获取我的团队
export function getMyTeam(token) {
  return fetch(HOST+'MemberInfoExt/subordinate?token='+token+'&pageIndex=1&pageSize=100')
  .then((response) => response.json())
  .then((myTeamData)=>{
    return myTeamData;
  })
}
