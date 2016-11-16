'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    InteractionManager,
    Dimensions,
    TextInput,
    ScrollView,
    ListView,
} from 'react-native';

import { NaviGoBack } from '../utils/CommonUtils';
import goodsDetail from './GoodsDetails';
import CommonHeader from '../component/CommonHeader';
import {HOST} from  '../common/request';
import { getShopDetail,getShopGoods } from '../api/shop';
import { toastShort } from '../utils/ToastUtil';
var {height,width} = Dimensions.get('window');

class ShopDetail extends Component {
  constructor(props) {
      super(props);
      this.state={
        detailStatus: false,
        goodsStatus: false,
        shopDetail: null,
        shopGoods: null,
        loadingStatus: false,
      }
      this.buttonBackAction = this.buttonBackAction.bind(this);
      this._renderGoods = this._renderGoods.bind(this);
      this._getShopDetail = this._getShopDetail.bind(this);
      this._getShopDetail = this._getShopDetail.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._getShopDetail(this.props.shop_id);
      this._getShopGoods(this.props.shop_id);
    });
 }

  _getShopDetail(shop_id){
    if(shop_id){
      this.setState({
        loadingStatus: true
      })
      getShopDetail(shop_id).then((shopDetailData)=>{
        this.setState({
          loadingStatus: false
        })
        if(shopDetailData.status){
          this.setState({
            detailStatus:true,
            shopDetail:shopDetailData,
          })
        }else{
          toastShort(shopDetailData.msg);
        }
      }).catch((error)=>{
        toastShort(' error:' + error.message);
      })
    }
 }

 _getShopGoods(shop_id){
   if(shop_id){
     this.setState({
       loadingStatus: true
     })
     getShopGoods(shop_id).then((shopGoodsData)=>{
       this.setState({
         loadingStatus: false
       })
       if(shopGoodsData.status){
         console.log(shopGoodsData);
         this.setState({
           goodsStatus:true,
           shopGoods:shopGoodsData.data.rows
         })
       }else{
         toastShort(shopGoodsData.msg);
       }
     }).catch((error)=>{
       toastShort(' error:' + error.message);
     })
   }
}

  //返回
  buttonBackAction() {
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  //goodsDetail跳转
 goodsDetailAction(prod_id) {
   const {navigator} = this.props;
     InteractionManager.runAfterInteractions(() => {
       navigator.push({
         component: goodsDetail,
         name: 'goodsDetail',
         params: {
              id: prod_id
          }
       });
     })
 }

  _renderGoods(data){
    return (
      <TouchableOpacity style={{flex:1,height:280,width:(width-30)/2,justifyContent:'center',alignItems:'center',marginBottom:8,backgroundColor:'#fff',}}
                        onPress={()=>{this.goodsDetailAction(data.prod_id)}} >
          <Image source={{uri:data.list_img}} style={{width:(width-30)/2,height:175,resizeMode:'stretch'}}/>
          <View style={{flex:1, paddingTop:10,justifyContent:'center',alignItems:'center', backgroundColor:'white',}}>
                <Text style={{width:(width-30)/2-20, height:34, lineHeight:17, fontSize:14, overflow:'hidden'}}>{data.prod_name}</Text>
          </View>
          <View style={{width:176, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', backgroundColor:'#fff', paddingHorizontal:10}}>
                <View>
                  <Text style={{fontSize:15,color:'#FF240D'}}>¥{data.mall_price}</Text>
                  <Text style={{textDecorationLine:'line-through',fontSize:12,color:'#797979',paddingVertical:10}}>¥{data.maket_price}</Text>
                </View>
                <Image source={require('./img/pp_cart.png')} style={{width:27,height:27}}/>
          </View>
      </TouchableOpacity>
    )
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

  render() {
        //
        // if (this.state.loadingStatus) {
        //    return this.renderLoadingView();
        //  }

        if(this.state.detailStatus&&this.state.goodsStatus){
          console.log(this.state.shopGoods);
          return (
               <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                 <CommonHeader title='店铺详情' onPress={()=>{this.buttonBackAction()}} />
                 <View style={{width:width,padding:12,flexDirection:'column',justifyContent:'space-between',backgroundColor:'#fff'}}>
                   <View style={{height:41,flexDirection:'row',justifyContent:'flex-start'}}>
                     <Image source={{uri: this.state.shopDetail.data[0].logo}} style={{height:41,width:41,resizeMode:'stretch',marginRight:17}} />
                     <View style={{flexDirection:'column',height:41,justifyContent:'space-between'}}>
                       <Text>{this.state.shopDetail.data[0].shop_name}</Text>
                       <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                         <View style={{marginRight:12,flexDirection:'row'}}><Image source={require('./img/check.png')} style={{width:12,height:12,marginRight:2}}></Image><Text style={{fontSize:10,color:'#47C221'}}>微信认证</Text></View>
                         <View style={{flexDirection:'row'}}><Image source={require('./img/check.png')} style={{width:12,height:12,marginRight:2}}></Image><Text style={{fontSize:10,color:'#47C221'}}>支持自提</Text></View>
                       </View>
                     </View>
                   </View>
                 </View>
                 <View style={{height:40,paddingHorizontal:10,backgroundColor:'#fff',marginBottom:10}}>
                   <Text style={{fontSize:14,color:'#000'}}>店铺详情：<Text style={{color:'#797979'}}>{this.state.shopDetail.data[0].brief.replace('&lt;p&gt;','').replace('&lt;/p&gt;','')}</Text></Text>
                 </View>
                 <View>
                   <View style={[styles.section_title,{backgroundColor:'white'}]}>
                     <View style={styles.section_title_left}>
                       <View style={styles.section_title_left_solid}></View>
                       <Text style={styles.section_title_left_name}>全部商品</Text>
                     </View>
                   </View>
                 </View>
                  <View style={{flex:1, padding:10, backgroundColor:'#F2F2F2'}}>
                      {this.state.shopGoods.map((data,index)=>{
                        return (
                          <TouchableOpacity style={{flex:1,height:280,width:(width-30)/2,justifyContent:'center',alignItems:'center',marginBottom:8,backgroundColor:'#fff',}}
                                            onPress={()=>{this.goodsDetailAction(data.prod_id)}} >
                              <Image source={{uri:data.list_img}} style={{width:(width-30)/2,height:175,resizeMode:'stretch'}}/>
                              <View style={{flex:1, paddingTop:10,justifyContent:'center',alignItems:'center', backgroundColor:'white',}}>
                                    <Text style={{width:(width-30)/2-20, height:34, lineHeight:17, fontSize:14, overflow:'hidden'}}>{data.prod_name}</Text>
                              </View>
                              <View style={{width:176, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', backgroundColor:'#fff', paddingHorizontal:10}}>
                                    <View>
                                      <Text style={{fontSize:15,color:'#FF240D'}}>¥{data.mall_price}</Text>
                                      <Text style={{textDecorationLine:'line-through',fontSize:12,color:'#797979',paddingVertical:10}}>¥{data.maket_price}</Text>
                                    </View>
                                    <Image source={require('./img/pp_cart.png')} style={{width:27,height:27}}/>
                              </View>
                          </TouchableOpacity>
                        )
                      })}
                  </View>
               </View>
          );
        }else{
          return(
            <View style={{backgroundColor:'#fff',flex:1}}>
              <CommonHeader title='店铺详情' onPress={()=>{this.buttonBackAction()}} />
              <Text>
                正在加载。。。
              </Text>
            </View>

          )

        }

    }
}



const styles=StyleSheet.create({
  goods_list: {
    // flex:1,
    // padding:12,
    flexDirection:'row',
    flexWrap:'wrap',
    // justifyContent:'flex-start',
    // alignItems:'flex-start',
  },
  section_title:{
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10,marginBottom:10,backgroundColor:'white'
  },
  section_title_left:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  section_title_left_solid:{
    height:18,
    width:4,
    backgroundColor:'red',
    marginRight:10
  },
  section_title_left_name:{
    color:'#000',
    fontSize:16
  },
});

export default ShopDetail;
//
// function mapStateToProps(state) {
//   const { ShopDetail } = state;
//   return {
//     ShopDetail
//   }
// }
//
// export default connect(mapStateToProps)(ShopDetail);
