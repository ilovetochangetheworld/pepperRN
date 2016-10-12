/**
 * 商品详情
 */
'use strict';
import React from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  WebView,
  AsyncStorage
} from 'react-native';

import { NaviGoBack } from '../utils/CommonUtils';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import { connect } from 'react-redux';
import { performGoodsDetailAction } from '../actions/GoodsDetailAction';
import { performAppMainAction } from '../actions/AppMainAction';
import { performAddCartAction } from '../actions/AddCartAction';

import Home from './Home';

var {height, width} = Dimensions.get('window');

class GoodsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.buttonBackAction=this.buttonBackAction.bind(this);
  }

  componentDidMount() {
    const {navigator,dispatch} = this.props;
    dispatch(performGoodsDetailAction(1,this.props.id));
  }

    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  _renderPage(
    data: Object,
    pageID: number | string,) {
    return (
      <Image
        source={{uri: data.pic_path}}
        style={{height:184,width:width,resizeMode:'cover'}} />
    );
  }

  renderLoadingView() {
    return (
      <View>
        <Text>
          Loading more...
        </Text>
      </View>
    );
  }

  _renderDotIndicator() {
        const {goodsDetail} = this.props;
        return <PagerDotIndicator pageCount={goodsDetail.data.data.img_list.length} />;
  }

  //页面跳转 1:首页 2:购物车
  skip(number) {
    const {navigator,dispatch} = this.props;
    switch (number) {
      case 1:
        dispatch(performAppMainAction('home'))
        navigator.popToTop();
        break;
      case 2:
        dispatch(performAppMainAction('cart'))
        navigator.popToTop();
        break;
      default:

    }
  }

  //加入购物车
  addCart(goodsList) {
    const {navigator,dispatch} = this.props;
    AsyncStorage.getItem('token').then(
      (token)=>{
        if (token===null){
          console.log('没有获取到token');
          InteractionManager.runAfterInteractions(() => {
              navigator.push({
                component: Login,
                name: 'Login'
              });
            });
        }else {
          console.log('token:'+token);
          if(0<goodsList.length<2){
            dispatch(performAddCartAction(token,goodsList));
          }
        }
      }
    ).catch((error)=>{
      console.log(' error:' + error.message);
    })
  }

  //购买
  buy(goodsList) {
    console.log(goodsList);
    if(0<goodsList.length<2){

    }
  }

  render() {
    const {goodsDetail} = this.props;
    console.log(goodsDetail);
    if (!goodsDetail.data) {
       return this.renderLoadingView();
     }
    return (
       <View style={{backgroundColor:'#f5f5f5',flex:1}}>
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
          <View style={{height:48,backgroundColor:'#fff',flexDirection:'row',borderBottomWidth:1,borderColor:'#cbcbcb'}}>
                <TouchableOpacity onPress={() => {this.buttonBackAction()}}
                                  style={{width:100,height:48,alignItems:'flex-start',justifyContent:'center'}}>
                   <Image source={require('../imgs/pp_return.png')} style={{width:11,height:18,marginLeft:17}}></Image>
                </TouchableOpacity>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:18,color:'#000',alignSelf:'center'}}>商品详情</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:48,width:100}}>
                  <TouchableOpacity onPress={() => {this.skip(1)}}>
                    <Image source={require('../imgs/pp_tab_home.png')} style={{width:24,height:24,marginRight:23}}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {this.skip(2)}}>
                    <Image source={require('../imgs/pp_tab_cart.png')} style={{width:24,height:24,marginRight:17}}></Image>
                  </TouchableOpacity>
                </View>
          </View>
          <View  style={{height:184,backgroundColor:'#fff'}}>
            {/* <ViewPager
              dataSource={imgList}
              renderPage={this._renderPage}
              isLoop={true}
              autoPlay={true}
              /> */}
              <IndicatorViewPager
              style={{height:184}}
              indicator={this._renderDotIndicator()}>
              {goodsDetail.data.data.img_list.map((img,index) => {
                  return (
                    <View key={index}>
                      <Image source={{uri: img.pic_path}} style={{width:width,height:184,resizeMode:'cover'}}/>
                    </View>
                  )
                })}
              </IndicatorViewPager>
          </View>
          <View style={{width:width,paddingHorizontal:12,paddingVertical:12,marginBottom:10,backgroundColor:'#fff'}}>
            <View style={{height:36,width:(width-24),flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <View stlye={{height:36,width:256}}>
                <Text style={{fontSize:15,width:256,lineHeight:20}}>{goodsDetail.data.data.product.prod_name}</Text>
              </View>
              <View style={{width:1,height:32,backgroundColor:'#CBCBCB',marginRight:8}}></View>
              <View style={{height:32,width:82,backgroundColor:'#FF9402',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#fff'}}>我要推荐</Text>
              </View>
            </View>
            <View style={{height:42,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-end'}}>
              <Text style={{fontSize:14,color:'#FF240D',fontWeight:'bold'}}>¥ <Text style={{fontSize:20}}>{goodsDetail.data.data.product.mall_price}</Text></Text>
              <Text style={{fontSize:14,color:'#797979',textDecorationLine:'line-through',marginLeft:14}}>¥ {goodsDetail.data.data.product.origin_price}</Text>
            </View>
          </View>
          <View style={{width:width,height:45,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:12,backgroundColor:'#fff',marginBottom:10}}>
            <Text style={{fontSize:15,}}>选择 颜色分类</Text>
            <View><Image style={{width:7,height:12}} source={require('../imgs/pp_right.png')}></Image></View>
          </View>
          <View style={{width:width,height:110,padding:12,flexDirection:'column',justifyContent:'space-between',backgroundColor:'#fff',marginBottom:10}}>
            <View style={{height:41,flexDirection:'row',justifyContent:'flex-start'}}>
              <Image source={{uri: goodsDetail.data.data.shop.logo}} style={{height:41,width:41,resizeMode:'stretch',marginRight:17}} />
              <View style={{flexDirection:'column',height:41,justifyContent:'space-between'}}>
                <Text>{goodsDetail.data.data.shop.shop_name}</Text>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <View style={{marginRight:12,flexDirection:'row'}}><Image source={require('../imgs/check.png')} style={{width:12,height:12,marginRight:2}}></Image><Text style={{fontSize:10,color:'#47C221'}}>微信认证</Text></View>
                  <View style={{flexDirection:'row'}}><Image source={require('../imgs/check.png')} style={{width:12,height:12,marginRight:2}}></Image><Text style={{fontSize:10,color:'#47C221'}}>支持自提</Text></View>
                </View>
              </View>
            </View>
            <View style={{flex:1,height:31,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <View style={{width:171,height:31,borderWidth:1,borderRadius:3,borderColor:'#797979',flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                <Image source={require('../imgs/address.png')} style={{height:16,width:16}} ></Image>
                <Text style={{fontSize:12,color:'#797979'}}>自提点</Text>
              </View>
              <View style={{width:171,height:31,borderWidth:1,borderRadius:3,borderColor:'#797979',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Image source={require('../imgs/shop.png')} style={{height:16,width:16}} ></Image>
                <Text style={{fontSize:12,color:'#797979'}}>进入店铺</Text>
              </View>
            </View>
          </View>
          <View style={{width:width,height:45,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff'}}>
            <View style={{flex:1,height:45,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:15,textAlign:'center'}}>
                商品详情
              </Text>
            </View>
            <View style={{width:1,height:32,backgroundColor:'#CBCBCB'}}></View>
            <View style={{flex:1,height:45,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:15,textAlign:'center'}}>
                商品评价
              </Text>
            </View>
          </View>
          <View>
            <WebView
            source={{html:goodsDetail.data.data.product.description.replace("<img","<img style='width:100%'")}}
            style={{backgroundColor:'#fff',width:width,flex:1,height:400}}
            scalesPageToFit={true}>
            </WebView>
          </View>
        </ScrollView>
        <View style={{width:width,height:50,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
          <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:1,borderRightColor:'#CBCBCB'}}>
            <Image source={require('../imgs/share.png')} style={{width:20,height:20}} ></Image>
            <Text style={{fontSize:10,color:'#797979'}}>分享</Text>
          </View>
          <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../imgs/star.png')} style={{width:20,height:20}} ></Image>
            <Text style={{fontSize:10,color:'#797979'}}>收藏</Text>
          </View>
          <TouchableOpacity style={{flex:1,height:50,backgroundColor:'#FF9402',flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={()=>{this.addCart(goodsDetail.data.data)}}><Text style={{color:'#fff',fontSize:15}}>加入购物车</Text></TouchableOpacity>
          <TouchableOpacity style={{flex:1,height:50,backgroundColor:'#FF240D',flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={()=>{this.buy(goodsDetail.data.data)}}><Text style={{color:'#fff',fontSize:15}}>立即购买</Text></TouchableOpacity>
        </View>
      </View>

    );
  }
}
let styles = StyleSheet.create({
  customDot: {
      backgroundColor: '#ccc',
      height: 1.5,
      width: 15,
      marginLeft: 2,
      marginRight: 2,
      marginTop: 2,
  },
  customActiveDot: {
      backgroundColor: 'white',
      height: 1.5,
      width: 15,
      marginLeft: 2,
      marginRight: 2,
      marginTop: 2,
  },
});
// export default GoodsDetails;

function mapStateToProps(state) {
  const { goodsDetail } = state;
  return {
    goodsDetail
  }
}

export default connect(mapStateToProps)(GoodsDetails);
