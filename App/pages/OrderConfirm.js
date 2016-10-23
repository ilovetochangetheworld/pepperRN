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
  AsyncStorage
} from 'react-native';
import { NaviGoBack } from '../utils/CommonUtils';
import { connect } from 'react-redux';
import {performOrderDispatchAction} from '../actions/OrderDispatchAction';
import { performGetAddressAction } from '../actions/GetAddressAction';
var {height, width} = Dimensions.get('window');
import OrderResult from './OrderResult';
import Payment from './Payment';
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
  
  componentDidMount(){
    const {dispatch} = this.props;
    InteractionManager.runAfterInteractions(() => {
      AsyncStorage.getItem('token').then(
        (result)=>{
          if (result===null){
            InteractionManager.runAfterInteractions(() => {
                navigator.push({
                  component: Login,
                  name: 'Login'
                });
              });
          }else {
            console.log(result);
            dispatch(performGetAddressAction(result));
          }
        }
      )
      .catch((error)=>{
        console.log(' error:' + error.message);
      })
    })
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
          component: Payment,
          name: 'Payment'
           });
        });
  }

  render() {
    const {route,dispatch,orderdispatch,address} = this.props;

    var defaultAddress;
    if(!route.orderProduct){
      return (<Loading  />)
    }
    console.log(address);
    if(address.data){
      address.data.data.map((data,index)=>{
        if(data.is_default==1){
          defaultAddress = data;
          console.log(address);
        }
      })
    }

    let datalength=route.orderProduct.length;
    return (
      <View style={{backgroundColor:'#f5f5f5',flex:1}}>
          <CommonHeader title='订单详情' onPress={()=>{this.buttonBackAction()}} />
          <View style={{paddingHorizontal:12,height:48,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:'#fff',marginBottom:10}}>
            <Text style={{fontSize:16,color:'#000',marginRight:10}}>配送方式</Text>
            <TouchableOpacity onPress={()=>{dispatch(performOrderDispatchAction(1))}}><View style={[styles.dispatch,(orderdispatch.data==1) ? styles.dispatch_active : styles.dispatch_default]}><Text style={styles.dispatch_text}>商家配送</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={()=>{dispatch(performOrderDispatchAction(2))}}><View style={[styles.dispatch,(orderdispatch.data==2) ? styles.dispatch_active : styles.dispatch_default]}><Text style={styles.dispatch_text}>商家自提</Text></View></TouchableOpacity>
          </View>
          <View style={{paddingVertical:16,height:76,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff'}}>
            <View style={{width:30,height:44,flexDirection:'column',justifyContent:'flex-end',alignItems:'center'}}>
              <Image source={require('../imgs/addresssmall.png')} style={{width:18,height:18}}></Image>
            </View>
            {defaultAddress?
            <View style={{width:316,height:44,flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start'}}>
              <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                <Text style={{color:'#000',fontSize:16,fontWeight:'bold',marginRight:30}}>{defaultAddress.consignee}</Text>
                <Text style={{color:'#000',fontSize:16,fontWeight:'bold',marginRight:6}}>{defaultAddress.phone}</Text>
                <View style={{width:62,height:16,backgroundColor:'#FF240D'}}><Text style={{fontSize:12,color:'#fff',textAlign:'center'}}>默认地址</Text></View></View>
              <View><Text style={{color:'#000',fontSize:14,fontWeight:'bold',width:316}} numberOfLines={1} >收货地址：{defaultAddress.provice_name}{defaultAddress.city_name}{defaultAddress.county_name}{defaultAddress.address}</Text></View>
            </View>
            :<View><Text>没有默认地址</Text></View>}
            <View style={{width:30,height:44,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <Image source={require('../imgs/pp_right.png')} style={{width:7,height:12}}></Image>
            </View>
          </View>
          <Image source={require('../imgs/order_dash.png')} style={{height:2,width:width,resizeMode:'stretch',marginBottom:10}}></Image>
          <View style={{backgroundColor:'#fff'}}>
            <View style={{backgroundColor:'#fff',marginBottom:12}}>
              {route.orderProduct.map((data,index)=>{
                return(
                <View key={index} style={{width:width,height:81,paddingVertical:10,paddingHorizontal:12,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <TouchableOpacity style={{marginRight:13,height:61}}>
                    <Image source={{uri:data.list_img}} style={{height:61,width:61,resizeMode:'cover'}}></Image>
                  </TouchableOpacity>
                  <View style={{flex:1,height:81,paddingHorizontal:13,flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start'},(datalength!==(index+1))&&{borderBottomWidth:1,borderColor:'#F2F2F2'}}>
                    <View style={{flex:1}}><Text style={{fontSize:14,width:width-98}} numberOfLines={1}>{data.prod_name}</Text></View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flex:1,width:width-98}}>
                      <Text style={{color:'#FF240D',fontSize:16}}>{data.mall_price}</Text>
                      <Text style={{fontSize:14,color:'#5B5B5B'}}>X{data.num}</Text>
                    </View>
                  </View>
                </View>
              )})}
            </View>
            <TouchableOpacity style={{width:width-70,height:35,marginRight:35,marginLeft:35,backgroundColor:'#F2F2F2',borderRadius:3,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
              <Text style={{color:'#5B5B5B',fontSize:15,marginLeft:8}}>点击给卖家留言</Text>
            </TouchableOpacity>
            <View style={{height:46,flex:1,paddingHorizontal:12,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
              <Text style={{fontSize:15}}>共{route.totalNum}件商品，</Text><Text style={{fontSize:17,color:'#ff240d'}}>¥{route.totalPrice}</Text>
            </View>
          </View>
          <View style={{flex:1,justifyContent:'flex-end'}}>
                {/* <TouchableOpacity onPress={()=>{this.payItemAction()}}> */}
                <TouchableOpacity onPress={()=>{this.payItemAction()}}>
                      <View style={{width:width,height:50,flexDirection:'row',justifyContent:'center',alignItems:'center',borderTopWidth:1,borderTopColor:'#e3e5e9'}}>
                             <View style={{flex:1,height:50,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                               <Text style={{color:'#FF240D',fontSize:17,marginRight:16}}>支付金额：¥{route.totalPrice}</Text>
                             </View>
                             <View style={{backgroundColor:'#FF240D',height:50,width:122,justifyContent:'center',alignItems:'center'}}>
                              <Text style={{color:'white',fontSize:14}}>提交订单</Text>
                             </View>
                      </View>
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
    // borderColor:'#797979',
    marginRight:10,
    borderRadius:2
  },
  dispatch_active:{
    borderColor:'#FF240D',
  },
  dispatch_default:{
    borderColor:'#797979',
  },
  dispatch_text:{
    fontSize:16,
    color:'#797979',
    textAlign:'center'
  }
});
// export default OrderConfirm
function mapStateToProps(state){
  const {orderdispatch,address} = state;
  return {
    orderdispatch,
    address
  }
}

export default connect(mapStateToProps)(OrderConfirm)
