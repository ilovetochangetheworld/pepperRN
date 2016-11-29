/**
 * 店铺分享
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
  ScrollView
} from 'react-native';
import { NaviGoBack } from '../../utils/CommonUtils';
import { toastShort } from '../../utils/ToastUtil';
import ProgressBar from  'ActivityIndicator';
import CommonHeader from '../../component/CommonHeader';
import Login from './Login';
import { shopShare } from '../../api/shopShare';
import * as Wechat from 'react-native-wechat';
var {height, width} = Dimensions.get('window');

class PartnerCenter extends Component {

  constructor(props) {
    super(props);
    this.state={
      loading:false,
      shopShareData:null,
      token:null
    }
    this._share = this._share.bind(this);
  }

  componentDidMount() {
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
            shopShare(token).then(shopShareData=>{
              this.setState({
                shopShareData:shopShareData,
                token:token
              })
            })
          }
        }
      )
      .catch((error)=>{
        toastShort(' error:' + error.message);
      })
  }

  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  //分享
  _share(index,shareImg){
    var img_url = 'http://wx.red0731.com/app/resource/img/logo.png';
    var prod_name = '我叫【' + this.props.shopFxData.shop_name + '】,我要为红辣椒代言';
    var share_desc = '红辣椒公益先行，集优质农产品中秋献礼!';
    var share_url = 'http://wx.red0731.com/app/#/shareUrl?user_id=' + this.props.shopFxData.user_id + '&img_url=' + shareImg + '&share_type=news';
      switch (index) {
        case 1:
        if(this.state.token){
          Wechat.isWXAppInstalled()
            .then((isInstalled) => {
              if (isInstalled) {
                Wechat.shareToSession({
                  title: prod_name,
                  description: share_desc,
                  thumbImage: img_url,
                  type: 'news',
                  webpageUrl: share_url
                })
                  .catch((error) => {
                    toastShort(error.message);
                  });
              } else {
                toastShort('没有安装微信软件，请您安装微信之后再试');
              }
            });
        }else{
          toastShort('没有获取到token')
        }
          break;
        case 2:
        if(this.state.token){
          Wechat.isWXAppInstalled()
            .then((isInstalled) => {
              if (isInstalled) {
                Wechat.shareToTimeline({
                  title: prod_name,
                  description: share_desc,
                  thumbImage: img_url,
                  type: 'news',
                  webpageUrl: share_url
                })
                  .catch((error) => {
                    toastShort(error.message);
                  });
              } else {
                toastShort('没有安装微信软件，请您安装微信之后再试');
              }
            });
        }else{
          toastShort('没有获取到token')
        }
          break;
        default:

      }
  }

  render() {
    if(this.state.shopShareData){
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
          <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
            {this.state.loading&&<ProgressBar />}
            <CommonHeader title='店铺分享' onPress={()=>{this.buttonBackAction()}} />
            <View style={styles.shopInfo}>
              <Image style={styles.shopLogo} source={require('../img/shopLogo.png')}></Image>
              <Text style={styles.shopName}>我是【{this.props.shopFxData.shop_name}】的小店，我要为<Text style={{color:'#FF9402'}}>红辣椒</Text>代言</Text>
            </View>
            <View>
              <Image style={{width:width,height:750}} source={{uri:this.state.shopShareData.url}}></Image>
            </View>
            <View style={styles.explain}>
              <View style={styles.explain_title}>
                <Image style={{width:26,height:26}} source={require('../img/partnerCenter/explain.png')}></Image>
                <Text style={{fontSize:16,marginLeft:10}}>
                  说明
                </Text>
              </View>
              <View style={styles.solid}></View>
              <View style={{padding:10}}>
                <Text style={styles.explain_info}>如何赚钱：</Text>
                <Text style={styles.explain_info}>第一步  转发商品链接或海报图片给微信好友；</Text>
                <Text style={styles.explain_info}>第二步  从您转发的链接或图片进入商城注册的好友，系统将自动锁定成为您的客户, 他们在微信商城中购买任何商品，您都可以获得分销佣金；</Text>
                <Text style={styles.explain_info}>第三步  您可以在合伙人查看【我的团队】和【分销订单】，好友确认收货后佣金方可提现。</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.footer_item} onPress={()=>{this._share(1,this.state.shopShareData.url)}}>
              <Image style={{width:24,height:24,resizeMode:'stretch'}} source={require('../img/share_wx.png')}></Image>
              <Text style={{color:'#000',fontSize:12}}>分享给微信好友</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footer_item} onPress={()=>{this._share(2,this.state.shopShareData.url)}}>
              <Image style={{width:24,height:24,resizeMode:'stretch'}} source={require('../img/share_pyq.png')}></Image>
              <Text style={{color:'#000',fontSize:12}}>分享到朋友圈</Text>
            </TouchableOpacity>
          </View>
         </View>

      )
    }else{
      return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
            {this.state.loading&&<ProgressBar />}
            <CommonHeader title='店铺分享' onPress={()=>{this.buttonBackAction()}} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  shopInfo:{
    backgroundColor:'#fff',
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  shopLogo:{
    width: 40,
    height: 40,
    resizeMode: 'stretch',
  },
  shopName:{
    fontSize:14,
    color:'#000'
  },
  explain:{
    backgroundColor:'#fff',
    marginTop:10
  },
  explain_title:{
    height:50,
    paddingLeft:10,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  solid:{
    flex:1,
    height:1,
    backgroundColor:'#f5f5f5',
    marginLeft:10
  },
  explain_info:{
    fontSize:14,
    color:'#797979',
    lineHeight:20
  },
  footer:{
    height:50,
    flexDirection:'row',
    borderTopWidth:1,
    borderTopColor:'#f5f5f5',
    backgroundColor:'#fff'
  },
  footer_item:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center'
  }
});

export default PartnerCenter
