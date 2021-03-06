'use strict';
import {combineReducers} from 'redux';
import login from './LoginReducers';
import classify from './ClassifyReducers'
import goodsList from './GoodsListReducers';
import goodsDetail from './GoodsDetailReducers';
import center from './CenterReducers';
import appMain from './AppMainReducers';
import cart from './CartReducers';
import index from './IndexReducers';
import ads from './AdsReducers';
import orderdispatch from './OrderDispatchReducers';
import address from './AddressReducers';
import getArea from './GetAreaReducers';
import chooseAddress from './ChooseAddressReducers';
import token from './TokenReducers';
import userinform from './UserInformReducers';
import orderconfirm from './OrderConfirmReducers';
import orderList from './OrderListReducers';
import orderCancel from './OrderCancelReducers';
import shopFxInfo from './ShopFxInfoReducers';
const rootReducer = combineReducers({
      login,
      classify,
      goodsList,
      goodsDetail,
      center,
      appMain,
      cart,
      index,
      ads,
      orderdispatch,
      address,
      getArea,
      chooseAddress,
      token,
      userinform,
      orderconfirm,
      orderList,
      orderCancel,
      shopFxInfo
})
export default rootReducer;
