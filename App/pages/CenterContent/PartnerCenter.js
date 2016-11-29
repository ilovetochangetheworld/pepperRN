/**
 * 合伙人中心
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
  TouchableOpacity,
  InteractionManager
} from 'react-native';
import { NaviGoBack } from '../../utils/CommonUtils';
import { toastShort } from '../../utils/ToastUtil';
import ProgressBar from  'ActivityIndicator';
import CommonHeader from '../../component/CommonHeader';
import Login from './Login';
import dismissKeyboard from 'dismissKeyboard';
import CenterItem from '../../component/CenterItem';
import ShopShare from './ShopShare';
import Shop from './Shop';
import UserCommission from './UserCommission';
import MyTeam from './MyTeam';
import Commission from './Commission';
import { connect } from 'react-redux';
import { performShopFxInfoAction } from '../../actions/ShopFxInfoAction';
import { shopFxInfo } from '../../api/shopFx';
var {height, width} = Dimensions.get('window');

class PartnerCenter extends Component {

  constructor(props) {
    super(props);
    this.itemActionIndex = this.itemActionIndex.bind(this);
  }

  componentDidMount() {
    const { dispatch,shopFxInfo } = this.props;
    InteractionManager.runAfterInteractions(() => {
      if(!shopFxInfo.data.status){
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
              dispatch(performShopFxInfoAction(token));
            }
          }
        )
        .catch((error)=>{
          toastShort(' error:' + error.message);
        })
      }

    })
  }

  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  itemActionIndex(index){
    const {navigator,shopFxInfo} = this.props;
      switch (index) {
        case 1:
          navigator.push({
            component: UserCommission,
            name: 'UserCommission',
          })
          break;
        case 2:
          navigator.push({
            component: ShopShare,
            name: 'ShopShare',
            params: {
              shopFxData:shopFxInfo.data.data
            }
          })
          break;
        case 3:
          navigator.push({
            component: Shop,
            name: 'Shop',
            params: {
              user_id:shopFxInfo.data.data.user_id
            }
          })
          break;
          case 4:
            navigator.push({
              component: MyTeam,
              name: 'MyTeam',
            })
            break;
          case 5:
            navigator.push({
              component: Commission,
              name: 'Commission',
            })
            break;
        default:

      }
  }

  render() {
    const {shopFxInfo} = this.props;
    if(shopFxInfo.data.status){
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
            <CommonHeader title='合伙人中心' onPress={()=>{this.buttonBackAction()}} />
            {shopFxInfo.loading&&<ProgressBar />}
            <View style={{backgroundColor:'#fff',marginBottom:10}}>
              <View style={styles.shopInfo}>
                <Image style={styles.shopLogo} source={require('../img/shopLogo.png')}></Image>
                <View stye={styles.shopTop}>
                  <Text style={styles.shopName}>{shopFxInfo.data.data.shop_name}</Text>
                  <Text style={styles.shopTime}>{shopFxInfo.data.data.add_time}</Text>
                </View>
              </View>
              <View style={styles.myCommission}>
                <View style={styles.myCommission_title}>
                  <Text style={styles.myCommission_title_text}>
                    我的佣金
                  </Text>
                  <TouchableOpacity onPress={()=>this.itemActionIndex(5)}>
                    <Text style={styles.myCommission_title_text}>
                      佣金明细 >
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.myCommission_money}>
                  <Text style={styles.myCommission_money_text}>
                    {shopFxInfo.data.data.commission} 元
                  </Text>
                </View>
                <View style={styles.myCommission_cash}>
                  <Text style={styles.myCommission_cash_text}>
                    可提现佣金：{shopFxInfo.data.data.commission} 元
                  </Text>
                  <TouchableOpacity style={styles.myCommission_cash_button}>
                    <Text style={styles.myCommission_cash_button_text}>提现</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{backgroundColor:'#fff',marginBottom:10}}>
              <CenterItem
                 title='分佣明细'
                 icon={require('../img/partnerCenter/data.png')}
                 onPress={()=>this.itemActionIndex(1)}/>
                 <View style={{height:1,backgroundColor:'#f5f5f5',marginLeft:10}}></View>
              <CenterItem
                 title='店铺分享'
                 icon={require('../img/partnerCenter/share.png')}
                 onPress={()=>this.itemActionIndex(2)}/>
            </View>
            <View style={{backgroundColor:'#fff',marginBottom:10}}>
              <CenterItem
                 title='我的小店'
                 icon={require('../img/partnerCenter/shop.png')}
                 onPress={()=>this.itemActionIndex(3)}/>
                 <View style={{height:1,backgroundColor:'#f5f5f5',marginLeft:10}}></View>
              <CenterItem
                 title='我的团队'
                 icon={require('../img/partnerCenter/team.png')}
                 onPress={()=>this.itemActionIndex(4)}/>
            </View>
         </View>
      )
    }else{
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
            <CommonHeader title='合伙人中心' onPress={()=>{this.buttonBackAction()}} />
            {shopFxInfo.loading&&<ProgressBar />}
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

// export default PartnerCenter
//
function mapStateToProps(state) {
  const { shopFxInfo } = state;
  return {
    shopFxInfo
  }
}

export default connect(mapStateToProps)(PartnerCenter);
