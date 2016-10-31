/**
 * 订单确认
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
  ListView,
  InteractionManager,
} from 'react-native';
import { NaviGoBack } from '../../utils/CommonUtils';
import CommonHeader from '../../component/CommonHeader';
var {height, width} = Dimensions.get('window');

class AboutUs extends React.Component {

  constructor(props) {
    super(props);
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  render() {
    return (
      <View style={{backgroundColor:'#f5f5f5',flex:1}}>
          <CommonHeader title='关于我们' onPress={()=>{this.buttonBackAction()}} />
          <View style={{backgroundColor:'#fff',justifyContent:'center',alignItems:'center',paddingBottom:20}}>
            <Text style={{marginTop:10,}}>
              copyright ©2016
            </Text>
            <Text>
              湖南新品农网络科技有限公司. All Rights Reserved
            </Text>
          </View>

       </View>
    );
  }
}

export default AboutUs
// function mapStateToProps(state){
//   const {orderdispatch} = state;
//   return {
//     orderdispatch
//   }
// }
//
// export default connect(mapStateToProps)(OrderConfirm)
