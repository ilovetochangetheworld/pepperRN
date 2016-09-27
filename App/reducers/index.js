'use strict';
import {combineReducers} from 'redux';
import login from './LoginReducers';
import classify from './ClassifyReducers'
import goodsList from './GoodsListReducers';
import goodsDetail from './GoodsDetailReducers';
import center from './CenterReducers';
import appMain from './AppMainReducers'
const rootReducer = combineReducers({
      login,
      classify,
      goodsList,
      goodsDetail,
      center,
      appMain
})
export default rootReducer;
