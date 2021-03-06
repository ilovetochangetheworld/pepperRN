/**
 * 购物车页面
 */
'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    InteractionManager,
    ScrollView,
    AsyncStorage,
    ListView
} from 'react-native';
var {height, width} = Dimensions.get('window');
import OrderConfirm from './OrderConfirm';
import { connect } from 'react-redux';
import Login from './CenterContent/Login';
import { performCartAction } from '../actions/CartAction';
import { performDelCartAction } from '../actions/DelCartAction';
import { performShopSelectAction } from '../actions/ShopSelectAction';
import { performProductSelectAction } from '../actions/ProductSelectAction';
import { performCartCountAction } from '../actions/CartCountAction';
import { performAppMainAction } from '../actions/AppMainAction';
import { toastShort } from '../utils/ToastUtil';
import Loading from '../component/Loading';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.payItemAction=this.payItemAction.bind(this);
    }

    componentDidMount() {
         this.checkAuth();
       }

    componentWillReceiveProps(nextProps) {
        const {cart,token} = nextProps;
        if(cart.refresh){
          this.checkAuth();
        }
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
            console.log(' error:' + error.message);
          })
        }
    }

    checkAuth(){
      const {dispatch,navigator} = this.props;
      AsyncStorage.getItem('token').then(
        (result)=>{
          if (result===null){
            toastShort('没有获取到token');
            InteractionManager.runAfterInteractions(() => {
                navigator.push({
                  component: Login,
                  name: 'Login'
                });
              });
          }
          else{
            dispatch(performCartAction(result));
          }
        }
      ).catch((error)=>{
        console.log(' error:' + error.message);
      })
    }

    //结算按钮
    payItemAction(){
        const {navigator,cart} = this.props;
        var orderProduct = [];
        var totalNum = 0;
        var totalPrice = 0;
        cart.data.data.map((data,index) => {
          {data.products.map((product,proIndex) => {
            if(product.select){
              orderProduct.push(product);
              totalNum++;
              totalPrice+=product.maket_price*product.num;
            }
        })
      }})
        navigator.push({
          component: OrderConfirm,
          name: 'OrderConfirm',
          orderProduct: orderProduct,
          totalNum: totalNum,
          totalPrice: totalPrice
           });
    }

    //跳转到首页
    toIndex(){
      const {navigator,dispatch} = this.props;
      dispatch(performAppMainAction('home'));
      navigator.popToTop();
    }

    renderLoadingView() {
      return (
        <Loading />
      );
    }

    nullCart() {
      return (
        <View style={{flex:1,backgroundColor:'#F2F2F2'}}>
          <View style={{height:48,backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#e6e6e6'}}>
              <View style={{width:48,height:48,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('./img/pp_return.png')} style={{width:11,height:18}}></Image>
              </View>
              <View style={{flex:1,alignItems:'center',justifyContent:'center',height:48,width:50}}>
                 <Text style={{fontSize:18,color:'#000',alignSelf:'center'}}>购物车</Text>
              </View>
              <View style={{width:48}}>
              </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',marginTop:100}}>
            <TouchableOpacity onPress={()=>{this.toIndex()}}>
              <Image style={{width:131,height:155,resizeMode:'cover'}} source={require('./img/nullCart.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    render() {
        const {cart,dispatch} = this.props;
        if (!cart.data) {
           return this.renderLoadingView();
         }
        if (cart.data.nullCart){
          return this.nullCart();
        }
        if(cart.data.status){
          cart.data.totalNum=0;
          cart.data.totalPrice=0;
          return (
               <View style={{flex:1,backgroundColor:'#f5f5f5',height:48}}>
                  <View style={{height:48,backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#e6e6e6'}}>
                      <View style={{width:48,height:48,justifyContent:'center',alignItems:'center'}}>
                        {/* <Image source={require('./img/pp_return.png')} style={{width:11,height:18}}></Image> */}
                      </View>
                      <View style={{flex:1,alignItems:'center',justifyContent:'center',height:48,width:50}}>
                         <Text style={{fontSize:18,color:'#000',alignSelf:'center'}}>购物车</Text>
                      </View>
                      <View style={{width:48}}>
                      </View>
                  </View>
                  <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                  {cart.data.data.map((data,index) => {
                      var price = 0;
                      var num =0;
                      //默认店铺选中
                      if(data.products.length>0){
                        return (
                          <View key={index} style={{backgroundColor:'#fff',marginBottom:18,}}>
                            <TouchableOpacity onPress={()=>{dispatch(performShopSelectAction(cart,index))}}>
                              <View style={{width:width,height:45,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingHorizontal:12,borderBottomWidth:1,borderBottomColor:'#E6E6E6'}}>
                                <View style={{height:16,width:16,marginRight:10}}>
                                  {data.select ? <Image source={require('./img/checkbox_active.png')} style={{height:16,width:16}}/> : <Image source={require('./img/checkbox.png')} style={{height:16,width:16}}/>}
                                </View>
                                <Image source={require('./img/shop.png')} style={{height:16,width:16,marginRight:10}}/>
                                <Text>{data.shop_name}</Text>
                              </View>
                            </TouchableOpacity>
                            {data.products.map((product,proIndex) => {
                              if(product.select){
                                cart.data.totalNum++;
                                num++;
                                cart.data.totalPrice+=product.mall_price*product.num;
                                price = product.mall_price*product.num;
                              }
                              return(
                              <TouchableOpacity onPress={()=>{dispatch(performProductSelectAction(cart,index,proIndex))}} key={proIndex} style={{height:126,width:width,flexDirection:'row',justifyContent:'flex-start',borderBottomWidth:1,borderBottomColor:'#f6f6f6'}}>
                                <View style={{height:126,width:38,justifyContent:'center',alignItems:'center'}}>
                                  {product.select ? <Image source={require('./img/checkbox_active.png')} style={{height:16,width:16}}/> : <Image source={require('./img/checkbox.png')} style={{height:16,width:16}}/>}
                                </View>
                                <View style={{width:width-38,height:126,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                  <Image style={{height:96,width:96,resizeMode:'cover'}} source={{uri:product.list_img}}/>
                                  <View style={{width:216,height:96,flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start'}}>
                                    <Text style={{width:216,lineHeight:20,fontSize:14}} numberOfLines={2}>{product.prod_name}</Text>
                                    <View style={{width:216,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                      <View>
                                        <Text style={{fontSize:16,color:'#FF240D'}}>¥ {product.mall_price}</Text>
                                        <Text style={{fontSize:12,color:'#797979',textDecorationLine:'line-through'}}>¥ {product.maket_price}</Text>
                                      </View>
                                      <View>
                                        <View style={{height:26,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                                          <TouchableOpacity onPress={()=>{dispatch(performCartCountAction(cart,index,proIndex,-1))}} style={{width:26,height:26,justifyContent:'center',alignItems:'center',backgroundColor:'#F2F2F2',borderWidth:1,borderColor:'#E6E6E6',}}>
                                            <Text style={{fontSize:14}}>-</Text>
                                          </TouchableOpacity>
                                          <View style={{width:36,height:26,justifyContent:'center',alignItems:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#E6E6E6'}}>
                                            <Text style={{fontSize:14,textAlign:'center',}}>
                                              {product.num}
                                            </Text>
                                          </View>
                                          <TouchableOpacity onPress={()=>{dispatch(performCartCountAction(cart,index,proIndex,1))}} style={{width:26,height:26,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#E6E6E6',}}>
                                            <Text style={{fontSize:14}}>+</Text>
                                          </TouchableOpacity>
                                          <TouchableOpacity onPress={()=>{dispatch(performDelCartAction(cart,index,proIndex))}}>
                                            <Image style={{height:20,width:20,marginLeft:14}} source={require('./img/del.png')}></Image>
                                          </TouchableOpacity>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )
                            })}
                            <View style={{height:45,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',paddingHorizontal:12}}>
                              <Text style={{fontSize:12}}>总共 <Text style={{color:'#000'}}>{cart.data.totalNum}</Text> 个商品，合计金额 <Text style={{color:'#000'}}>{price}</Text> 元</Text>
                            </View>
                          </View>
                        )
                      }else{
                        return null
                      }

                    })}
                  </ScrollView>
                  <View style={{justifyContent:'flex-end',}}>
                        {/* <View style={{backgroundColor:'white',width:width,height:40}}>
                              <View style={{flexDirection:'row',marginLeft:15,marginTop:5}}>
                                    <Text style={{fontSize:11,color:'black',flex:1}}>预估小计</Text>
                                    <View style={{flex:1,alignItems:'flex-end',marginRight:15}}>
                                          <Text style={{color:'red',fontSize:11}}>¥116</Text>
                                    </View>
                              </View>
                              <View style={{marginLeft:15,marginTop:3}}>
                                    <Text style={{color:'#777',fontSize:11}}>实际总计将以商家收据为准,为保证您的权益,请于配货员联系.</Text>
                              </View>
                        </View> */}
                        <TouchableOpacity onPress={()=>{this.payItemAction()}}>
                                <Image source={require('./img/cart/ic_cart_btn_bg.png')}
                                       style={{width:width,height:40,justifyContent:'center',alignItems:'center'}}>
                                       <Text style={{color:'white',fontSize:14,backgroundColor:'#00000000'}}>结算</Text>
                                </Image>
                        </TouchableOpacity>
                  </View>
               </View>
          );
        }
    }
}

// export default Cart;

function mapStateToProps(state) {
  const { cart,token } = state;
  return {
    cart,
    token
  }
}
export default connect(mapStateToProps)(Cart);
