/**
 * 商品详情
 */
'use strict';
import React, {Component} from 'react';
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
  InteractionManager,
} from 'react-native';

import ProgressBar from  'ActivityIndicator';
import { NaviGoBack } from '../utils/CommonUtils';
import Swiper from 'react-native-swiper';
import OrderConfirm from './OrderConfirm';
import ShopDetail from './ShopDetail';
import Login from './CenterContent/Login';
import { connect } from 'react-redux';
import { performGoodsDetailAction } from '../actions/GoodsDetailAction';
import { performAppMainAction } from '../actions/AppMainAction';
import { performAddCartAction } from '../actions/AddCartAction';
import { addFav,cancelFav } from '../api/fav';
import { toastShort,toastLong } from '../utils/ToastUtil';
import Loading from '../component/Loading';

import Home from './Home';

var {height, width} = Dimensions.get('window');
var arr=[];
const html5Style = {
 p: {
   color: '#00f',
 },
 img: {
   width: width+'px'
 }
}

class ShopGoodsDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      height:200,
      activeIndex:null,
      num:1,
      tab:2,
    }
    this.buttonBackAction=this.buttonBackAction.bind(this);
    this._setModalVisible = this._setModalVisible.bind(this);
    this._choose = this._choose.bind(this);
    this._changeNum = this._changeNum.bind(this);
    this._fav = this._fav.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const {navigator,dispatch} = this.props;
      AsyncStorage.getItem('token').then(
        (token)=>{
          dispatch(performGoodsDetailAction(1,this.props.id,token));
        }
      ).catch((error)=>{
        console.log(' error:' + error.message);
      })
    });
  }

    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  renderLoadingView() {
    return (
      <ProgressBar />
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

  _choose(prop,pindex){
    arr[pindex]=prop;
    this.setState(()=>{
      return {
          product:arr
      }
    })
    this._select(arr);
  }

  _select(){
    const {goodsDetail} = this.props;
    let goods =  goodsDetail.data.data.goods_list;
    let length = goods.length;
    for(var i = 0; i < goods.length; i++){
      if(arr.toString() == goods[i].attrs){
        this.setState({
          activeIndex: i
        })
      }
    }
  }

  //加入购物车
  addCart(goodsList,index,num) {
    if(!num){
      num = 1;
    }
    this.setState({
      visible:false
    })
    if(!index){
      index=0
    }
    const {navigator,dispatch} = this.props;
    AsyncStorage.getItem('token').then(
      (token)=>{
        console.log(token);
        if (token===null){
          InteractionManager.runAfterInteractions(() => {
              navigator.push({
                component: Login,
                name: 'Login'
              });
            });
        }else {
          dispatch(performAddCartAction(token,goodsList,index,num));
        }
      }
    ).catch((error)=>{
      console.log(' error:' + error.message);
    })
  }

  //购买
  buy(goodsList,index,num) {
    const {navigator} = this.props;
    this.setState({
      visible:false
    })
    if(index==null){
      index=0;
    }
    if(goodsList.goods_list.length>0){
      var attrsarr = JSON.parse(goodsList.goods_list[index].rule_json);
      var attrs = '';
      attrsarr.map((data,index)=>{
        attrs += data.attr_key ? data.attr_key : '';
        attrs += data.attr_value ? data.attr_value : '';
      })
      var orderProduct = [];
      var goods_obj={};
      goods_obj.add_time = goodsList.product.add_time;
      goods_obj.attrs = attrs;
      goods_obj.goods_id = goodsList.goods_list[index].goods_id;
      goods_obj.link_img = goodsList.goods_list[index].link_img;
      goods_obj.list_img = goodsList.product.list_img;
      goods_obj.maket_price = goodsList.goods_list[index].maket_price;
      goods_obj.mall_price = goodsList.goods_list[index].mall_price;
      goods_obj.num = num;
      goods_obj.prod_id = goodsList.product.prod_id;
      goods_obj.prod_name = goodsList.product.prod_name;
      goods_obj.rule_json = goodsList.goods_list[index].shop_id;
      goods_obj.select = true;
      goods_obj.shop_id = goodsList.shop.shop_id;
      goods_obj.status = goodsList.product.status;
      // goods_obj.user_id = goodsList.product.prod_name;
      orderProduct.push(goods_obj);
      navigator.push({
        component: OrderConfirm,
        name: 'OrderConfirm',
        orderProduct: orderProduct,
        totalNum: 1,
        totalPrice: goodsList.product.mall_price,
        jiesuan: 1
         });
    }
  }

  //modal
  _setModalVisible(visible) {
    this.setState({visible: visible});
  }

  _fav(type,prod_id){
    const {dispatch} = this.props;
    switch (type) {
      case 1:
      AsyncStorage.getItem('token').then(
        (token)=>{
          if (token===null){
            toastLong('请先登录！');
          }else {
            if(prod_id&&token){
              addFav(token,prod_id).then(favStatus=>{
                if(favStatus.status){
                  toastShort('添加收藏成功！');
                  dispatch(performGoodsDetailAction(1,this.props.id,token));
                }else{
                  toastShort(favStatus.msg);
                }
              }).catch((error) => {
              toastShort('添加收藏失败！');
              });
            }else{
              toastShort('缺少必要参数！');
            }
          }
        }
      ).catch((error)=>{
        console.log(' error:' + error.message);
      })
        break;
      case 2:
      AsyncStorage.getItem('token').then(
        (token)=>{
          if (token===null){
            toastLong('请先登录！');
          }else {
            if(prod_id&&token){
              cancelFav(token,prod_id).then(favStatus=>{
                if(favStatus.status){
                  toastShort('取消收藏成功！');
                  dispatch(performGoodsDetailAction(1,this.props.id,token));
                }else{
                  toastShort(favStatus.msg);
                }
              }).catch((error) => {
              toastShort('取消收藏失败！');
              });
            }else{
              toastShort('缺少必要参数！');
            }
          }
        }
      ).catch((error)=>{
        console.log(' error:' + error.message);
      })
        break;
      default:

    }
  }

  _changeNum(num,add){
    num+=add;
    if(num<0){
      num = 0;
    }
    this.setState({
      num:num
    })
  }

  //小店详情
  _goShop(shop_id){
    const { navigator } = this.props;
    navigator.push({
      component: ShopDetail,
      name: 'ShopDetail',
      params: {
        shop_id:shop_id
      }
    })
  }

  render() {
    const {goodsDetail} = this.props;
    if (!goodsDetail.data) {
       return this.renderLoadingView();
     }else{

    var htmlContent = goodsDetail.data.data.product.description.replace(/<img/g,"<img style='width:100%'").replace(/<p>/g,"").replace(/<\/p>/g,"");
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
          <Swiper height={width} showsButtons={false} autoplay={true} autoplayTimeout={3} loop>
            {goodsDetail.data.data.img_list.map((img,index)=>{
              return(
                <View key={index} style={{width:width,height:width}}>
                  <Image source={{uri:img.pic_path}} style={{width:width,height:width,resizeMode:'stretch'}}/>
                </View>
              )
            })}
          </Swiper>
          <View style={{width:width,paddingHorizontal:12,paddingVertical:12,marginBottom:10,backgroundColor:'#fff'}}>
            <View style={{height:36,width:(width-24),flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <View stlye={{height:36,width:256}}>
                <Text style={{fontSize:15,width:256,lineHeight:20}}>{goodsDetail.data.data.product.prod_name}</Text>
              </View>
              {/* <View style={{width:1,height:32,backgroundColor:'#CBCBCB',marginRight:8}}></View>
              <View style={{height:32,width:82,backgroundColor:'#FF9402',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#fff'}}>我要推荐</Text>
              </View> */}
            </View>
            <View style={{height:42,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-end'}}>
              <Text style={{fontSize:14,color:'#FF240D',fontWeight:'bold'}}>¥ <Text style={{fontSize:20}}>{(this.state.activeIndex!==null)?goodsDetail.data.data.goods_list[this.state.activeIndex].mall_price:goodsDetail.data.data.product.mall_price}</Text></Text>
              <Text style={{fontSize:14,color:'#797979',textDecorationLine:'line-through',marginLeft:14}}>¥ {(this.state.activeIndex!==null)?goodsDetail.data.data.goods_list[this.state.activeIndex].maket_price:goodsDetail.data.data.product.maket_price}</Text>
            </View>
          </View>
          {goodsDetail.data.data.goods_list.length!==1&&
          <TouchableOpacity onPress={()=>{this.setState({visible:true,jiesuan:1})}} style={{width:width,height:45,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:12,backgroundColor:'#fff',marginBottom:10}}>
            <Text style={{fontSize:15}}>选择 颜色分类</Text>
            <View><Image style={{width:7,height:12}} source={require('./img/pp_right.png')}></Image></View>
          </TouchableOpacity>
          }
          <TouchableOpacity onPress={()=>{this._goShop(goodsDetail.data.data.shop.shop_id)}} style={{width:width,padding:12,flexDirection:'column',justifyContent:'space-between',backgroundColor:'#fff',marginBottom:10}}>
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
            {/* <View style={{flex:1,height:31,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <View style={{width:171,height:31,borderWidth:1,borderRadius:3,borderColor:'#797979',flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                <Image source={require('./img/address.png')} style={{height:16,width:16}} ></Image>
                <Text style={{fontSize:12,color:'#797979'}}>自提点</Text>
              </View>
              <View style={{width:171,height:31,borderWidth:1,borderRadius:3,borderColor:'#797979',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Image source={require('./img/shop.png')} style={{height:16,width:16}} ></Image>
                <Text style={{fontSize:12,color:'#797979'}}>进入店铺</Text>
              </View>
            </View> */}
          </TouchableOpacity>
          <View style={{width:width,height:45,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff'}}>
            <TouchableOpacity onPress={()=>{this.setState({tab:1})}} style={{flex:1,height:45,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Text style={[{fontSize:15,textAlign:'center'},this.state.tab==1&&{color:'#ED2323'}]}>
                商品详情
              </Text>
            </TouchableOpacity>
            <View style={{width:1,height:32,backgroundColor:'#CBCBCB'}}></View>
            <TouchableOpacity  onPress={()=>{this.setState({tab:2})}} style={{flex:1,height:45,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Text style={[{fontSize:15,textAlign:'center'},this.state.tab==2&&{color:'#ED2323'}]}>
                商品评价
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {this.state.tab==1?
              <View style={{height:this.state.height}}>
                <WebView
                source={{html: `<!DOCTYPE html><html><body>${htmlContent}<script>window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}</script></body></html>`}}
                style={{flex:1}}
                bounces={false}
                scrollEnabled={false}
                automaticallyAdjustContentInsets={true}
                // contentInset={{top:0,left:0}}
                onNavigationStateChange={(title)=>{
                  // console.log(title);
                  if(parseInt(title.title) > 0) {
                    this.setState({
                      height:(parseInt(title.title)+20)
                    })
                  }
                }}
                >
                </WebView>
               </View>
              // <Html5
              //   rawHtml={goodsDetail.data.data.product.description}
              //   styleSheet={{}}
              //   externalStyleSheet={{}}
              // />
              :
              <View>
                <View style={{flex:1,height:45,flexDirection:'row'}}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}><Text>全部评价</Text></View>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}><Text>好评</Text></View>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}><Text>中评</Text></View>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}><Text>差评</Text></View>
                </View>
                <View style={{height:30,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                  <Text>
                    暂无此类评价！
                  </Text>
                </View>
              </View>
            }
          </View>

        </ScrollView>
        <View style={{width:width,height:50,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',backgroundColor:'#fff'}}>
          {/* <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',borderRightWidth:1,borderRightColor:'#CBCBCB'}}>
            <Image source={require('./img/share.png')} style={{width:20,height:20}} ></Image>
            <Text style={{fontSize:10,color:'#797979'}}>分享</Text>
          </View> */}
          {goodsDetail.data.data.isFav?
          <View style={{flex:2,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{this._fav(2,goodsDetail.data.data.product.prod_id)}}><Image source={require('./img/star-active.png')} style={{width:20,height:20}} ></Image></TouchableOpacity>
            <Text style={{fontSize:10,color:'#797979'}}>收藏</Text>
          </View>
          :<View style={{flex:2,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{this._fav(1,goodsDetail.data.data.product.prod_id)}}><Image source={require('./img/star.png')} style={{width:20,height:20}} ></Image></TouchableOpacity>
            <Text style={{fontSize:10,color:'#797979'}}>收藏</Text>
          </View>
          }
          {(goodsDetail.data.data.goods_list.length!==1)?<TouchableOpacity style={{flex:1,height:50,backgroundColor:'#FF9402',flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={()=>{this.setState({visible:true,jiesuan:2})}}><Text style={{color:'#fff',fontSize:15}}>加入购物车</Text></TouchableOpacity>
          :<TouchableOpacity style={{flex:1,height:50,backgroundColor:'#FF9402',flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={()=>{this.addCart(goodsDetail.data.data)}}><Text style={{color:'#fff',fontSize:15}}>加入购物车</Text></TouchableOpacity>}

          {(goodsDetail.data.data.goods_list.length!==1)?<TouchableOpacity style={{flex:1,height:50,backgroundColor:'#FF240D',flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={()=>{this.setState({visible:true,jiesuan:1})}}><Text style={{color:'#fff',fontSize:15}}>立即购买</Text></TouchableOpacity>
          :<TouchableOpacity style={{flex:1,height:50,backgroundColor:'#FF240D',flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={()=>{this.buy(goodsDetail.data.data)}}><Text style={{color:'#fff',fontSize:15}}>立即购买</Text></TouchableOpacity>}
        </View>
        {
          goodsDetail.data.data.goods_list.length!==1&&
        <Modal
          visible={this.state.visible}
          transparent
          onRequestClose={()=>{}}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={()=>{this.setState({visible:false})}} style={styles.modalBackground}>
                <View style={styles.loading}>
                  <View style={{width:width,height:110}}>
                    <View style={{height:40}}></View>
                    <View style={{flex:1,backgroundColor:'#fff',paddingLeft:126}}>
                      <View style={{height:70,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:20}}>
                        {this.state.activeIndex!==null?
                          <View>
                            <Text style={{fontSize:16,color:'#FF240D',fontWeight:'bold'}}>¥ <Text style={{fontSize:20}}>{goodsDetail.data.data.goods_list[this.state.activeIndex].mall_price}</Text></Text>
                            <Text style={{fontSize:14,color:'#797979',textDecorationLine:'line-through',marginLeft:14}}>¥ {goodsDetail.data.data.goods_list[this.state.activeIndex].maket_price}</Text>
                          </View>
                        :<Text style={{fontSize:16,color:'#FF240D'}}>请先选择商品规格</Text>}
                      </View>
                    </View>
                    <Image source={{uri:goodsDetail.data.data.product.list_img}} style={{width:110,height:110,resizeMode:'stretch',position:'absolute',top:0,left:16}}></Image>
                  </View>
                  <View style={{height:78,width:width,paddingHorizontal:16,backgroundColor:'#fff',justifyContent:'center',alignItems:'flex-start'}}>
                    <Text style={{fontSize:16,color:'#000'}}>{goodsDetail.data.data.product.prod_name}</Text>
                  </View>
                  {goodsDetail.data.data.product.attr.map((data,pindex)=>{
                    return(
                      <View key={pindex} style={{height:50,width:width,paddingHorizontal:16,backgroundColor:'#fff',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                        <View style={{marginRight:12,height:26,justifyContent:'center',alignItems:'center'}}>
                          <Text style={{fontSize:14,color:'#666',}}>
                            {data.attr_key}
                          </Text>
                        </View>
                        {data.attr_values.map((data,index)=>{
                          return(
                          <TouchableOpacity onPress={()=>{this._choose(data,pindex)}} key={index} style={[{width:50,height:26,justifyContent:'center',alignItems:'center',borderRadius:12,marginRight:12},(data==arr[pindex])?{backgroundColor:'#FF240D'}:{backgroundColor:'#E2E2E2'}]}>
                            <Text style={[{fontSize:14,textAlign:'center'},(data==arr[pindex])?{color:'#fff'}:{color:'#666'}]}>
                              {data}
                            </Text>
                          </TouchableOpacity>
                          )
                        })}
                      </View>
                    )
                  })}
                  <View style={{width:width,height:50,backgroundColor:'#fff',paddingHorizontal:16,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={{fontSize:14,color:'#666'}}>数量：（库存{goodsDetail.data.data.product.stock}件）</Text>
                    <View style={{height:26,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                      <TouchableOpacity onPress={()=>{this._changeNum(this.state.num,-1)}} style={{width:26,height:26,justifyContent:'center',alignItems:'center',backgroundColor:'#F2F2F2',borderWidth:1,borderColor:'#E6E6E6',}}>
                        <Text style={{fontSize:14}}>-</Text>
                      </TouchableOpacity>
                      <View style={{width:36,height:26,justifyContent:'center',alignItems:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#E6E6E6'}}>
                        <Text style={{fontSize:14,textAlign:'center',}}>
                          {this.state.num}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={()=>{this._changeNum(this.state.num,1)}} style={{width:26,height:26,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#E6E6E6',}}>
                        <Text style={{fontSize:14}}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {this.state.activeIndex?
                  <View style={{flex:1,width:width,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                    {this.state.jiesuan==1&&<TouchableOpacity onPress={()=>{this.buy(goodsDetail.data.data,this.state.activeIndex,this.state.num)}}  style={{width:width-40,height:44,backgroundColor:'#FF240D',justifyContent:'center',alignItems:'center',borderRadius:22,}}>
                      <Text style={{fontSize:18,color:'#fff'}}>
                        立即购买
                      </Text>
                    </TouchableOpacity>}
                    {this.state.jiesuan==2&&<TouchableOpacity onPress={()=>{this.addCart(goodsDetail.data.data,this.state.activeIndex,this.state.num)}}  style={{width:width-40,height:44,backgroundColor:'#FF240D',justifyContent:'center',alignItems:'center',borderRadius:22,}}>
                      <Text style={{fontSize:18,color:'#fff'}}>
                        加入购物车
                      </Text>
                    </TouchableOpacity>}
                  </View> :
                  <View style={{flex:1,width:width,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                    {this.state.jiesuan==1&&<TouchableOpacity   style={{width:width-40,height:44,backgroundColor:'#f5f5f5',justifyContent:'center',alignItems:'center',borderRadius:22,}}>
                      <Text style={{fontSize:18,color:'#666'}}>
                        立即购买
                      </Text>
                    </TouchableOpacity>}
                    {this.state.jiesuan==2&&<TouchableOpacity   style={{width:width-40,height:44,backgroundColor:'#f5f5f5',justifyContent:'center',alignItems:'center',borderRadius:22,}}>
                      <Text style={{fontSize:18,color:'#666'}}>
                        加入购物车
                      </Text>
                    </TouchableOpacity>}
                  </View> }
                </View>
              </TouchableOpacity>
            </View>
        </Modal>
        }
      </View>
    );
    }
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  loading: {
    width: width,
    height: 400,
    // backgroundColor: '#fff',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start'
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#000'
  }
});
// export default GoodsDetails;

function mapStateToProps(state) {
  const { goodsDetail } = state;
  return {
    goodsDetail
  }
}

export default connect(mapStateToProps)(ShopGoodsDetail);
