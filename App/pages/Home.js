/**
 * 商城主页
 */
'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    InteractionManager,
    ListView,
} from 'react-native';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import ShortLine from '../component/ShortLine';
import goodsList from './GoodsList';
import goodsDetail from './GoodsDetails';
import { performAppMainAction } from '../actions/AppMainAction';
import { connect } from 'react-redux';
import { performIndexGoodsAction } from '../actions/IndexAction';
import { performAdsAction } from '../actions/AdsAction';
import Loading from '../component/Loading';
var {height, width} = Dimensions.get('window');
var item_width = (width-1)/2;

const MENU_IMGS = [
  require('../imgs/home/menu_cxb.png'),
  require('../imgs/home/menu_qbfl.png'),
  require('../imgs/home/menu_xpss.png'),
  require('../imgs/home/menu_sczx.png'),
];
const HOT_IMGS = [
  require('../imgs/home/hot_01.png'),
  require('../imgs/home/hot_02.png'),
  require('../imgs/home/hot_03.png'),
  require('../imgs/home/hot_04.png'),
  require('../imgs/home/hot_05.png'),
  require('../imgs/home/hot_06.png'),
];

class Home extends Component {
   constructor(props) {
      super(props);
      this.topItemAction=this.topItemAction.bind(this);
      this.renderGoods=this.renderGoods.bind(this);
    }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(performIndexGoodsAction(1));
    dispatch(performAdsAction());
  }

  topItemAction(position){
      const {navigator,dispatch} = this.props;
      switch (position) {
        case 0:
         InteractionManager.runAfterInteractions(() => {
          navigator.push({
            component: goodsList,
            name: 'goodsList',
            params: {
                 orderType: 2
             }
            });
          });
          break;
        case 1:
         InteractionManager.runAfterInteractions(() => {
           InteractionManager.runAfterInteractions(() => {
             dispatch(performAppMainAction('classify'))
             navigator.popToTop();
             });
          });
          break;
        case 2:
         InteractionManager.runAfterInteractions(() => {
          navigator.push({
            component: goodsList,
            name: 'goodsList',
            params: {
                 orderType: 1
             }
            });
          });
          break;
      }
  }

  //商品热卖跳转
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

 //推荐商品列表
 renderGoods(data) {
   return(<View style={{flex:1,justifyContent:'center',alignItems:'flex-start',width:175,marginBottom:10}}>
       <TouchableOpacity onPress={()=>{this.goodsDetailAction(data.prod_id)}}>
          <Image source={{uri:data.list_img}} style={{width:175,height:175}}/>
          <View style={{flex:1, paddingTop:10,justifyContent:'center',alignItems:'center', backgroundColor:'white',}}>
                <Text style={{width:152, height:34, lineHeight:17, fontSize:14, overflow:'hidden'}}>{data.prod_name}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', backgroundColor:'#fff', paddingHorizontal:10}}>
                <View>
                  <Text style={{fontSize:15,color:'#FF240D'}}>¥{data.mall_price}</Text>
                  <Text style={{textDecorationLine:'line-through',fontSize:12,color:'#797979',paddingVertical:10}}>¥{data.maket_price}</Text>
                </View>
                <Image source={require('../imgs/pp_cart.png')} style={{width:27,height:27}}/>
          </View>
       </TouchableOpacity>
   </View>)

 }

 //加载更多
  loadMore(){
    console.log('loadMore');
  }

  _renderDotIndicator() {
        const {ads} = this.props;
        return <PagerDotIndicator pageCount={ads.imgDataSource.length} />;
  }

  renderLoadingView() {
    return (
        <Loading  />
    );
  }

  render() {
        const {index,ads} = this.props;
        if (!index.data) {
           return this.renderLoadingView();
         }
        return (
           <View style={{backgroundColor:'#f5f5f5',flex:1}}>
              <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
              {/* 搜索条 */}
              <View style={{flex:1,flexDirection:'row',position:'absolute',top:0,height:30}}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                   <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>我的</Text>
                </View>
              </View>
              <IndicatorViewPager
                    style={{height:184}}
                    indicator={this._renderDotIndicator()}>
                    <View>
                      {ads.imgDataSource.map((img,index)=>{
                        return(
                          <Image key={index} source={{uri:img.ad_img}} style={{width:width,height:184,resizeMode:'cover'}}/>
                        )
                      })}
                    </View>
             </IndicatorViewPager>

             <View>
                <View style={{flexDirection:'row',backgroundColor:'white',height:85,alignItems:'center'}}>
                 <View style={styles.menu_list}>
                       <TouchableOpacity onPress={()=>{this.topItemAction(0)}} style={{flex:1,flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                       <Image source={MENU_IMGS[0]} style={styles.menu_img}></Image>
                       <View>
                             <Text>畅销榜</Text>
                       </View>
                       </TouchableOpacity>
                 </View>
                 <View style={styles.menu_list}>
                       <TouchableOpacity onPress={()=>{this.topItemAction(1)}} style={{flex:1,flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                       <Image source={MENU_IMGS[1]} style={styles.menu_img}></Image>
                       <View>
                             <Text>全部分类</Text>
                       </View>
                       </TouchableOpacity>
                 </View>
                 <View style={styles.menu_list}>
                       <TouchableOpacity onPress={()=>{this.topItemAction(2)}} style={{flex:1,flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                       <Image source={MENU_IMGS[2]} style={styles.menu_img}></Image>
                       <View>
                             <Text>新品上市</Text>
                       </View>
                       </TouchableOpacity>
                 </View>
                 <View style={styles.menu_list}>
                       <TouchableOpacity onPress={()=>{this.topItemAction(3)}} style={{flex:1,flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                       <Image source={MENU_IMGS[3]} style={styles.menu_img}></Image>
                       <View>
                             <Text>商城资讯</Text>
                       </View>
                       </TouchableOpacity>
                 </View>
                </View>
             </View>
             <View style={{marginTop:8}}>
                  <View style={styles.section_title}>
                    <View style={styles.section_title_left}>
                      <View style={styles.section_title_left_solid}></View>
                      <Text style={styles.section_title_left_name}>商品热卖</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{this.topItemAction(0)}}><Text>更多商品 >></Text></TouchableOpacity>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'center', paddingHorizontal:10}}>
                      <TouchableOpacity onPress={()=>{this.goodsDetailAction(74)}}>
                        <Image source={HOT_IMGS[0]} style={{width:item_width-10,height:114,backgroundColor:'white',resizeMode:'cover'}} />
                      </TouchableOpacity>
                        <Image source={require('../imgs/home/ic_home_shu.png')} style={{height:114}}/>
                      <TouchableOpacity onPress={()=>{this.goodsDetailAction(81)}}>
                        <Image source={HOT_IMGS[1]} style={{width:item_width-10,height:114,backgroundColor:'white',resizeMode:'cover'}}/>
                      </TouchableOpacity>
                  </View>
                  <View style={{paddingHorizontal:10,}}>
                    <Image source={require('../imgs/ic_short_bar.png')} style={{width:width-20}}  />
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'center', paddingHorizontal:10}}>
                      <TouchableOpacity onPress={()=>{this.goodsDetailAction(80)}}>
                        <Image source={HOT_IMGS[2]} style={{width:(item_width-10)/2-1,height:114,backgroundColor:'white',resizeMode:'cover'}} />
                      </TouchableOpacity>
                        <Image source={require('../imgs/home/ic_home_shu.png')} style={{height:114}}/>
                      <TouchableOpacity onPress={()=>{this.goodsDetailAction(62)}}>
                        <Image source={HOT_IMGS[3]} style={{width:(item_width-10)/2-1,height:114,backgroundColor:'white',resizeMode:'cover'}}/>
                      </TouchableOpacity>
                        <Image source={require('../imgs/home/ic_home_shu.png')} style={{height:114}}/>
                      <TouchableOpacity onPress={()=>{this.goodsDetailAction(57)}}>
                        <Image source={HOT_IMGS[4]} style={{width:(item_width-10)/2-1,height:114,backgroundColor:'white',resizeMode:'cover'}}/>
                      </TouchableOpacity>
                        <Image source={require('../imgs/home/ic_home_shu.png')} style={{height:114}}/>
                      <TouchableOpacity onPress={()=>{this.goodsDetailAction(64)}}>
                        <Image source={HOT_IMGS[5]} style={{width:(item_width-10)/2-1,height:114,backgroundColor:'white',resizeMode:'cover'}}/>
                      </TouchableOpacity>
                  </View>
                </View>

            <View style={{marginVertical:8}}>
                <View style={[styles.section_title,{backgroundColor:'white'}]}>
                  <View style={styles.section_title_left}>
                    <View style={styles.section_title_left_solid}></View>
                    <Text style={styles.section_title_left_name}>推荐商品</Text>
                  </View>
                  <Text>更多商品 >></Text>
                </View>
                  <ListView
                    stlye={{flex:1}}
                    initialListSize={12}
                    dataSource={index.goodsListDataSource}
                    renderRow={this.renderGoods}
                    onEndReachedThreshold={10}
                    enableEmptySections={true}
                    contentContainerStyle={styles.list}
                    onEndReached={this.loadMore()}
                  />
                 {/* <View style={{flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10}}> */}

                       {/* <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                           <TouchableOpacity>
                              <Image source={require('../imgs/home/goods.png')} style={{width:175,height:175}}/>
                              <View style={{flex:1, paddingTop:10,justifyContent:'center',alignItems:'center', backgroundColor:'white',}}>
                                    <Text style={{width:152, height:34, lineHeight:17, fontSize:14, overflow:'hidden'}}>临安山核桃仁坚果零食特产特价坚果零食特产特价临安山核桃仁坚果零食特产特价坚果零食特产特价</Text>
                              </View>
                              <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', backgroundColor:'#fff', paddingHorizontal:10}}>
                                    <View>
                                      <Text style={{fontSize:15,color:'#FF240D'}}>¥39</Text>
                                      <Text style={{textDecorationLine:'line-through',fontSize:12,color:'#797979',paddingVertical:10}}>¥69</Text>
                                    </View>
                                    <Image source={require('../imgs/pp_cart.png')} style={{width:27,height:27}}/>
                              </View>
                           </TouchableOpacity>
                       </View>
                       <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                           <TouchableOpacity>
                              <Image source={require('../imgs/home/goods.png')} style={{width:175,height:175}}/>
                              <View style={{flex:1, paddingTop:10,justifyContent:'center',alignItems:'center', backgroundColor:'white',}}>
                                    <Text style={{width:152, height:34, lineHeight:17, fontSize:14, overflow:'hidden'}}>微餐咖啡</Text>
                              </View>
                              <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', backgroundColor:'#fff', paddingHorizontal:10}}>
                                    <View>
                                      <Text style={{fontSize:15,color:'#FF240D'}}>¥39</Text>
                                      <Text style={{textDecorationLine:'line-through',fontSize:12,color:'#797979',paddingVertical:10}}>¥69</Text>
                                    </View>
                                    <Image source={require('../imgs/pp_cart.png')} style={{width:27,height:27}}/>
                              </View>
                           </TouchableOpacity>
                       </View> */}
                 {/* </View> */}
            </View>
          </ScrollView>
       </View>
        );
    }
}
const styles=StyleSheet.create({
    menu_list:{
      flex:1
    },
    menu_img:{
      height:39,
      width:39,
      marginBottom:5
    },
    menu_test:{
      backgroundColor:'red'
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
    list:{
      flexDirection:'row',
      flexWrap:'wrap',
      paddingHorizontal:10,
      justifyContent:'flex-start',
      alignItems:'center',
    }
});
// export default Home;

function mapStateToProps(state) {
  console.log(state);
  const { index,ads } = state;
  return {
    index,
    ads
  }
}

export default connect(mapStateToProps)(Home);
