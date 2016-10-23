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
    ListView
} from 'react-native';

import { connect } from 'react-redux';
import { performGetAddressAction } from '../../actions/GetAddressAction';
import CommonHeader from '../../component/CommonHeader';
import Loading from '../../component/Loading.js';
import { performDefaultAddressAction } from '../../actions/DefaultAddressAction';
import AddAddress from './AddAddress';
var {height, width} = Dimensions.get('window');

class Address extends Component {
  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
  }

  componentDidMount(){
    const {navigator,dispatch} = this.props;
    this._checkLogin();
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
            console.log(result);
            dispatch(performGetAddressAction(result));
          }
        }
      )
      .catch((error)=>{
        console.log(' error:' + error.message);
      })
    })
  }
  //修改默认地址
  _editAddress(type,rowID){
    //type:1 修改默认地址 type:2 删除地址
    const {dispatch,address} = this.props;
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
            console.log(result);
            dispatch(performDefaultAddressAction(type,address.data,rowID,result));
          }
        }
      )
      .catch((error)=>{
        console.log(' error:' + error.message);
      })
    })
  }

  _renderRow(data,sectionID,rowID){
    return(
    <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start',alignItems:'center',backgroundColor:'#fff',marginBottom:10}}>
      <View style={{width:width-24,height:76,flexDirection:'column',justifyContent:'space-around',alignItems:'flex-start',borderBottomWidth:1,borderBottomColor:'#e3e5e9'}}>
        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
          <Text style={{color:'#000',fontSize:16,fontWeight:'bold',marginRight:30,marginLeft:20}}>{data.consignee}</Text>
          <Text style={{color:'#000',fontSize:16,fontWeight:'bold',marginRight:6}}>13260585618</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Image source={require('../../imgs/addresssmall.png')} style={{width:14,height:17,resizeMode:'cover',marginRight:6}}></Image>
          <Text style={{color:'#000',fontSize:14}} numberOfLines={1} >收货地址：{data.provice_name}{data.city_name}{data.county_name}{data.address}</Text>
        </View>
      </View>
      <View style={{width:width-24,height:45,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this._editAddress(1,rowID)}}>
          {(data.is_default==1) ? <Image source={require('../../imgs/checkbox_active.png')} style={{height:16,width:16}}/> : <Image source={require('../../imgs/checkbox.png')} style={{height:16,width:16}}/>}
          <Text style={{fontSize:14,color:'#FF240D',marginLeft:8}}>默认地址</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginRight:20}} >
            <Image source={require('../../imgs/edit.png')} style={{width:17,height:20,marginRight:6}}></Image>
            <Text style={{fontSize:14,color:'#797979'}}>编辑</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={() => {this._editAddress(2,rowID)}}>
            <Image source={require('../../imgs/del.png')} style={{width:17,height:20,marginRight:6}}></Image>
            <Text style={{fontSize:14,color:'#797979'}}>删除</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    )
  }

  _addAddress(){
    const {navigator} = this.props;
      InteractionManager.runAfterInteractions(() => {
          navigator.push({
            component: AddAddress,
            name: 'AddAddress'
          });
        });
    }

  render(){
    const {address} = this.props;
    if(address.data.status){
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
            <CommonHeader title='收货地址管理' />
            <ListView
             dataSource={address.addressList}
             renderRow={this._renderRow}
             onEndReachedThreshold={10}
             enableEmptySections={true}
            />
            <TouchableOpacity onPress={()=>{this._addAddress()}} style={{width:width,alignSelf:'flex-end',height:50,borderTopWidth:1,borderTopColor:'#e3e5e9',flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
              <Image source={require('../../imgs/addAddress.png')} style={{height:24,width:24,resizeMode:'cover',marginRight:8}}></Image>
              <Text style={{color:'#FF240D',fontSize:18}}>新增收货地址</Text>
            </TouchableOpacity>
        </View>
      )
    }else{
      return (
        <Loading visible={true} />
      )
    }

  }
}

// export default Address;

function mapStateToProps(state) {
  const { address } = state;
  return {
    address
  }
}

export default connect(mapStateToProps)(Address);
