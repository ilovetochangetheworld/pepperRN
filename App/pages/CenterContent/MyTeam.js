/**
 * 订单确认
 */
'use strict';
import React,{Component} from 'react';
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
import { getMyTeam } from '../../api/myTeam';
import { toastShort } from '../../utils/ToastUtil';

class Myteam extends Component {

  constructor(props) {
    super(props);
    var myTeamData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      myTeamData,
      loadingStatus: false,
      dataStatus: false
    }
    this._getMyTeam = this._getMyTeam.bind(this)
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
        this._getMyTeam();
      });
  }

  _getMyTeam(){
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
          getMyTeam(token).then((teamData)=>{
            this.setState({
              loadingStatus: false
            })
            if(teamData.status){
              this.setState({
                dataStatus:true,
                myTeamData:this.state.myTeamData.cloneWithRows(teamData.data.rows)
              })
            }else{
              toastShort(teamData.msg);
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
          <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <Text style={{fontSize:16,color:'#797979'}}>
              {data.user_name}
            </Text>
          </View>
          <View style={{width:100,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:16,color:'#797979'}}>
              {data.nick_name}
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
                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={{fontSize:16,color:'#797979'}}>
                    成员ID
                  </Text>
                </View>
                <View style={{flex:1,width:100,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:16,color:'#797979'}}>
                    昵称
                  </Text>
                </View>
              </View>
              {this.state.loadingStatus&&<ProgressBar />}
              <ListView
                initialListSize={12}
                dataSource={this.state.myTeamData}
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
                  <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#797979'}}>
                      成员ID
                    </Text>
                  </View>
                  <View style={{flex:1,width:100,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#797979'}}>
                      昵称
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

export default Myteam
