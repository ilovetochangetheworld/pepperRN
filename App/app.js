//根据页面
'use strict';

import React from 'react';
import {
  StyleSheet,
  Navigator,
  StatusBar,
  BackAndroid,
  View,
  Platform
} from 'react-native';

import Splash from './pages/Splash';
import { NaviGoBack } from './utils/CommonUtils';
import Orientation from 'react-native-orientation';
import * as Wechat from 'react-native-wechat';
import { toastShort } from './utils/ToastUtil';
export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)
export const ABOVE_LOLIPOP = Platform.Version && Platform.Version > 19
var _navigator;
let lastClickTime = 0;
class App extends React.Component {
    constructor(props) {
       super(props);
       this.renderScene = this.renderScene.bind(this);
       this.goBack = this.goBack.bind(this);
       Wechat.registerApp('wx5e485c08f245402e');
       BackAndroid.addEventListener('hardwareBackPress', this.goBack);

   }

   componentDidMount (){
     //想要使用微信分享, 你必须到微信分享平台 https://open.weixin.qq.com/ 申请appid
   }

   componentWillUnmount() {
     if (Platform.OS === 'android') {
       BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
     }
   }

  renderScene(route, navigator) {
    let Component = route.component;
    _navigator = navigator;
    return (
      <Component {...route.params} navigator={navigator} route={route} />
    );
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight;
  }


  goBack() {
    const routers = _navigator.getCurrentRoutes();
    if (routers.length > 1) {
      _navigator.pop();
      return true;
    }
    let now = new Date().getTime();
    if (now - lastClickTime < 2500) {//2.5秒内点击后退键两次推出应用程序
      return false;//控制权交给原生
    }
    lastClickTime = now;
    toastShort('再按一次退出');
    return true;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
            barStyle='light-content'
            backgroundColor='#FF240D'
            style={{height: STATUS_BAR_HEIGHT}}
       />
        <Navigator
          ref='navigator'
          style={styles.navigator}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          initialRoute={{
            component: Splash,
            name: 'Splash'
          }}
        />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

export default App;
