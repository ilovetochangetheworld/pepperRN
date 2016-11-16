/**
 * by yixin 16/11/12
 */
import {HOST} from  '../common/request';

//获取收藏产品
export function getFav(token) {
  return fetch(HOST+'MemberMall/getProductFav?token='+token+'&pageIndex=1&pageSize=40')
  .then((response) => response.json())
  .then((favData) => {
    return favData;
  })
}

//添加收藏
export function addFav(token,prod_id) {
  return fetch(HOST+'MemberMall/addToFav?token='+token,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "prod_id":prod_id, //产品ID
      "goods_id":null//货品ID
    })
  })
  .then((response) => response.json())
  .then((favStatus)=>{
    return favStatus;
  })
}

//取消收藏
export function cancelFav(token,prod_id) {
  return fetch(HOST+'MemberMall/delFavItem?token='+token,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "prod_id":prod_id, //产品ID
      "goods_id":null//货品ID
    })
  })
  .then((response) => response.json())
  .then((favStatus)=>{
    return favStatus;
  })
}
