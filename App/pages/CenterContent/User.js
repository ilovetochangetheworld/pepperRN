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
} from 'react-native';

import { connect } from 'react-redux';
import CommonHeader from '../../component/CommonHeader';
import Loading from '../../component/Loading.js';
import { performCenterAction } from '../../actions/CenterAction';
import { performUserInformAction } from '../../actions/UserInformAction'
var {height, width} = Dimensions.get('window');
import { NaviGoBack } from '../../utils/CommonUtils';
import { toastShort } from '../../utils/ToastUtil';

class User extends Component {
  constructor(props) {
    super(props);
    this.state={
      real_name:'',
      sex:'',
      mobile:'',
      email:''
    }
  }

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      const {navigator,dispatch,center} = this.props;
      this._checkLogin();
      this.setState({
        real_name: center.data.userInfo.data.real_name,
        sex: center.data.userInfo.data.sex,
        mobile: center.data.userInfo.data.mobile,
        email: center.data.userInfo.data.emall,
      })
    });
  }

  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  componentWillReceiveProps(nextProps) {
    const {token,navigator,center,userinform,dispatch} = nextProps;
    if(token.tokenRefresh){
      const {navigator} = this.props;
      AsyncStorage.clear().then(
        ()=>{
          navigator.push({
            component: Login,
            name: 'Login'
          });
        }
      ).catch((error)=>{
        toastShort(' error:' + error.message);
      })
    }
    if(nextProps.userinform!==this.props.userinform){
      if(userinform.loading){
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
              dispatch(performCenterAction(result));
              navigator.pop();
            }
          }
        )
        .catch((error)=>{
          toastShort(' error:' + error.message);
        })
      }
    }
  }

    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  //登录检测
  _checkLogin(){
    const {navigator,dispatch} = this.props;
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
            dispatch(performCenterAction(result));
          }
        }
      )
      .catch((error)=>{
        toastShort(' error:' + error.message);
      })
    })
  }

  _save(name,sex,mobile,email){
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
            dispatch(performUserInformAction(result,name,sex,mobile,email))
          }
        }
      )
      .catch((error)=>{
        toastShort(' error:' + error.message);
      })
    })
  }

  render(){
    const {center} = this.props;
    if(!center.data){
      return (
        <Loading visible={true} />
      )
    }
    if(center.data){
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
          <View style={{flex:1}}>
            <CommonHeader title='个人信息' onPress={()=>{this.buttonBackAction()}} />
            <View style={{height:72,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:12,backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#e3e5e9'}}>
              <Text style={styles.text}>头像</Text>
              <Image style={{width:56,height:56,resizeMode:'cover',borderRadius:28}} source={{uri:center.data.userInfo.data.header_img}} />
            </View>
            <View style={{height:48,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingHorizontal:12,backgroundColor:'#fff',marginBottom:10}}>
              <Text style={[styles.text,{marginRight:18}]}>登录名</Text>
              <Text style={styles.inputText}>{center.data.userInfo.data.user_name}</Text>
            </View>
            <View style={styles.editRow}>
              <Text style={[styles.text,{marginRight:18}]}>真实姓名</Text>
              <TextInput
                style={{height:50,fontSize:16,flex:1,borderBottomWidth:0,color:'#797979'}}
                onChangeText={(real_name) => this.setState({real_name})}
                value={this.state.real_name}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'#A3A3A3'}
              />
            </View>
            <View style={styles.editRow}>
              <Text style={[styles.text,{marginRight:18}]}>性别</Text>
              {
                Number(this.state.sex)===1?
                <Image source={require('../img/center/check_active.png')} style={{height:16,width:16,resizeMode:'stretch',marginRight:8}} />:
                <TouchableOpacity onPress={() => this.setState({sex:1})}><Image source={require('../img/center/check.png')} style={{height:16,width:16,resizeMode:'stretch',marginRight:8}} /></TouchableOpacity>
              }
              <Text style={[styles.inputText,{marginRight:94}]}>男</Text>
              {
                Number(this.state.sex)===2?
                <Image source={require('../img/center/check_active.png')} style={{height:16,width:16,resizeMode:'stretch',marginRight:8}} />:
                <TouchableOpacity onPress={() => this.setState({sex:2})}><Image source={require('../img/center/check.png')} style={{height:16,width:16,resizeMode:'stretch',marginRight:8}} /></TouchableOpacity>
              }
              <Text style={[styles.inputText]}>女</Text>
            </View>
            <View style={styles.editRow}>
              <Text style={[styles.text,{marginRight:18}]}>手机</Text>
              <TextInput
                style={{height:50,fontSize:16,flex:1,borderBottomWidth:0,color:'#797979'}}
                onChangeText={(mobile) => this.setState({mobile})}
                value={this.state.mobile}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'#A3A3A3'}
              />
            </View>
            <View style={styles.editRow}>
              <Text style={[styles.text,{marginRight:18}]}>邮箱</Text>
              <TextInput
                style={{height:50,fontSize:16,flex:1,borderBottomWidth:0,color:'#797979'}}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'#A3A3A3'}
              />
            </View>
          </View>
          <View style={{height:50,alignSelf:'flex-end',paddingVertical:4,paddingHorizontal:12,backgroundColor:'#fff'}}>
            <TouchableOpacity onPress={()=>{this._save(this.state.real_name,this.state.sex,this.state.mobile,this.state.email)}} style={{flex:1,width:width-24,backgroundColor:'#FF240D',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}>
              <Text style={{fontSize:18,color:'#fff',}}>确认修改</Text>
            </TouchableOpacity>
          </View>

        </View>
      )
    }
  }

}

const styles=StyleSheet.create({
    text:{
      fontSize:16,
      color:'#000'
    },
    inputText:{
      fontSize:16,
      color:'#797979'
    },
    editRow:{
      height:48,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingHorizontal:12,backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#e3e5e9'
    }
});
// export default Address;

function mapStateToProps(state) {
  const { center,token,userinform } = state;
  return {
    center,
    token,
    userinform
  }
}

export default connect(mapStateToProps)(User);
