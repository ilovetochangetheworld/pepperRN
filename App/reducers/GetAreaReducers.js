/**
 * 获取地区Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    Province:{data:[{region_name:'请选择',region_id:''}]},
    City:{data:[{region_name:'请选择',region_id:''}]},
    Area:{data:[{region_name:'请选择',region_id:''}]},
    selectProvince:{area_id:'请选择'},
    selectCity:{area_id:'请选择'},
    selectArea:{area_id:'请选择'},
}

export default function getArea(state = initialState, action){
    switch (action.type) {
        case types.RECEIVE_ADD_ACTION:
                  return Object.assign({}, state, {
                       Province: action.data,
                       selectProvince: action.selectProvince
                  });
        case types.RECEIVE_PROVINCE_ACTION:
                  return Object.assign({}, state, {
                       City: action.data,
                       selectProvince: action.selectProvince
                  });
        case types.RECEIVE_CITY_ACTION:
                  return Object.assign({}, state, {
                       Area: action.data,
                       selectCity: action.selectCity
                  });
        case types.RECEIVE_AREA_ACTION:
                  return Object.assign({}, state, {
                       selectArea: action.selectArea
                  });
        default:
            return state;
    }
}
