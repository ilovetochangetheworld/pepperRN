/**
 * 订单确认
 */
'use strict';
import React,{ Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { NaviGoBack } from '../../utils/CommonUtils';
import { toastShort } from '../../utils/ToastUtil';
import ProgressBar from  'ActivityIndicator';
import CommonHeader from '../../component/CommonHeader';
import Login from './Login';
import dismissKeyboard from 'dismissKeyboard';
import { shopFxInfo } from '../../api/shopFx';
var {height, width} = Dimensions.get('window');

class PartnerCenter extends Component {

  constructor(props) {
    super(props);
    this.state={
      loading:false,
      shopFxData:null
    }
  }

  componentDidMount() {
      AsyncStorage.getItem('token').then(
        (token)=>{
          if (token===null){
            InteractionManager.runAfterInteractions(() => {
                navigator.push({
                  component: Login,
                  name: 'Login'
                });
              });
          }else {
            this.setState({
              loading:true
            })
            shopFxInfo(token).then((shopFxData)=>{
              console.log(shopFxData);
              if(!shopFxData.status){
                toastShort(shopFxData.msg);
              }
              this.setState({
                loading:false,
                shopFxData:shopFxData
              })
            })
          }
        }
      )
      .catch((error)=>{
        toastShort(' error:' + error.message);
      })
  }

  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  render() {
    if(this.state.shopFxData){
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
            {this.state.loading&&<ProgressBar />}
            <CommonHeader title='合伙人中心' onPress={()=>{this.buttonBackAction()}} />
            <View style={{backgroundColor:'#fff',marginBottom:20}}>
              <View style={styles.shopInfo}>
                <Image style={styles.shopLogo} source={require('../img/shopLogo.png')}></Image>
                <View stye={styles.shopTop}>
                  <Text style={styles.shopName}>{this.state.shopFxData.data.shop_name}</Text>
                  <Text style={styles.shopTime}>{this.state.shopFxData.data.add_time}</Text>
                </View>
              </View>
              <View style={styles.myCommission}>
                <View style={styles.myCommission_title}>
                  <Text style={styles.myCommission_title_text}>
                    我的佣金
                  </Text>
                  <Text style={styles.myCommission_title_text}>
                    佣金明细 >
                  </Text>
                </View>
                <View style={styles.myCommission_money}>
                  <Text style={styles.myCommission_money_text}>
                    {this.state.shopFxData.data.commission} 元
                  </Text>
                </View>
                <View style={styles.myCommission_cash}>
                  <Text style={styles.myCommission_cash_text}>
                    可提现佣金：{this.state.shopFxData.data.commission} 元
                  </Text>
                  <TouchableOpacity style={styles.myCommission_cash_button}>
                    <Text style={styles.myCommission_cash_button_text}>提现</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
         </View>
      )
    }else{
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
            {this.state.loading&&<ProgressBar />}
            <CommonHeader title='合伙人中心' onPress={()=>{this.buttonBackAction()}} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  shopInfo:{
    flex:1,
    height:76,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingHorizontal:10
  },
  shopLogo:{
    width:50,
    height:50,
    resizeMode:'stretch'
  },
  shopTop:{
    flex:1,
    height:50,
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center'
  },
  shopName:{
    fontSize:16,
    color:'#000'
  },
  addTime:{
    fontSize:12,
    color:'#797979'
  },
  myCommission:{
    height:150,
    backgroundColor:'#FF9402',
    paddingHorizontal:10
  },
  myCommission_title:{
    height:46,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  myCommission_title_text:{
    fontSize:16,
    color:'#fff',
    fontWeight:'bold'
  },
  myCommission_money:{
    height:60,
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:10,
    borderBottomWidth:1,
    borderColor:'#fff'
  },
  myCommission_money_text:{
    fontSize:24,
    color:'#fff'
  },
  myCommission_cash:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  myCommission_cash_text:{
    fontSize:16,
    color:'#fff',
  },
  myCommission_cash_button:{
    width:80,
    height:26,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center'
  },
  myCommission_cash_button_text:{
    color:'#FF9402',
    fontSize:16
  }
});

export default PartnerCenter
