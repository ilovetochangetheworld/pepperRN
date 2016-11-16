/**
 * 商城主框架界面
 */
'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Home from './Home';
import Classify from './Classify';
import Fav from './Fav';
import Cart from './Cart';
import Center from './Center';
var PixelRatio = require('PixelRatio');

import { connect } from 'react-redux';
import { performAppMainAction } from '../actions/AppMainAction';


class AppMain extends Component {
    constructor(props) {
        super();
        // this.state = {
	  	  //     selectedTab:'home'
	      // };
    }

    componentWillMount() {
      const {dispatch} = this.props;
      // dispatch(performAppMainAction('home'));
    }

    render() {
      const {appMain,dispatch} = this.props;
        return (
          <TabNavigator>
			  <TabNavigator.Item
			  	title="首页"
          selected={appMain.data === 'home'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={require("./img/pp_tab_home.png")} style={{height:22,width:24}}/>}
			    renderSelectedIcon={() => <Image source={require('./tab-home-press.png')} style={{height:22,width:24}}/>}
			    onPress={() => dispatch(performAppMainAction('home'))}>
			    <Home {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			  	title="分类"
			    selected={appMain.data === 'classify'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={require("./img/pp_tab_fl.png")} style={{height:22,width:18}}/>}
			    renderSelectedIcon={() => <Image source={require("./img/pp_tab_fl_press.png")} style={{height:22,width:18}}/>}
			    onPress={() => dispatch(performAppMainAction('classify'))}>
			    <Classify {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			  	title="购物车"
			    selected={appMain.data === 'cart'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={require("./img/pp_tab_cart.png")} style={{height:22,width:25}}/>}
			    renderSelectedIcon={() => <Image source={require("./img/pp_tab_cart_press.png")} style={{height:22,width:25}}/>}
			    onPress={() => dispatch(performAppMainAction('cart'))}>
			    <Cart {...this.props}/>
			  </TabNavigator.Item>
        <TabNavigator.Item
			  	title="收藏"
			    selected={appMain.data === 'fav'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={require("./img/pp_tab_sc.png")} style={{height:22,width:23}}/>}
			    renderSelectedIcon={() => <Image source={require("./img/pp_tab_sc_press.png")} style={{height:22,width:23}}/>}
			    onPress={() => dispatch(performAppMainAction('fav'))}>
			    <Fav {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			  	title="我的"
			    selected={appMain.data === 'center'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={require("./img/pp_tab_center.png")} style={{height:22,width:23}}/>}
			    renderSelectedIcon={() => <Image source={require("./img/pp_tab_center_press.png")} style={{height:22,width:23}}/>}
			    onPress={() => dispatch(performAppMainAction('center'))}>
			    <Center {...this.props}/>
			  </TabNavigator.Item>
			</TabNavigator>
        );
    }
}

const styles=StyleSheet.create({
   iconStyle:{
       width:26,
       height:26,
   },
   textStyle:{
       color:'#757575',
   },
   selectedTextStyle:{
       color:'red',
   }
});
// export default AppMain;

function mapStateToProps(state) {
  const { appMain } = state;
  return {
    appMain
  }
}

export default connect(mapStateToProps)(AppMain);
