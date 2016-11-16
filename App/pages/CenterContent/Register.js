'use strict';
import React, {Component,PropTypes} from 'react';
import{
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    InteractionManager,
    TextInput,
    Platform,
    AsyncStorage
} from 'react-native';
import { NaviGoBack } from '../../utils/CommonUtils';
import ShortLineTwo from '../../component/ShortLineTwo';
import { toastShort } from '../../utils/ToastUtil';
import {NativeModules} from 'react-native';
import Center from '../Center';
var EncryptionModule = NativeModules.EncryptionModule;
import CommonHeader from '../../component/CommonHeader';
import Loading from '../../component/Loading';
import { register } from '../../api/register';
import { connect } from 'react-redux';
import { performCenterAction } from '../../actions/CenterAction';

var username = '';
var password = '';
var repassword = '';

class Register extends Component {
  constructor(props) {
      super(props);
      this.buttonBackAction=this.buttonBackAction.bind(this);
      this.buttonRegisterOrLoginAction=this.buttonRegisterOrLoginAction.bind(this);
}
  componentDidMount() {
    // const {navigator} = this.props;

  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
          const { navigator } = this.props;
          const routers = navigator.getCurrentRoutes();
          console.log('当前路由长度：'+routers.length);
          // if (routers.length > 1) {
          //     navigator.pop();
          //     return true;//接管默认行为
          // }
          return true;//默认行为

      };

  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }
  //用户登录/注册
  buttonRegisterOrLoginAction(position){
      const {navigator,dispatch} = this.props;
      if(position === 0){
            //用户登录
           if(username === ''){
               toastShort('用户名不能为空...');
               return;
           }
           if(password === ''){
               toastShort('密码不能为空...');
               return;
           }
           if(password !== repassword){
               toastShort('两次输入密码不一致...');
               return;
           }
           register(username,password).then(registerStatus=>{
             console.log(registerStatus);
             if(registerStatus.status){
               AsyncStorage.setItem('token',registerStatus.token).then(
                 ()=>{
                  dispatch(performCenterAction(registerStatus.token));
                  navigator.popToTop();
                 }
               ).catch((error)=>{
                 toastShort(' error:' + error.message);
               });
             }else{
               toastShort(registerStatus.msg);
             }
           }).catch((error) => {
           toastShort('注册失败！');
           });
      }
  }


  render() {
      const {login} = this.props;
      return (
             <View style={{backgroundColor:'#fff',flex:1}}>
                <CommonHeader title='注册' onPress={()=>{this.buttonBackAction()}} />
                <View style={{backgroundColor:'#fff',marginTop:48,paddingHorizontal:20}}>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <Text>用户名</Text>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="手机/邮箱"
                            placeholderTextColor="#CBCBCB"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'username'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               username = text;
                            }}
                      />
                    </View>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <Text>密 码</Text>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请输入密码"
                            placeholderTextColor="#CBCBCB"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'password'}
                            multiline={true}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                               password = text;
                            }}
                           />
                          <TouchableOpacity onPress={() => {this.buttonChangeState()}} style={{width:45,height:45,alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../img/logre/ic_pwd_off.png')}
                                        style={{width:17,height:14,marginLeft:13}}/>
                          </TouchableOpacity>
                    </View>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <Text>确认密码</Text>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="请输入密码"
                            placeholderTextColor="#CBCBCB"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'repassword'}
                            multiline={true}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                               repassword = text;
                            }}
                           />
                          <TouchableOpacity onPress={() => {this.buttonChangeState()}} style={{width:45,height:45,alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../img/logre/ic_pwd_off.png')}
                                        style={{width:17,height:14,marginLeft:13}}/>
                          </TouchableOpacity>
                    </View>
                    <ShortLineTwo/>
                </View>
                <TouchableOpacity onPress={() => {this.buttonRegisterOrLoginAction(0)}}
                                  style={{justifyContent:'center',marginTop:13,alignItems:'center'}}>
                    <View style={{width:300,height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#F2F2F2'}}>
                          <Text>注册</Text>
                    </View>
                </TouchableOpacity>
                <Loading visible={login.loading} />

             </View>
        );
    }
}
const styles=StyleSheet.create({
    item_layout:{
        backgroundColor:'white',
        height:48,
        justifyContent:'center'
    },
    topbar_bg:{
        height:48,
        backgroundColor:'#fff',
        flexDirection:'row'
    },
    topbar_left_item:{
        width:48,
        height:48,
        alignItems:'center',
        justifyContent:'center'
    },
    topbar_center_bg:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    topbar_center_tv:{
        fontSize:18,
        color:'#000',
        alignSelf:'center'
    },
    topbar_right_item:{
        width:48,
        height:48,
        alignItems:'center',
        justifyContent:'center'
    },
    topbar_right_tv:{
        fontSize:15,
        color:'white',
        alignSelf:'center'
    }
});

function mapStateToProps(state) {
  const { login } = state;
  return {
    login
  }
}

export default connect(mapStateToProps)(Register);
