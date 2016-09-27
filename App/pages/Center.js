'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    InteractionManager,
    Dimensions,
    StyleSheet,
    ScrollView,
    AsyncStorage
} from 'react-native';

import CenterItem from '../component/CenterItem';
import Login from './CenterContent/Login';
import { connect } from 'react-redux';
import { performCenterAction } from '../actions/CenterAction';
import Loading from '../component/Loading';

var {height,width} =  Dimensions.get('window');

class Center extends Component {
    constructor(props) {
        super(props);
        this._loginOut=this._loginOut.bind(this);
        this._checkLogin=this._checkLogin.bind(this);
    }

    componentDidMount() {
      console.log('componentWillMount');
      this._checkLogin();
    }

    //登录检测
    _checkLogin(){
      const {navigator,dispatch} = this.props;
      InteractionManager.runAfterInteractions(() => {
        AsyncStorage.getItem('token').then(
          (result)=>{
            if (result===null){
              console.log('没有获取到token');
              InteractionManager.runAfterInteractions(() => {
                  navigator.push({
                    component: Login,
                    name: 'Login'
                  });
                });
            }else {
              console.log('token:'+result);
              dispatch(performCenterAction(result));
            }
          }
        ).catch((error)=>{
          console.log(' error:' + error.message);
        })
      })
    }

    //登录
    loginButtonActiom(){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: Login,
              name: 'Login'
            });
          });
    }

    //退出登录
    _loginOut(){
      const {navigator} = this.props;
      AsyncStorage.clear().then(
        ()=>{
          console.log('AsyncStorage clear!');
          navigator.push({
            component: Login,
            name: 'Login'
          });
        }
      ).catch((error)=>{
        console.log(' error:' + error.message);
      })
    }

    renderLoadingView(){
      return (
        // <View>
        //   <Text>
        //     Loading more...
        //   </Text>
        // </View>
        <Loading  />
      )
    }

    render() {
         const {center} = this.props;
         console.log(center);
         if (!center.data) {
            return this.renderLoadingView();
          }
        return (
             <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
              <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                <View>
                  <Image style={{width:width,height:100,resizeMode:'stretch',justifyContent:'center'}} source={require('../imgs/center/pp_center_bg.png')}>
                    <View style={{flexDirection:'row',height:100,}}>
                       <TouchableOpacity onPress={() => {this.loginButtonActiom()}} >
                           <Image  style={{width:70,height:70,marginLeft:10,marginTop:15,borderRadius:35}} source={{uri:center.data.userInfo.data.header_img}}/>
                       </TouchableOpacity>
                       <View style={{flexDirection:'column',justifyContent:'center',marginLeft:10}}>
                          <Text style={{fontSize:16,marginBottom:10}}>{center.data.userInfo.data.nick_name}</Text>
                          <View style={{flexDirection:'row'}}>
                             <View style={{width:60,height:18,backgroundColor:'#000',opacity:0.6,borderRadius:9}}>
                               <Text style={{color:'#fff',fontSize:12,textAlign:'center',}}>
                                {/* 普通会员 */}
                                  {(center.data.userInfo.data.role_id==1)&&'普通会员'||(center.data.userInfo.data.role_id==2)&&'一级分销商'||(center.data.userInfo.data.role_id==3)&&'二级分销商'}
                                </Text>
                             </View>
                          </View>
                       </View>
                    </View>
                  </Image>
                </View>
                <TouchableOpacity style={{height:48,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingHorizontal:16,marginBottom:10}}>
                  <View>
                    <View style={{flexDirection:'row'}}><Text style={{fontSize:16}}>当前余额：</Text><Text style={{fontSize:16,color:'#FF9402'}}>{center.data.wallet.data.balance}</Text></View>
                  </View>
                  <View style={{height:48,width:112,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#797979',marginRight:10}}>充值</Text>
                    <View><Image style={{width:7,height:12}} source={require('../imgs/pp_right.png')}></Image></View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{height:48,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff',paddingHorizontal:16,marginBottom:1}}>
                  <View>
                    <View style={{flexDirection:'row'}}><Text style={{fontSize:16}}>我的订单</Text></View>
                  </View>
                  <View style={{height:48,width:112,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#797979'}}>查看全部订单</Text>
                    <View><Image style={{width:7,height:12}} source={require('../imgs/pp_right.png')}></Image></View>
                  </View>
                </TouchableOpacity>
                <View style={{flex:1,height:60,flexDirection:'row',alignItems:'center',backgroundColor:'#fff',marginBottom:10}}>
                  <TouchableOpacity style={{flex:1,height:60,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:21,height:17,resizeMode:'stretch',marginBottom:6}} source={require('../imgs/center/pp_center_dzf.png')}></Image>
                    <Text stlye={{fontSize:12}}>待支付</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex:1,height:60,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:20,height:20,resizeMode:'stretch',marginBottom:6}} source={require('../imgs/center/pp_center_dfh.png')}></Image>
                    <Text stlye={{fontSize:12}}>待发货</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex:1,height:60,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:19,height:19,resizeMode:'stretch',marginBottom:6}} source={require('../imgs/center/pp_center_dsh.png')}></Image>
                    <Text stlye={{fontSize:12}}>待收货</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex:1,height:60,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:20,height:18,resizeMode:'stretch',marginBottom:6}} source={require('../imgs/center/pp_center_dpj.png')}></Image>
                    <Text stlye={{fontSize:12}}>待评价</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex:1,height:60,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:15,height:21,resizeMode:'stretch',marginBottom:6}} source={require('../imgs/center/pp_center_thh.png')}></Image>
                    <Text stlye={{fontSize:12}}>退换货</Text>
                  </TouchableOpacity>
                </View>
                <CenterItem
                   title='合伙人'
                   icon={require('../imgs/center/pp_center_hhr.png')}
                   onPress={()=>this.itemActionIndex(1)}/>
                <View style={[{backgroundColor:'#f2f2f2',height:10},styles.center_line]}></View>
                <CenterItem
                   title='个人信息'
                   icon={require('../imgs/center/pp_center_grxx.png')}
                   onPress={()=>this.itemActionIndex(1)}/>
                <View style={[styles.top_line,styles.center_line]}></View>
                <CenterItem
                   title='账户安全'
                   icon={require('../imgs/center/pp_center_zhaq.png')}
                   onPress={()=>this.itemActionIndex(1)}/>
                <View style={[styles.top_line,styles.center_line]}></View>
                <CenterItem
                   title='收货地址'
                   icon={require('../imgs/center/pp_center_shdz.png')}
                   onPress={()=>this.itemActionIndex(1)}/>
                <View style={[styles.top_line,styles.center_line]}></View>
                <View style={styles.top_line}></View>

                <TouchableOpacity style={{height:45,width:width,backgroundColor:'white',marginTop:10,justifyContent:'center',}}>
                    <Text style={{alignSelf:'center',color:'#FF240D',fontSize:17}} onPress={this._loginOut}>退出登录</Text>
                </TouchableOpacity>
              </ScrollView>
             </View>
        );
    }
}
const styles=StyleSheet.create({
    top_line:{
        height:1,
        backgroundColor:'#f2f2f2'
    },
    center_line:{
        marginLeft:8,
        marginRight:8,
    },
    modify_item:{
        alignItems:'flex-end',
        flex:1,
        marginRight:10,
        marginTop:15
    }
});
// export default Center;
function mapStateToProps(state) {
  const { center } = state;
  return {
    center
  }
}

export default connect(mapStateToProps)(Center);
