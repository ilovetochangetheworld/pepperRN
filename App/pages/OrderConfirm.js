/**
 * 订单确认
 */
'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  InteractionManager,
  AsyncStorage,
  TouchableHighlight,
  TextInput,
  ScrollView
} from 'react-native';

import ProgressBar from  'ActivityIndicator';
import { NaviGoBack } from '../utils/CommonUtils';
import { connect } from 'react-redux';
import {performOrderDispatchAction} from '../actions/OrderDispatchAction';
import { performGetAddressAction } from '../actions/GetAddressAction';
var {height, width} = Dimensions.get('window');
import Login from './CenterContent/Login';
import { toastShort,toastLong } from '../utils/ToastUtil';
import Payment from './Payment';
import CommonHeader from '../component/CommonHeader';
import ChooseAddress from './ChooseAddress';
import { performOrderConfirmAction } from '../actions/OrderConfirmAction';
import Loading from '../component/Loading.js';

class OrderConfirm extends Component {

  constructor(props) {
    super(props);
    this.state={
      message:''
    }
    this.buttonBackAction=this.buttonBackAction.bind(this);
    this.payItemAction=this.payItemAction.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const {navigator} = this.props;
    if(nextProps.orderconfirm!==this.props.orderconfirm){
      if(nextProps.orderconfirm.data.status){
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: Payment,
              name: 'Payment',
              params: {
                   order_id: nextProps.orderconfirm.data.order_id
               }
            });
          });
      }
    }
  //  if(nextProps.login!==this.props.login){
  //    if(nextProps.login){
  //      InteractionManager.runAfterInteractions(() => {
  //        AsyncStorage.getItem('token').then(
  //          (token)=>{
  //            if (token===null){
  //              toastShort('没有获取到token');
  //              navigator.push({
  //                component: Login,
  //                name: 'Login'
  //              });
  //            }else {
  //              dispatch(performGetAddressAction(token));
  //            }
  //          }
  //        )
  //        .catch((error)=>{
  //          console.log(' error:' + error.message);
  //        })
  //      })
  //    }
  //  }
  }

  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  componentDidMount(){
    const {dispatch,navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      AsyncStorage.getItem('token').then(
        (token)=>{
          if (token===null){
            toastShort('没有获取到token');
            navigator.push({
              component: Login,
              name: 'Login'
            });
          }else {
            dispatch(performGetAddressAction(token));
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
  payItemAction(receive_id,pickup_place,consignee,phone,address,provice,city,county,zip_code,message,coupon_id,orderProduct){
    const {dispatch} = this.props;
      var goods_list=[]
      var goods_obj={};
      orderProduct.map((data,index)=>{
        goods_obj.shop_id = data.shop_id;
        goods_obj.prod_id = data.prod_id;
        goods_obj.goods_id = data.goods_id;
        goods_obj.num = data.num;
        goods_list.push(goods_obj);
        goods_obj = {};
      })
      let param={
         "receive_id":receive_id,//收货方式 1:快递 2:自提3:其他
         "pickup_place":pickup_place,//自提点ID 没有自提点传0
         "consignee":consignee,//收货人
         "phone":phone,//收货人手机号
         "send_address":address,//收货地址
         "send_province":provice,//收货省份ID
         "send_city":city,//收货市级ID
         "send_county":county,//收货区级ID
         "zip_code":zip_code,//邮政编码
         "custom_remark":message,//客户备注
         "coupon_id":0,//优惠券ID
         "goods_list":goods_list
      }
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
              dispatch(performOrderConfirmAction(result,param));
            }
          }
        )
        .catch((error)=>{
          console.log(' error:' + error.message);
        })
      })

  }

  //选择地址
  _chooseAddress(){
      const {navigator} = this.props;
      InteractionManager.runAfterInteractions(() => {
        navigator.push({
          component: ChooseAddress,
          name: 'ChooseAddress'
           });
        });
  }

  render() {
    const {route,dispatch,orderdispatch,address,chooseAddress,orderconfirm} = this.props;
    console.log(route);
    var defaultAddress;
    if(!route.orderProduct||orderconfirm.loading){
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
          <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
            <CommonHeader title='订单详情' onPress={()=>{this.buttonBackAction()}} />
            <ProgressBar />
          </ScrollView>
        </View>
      )
    }
    if(chooseAddress.data){
      defaultAddress = chooseAddress.data;
    }else{
      if(address.data.data){
        address.data.data.map((data,index)=>{
          if(data.is_default==1){
            defaultAddress = data;
          }
        })
      }
    }
    let datalength=route.orderProduct.length;
    return (
      <View style={{backgroundColor:'#f5f5f5',flex:1}}>
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
          <CommonHeader title='订单详情' onPress={()=>{this.buttonBackAction()}} />
          <View style={{paddingHorizontal:12,height:48,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:'#fff',marginBottom:10}}>
            <Text style={{fontSize:16,color:'#000',marginRight:10}}>配送方式</Text>
            <TouchableOpacity onPress={()=>{dispatch(performOrderDispatchAction(1))}}><View style={[styles.dispatch,(orderdispatch.data==1) ? styles.dispatch_active : styles.dispatch_default]}><Text style={styles.dispatch_text}>商家配送</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={()=>{dispatch(performOrderDispatchAction(2))}}><View style={[styles.dispatch,(orderdispatch.data==2) ? styles.dispatch_active : styles.dispatch_default]}><Text style={styles.dispatch_text}>商家自提</Text></View></TouchableOpacity>
          </View>
          {defaultAddress?
          <View>
            <View style={{paddingVertical:16,height:76,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff' }}>
              <View style={{width:30,height:44,flexDirection:'column',justifyContent:'flex-end',alignItems:'center'}}>
                <Image source={require('./img/addresssmall.png')} style={{width:14,height:17,resizeMode:'stretch'}}></Image>
              </View>
              <TouchableOpacity onPress={()=>{this._chooseAddress()}} style={{width:316,height:44,flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start'}}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={{color:'#000',fontSize:16,fontWeight:'bold',marginRight:30}}>{defaultAddress.consignee}</Text>
                  <Text style={{color:'#000',fontSize:16,fontWeight:'bold',marginRight:6}}>{defaultAddress.phone}</Text>
                  <View style={{width:62,height:16,backgroundColor:'#FF240D'}}><Text style={{fontSize:12,color:'#fff',textAlign:'center'}}>默认地址</Text></View></View>
                <View><Text style={{color:'#000',fontSize:14,fontWeight:'bold',width:316}} numberOfLines={1} >收货地址：{defaultAddress.provice_name}{defaultAddress.city_name}{defaultAddress.county_name}{defaultAddress.address}</Text></View>
              </TouchableOpacity>
              <View style={{width:30,height:44,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <Image source={require('./img/pp_right.png')} style={{width:7,height:12}}></Image>
              </View>
            </View>
            <Image source={require('./img/order_dash.png')} style={{height:2,width:width,resizeMode:'stretch',marginBottom:10}}></Image>
          </View>
          :<TouchableOpacity onPress={()=>{this._chooseAddress()}} style={{height:50,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:12,backgroundColor:'#fff',alignItems:'center',marginBottom:10}}>
          <View style={{height:50,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <Image source={require('./img/add_blue.png')} style={{height:24,width:24,resizeMode:'stretch',marginRight:8}}></Image>
            <Text style={{fontSize:17}}>添加收货地址</Text>
          </View>
          <Image source={require('./img/pp_right.png')} style={{width:7,height:12}}></Image>
          </TouchableOpacity> }

          <View style={{backgroundColor:'#fff',marginBottom:40}}>
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
              <TextInput
              multiline={true}
              style={{fontSize:15,marginLeft:8,borderBottomWidth:0,backgroundColor:'#F2F2F2',width:width-16,padding:6}}
              onChangeText={(message) => this.setState({message})}
              underlineColorAndroid={'transparent'}
              placeholderTextColor={'#5B5B5B'}
              placeholder={'点击给卖家留言'} />
            {/* </View> */}
            <View style={{height:46,flex:1,paddingHorizontal:12,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
              <Text style={{fontSize:15}}>共{route.totalNum}件商品，</Text><Text style={{fontSize:17,color:'#ff240d'}}>¥{route.totalPrice}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={{height:50,justifyContent:'flex-end'}}>
              {defaultAddress?
                <TouchableOpacity onPress={()=>{this.payItemAction(orderdispatch.data,0,defaultAddress.consignee,defaultAddress.phone,defaultAddress.provice_name+defaultAddress.city_name+defaultAddress.county_name+defaultAddress.address,defaultAddress.provice,defaultAddress.city,defaultAddress.county,null,this.state.message,0,route.orderProduct)}}>
                      <View style={{width:width,height:50,flexDirection:'row',justifyContent:'center',alignItems:'center',borderTopWidth:1,borderTopColor:'#e3e5e9',backgroundColor:'#fff'}}>
                             <View style={{flex:1,height:50,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                               <Text style={{color:'#FF240D',fontSize:17,marginRight:16}}>支付金额：¥{route.totalPrice}</Text>
                             </View>
                             <View style={{backgroundColor:'#FF240D',height:50,width:122,justifyContent:'center',alignItems:'center'}}>
                              <Text style={{color:'white',fontSize:14}}>提交订单</Text>
                             </View>
                      </View>
               </TouchableOpacity>:
               <TouchableOpacity onPress={()=>{toastShort('请选择收货地址!')}}>
                     <View style={{width:width,height:50,flexDirection:'row',justifyContent:'center',alignItems:'center',borderTopWidth:1,borderTopColor:'#e3e5e9',backgroundColor:'#fff'}}>
                            <View style={{flex:1,height:50,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                              <Text style={{color:'#FF240D',fontSize:17,marginRight:16}}>支付金额：¥{route.totalPrice}</Text>
                            </View>
                            <View style={{backgroundColor:'#FF240D',height:50,width:122,justifyContent:'center',alignItems:'center'}}>
                             <Text style={{color:'white',fontSize:14}}>提交订单</Text>
                            </View>
                     </View>
              </TouchableOpacity>}

        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  dispatch:{
    height:26,
    width:76,
    borderWidth:1,
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
  },
});
// export default OrderConfirm
function mapStateToProps(state){
  const {orderdispatch,address,chooseAddress,orderconfirm} = state;
  return {
    orderdispatch,
    address,
    chooseAddress,
    orderconfirm,
  }
}

export default connect(mapStateToProps)(OrderConfirm)
