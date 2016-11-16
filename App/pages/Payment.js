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
import {HOST} from  '../common/request';
import { toastShort } from '../utils/ToastUtil';
import Order from './CenterContent/Order'
import * as Wechat from 'react-native-wechat';


class Payment extends React.Component {

  constructor(props) {
    super(props);
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  componentDidMount(){

  }

  _wxPay(){
    const {navigator} = this.props;
    fetch(HOST+'wx/appPay?order_id='+this.props.order_id)
    .then((response) => response.json())
    .then((responseData)=>{
    Wechat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          Wechat.pay({
            partnerId: responseData.partnerid, // 商家向财付通申请的商家id
            prepayId: responseData.prepayid, // 预支付订单
            nonceStr: responseData.noncestr, // 随机串，防重发
            timeStamp: String(responseData.timestamp), // 时间戳，防重发
            package: responseData.package, // 商家根据财付通文档填写的数据和签名
            sign: responseData.sign // 商家根据微信开放平台文档对数据做的签名
          }
        )
        // .then(()=>{
        //   navigator.push({
        //     component: Order,
        //     name: 'Order'
        //   });
        // }
        // )
          .catch((error) => {
            console.log(error);
            toastShort(error.message);
          });
          navigator.push({
              component: Order,
              name: 'Order'
            });
        } else {
          toastShort('没有安装微信软件，请您安装微信之后再试');
        }
      })
    })
  }

  shareToSession() {
    Wechat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          Wechat.shareToSession({
            title: 'React Native开发的嘎嘎商城哦~赶紧来体验吧...',
            description: '分享自:嘎嘎商城-微信订阅号:codedev123',
            thumbImage: 'http://lookcode-wordpress.stor.sinaapp.com/uploads/2016/01/react_native1.jpg',
            type: 'news',
            webpageUrl: 'http://wwww.lcode.org'
          })
            .catch((error) => {
              Toast.show(error.message);
            });
        } else {
          Toast.show('没有安装微信软件，请您安装微信之后再试');
        }
      });
  }

  render() {
    return (
      <View style={{backgroundColor:'#f5f5f5',flex:1}}>
          <CommonHeader title='支付方式' onPress={()=>{this.buttonBackAction()}} />
          {/* <CenterItem
             title='支付宝'
             icon={require('img/alipay.png')}
             onPress={()=>{this.shareToSession()}}/>
          <View style={{backgroundColor:'#f2f2f2',height:10,marginLeft:8,marginRight:8,}}></View> */}
          <CenterItem
             title='微信'
             icon={require('./img/wxpay.png')}
             onPress={()=>{this._wxPay()}}/>
          <View style={{backgroundColor:'#f2f2f2',height:10,marginLeft:8,marginRight:8,}}></View>
          {/* <CenterItem
             title='钱包支付'
             icon={require('img/balance.png')}/>
          <View style={{backgroundColor:'#f2f2f2',height:10,marginLeft:8,marginRight:8,}}></View> */}
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
