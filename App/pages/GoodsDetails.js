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
  AsyncStorage,
  Modal,
  InteractionManager
} from 'react-native';

import { NaviGoBack } from '../utils/CommonUtils';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { performGoodsDetailAction } from '../actions/GoodsDetailAction';
import { performAppMainAction } from '../actions/AppMainAction';
import { performAddCartAction } from '../actions/AddCartAction';
import Loading from '../component/Loading';
import HtmlRender from 'react-native-html-render';

import Home from './Home';

var {height, width} = Dimensions.get('window');

class GoodsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      visible:true
    }
    this.buttonBackAction=this.buttonBackAction.bind(this);
    this._setModalVisible = this._setModalVisible.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const {navigator,dispatch} = this.props;
      dispatch(performGoodsDetailAction(1,this.props.id));
    });

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
      <Loading visible={true} />
    );
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
          InteractionManager.runAfterInteractions(() => {
              navigator.push({
                component: Login,
                name: 'Login'
              });
            });
        }else {
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

  _onLinkPress(url) {
        if (/^\/user\/\w*/.test(url)) {
            let authorName = url.replace(/^\/user\//, '')
            routes.toUser(this, {
                userName: authorName
            })
        }

        if (/^https?:\/\/.*/.test(url)) {
            window.link(url)
        }
    }


    _renderNode(node, index, parent, type) {
        var name = node.name
        if (node.type == 'block' && type == 'block') {
            if (name == 'img') {
                var uri = node.attribs.src;
                if (/^\/\/dn-cnode\.qbox\.me\/.*/.test(uri)) {
                    uri = 'https:' + uri
                }
                Image.getSize(uri, (imgWidth, imgHeight) => {
                  let height=imgHeight/(imgWidth/width);
                  console.log(width+':'+imgHeight/(imgWidth/width));
                  return (
                      <View
                          key={index}>
                          {/* <Image source={{uri:uri}}
                                 style={{width:width,height:imgHeight/(imgWidth/width),resizeMode:'stretch'}}>
                          </Image> */}
                          <Text>1111</Text>
                      </View>
                  )
                });
            }
        }
    }
  //modal

  _setModalVisible(visible) {
    this.setState({visible: visible});
  }

  render() {
    const {goodsDetail} = this.props;
    if (!goodsDetail.data) {
       return this.renderLoadingView();
     }
    // var htmlContent = goodsDetail.data.data.product.description.replace(/<img/g,"<img style='width:100%,height:100%,display:block'").replace(/<p/g,"<p style='margin:0,padding:0,backgroundColor:red'");
    var htmlContent = goodsDetail.data.data.product.description.replace(/<img/g,"<img style='width:100%,height:100%,display:block'").replace(/<p>/g,"").replace(/<\/p>/g,"");
    return (
       <View style={{backgroundColor:'#f5f5f5',flex:1}}>
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
          <View style={{height:48,backgroundColor:'#fff',flexDirection:'row',borderBottomWidth:1,borderColor:'#cbcbcb'}}>
                <TouchableOpacity onPress={() => {this.buttonBackAction()}}
                                  style={{width:100,height:48,alignItems:'flex-start',justifyContent:'center'}}>
                   <Image source={require('./img/pp_return.png')} style={{width:11,height:18,marginLeft:17}}></Image>
                </TouchableOpacity>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:18,color:'#000',alignSelf:'center'}}>商品详情</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:48,width:100}}>
                  <TouchableOpacity onPress={() => {this.skip(1)}}>
                    <Image source={require('./img/pp_tab_home.png')} style={{width:24,height:24,marginRight:23}}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {this.skip(2)}}>
                    <Image source={require('./img/pp_tab_cart.png')} style={{width:24,height:24,marginRight:17}}></Image>
                  </TouchableOpacity>
                </View>
          </View>
          <Swiper height={184} showsButtons={false} autoplay={true} autoplayTimeout={3} loop>
            {goodsDetail.data.data.img_list.map((img,index)=>{
              return(
                <View key={index} style={{width:width,height:184}}>
                  <Image source={{uri:img.pic_path}} style={{width:width,height:184,resizeMode:'stretch'}}/>
                </View>
              )
            })}
          </Swiper>
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
          {goodsDetail.data.data.goods_list.length!==1&&
          <View style={{width:width,height:45,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:12,backgroundColor:'#fff',marginBottom:10}}>
            <Text style={{fontSize:15,}}>选择 颜色分类</Text>
            <View><Image style={{width:7,height:12}} source={require('./img/pp_right.png')}></Image></View>
          </View>

          }
          <View style={{width:width,height:110,padding:12,flexDirection:'column',justifyContent:'space-between',backgroundColor:'#fff',marginBottom:10}}>
            <View style={{height:41,flexDirection:'row',justifyContent:'flex-start'}}>
              <Image source={{uri: goodsDetail.data.data.shop.logo}} style={{height:41,width:41,resizeMode:'stretch',marginRight:17}} />
              <View style={{flexDirection:'column',height:41,justifyContent:'space-between'}}>
                <Text>{goodsDetail.data.data.shop.shop_name}</Text>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <View style={{marginRight:12,flexDirection:'row'}}><Image source={require('./img/check.png')} style={{width:12,height:12,marginRight:2}}></Image><Text style={{fontSize:10,color:'#47C221'}}>微信认证</Text></View>
                  <View style={{flexDirection:'row'}}><Image source={require('./img/check.png')} style={{width:12,height:12,marginRight:2}}></Image><Text style={{fontSize:10,color:'#47C221'}}>支持自提</Text></View>
                </View>
              </View>
            </View>
            <View style={{flex:1,height:31,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <View style={{width:171,height:31,borderWidth:1,borderRadius:3,borderColor:'#797979',flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                <Image source={require('./img/address.png')} style={{height:16,width:16}} ></Image>
                <Text style={{fontSize:12,color:'#797979'}}>自提点</Text>
              </View>
              <View style={{width:171,height:31,borderWidth:1,borderRadius:3,borderColor:'#797979',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Image source={require('./img/shop.png')} style={{height:16,width:16}} ></Image>
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
            source={{html:htmlContent}}
            style={{backgroundColor:'#fff',flex:1,height:500,paddingBottom:20,width:width}}>
            </WebView>
            {/* <HtmlRender
               value={htmlContent}
               stylesheet={{flex:1}}
              //  renderNode={this._renderNode}
               /> */}
          </View>
        </ScrollView>
        <View style={{width:width,height:50,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
          <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:1,borderRightColor:'#CBCBCB'}}>
            <Image source={require('./img/share.png')} style={{width:20,height:20}} ></Image>
            <Text style={{fontSize:10,color:'#797979'}}>分享</Text>
          </View>
          <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          {goodsDetail.data.data.isFav?
            <Image source={require('./img/star_active.png')} style={{width:20,height:20}} ></Image>:
            <Image source={require('./img/star.png')} style={{width:20,height:20}} ></Image>
          }
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
