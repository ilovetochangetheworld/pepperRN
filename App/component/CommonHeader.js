/**
 * 设置公用header
 */
'use strict';
import React, {PropTypes} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { NaviGoBack } from '../utils/CommonUtils';

const CommonHeader = ({title,onPress}) => (
  <View style={{height:48,backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#e6e6e6',marginBottom:10}}>
      <TouchableOpacity onPress={onPress} style={{width:48,height:48,justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../imgs/pp_return.png')} style={{width:11,height:18}}></Image>
      </TouchableOpacity>
      <View style={{flex:1,alignItems:'center',justifyContent:'center',height:48,width:50}}>
         <Text style={{fontSize:18,color:'#000',alignSelf:'center'}}>{title}</Text>
      </View>
      <View style={{width:48}}>
      </View>
  </View>
);
export default CommonHeader;
