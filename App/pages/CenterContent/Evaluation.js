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

import { connect } from 'react-redux';
import Loading from '../../component/Loading';
import { toastShort } from '../../utils/ToastUtil';
import CommonHeader from '../../component/CommonHeader';
import { NaviGoBack } from '../../utils/CommonUtils';
import { getOrderDetail } from '../../api/order';

var {height,width} =  Dimensions.get('window');

class Evaluation extends Component {
    constructor(props) {
        super(props);
        var orderListData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          orderListData,
          loadingStatus: null,
          star:5
        }
        this._renderList = this._renderList.bind(this);
    }

    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
       this._checkLogin();
      });

    }

    //返回
    buttonBackAction(){
        const {navigator} = this.props;
        return NaviGoBack(navigator);
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
              this._getOrderDetail(token);
            }
          }
        )
        .catch((error)=>{
          toastShort(' error:' + error.message);
        })
      })
    }

    _getOrderDetail(token){
      this.setState({
        loadingStatus: true
      })
      getOrderDetail(token,this.props.order_id).then((orderData)=>{
        this.setState({
          loadingStatus: false
        })
        if(orderData.status){
          this.setState({
            favStatus:true,
            orderListData:this.state.orderListData.cloneWithRows(orderData.data.goods_list)
          })
        }else{
          toastShort(favData.msg);
        }
      }).catch((error)=>{
        console.log(' error:' + error.message);
      })
    }

    _renderList(data){
      return(
        <View>
          <View style={styles.orderList}>
            <Image source={{uri:data.img}} style={styles.orderImg}></Image>
            <View style={styles.orderContent}>
              <Text style={styles.orderName} numberOfLines={2}>{data.prod_name}</Text>
              <Text style={styles.orderNum}>x {data.goods_num}</Text>
            </View>
          </View>
          <View style={styles.starItem}>
            <Text>评分：</Text>
            <TouchableOpacity onPress={()=>{this.setState({star:1})}} ><Image style={{width:24,height:24,resizeMode:'stretch',marginRight:4}} source={require('../img/star-active.png')}></Image></TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({star:2})}} ><Image style={{width:24,height:24,resizeMode:'stretch',marginRight:4}} source={this.state.star>1?require('../img/star-active.png'):require('../img/star.png')}></Image></TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({star:3})}} ><Image style={{width:24,height:24,resizeMode:'stretch',marginRight:4}} source={this.state.star>2?require('../img/star-active.png'):require('../img/star.png')}></Image></TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({star:4})}} ><Image style={{width:24,height:24,resizeMode:'stretch',marginRight:4}} source={this.state.star>3?require('../img/star-active.png'):require('../img/star.png')}></Image></TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({star:5})}} ><Image style={{width:24,height:24,resizeMode:'stretch',marginRight:4}} source={this.state.star>4?require('../img/star-active.png'):require('../img/star.png')}></Image></TouchableOpacity>
          </View>

        </View>
      )
    }

    render() {
      if(this.state.loadingStatus){
        return (<Loading visible={true} />)
      }else{
        if(this.state.favStatus){
          return(
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <CommonHeader title='评价' onPress={()=>{this.buttonBackAction()}} />
                <ListView
                  initialListSize={12}
                  dataSource={this.state.orderListData}
                  renderRow={this._renderList}
                  onEndReachedThreshold={10}
                  enableEmptySections={true}
                />
            </View>
            )
        }
      else{
        return (
          <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
            <CommonHeader title='评价' onPress={()=>{this.buttonBackAction()}} />
          </View>
        )
      }
    }
  }
}
const styles=StyleSheet.create({
  orderList:{
    flex:1,
    height:131,
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#fff',
    marginBottom:4
  },
  orderImg:{
    height:126,
    width:126,
    resizeMode:'stretch'
  },
  orderContent:{
    flex:1,
    height:131,
    paddingVertical:10,
    paddingHorizontal:10,
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'flex-start',
  },
  orderName:{
    flex:1,
    height:34,
    fontSize:14,
    color:'#000'
  },
  orderNum:{
    width:80,
    height:34,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  starItem:{
    flex:1,
    height:40,
    backgroundColor:'#fff',
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  }
});

export default Evaluation;
