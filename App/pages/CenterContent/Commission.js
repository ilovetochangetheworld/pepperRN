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
  AsyncStorage,
  StyleSheet,
  InteractionManager,
  TouchableOpacity
} from 'react-native';
import ProgressBar from  'ActivityIndicator';
import { NaviGoBack } from '../../utils/CommonUtils';
import CommonHeader from '../../component/CommonHeader';
var {height, width} = Dimensions.get('window');
import { getCommission } from '../../api/commission';
import { toastShort } from '../../utils/ToastUtil';
import { connect } from 'react-redux';

class Commission extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      commissionData:null,
    }
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
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
            getCommission(token).then(commissionData=>{
              if(commissionData.status){
                this.setState({
                  loading:false,
                  commissionData:commissionData
                })
              }else{
                toastShort(commissionData.msg);
              }
            })
          }
        }
      )
      .catch((error)=>{
        toastShort(' error:' + error.message);
      })
      });
  }

  render() {
      const { shopFxInfo } = this.props;
      if(this.state.commissionData){
        return (
          <View style={{backgroundColor:'#f5f5f5',flex:1}}>
              <CommonHeader title='佣金明细' onPress={()=>{this.buttonBackAction()}} />
                {this.state.loading&&<ProgressBar />}
                <View style={styles.myCommission}>
                  <View style={styles.myCommission_title}>
                    <Text style={styles.myCommission_title_text}>
                      可以提现佣金（元）
                    </Text>
                  </View>
                  <View style={styles.myCommission_money}>
                    <Text style={styles.myCommission_money_text}>
                      {shopFxInfo.data.data.commission} 元
                    </Text>
                  </View>
                  <View style={styles.myCommission_cash}>
                    <Text style={styles.myCommission_cash_text}>
                      成功提现佣金{this.state.commissionData.data.transfer} 元
                    </Text>
                    <TouchableOpacity style={styles.myCommission_cash_button}>
                      <Text style={styles.myCommission_cash_button_text}>提现日志</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.list}>
                  <Text style={{fontSize:16,color:'#000'}}>累计佣金</Text>
                  <Text style={{fontSize:16,color:'#000'}}>{shopFxInfo.data.data.commission}</Text>
                </View>
                <View style={styles.list}>
                  <Text style={{fontSize:16,color:'#000'}}>已申请佣金</Text>
                  <Text style={{fontSize:16,color:'#000'}}>{this.state.commissionData.data.pending}</Text>
                </View>
                <View style={styles.list}>
                  <Text style={{fontSize:16,color:'#000'}}>待打款佣金</Text>
                  <Text style={{fontSize:16,color:'#000'}}>{this.state.commissionData.data.audited}</Text>
                </View>
           </View>
        )
      }else{
        return (
          <View style={{backgroundColor:'#f5f5f5',flex:1}}>
              <CommonHeader title='佣金明细' onPress={()=>{this.buttonBackAction()}} />
                {this.state.loading&&<ProgressBar />}
          </View>
        )
      }

  }
}

const styles = StyleSheet.create({
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
  },
  list:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:50,
    borderBottomWidth:1,
    borderBottomColor:'#D9D9D9',
    paddingHorizontal:10
  }
})
// export default Commission

function mapStateToProps(state) {
  const { shopFxInfo } = state;
  return {
    shopFxInfo
  }
}

export default connect(mapStateToProps)(Commission);
