/**
 * 商品列表Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';
import ViewPager from 'react-native-viewpager';
import {ListView} from 'react-native';

export function performGoodsListAction(cate_id){
     var result = {};
     return dispatch => {
       //广告请求
        fetch(HOST+'basic/ads')
        .then((response) => response.json())
        .then((responseData)=>{
           if(responseData.status){
               //获取数据成功
               result.imgDataSource = responseData;
               //商品列表数据获取
               fetch(HOST+'product/searchProducts?cate_id='+cate_id+'&pageIndex='+ 1 +'&+pageSize=' + 10)
               .then((response) => response.json())
               .then((responseData)=>{
                  if(responseData.status){
                      //获取数据成功
                      result.productDetail = responseData;
                      dispatch(receiveGoodsListResult(result));
                  }else{
                      toastShort(responseData.msg);
                  }
               })
           }else{
               toastShort(responseData.msg);
           }
        });
        // dispatch(receiveGoodsDetailResult(responseData));
     }
}

function receiveGoodsListResult(result){
        return {
            type: types.RECEIVE_GOODSLIST_ACTION,
            data: result,
            goodsListDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            .cloneWithRows(result.productDetail.data.rows),
            imgDataSource: new ViewPager.DataSource({
              pageHasChanged: (p1, p2) => p1 !== p2,
            }).cloneWithPages(result.imgDataSource.data),
        }

}
