'use strict';
import {combineReducers} from 'redux';
import login from './LoginReducers';
import classify from './ClassifyReducers'
import goodsList from './GoodsListReducers';
import goodsDetail from './GoodsDetailReducers';
import center from './CenterReducers';
import appMain from './AppMainReducers'
import cart from './CartReducers'
const rootReducer = combineReducers({
      login,
      classify,
      goodsList,
      goodsDetail,
      center,
      appMain,
      cart
})
export default rootReducer;
