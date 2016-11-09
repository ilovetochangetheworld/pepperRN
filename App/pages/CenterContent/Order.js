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
    ListView,
    Alert
} from 'react-native';

import { connect } from 'react-redux';
import { performGetAddressAction } from '../../actions/GetAddressAction';
import CommonHeader from '../../component/CommonHeader';
import Loading from '../../component/Loading.js';
var {height, width} = Dimensions.get('window');
import { NaviGoBack } from '../../utils/CommonUtils';
import { performOrderListAction } from '../../actions/OrderListAction';
import Payment from '../Payment';
import OrderDetail from './OrderDetail';
import { performOrderCancelAction } from '../../actions/OrderCancelAction';

class Order extends Component {
  constructor(props) {
    super(props);
    var orderListData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      order_active:-1,
      renderPlaceholderOnly:true,
      orderListData
    }
    this._renderList=this._renderList.bind(this);
  }

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      const {navigator,dispatch} = this.props;
      this._checkLogin();
      this.setState({renderPlaceholderOnly: false})
    });
  }

  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.orderList!==this.props.orderList){
      if(nextProps.orderList.data.status){
        this.setState({
          orderListData:this.state.orderListData.cloneWithRows(nextProps.orderList.data.data.rows),
          renderPlaceholderOnly: false
        })
      }
    }
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

  //登录检测
  _checkLogin(){
    InteractionManager.runAfterInteractions(() => {
      const {navigator,dispatch} = this.props;
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
            dispatch(performOrderListAction(result));
          }
        }
      )
      .catch((error)=>{
        console.log(' error:' + error.message);
      })
    })
  }
  //Order操作

  _orderItem(status,order_id){
    const {navigator,dispatch} = this.props;
    //1、支付
    switch (status) {
      case 1:
      navigator.push({
        component: Payment,
        name: 'Payment',
        params: {
             order_id: order_id
         }
      });
          break;
    //2、取消订单
      case 2:
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
            dispatch(performOrderCancelAction(result,order_id));
          }
        }
      )
      .catch((error)=>{
        console.log(' error:' + error.message);
      })
          break;
      default:

    }
  }

  //订单操作
  _orderOperation(type,order){
    const {navigator} = this.props;
    switch (type) {
      case 1:
      navigator.push({
        component: OrderDetail,
        name: 'OrderDetail',
        params: {
             order: order
         }
      });
        break;
      default:

    }
  }

  //订单列表List渲染
  _renderList(data){
    if(this.state.order_active==-1||data.status==this.state.order_active){
      return(
        <View style={{backgroundColor:'#fff',marginBottom:10}}>
          <View style={styles.orderListTitle}>
            <Text style={{fontSize:16,fontWeight:'bold',color:'#000'}}>
              {data.order_id}
            </Text>
              {data.status==0&&<Text style={{fontSize:14,color:'#FF240D'}}>待付款</Text>}
              {data.status==1&&<Text style={{fontSize:14,color:'#FF240D'}}>已取消</Text>}
              {data.status==2&&<Text style={{fontSize:14,color:'#FF240D'}}>已付款</Text>}
              {data.status==3&&<Text style={{fontSize:14,color:'#FF240D'}}>已发货</Text>}
              {data.status==4&&<Text style={{fontSize:14,color:'#FF240D'}}>用户确认收货</Text>}
              {data.status==5&&<Text style={{fontSize:14,color:'#FF240D'}}>系统确认收货</Text>}
          </View>
          {data.goods_list.map((data,index)=>{
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
          <View style={{height:48,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#e3e5e9',paddingHorizontal:10}}>
            <Text style={{fontSize:14,color:'#81838e'}}>共{data.goods_list.length}件商品，运费:￥{data.postage}，实付:</Text>
            <Text style={{color:'#FF240D'}}>{data.real_pay}</Text>
          </View>
          <View style={{height:48,flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
            {data.status==0&&
              <TouchableOpacity onPress={()=>{this._orderItem(1,data.order_id)}} style={[styles.orderBtn,{borderColor:'#FF240D'}]}>
                <Text style={{fontSize:16,color:'#FF240D'}}>去支付</Text>
              </TouchableOpacity>
            }
            {((data.status==4||data.status==5)&&data.comment_status>0)&&
              <View style={[styles.orderBtn,{borderColor:'#FF240D'}]}>
                <Text style={{fontSize:16,color:'#FF240D'}}>去评价</Text>
              </View>
            }
            {(data.status==3&&data.is_return_goods==0)&&
              <TouchableOpacity style={[styles.orderBtn,{borderColor:'#FF240D'}]}  onPress={() => Alert.alert(
                  '取消订单',
                  '确定要取消订单吗？',
                  [
                    {text: '稍后再说'},
                    {text: '确定', onPress: () => {this._orderItem(3,data.order_id)}},
                  ]
                )}>
                <Text style={{fontSize:16,color:'#FF240D'}}>确认收货</Text>
              </TouchableOpacity>
            }
            {data.status==0&&
              <TouchableOpacity
                style={[styles.orderBtn,{borderColor:'#797979'}]}
                onPress={() => Alert.alert(
                  '取消订单',
                  '确定要取消订单吗？',
                  [
                    {text: '稍后再说'},
                    {text: '确定', onPress: () => {this._orderItem(2,data.order_id)}},
                  ]
                )}>
                <Text style={{fontSize:16,color:'#797979'}}>取消订单</Text>
              </TouchableOpacity>
            }
            {/* onPress={()=>{this._orderItem(2,data.order_id)}} */}
            {(data.status==2&&data.is_refund>0)&&
              <View style={[styles.orderBtn,{borderColor:'#797979'}]}>
                <Text style={{fontSize:16,color:'#797979'}}>申请退款</Text>
              </View>
            }
            {(data.status==3&&data.isReturnStatus>0)&&
              <View style={[styles.orderBtn,{borderColor:'#797979'}]}>
                <Text style={{fontSize:16,color:'#797979'}}>申请退货</Text>
              </View>
            }
            <TouchableOpacity onPress={()=>{this._orderOperation(1,data)}} style={[styles.orderBtn,{borderColor:'#797979'}]}>
              <Text style={{fontSize:16,color:'#797979'}}>订单详情</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }else{
      return (<View></View>)
    }

  }

  render(){
    const {orderCancel} = this.props;
    if(this.state.renderPlaceholderOnly||orderCancel.loading){
      return (
        <Loading visible={true} />
      )
    }else{
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
            <CommonHeader title='我的订单' onPress={()=>{this.buttonBackAction()}} />
            <View style={{height:46,width:width,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:'#fff',marginBottom:10}}>
              <TouchableOpacity onPress={() => this.setState({order_active:-1})} style={{flex:1,alignItems:'center',justifyContent:'center',paddingHorizontal:16}}>
                <View style={[styles.orderItem,this.state.order_active===-1&&{borderBottomWidth:4,borderBottomColor:'#FF240D'}]}>
                  <Text style={[{fontSize:16},this.state.order_active===-1&&{color:'#FF240D'}]}>
                    全部
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.setState({order_active:0})} style={{flex:1,alignItems:'center',justifyContent:'center',paddingHorizontal:16}}>
                <View style={[styles.orderItem,this.state.order_active===0&&{borderBottomWidth:4,borderBottomColor:'#FF240D'}]}>
                  <Text style={[{fontSize:16},this.state.order_active===0&&{color:'#FF240D'}]}>
                    待付款
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.setState({order_active:2})} style={{flex:1,alignItems:'center',justifyContent:'center',paddingHorizontal:16}}>
                <View style={[styles.orderItem,this.state.order_active===2&&{borderBottomWidth:4,borderBottomColor:'#FF240D'}]}>
                  <Text style={[{fontSize:16},this.state.order_active===2&&{color:'#FF240D'}]}>
                    待发货
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.setState({order_active:3})} style={{flex:1,alignItems:'center',justifyContent:'center',paddingHorizontal:16}}>
                <View style={[styles.orderItem,this.state.order_active===3&&{borderBottomWidth:4,borderBottomColor:'#FF240D'}]}>
                  <Text style={[{fontSize:16},this.state.order_active===3&&{color:'#FF240D'}]}>
                    待收货
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.setState({order_active:4})} style={{flex:1,alignItems:'center',justifyContent:'center',paddingHorizontal:16}}>
                <View style={[styles.orderItem,this.state.order_active===4&&{borderBottomWidth:4,borderBottomColor:'#FF240D'}]}>
                  <Text style={[{fontSize:16},this.state.order_active===4&&{color:'#FF240D'}]}>
                    待评价
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <ListView
              initialListSize={12}
              dataSource={this.state.orderListData}
              renderRow={this._renderList}
              onEndReachedThreshold={10}
              enableEmptySections={true}
            />
        </View>
      )
    }

  }
}

const styles=StyleSheet.create({
  orderItem:{
    width:width/5-16,
    height:46,
    alignItems:'center',
    justifyContent:'center',
  },
  orderListTitle:{
    height:46,
    width:width,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:16,
    backgroundColor:'#fff',
    borderBottomWidth:1,
    borderBottomColor:'#e3e5e9'
  },
  orderBtn:{
    width:86,height:30,borderWidth:1,justifyContent:'center',alignItems:'center',marginRight:10
  }
})
// export default Address;

function mapStateToProps(state) {
  const { orderList,orderCancel } = state;
  return {
    orderList,
    orderCancel
  }
}

export default connect(mapStateToProps)(Order);
