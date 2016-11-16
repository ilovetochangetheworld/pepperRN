/**
 * 获取地址Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';

export function performGetAreaAction(level,area_id){
     return dispatch => {
       if(level==4){
         dispatch(receiveAreaAction(area_id));
       }else{
         fetch(HOST+'basic/areas?level='+level+'&area_id='+area_id)
         .then((response) => response.json())
         .then((responseData)=>{
            if(responseData.status){
                //1初始化 2省 3市 4区
                switch (level) {
                  case 1:
                    dispatch(receiveAddAction(responseData,area_id));
                    break;
                  case 2:
                    dispatch(receiveProvinceAction(responseData,area_id));
                    break;
                  case 3:
                    dispatch(receiveCityAction(responseData,area_id));
                    break;
                }
                //登录成功..
                // toastShort('添加成功...');
            }else{
                toastShort(responseData.msg);
            }
      })
    }
  }
}

export function performEditAreaAction(level,area_id,provinceId,cityId,addressId){
     return dispatch => {
       if(level==4){
         dispatch(receiveAreaAction(area_id));
       }else{
         fetch(HOST+'basic/areas?level='+level+'&area_id='+area_id)
         .then((response) => response.json())
         .then((responseData)=>{
            if(responseData.status){
              console.log(responseData);
                //1初始化 2省 3市 4区
                switch (level) {
                  case 1:
                    dispatch(receiveAddAction(responseData,area_id));
                    dispatch(performEditAreaAction(2,provinceId))
                    break;
                  case 2:
                    dispatch(receiveProvinceAction(responseData,area_id));
                    dispatch(performEditAreaAction(3,cityId))
                    break;
                  case 3:
                    dispatch(receiveCityAction(responseData,area_id));
                    break;
                }
                //登录成功..
                // toastShort('添加成功...');
            }else{
                toastShort(responseData.msg);
            }
      })
    }
  }
}

//省
function receiveAddAction(result,area_id){
        return {
            type: types.RECEIVE_ADD_ACTION,
            data: result,
            selectProvince: {area_id:area_id}
        }
}

//市
function receiveProvinceAction(result,area_id){
        return {
            type: types.RECEIVE_PROVINCE_ACTION,
            data: result,
            selectProvince: {area_id:area_id}
        }
}

// 区
function receiveCityAction(result,area_id){
        return {
            type: types.RECEIVE_CITY_ACTION,
            data: result,
            selectCity: {area_id:area_id}
        }
}

function receiveAreaAction(area_id){
        return {
            type: types.RECEIVE_AREA_ACTION,
            selectArea: {area_id:area_id}
        }
}
