/**
 * by yixin 16/11/13
 */
import {HOST} from  '../common/request';

//获取订单详情
export function getOrderDetail(token,order_id) {
  return fetch(HOST+'MemberOrder/getOrderDetail?token='+token+'&order_id='+order_id)
  .then((response) => response.json())
  .then((orderData)=>{
    return orderData;
  })
}

//确认收货
export function orderConfirm(token,order_id) {
  return fetch(HOST+'MemberOrder/orderConfirm?token='+token,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "order_id":order_id, //订单ID
    })
  })
  .then((response) => response.json())
  .then((orderStatus)=>{
    return orderStatus;
  })
}
