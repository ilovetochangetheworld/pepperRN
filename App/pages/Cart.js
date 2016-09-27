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
} from 'react-native';
var {height, width} = Dimensions.get('window');
import OrderConfirm from './OrderConfirm';
class Cart extends Component {
    constructor(props) {
        super(props);
        this.topItemAction=this.topItemAction.bind(this);
        this.payItemAction=this.payItemAction.bind(this);

    }
    topItemAction(position){
        if(position === 0){

        }
    }
    //结算按钮
    payItemAction(){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
        navigator.push({
          component: OrderConfirm,
          name: 'OrderConfirm'
           });
        });
    }
    render() {
        return (
             <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <View style={{height:48,backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{width:48,height:48,justifyContent:'center',alignItems:'center'}}>
                      <Image source={require('../imgs/pp_return.png')} style={{width:11,height:18}}></Image>
                    </View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center',height:48,width:50}}>
                       <Text style={{fontSize:18,color:'#000',alignSelf:'center'}}>购物车</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{this.topItemAction(0)}}
                                      style={{width:48,height:48,justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('../imgs/cart/ic_cart_btn_delete.png')} style={{width:17,height:21}}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                  
                </ScrollView>
                <View style={{flex:1,justifyContent:'flex-end'}}>
                      <View style={{backgroundColor:'white',width:width,height:40}}>
                            <View style={{flexDirection:'row',marginLeft:15,marginTop:5}}>
                                  <Text style={{fontSize:11,color:'black',flex:1}}>预估小计</Text>
                                  <View style={{flex:1,alignItems:'flex-end',marginRight:15}}>
                                        <Text style={{color:'red',fontSize:11}}>¥116</Text>
                                  </View>
                            </View>
                            <View style={{marginLeft:15,marginTop:3}}>
                                  <Text style={{color:'#777',fontSize:11}}>实际总计将以商家收据为准,为保证您的权益,请于配货员联系.</Text>
                            </View>
                      </View>
                      <TouchableOpacity onPress={()=>{this.payItemAction()}}>
                              <Image source={require('../imgs/cart/ic_cart_btn_bg.png')}
                                     style={{width:width,height:40,justifyContent:'center',alignItems:'center'}}>
                                     <Text style={{color:'white',fontSize:14,backgroundColor:'#00000000'}}>结算</Text>
                              </Image>
                      </TouchableOpacity>
                </View>
             </View>
        );
    }
}

export default Cart;
