/**
 * 订单确认
 */
'use strict';
import React from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  InteractionManager,
} from 'react-native';
import { NaviGoBack } from '../utils/CommonUtils';
import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
import CommonHeader from '../component/CommonHeader';
import CenterItem from '../component/CenterItem';

class Payment extends React.Component {

  constructor(props) {
    super(props);
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  render() {
    return (
      <View style={{backgroundColor:'#f5f5f5',flex:1}}>
          <CommonHeader title='支付方式' onPress={()=>{this.buttonBackAction()}} />
          <CenterItem
             title='支付宝'
             icon={require('../imgs/alipay.png')}/>
          <View style={{backgroundColor:'#f2f2f2',height:10,marginLeft:8,marginRight:8,}}></View>
          <CenterItem
             title='微信'
             icon={require('../imgs/wxpay.png')}/>
          <View style={{backgroundColor:'#f2f2f2',height:10,marginLeft:8,marginRight:8,}}></View>
          <CenterItem
             title='钱包支付'
             icon={require('../imgs/balance.png')}/>
          <View style={{backgroundColor:'#f2f2f2',height:10,marginLeft:8,marginRight:8,}}></View>
       </View>
    );
  }
}

export default Payment
// function mapStateToProps(state){
//   const {orderdispatch} = state;
//   return {
//     orderdispatch
//   }
// }
//
// export default connect(mapStateToProps)(OrderConfirm)
