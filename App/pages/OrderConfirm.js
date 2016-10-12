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
var {height, width} = Dimensions.get('window');
import OrderResult from './OrderResult';
import CommonHeader from '../component/CommonHeader';

class OrderConfirm extends React.Component {

  constructor(props) {
    super(props);
    this.buttonBackAction=this.buttonBackAction.bind(this);
    this.payItemAction=this.payItemAction.bind(this);
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  //订单提交
  payItemAction(){
      const {navigator} = this.props;
      InteractionManager.runAfterInteractions(() => {
        navigator.push({
          component: OrderResult,
          name: 'OrderResult'
           });
        });
  }

  render() {
    const {navigator,route} = this.props;
    return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
          <CommonHeader title='订单详情' />
          <View style={{paddingHorizontal:12,height:48,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:'#fff',marginBottom:10}}>
            <Text style={{fontSize:16,color:'#000',marginRight:10}}>配送方式</Text>
            <View style={styles.dispatch}><Text style={styles.dispatch_text}>商家配送</Text></View>
            <View style={styles.dispatch}><Text style={styles.dispatch_text}>商家自提</Text></View>
          </View>
          <View style={{paddingVertical:16,height:76,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff'}}>
            <View style={{width:30,height:44,flexDirection:'column',justifyContent:'flex-end',alignItems:'center'}}>
              <Image source={require('../imgs/address.png')} style={{width:18,height:18}}></Image>
            </View>
            <View style={{width:316,height:44,flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start'}}>
              <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                <Text style={{color:'#000',fontSize:16,fontWeight:'bold',marginRight:30}}>刘大黑</Text>
                <Text style={{color:'#000',fontSize:16,fontWeight:'bold',marginRight:6}}>13260585618</Text>
                <View style={{width:62,height:16,backgroundColor:'#FF240D'}}><Text style={{fontSize:12,color:'#fff',textAlign:'center'}}>默认地址</Text></View>
              </View>
              <View>
                <Text style={{color:'#000',fontSize:14,fontWeight:'bold',width:316}} numberOfLines={1} >收货地址：湖南省长沙市岳麓区桐梓坡西路185号</Text>
              </View>
            </View>
            <View style={{width:30,height:44,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <Image source={require('../imgs/pp_right.png')} style={{width:7,height:12}}></Image>
            </View>
          </View>
          <Image source={require('../imgs/order_dash.png')} style={{height:2,width:width,resizeMode:'stretch',marginBottom:10}}></Image>
          <View style={{flex:1,justifyContent:'flex-end'}}>
                <TouchableOpacity onPress={()=>{this.payItemAction()}}>
                      <Image source={require('../imgs/cart/ic_cart_btn_bg.png')}
                             style={{width:width,height:40,justifyContent:'center',alignItems:'center'}}>
                             <Text style={{color:'white',fontSize:14,backgroundColor:'#00000000'}}>确定提交</Text>
                      </Image>
               </TouchableOpacity>
          </View>
       </View>
    );
  }
}
let styles = StyleSheet.create({
  dispatch:{
    height:26,
    width:76,
    borderWidth:1,
    borderColor:'#797979',
    marginRight:10,
    borderRadius:2
  },
  dispatch_text:{
    fontSize:16,
    color:'#797979',
    textAlign:'center'
  }
});
export default OrderConfirm
