/**
 * 2016.11.24 yixin 店铺分享信息获取
 */

import {HOST} from '../common/request';

//用户小店信息接口
export function shopShare(token){
  return fetch(`${HOST}MemberInfoExt/shareUser?token=${token}`)
  .then((response) => response.json())
  .then((shopShareData) => {
    return shopShareData
  })
}
