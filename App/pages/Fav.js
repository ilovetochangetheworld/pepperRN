'use strict';
/**
 * by yixin 2016.11.13
 */
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
    AsyncStorage,
    ListView,
    Alert
} from 'react-native';

import ProgressBar from  'ActivityIndicator';
import { connect } from 'react-redux';
import Loading from '../component/Loading';
import goodsDetail from './GoodsDetails';
import { toastShort } from '../utils/ToastUtil';
import { getFav,cancelFav } from '../api/fav';
import Login from './CenterContent/Login';

var {height,width} =  Dimensions.get('window');

class Fav extends Component {
    constructor(props) {
        super(props);
        var favListData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          favListData,
          loadingStatus: false,
          favStatus:false
        }
        this._getFav = this._getFav.bind(this);
        this.__cancelFav = this._cancelFav.bind(this);
        this._checkLogin = this._checkLogin.bind(this);
        this._renderList = this._renderList.bind(this);
    }

    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
       this._checkLogin();
      });

    }

    componentWillReceiveProps(nextProps){
      if(nextProps.appMain.data!==this.props.appMain.data){
        if(nextProps.appMain.data=='fav'){
          this._checkLogin();
        }
      }
    }

    //登录检测
    _checkLogin(){
      const {navigator,dispatch} = this.props;
      InteractionManager.runAfterInteractions(() => {
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
              this._getFav(token);
            }
          }
        )
        .catch((error)=>{
          toastShort(' error:' + error.message);
        })
      })
    }

    _getFav(token){
      this.setState({
        loadingStatus: true
      })
      getFav(token).then((favData)=>{
        this.setState({
          loadingStatus: false
        })
        if(favData.status){
          this.setState({
            favStatus:true,
            favListData:this.state.favListData.cloneWithRows(favData.data.rows)
          })
        }else{
          toastShort(favData.msg);
        }
      }).catch((error)=>{
        toastShort(' error:' + error.message);
      })
    }

    _cancelFav(prod_id){
      AsyncStorage.getItem('token').then(
        (token)=>{
          if (token===null){
            toastShort('请先登录！');
          }else {
            if(prod_id&&token){
              cancelFav(token,prod_id).then(favStatus=>{
                console.log(favStatus);
                if(favStatus.status){
                  toastShort('取消收藏成功！');
                  this._getFav(token);
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
    }

    _goodsDetail(prod_id){
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

    _renderList(data){
      return(
        <View>
          <TouchableOpacity onPress={()=>{this._goodsDetail(data.prod_id)}} style={styles.favList}>
            <Image source={{uri:data.list_img}} style={styles.favImg}></Image>
            <View style={styles.favContent}>
              <Text style={styles.favName} numberOfLines={2}>{data.prod_name}</Text>
              <View style={styles.favDel}>
                <TouchableOpacity onPress={() => Alert.alert(
                  '删除收藏产品',
                  '确定要删除此产品吗？',
                  [
                    {text: '稍后再说'},
                    {text: '确定', onPress: () => {this._cancelFav(data.prod_id)}},
                  ]
                )}>
                  <Image style={{height:20,width:20,marginLeft:14}} source={require('./img/del.png')}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )
    }

    render() {
      // if(!this.state.loadingStatus){
        // return (<Loading visible={true} />)
      // }else{
        if(this.state.favStatus){
          return(
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
              <View style={{height:48,backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#e6e6e6'}}>
                  <View style={{width:48,height:48,justifyContent:'center',alignItems:'center'}}></View>
                  <View style={{flex:1,alignItems:'center',justifyContent:'center',height:48,width:50}}>
                     <Text style={{fontSize:18,color:'#000',alignSelf:'center'}}>我的收藏</Text>
                  </View>
                  <View style={{width:48}}>
                  </View>
              </View>
              <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                <ListView
                  initialListSize={12}
                  dataSource={this.state.favListData}
                  renderRow={this._renderList}
                  onEndReachedThreshold={10}
                  enableEmptySections={true}
                />
              </ScrollView>
              <Loading visible={this.state.loadingStatus} />
            </View>
            )
        }
      else{
        return (
          <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
            <View style={{height:48,backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#e6e6e6'}}>
                <View style={{width:48,height:48,justifyContent:'center',alignItems:'center'}}></View>
                <View style={{flex:1,alignItems:'center',justifyContent:'center',height:48,width:50}}>
                   <Text style={{fontSize:18,color:'#000',alignSelf:'center'}}>我的收藏</Text>
                </View>
                <View style={{width:48}}>
                </View>
            </View>
            <ProgressBar />
          </View>
        )
      }
    // }
  }
}
const styles=StyleSheet.create({
  favList:{
    flex:1,
    height:131,
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#fff',
    marginBottom:4
  },
  favImg:{
    height:126,
    width:126,
    resizeMode:'stretch'
  },
  favContent:{
    flex:1,
    height:131,
    paddingVertical:20,
    paddingHorizontal:10,
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'flex-start'
  },
  favName:{
    flex:1,
    height:34,
    fontSize:14,
    color:'#000'
  },
  favDel:{
    flex:1,
    height:34,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  }
});

// export default Center;
function mapStateToProps(state) {
  const { appMain } = state;
  return {
    appMain
  }
}

export default connect(mapStateToProps)(Fav);
