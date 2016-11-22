/**
 * 商品列表Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';
import {ListView} from 'react-native';

export function performIndexGoodsAction(page){
     return dispatch => {
       //广告请求
       fetch(HOST+'product/searchProducts?is_recommend=1'+'&pageIndex='+ page +'&+pageSize=' + 40)
       .then((response) => response.json())
       .then((responseData)=>{
          if(responseData.status){
              //获取数据成功
              dispatch(receiveIndexGoodsResult(responseData));
          }else{
              toastShort(responseData.msg);
          }
       })
     }
}

function receiveIndexGoodsResult(result){
        return {
            type: types.RECEIVE_INDEX_ACTION,
            data: result,
            goodsListDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            .cloneWithRows(result.data.rows),
        }

}
