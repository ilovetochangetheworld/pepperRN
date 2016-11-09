'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    InteractionManager,
    TextInput,
    AsyncStorage,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import CommonHeader from '../../component/CommonHeader';
import Loading from '../../component/Loading.js';
var {height, width} = Dimensions.get('window');
import { NaviGoBack } from '../../utils/CommonUtils';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      console.log(this.props.order);
    });
  }

  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  _nullOrder() {
    return (
      <View style={{flex:1,backgroundColor:'#F2F2F2'}}>
        <CommonHeader title='我的订单' onPress={()=>{this.buttonBackAction()}} />
        <View style={{flexDirection:'row',justifyContent:'center',marginTop:100}}>
          <TouchableOpacity onPress={()=>{this._addAddress()}}>
            <Image style={{width:185,height:108,resizeMode:'stretch'}} source={require('../img/center/null_order.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  render(){
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
          <CommonHeader title='订单详情' onPress={()=>{this.buttonBackAction()}} />
          <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>

            <View style={{backgroundColor:'#fff',marginBottom:10}}>
              <View style={styles.orderInform}><Text style={styles.orderInform_Text}>订单状态：
                {this.props.order.status==0&&<Text style={{fontSize:14,color:'#FF240D'}}>待付款</Text>}
                {this.props.order.status==1&&<Text style={{fontSize:14,color:'#FF240D'}}>已取消</Text>}
                {this.props.order.status==2&&<Text style={{fontSize:14,color:'#FF240D'}}>已付款</Text>}
                {this.props.order.status==3&&<Text style={{fontSize:14,color:'#FF240D'}}>已发货</Text>}
                {this.props.order.status==4&&<Text style={{fontSize:14,color:'#FF240D'}}>用户确认收货</Text>}
                {this.props.order.status==5&&<Text style={{fontSize:14,color:'#FF240D'}}>系统确认收货</Text>}
              </Text></View>
              <View style={styles.orderInform}><Text style={styles.orderInform_Text}>订单号：{this.props.order.order_id}</Text></View>
              <View style={styles.orderInform}><Text style={styles.orderInform_Text}>下单时间：{this.props.order.add_time}</Text></View>
              <View style={styles.orderInform}><Text style={styles.orderInform_Text}>买家备注：{this.props.order.remark}</Text></View>
            </View>
            <View style={{paddingVertical:16,paddingHorizontal:10,height:76,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',marginBottom:10 }}>
              <View style={{width:30,height:44,flexDirection:'column',justifyContent:'flex-end',alignItems:'center'}}>
                <Image source={require('../img/addresssmall.png')} style={{width:14,height:17,resizeMode:'stretch'}}></Image>
              </View>
              <TouchableOpacity onPress={()=>{this._chooseAddress()}} style={{width:316,height:44,flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start'}}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={{color:'#000',fontSize:16,fontWeight:'bold',marginRight:30}}>{this.props.order.consignee}</Text>
                  <Text style={{color:'#000',fontSize:16,fontWeight:'bold',marginRight:6}}>{this.props.order.phone}</Text>
                  </View>
                <View><Text style={{color:'#000',fontSize:14,fontWeight:'bold',width:316}} numberOfLines={1} >收货地址：{this.props.order.provice_name}{this.props.order.city_name}{this.props.order.county_name}{this.props.order.address}</Text></View>
              </TouchableOpacity>
              <View style={{width:30,height:44,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                {/* <Image source={require('./imgs/pp_right.png')} style={{width:7,height:12}}></Image> */}
              </View>
            </View>
            <View style={{backgroundColor:'#fff'}}>
            {this.props.order.goods_list.map((data,index)=>{
              return (
                <View key={index} style={{height:96,flex:1,paddingHorizontal:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#e3e5e9'}}>
                  <Image source={{uri:data.img}} style={{height:76,width:76,resizeMode:'stretch'}}></Image>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:10}}>
                    <View style={{width:width/2,height:76,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',}}>
                      <Text style={{color:'#000'}}>{data.prod_name}</Text>
                    </View>
                    <View style={{flexDirection:'column',justifyContent:'space-between',alignItems:'flex-end',height:76}}>
                      <Text style={{fontSize:14,color:'#000'}}>¥ {data.goods_price}</Text>
                      <Text style={{fontSize:14,color:'#CBCBCB'}}>x {data.goods_num}</Text>
                    </View>
                  </View>
                </View>
              )
            })}
            </View>
            <View style={{height:48,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#e3e5e9',paddingHorizontal:10,marginBottom:10,backgroundColor:'#fff'}}>
              <Text style={{fontSize:14,color:'#81838e'}}>共{this.props.order.goods_list.length}件商品，运费:￥{this.props.order.postage}，实付:</Text>
              <Text style={{color:'#FF240D'}}>{this.props.order.real_pay}</Text>
            </View>
            <View style={{backgroundColor:'#fff',marginBottom:10}}>
              <View style={styles.orderInform}><Text style={styles.orderInform_Text}>商品价格：{this.props.order.real_pay}</Text></View>
              <View style={styles.orderInform}><Text style={styles.orderInform_Text}>运费：{this.props.order.postage}</Text></View>
              <View style={styles.orderInform}><Text style={styles.orderInform_Text}>实付金额：{this.props.order.real_pay}</Text></View>
              <View style={styles.orderInform}><Text style={styles.orderInform_Text}>支付方式：在线</Text></View>
            </View>
          </ScrollView>
        </View>
      )
    }
}

const styles=StyleSheet.create({
  orderInform:{
    height:40,
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  orderInform_Text:{
    fontSize:14,
    color:'#000'
  }
})
// export default Address;

function mapStateToProps(state) {
  const { orderDetail } = state;
  return {
    orderDetail
  }
}

export default connect(mapStateToProps)(OrderDetail);
