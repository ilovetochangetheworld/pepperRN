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

//用户小店详情接口
export function shopFxShopInfo(user_id){
  return fetch(`${HOST}Shop/shopFxInfo?user_id=${user_id}`)
  .then((response) => response.json())
  .then((shopFxData) => {
    return shopFxData
  })
}

//用户小店详情接口
export function shopFxDetailInfo(user_id){
  return fetch(`${HOST}Shop/shopFxProducts?user_id=${user_id}`)
  .then((response) => response.json())
  .then((shopFxData) => {
    return shopFxData
  })
}
