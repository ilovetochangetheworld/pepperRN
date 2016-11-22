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
import { bePartner } from '../../api/partner';
import { toastShort } from '../../utils/ToastUtil';
import CommonHeader from '../../component/CommonHeader';
import Login from './Login';
import dismissKeyboard from 'dismissKeyboard';
var {height, width} = Dimensions.get('window');

class Partner extends Component {

  constructor(props) {
    super(props);
    this.state={
      username:'',
      phone:'',
      address:''
    }
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  _submit(username,phone,address){
    const {navigator} = this.props;
    if(!username){
      toastShort('请输入用户名');
      return false
    }
    if(!(/^1[34578]\d{9}$/.test(phone))){
        toastShort("手机号码有误，请重填");
        return false;
    }
    if(!address){
      toastShort('请输入所在地址');
      return false
    }
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
          // console.log(`${token}:${username}:${phone}:${address}`);
          bePartner(token,username,phone,address).then((bePartner) => {
            dismissKeyboard();
            toastShort(bePartner.msg);
            navigator.pop();
          })
        }
      }
    )
    .catch((error)=>{
      toastShort(' error:' + error.message);
    })
  }

  render() {
    return (
      <View style={{backgroundColor:'#f5f5f5',flex:1}}>
          <CommonHeader title='成为合伙人' onPress={()=>{this.buttonBackAction()}} />
          <View style={{backgroundColor:'#fff',marginBottom:20}}>
            <View style={styles.list}>
              <Image source={require('../img/partner/user.png')} style={styles.list_img}></Image>
              <TextInput
                style={styles.textInput}
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
                placeholder={'请输入姓名'}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'#A3A3A3'}
              />
            </View>
            <View style={styles.list}>
              <Image source={require('../img/partner/phone.png')} style={styles.list_img}></Image>
              <TextInput
                style={styles.textInput}
                onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone}
                keyboardType={'numeric'}
                placeholder={'请输入联系电话'}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'#A3A3A3'}
              />
            </View>
            <View style={styles.list}>
              <Image source={require('../img/partner/address.png')} style={styles.list_img}></Image>
              <TextInput
                style={styles.textInput}
                onChangeText={(address) => this.setState({address})}
                value={this.state.address}
                placeholder={'请输入所在地址'}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'#A3A3A3'}
              />
            </View>
          </View>
            <TouchableOpacity style={styles.button} onPress={()=>{this._submit(this.state.username,this.state.phone,this.state.address)}}>
              <Text style={styles.button_text}>立即申请</Text>
            </TouchableOpacity>
       </View>
    );
  }
}

const styles = StyleSheet.create({
    list:{
      flex:1,
      height:48,
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      paddingHorizontal:12,
      backgroundColor:'#fff',
      borderBottomWidth:1,
      borderBottomColor:'#e3e5e9'
    },
    list_img:{
      height:24,
      width:24,
      resizeMode:'stretch'
    },
    textInput:{
      flex:1,
      fontSize:16,
      borderBottomWidth:0,
      color:'#797979'
    },
    button:{
      height:48,
      width:width-20,
      backgroundColor:'#FF9402',
      justifyContent:'center',
      alignItems:'center',
      marginLeft:10
    },
    button_text:{
      color:'#fff',
      fontSize:16
    }
});

export default Partner
