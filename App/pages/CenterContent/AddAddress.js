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
    Picker
} from 'react-native';

import { connect } from 'react-redux';
import CommonHeader from '../../component/CommonHeader';
import Loading from '../../component/Loading.js';
import { performDefaultAddressAction } from '../../actions/DefaultAddressAction';
import { performGetAreaAction } from '../../actions/GetAreaAction';
import { performAddAddressAction } from '../../actions/AddAddressAction';
var {height, width} = Dimensions.get('window');
import { NaviGoBack } from '../../utils/CommonUtils';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state={
      address:'',
      name:'',
      phone:'',
      default:true
    }
    this._save = this._save.bind(this);
    this._default = this._default.bind(this);
  }

  componentDidMount(){
    const {navigator,dispatch,getArea} = this.props;
    if(getArea.Province.status){
      return
    }else{
      this._checkLogin();
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
            dispatch(performGetAreaAction(1,1));
          }
        }
      )
      .catch((error)=>{
        console.log(' error:' + error.message);
      })
    })
  }

  //保存收货地址
  _save(){
    const {getArea,dispatch,navigator} = this.props;
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
            dispatch(performAddAddressAction(result,this.state.name,this.state.phone,'',getArea.selectProvince.area_id,getArea.selectCity.area_id,getArea.selectArea.area_id,this.state.address,this.state.default));
            navigator.pop();
          }
        }
      )
      .catch((error)=>{
        console.log(' error:' + error.message);
      })
    })
  }

  _getArea(level,area_id){
    const {dispatch} = this.props;
    //level=1 1:省级 2:市级 3:区级
    //area_id=1 地区为1省级，其余根据当前区域获取子级
    dispatch(performGetAreaAction(level,area_id));
  }

  //设置默认定制
  _default(){
    let value = this.state.default
    this.setState({default:!value})
  }

  render(){
    const {getArea} = this.props;
    if(getArea.Province.status){
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
            <CommonHeader title='新增收货地址' onPress={()=>{this.buttonBackAction()}} />
            <View style={{marginTop:10,flexDirection:'column',justifyContent:'flex-start',alignItems:'center',backgroundColor:'#fff'}}>
              <View style={{width:width-24,height:50,flexDirection:'row',justifyContent:'space-around',alignItems:'center',borderBottomWidth:1,borderColor:'#e3e5e9',}}>
                <Picker
                  style={{height:26,width:92,borderWidth:1,borderColor:'#f5f5f5'}}
                  selectedValue={getArea.selectProvince.area_id}
                  onValueChange={(region_id,region_name) => this._getArea(2,region_id)}>
                  {getArea.Province.data.map((data,index)=>{
                    return(
                      <Picker.Item key={index} label={data.region_name} value={data.region_id} />
                    )
                  })}
                </Picker>
                <Text style={{fontSize:15,color:'#38383B'}}>省</Text>
                <Picker
                  style={{height:26,width:92,borderWidth:1,borderColor:'#f5f5f5'}}
                  selectedValue={getArea.selectCity.area_id}
                  onValueChange={(region_id,region_name) => this._getArea(3,region_id)}>
                  {getArea.City.data.map((data,index)=>{
                    return(
                      <Picker.Item key={index} label={data.region_name} value={data.region_id} />
                    )
                  })}
                </Picker>
                <Text style={{fontSize:15,color:'#38383B'}}>市</Text>
                <Picker
                  style={{height:26,width:92,borderWidth:1,borderColor:'#f5f5f5'}}
                  selectedValue={getArea.selectArea.area_id}
                  onValueChange={(region_id,region_name) => this._getArea(4,region_id)}>
                  {getArea.Area.data.map((data,index)=>{
                    return(
                      <Picker.Item key={index} label={data.region_name} value={data.region_id} />
                    )
                  })}
                </Picker>
                <Text style={{fontSize:15,color:'#38383B'}}>区</Text>
              </View>
              <View style={{width:width-24,height:50,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',borderBottomWidth:1,borderColor:'#e3e5e9',}}>
                <Text style={{fontSize:15,color:'#38383B'}}>详细地址</Text>
                <TextInput
                  style={{height:50,fontSize:15,flex:1,borderBottomWidth:0}}
                  onChangeText={(address) => this.setState({address})}
                  // value={this.state.address}
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor={'#A3A3A3'}
                  placeholder={'请输入详细地址'}
                />
              </View>
              <View style={{width:width-24,height:50,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',borderBottomWidth:1,borderColor:'#e3e5e9',}}>
                <Text style={{fontSize:15,color:'#38383B'}}>姓名</Text>
                <TextInput
                  style={{height:50,fontSize:15,flex:1,borderBottomWidth:0}}
                  onChangeText={(name) => this.setState({name})}
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor={'#A3A3A3'}
                  placeholder={'输入姓名'}
                />
              </View>
              <View style={{width:width-24,height:50,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',borderBottomWidth:1,borderColor:'#e3e5e9',}}>
                <Text style={{fontSize:15,color:'#38383B'}}>电话</Text>
                <TextInput
                  style={{height:50,fontSize:15,flex:1,borderBottomWidth:0}}
                  onChangeText={(phone) => this.setState({phone})}
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor={'#A3A3A3'}
                  placeholder={'输入手机号码'}
                />
              </View>
              <View style={{flex:1,height:10,backgroundColor:'#f5f5f5'}}></View>
              <View style={{width:width-24,height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{fontSize:15,color:'#38383B'}}>设为默认地址</Text>
                <TouchableOpacity onPress={()=>{this._default()}}>
                  {this.state.default ? <Image source={require('../img/checkbox_active.png')} style={{height:16,width:16}}/>:<Image source={require('../img/checkbox.png')} style={{height:16,width:16}}/>}
                </TouchableOpacity>
              </View>
              <View style={{width:width,height:20,backgroundColor:'#f5f5f5'}}></View>
              <TouchableOpacity onPress={()=>{this._save()}} style={{width:width-30,height:42,backgroundColor:'#FF240D',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:18,color:'#fff'}}>保存</Text>
              </TouchableOpacity>
          </View>
        </View>
      )
    }else{
      return (
        // <Loading visible={true} />
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
            <CommonHeader title='新增收货地址' onPress={()=>{this.buttonBackAction()}} />
        </View>
      )
    }

  }
}

// export default Address;

function mapStateToProps(state) {
  const { address,getArea } = state;
  return {
    address,
    getArea
  }
}

export default connect(mapStateToProps)(Address);
