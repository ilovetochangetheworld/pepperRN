/**
 * 2016.11.22 yixin 合伙人中心小店详情
 */

import {HOST} from '../common/request';

//用户小店信息接口
export function shopFxInfo(token){
  return fetch(`${HOST}MemberInfoExt/shopFxInfo?token=${token}`)
  .then((response) => response.json())
  .then((shopFxData) => {
    return shopFxData
  })
}
