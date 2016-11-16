/**
 * by yixin 16/11/16
 */
import {HOST} from  '../common/request';

//获取店铺详情
export function getShopDetail(shop_id) {
  return fetch(HOST+'Shop/shopDetail?shop_id='+shop_id)
  .then((response) => response.json())
  .then((shopData) => {
    return shopData;
  })
}

//获取店铺详情
export function getShopGoods(shop_id) {
  return fetch(HOST+'Shop/shopHasProducts?shop_id='+shop_id+'&pageIndex=1&pageSize=100')
  .then((response) => response.json())
  .then((shopGoodsData) => {
    return shopGoodsData;
  })
}
