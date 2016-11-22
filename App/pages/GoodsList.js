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

import ProgressBar from  'ActivityIndicator';
import { NaviGoBack } from '../utils/CommonUtils';
import goodsDetail from './GoodsDetails';
import {HOST} from  '../common/request';
import Swiper from 'react-native-swiper';
var {height,width} = Dimensions.get('window');

import { connect } from 'react-redux';
import { performGoodsListAction } from '../actions/GoodsListAction'

class GoodsList extends Component {
  constructor(props) {
      super(props);
      this.state={
        search:null
      }
      this.buttonBackAction = this.buttonBackAction.bind(this);
      this._renderGoods = this._renderGoods.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const {dispatch} = this.props;
      if(this.props.id){
      dispatch(performGoodsListAction(1,this.props.id));
    }else if(this.props.orderType){
      dispatch(performGoodsListAction(2,this.props.orderType));
    }else if(this.props.search){
      dispatch(performGoodsListAction(3,this.props.search));
    }
    });
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

 _renderPage(
   data: Object,
   pageID: number | string,) {
   return (
     <Image
       source={{uri: data.ad_img}}
       style={{height:184,width:width}} />
   );
 }

 _search(search){
   const {dispatch} = this.props;
   dispatch(performGoodsListAction(3,search));
 }

  _renderGoods(data){
    return (
      <TouchableOpacity style={{flex:1,height:280,width:(width-30)/2,justifyContent:'center',alignItems:'flex-start',marginBottom:8,backgroundColor:'#f5f5f5',}}
                        onPress={()=>{this.goodsDetailAction(data.prod_id)}} >
          <Image source={{uri:data.list_img}} style={{width:(width-30)/2,height:175,resizeMode:'stretch'}}/>
          <View style={{flex:1, width:(width-30)/2,paddingTop:10,justifyContent:'center',alignItems:'center', backgroundColor:'white',}}>
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

  render() {
        const {goodsList} = this.props;
        if (!goodsList.data) {
           return <ProgressBar />
         }
        return (
             <View style={{backgroundColor:'#fff',flex:1}}>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                  <View>
                    <View style={{width:width,height:45,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:15,borderBottomWidth:1,borderColor:'#cbcbcb'}}>
                        <TouchableOpacity onPress={() => {this.buttonBackAction()}}>
                          <Image source={require('./img/pp_return.png')} style={{width:11,height:18}}></Image>
                        </TouchableOpacity>
                        <TextInput style={{width:width-100,height:31,backgroundColor:'#F2F2F2',paddingVertical:0,paddingHorizontal:6}}
                                    placeholder={'搜索商品'}
                                    onChangeText={(search) => this.setState({search})}
                                    value={this.state.search}
                                    keyboardType='web-search'
                                    underlineColorAndroid={'transparent'}></TextInput>
                        <TouchableOpacity onPress={()=>{this._search(this.state.search)}} style={{width:30,height:45,justifyContent:'center',alignItems:'flex-end'}}>
                          <Text style={{fontSize:14,color:'#999'}}>搜索</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
                  <Swiper height={184} showsButtons={false} autoplay={true} autoplayTimeout={3} loop>
                    {goodsList.data.imgDataSource.data.map((img,index)=>{
                      return(
                        <View key={index} style={{width:width,height:184}}>
                          <Image source={{uri:img.ad_img}} style={{width:width,height:184,resizeMode:'stretch'}}/>
                        </View>
                      )
                    })}
                  </Swiper>
                  {/* <View style={styles.filter}>
                    <View style={styles.filter_list}>
                      <Text>综合</Text>
                    </View>
                    <View style={styles.filter_list}>
                      <Text>价格</Text>
                    </View>
                    <View style={styles.filter_list}>
                      <Text>销量</Text>
                    </View>
                    <View style={styles.filter_list}>
                      <Text>筛选</Text>
                    </View>
                  </View> */}
                  <View style={{flex:1, padding:10, backgroundColor:'#F2F2F2'}}>
                      <ListView
                        initialListSize={12}
                        dataSource={goodsList.goodsListDataSource}
                        renderRow={this._renderGoods}
                        onEndReachedThreshold={10}
                        enableEmptySections={true}
                        contentContainerStyle={styles.goods_list}
                      />
                  </View>
                </ScrollView>
             </View>
        );
    }
}



const styles=StyleSheet.create({
  filter: {
    height:45,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  filter_list: {
    flex:1,
    alignItems:'center'
  },
  goods_list: {
    // flex:1,
    // padding:12,
    flexDirection:'row',
    flexWrap:'wrap',
  },
  imgList: {
    flex: 1,
    height: 186,
    resizeMode: 'cover'
  }
});
// export default GoodsList;

function mapStateToProps(state) {
  const { goodsList } = state;
  return {
    goodsList
  }
}

export default connect(mapStateToProps)(GoodsList);
