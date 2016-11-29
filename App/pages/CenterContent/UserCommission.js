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
  ListView,
  AsyncStorage,
  InteractionManager
} from 'react-native';
import ProgressBar from  'ActivityIndicator';
import { NaviGoBack } from '../../utils/CommonUtils';
import CommonHeader from '../../component/CommonHeader';
var {height, width} = Dimensions.get('window');
import { getUserCommission } from '../../api/userCommission';
import { toastShort } from '../../utils/ToastUtil';

class UserCommission extends Component {

  constructor(props) {
    super(props);
    var userCommissionData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userCommissionData,
      loadingStatus: false,
      dataStatus: false
    }
    this._getUserCommission = this._getUserCommission.bind(this)
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
        this._getUserCommission();
      });
  }

  _getUserCommission(){
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
            loadingStatus: true
          })
          getUserCommission(token).then((commissionData)=>{
            this.setState({
              loadingStatus: false
            })
            if(commissionData.status){
              this.setState({
                dataStatus:true,
                userCommissionData:this.state.userCommissionData.cloneWithRows(commissionData.data.rows)
              })
            }else{
              toastShort(commissionData.msg);
            }
          }).catch((error)=>{
            toastShort(' error:' + error.message);
          })
        }
      }
    )
    .catch((error)=>{
      toastShort(' error:' + error.message);
    })
  }

  _renderList(data) {
    return(
      <View>
        <View style={{width:width,height:44,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingHorizontal:10,borderBottomWidth:1,borderBottomColor:'#F2F2F2'}}>
          <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <Text numberoflines={1} style={{fontSize:16,color:'#797979'}}>
              {data.order_id}
            </Text>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
            <Text numberoflines={1} style={{flex:1,fontSize:16,color:'#797979',height:44,}}>
              {/* {data.add_time} */}
            </Text>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text numberoflines={1} style={{fontSize:16,color:'#797979'}}>
              {data.income}
            </Text>
          </View>
        </View>
      </View>

    )
  }

  render() {
    if(this.state.dataStatus){
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
            <CommonHeader title='分佣明细' onPress={()=>{this.buttonBackAction()}} />
            <View style={{backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
              <View style={{flex:1,height:44,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingHorizontal:10,borderBottomWidth:1,borderBottomColor:'#F2F2F2'}}>
                <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={{fontSize:16,color:'#797979'}}>
                    订单ID
                  </Text>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:16,color:'#797979'}}>
                    分佣时间
                  </Text>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:16,color:'#797979'}}>
                    收入
                  </Text>
                </View>
              </View>
              {this.state.loadingStatus&&<ProgressBar />}
              <ListView
                initialListSize={12}
                dataSource={this.state.userCommissionData}
                renderRow={this._renderList}
                onEndReachedThreshold={10}
                enableEmptySections={true}
              />

            </View>
         </View>
      )}else{
        return(
          <View style={{backgroundColor:'#f5f5f5',flex:1}}>
              <CommonHeader title='分佣明细' onPress={()=>{this.buttonBackAction()}} />
              <View style={{backgroundColor:'#fff',justifyContent:'center',alignItems:'center',paddingBottom:20}}>
                <View style={{flex:1,height:44,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingHorizontal:10}}>
                  <View style={{flex:2,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#797979'}}>
                      订单ID
                    </Text>
                  </View>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#797979'}}>
                      分佣时间
                    </Text>
                  </View>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#797979'}}>
                      收入
                    </Text>
                  </View>
                </View>
                {this.state.loadingStatus&&<ProgressBar />}
              </View>
           </View>
        )
      }


  }
}

export default UserCommission
