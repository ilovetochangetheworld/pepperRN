/**
 * 商品列表Action
 */
'use strict';

import * as types from '../common/ActionTypes';
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';
import ViewPager from 'react-native-viewpager';
import {ListView} from 'react-native';

export function performAppMainAction(tab){
     var result = {};
     return dispatch => {
       //广告请求
        dispatch(receiveAppMainResult(tab));
     }
}

function receiveAppMainResult(tab){
        return {
            type: types.RECEIVE_APPMAIN_ACTION,
            data: tab,
        }

}
