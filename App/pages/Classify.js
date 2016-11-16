'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    ListView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    InteractionManager,
    TextInput,
    Navigator,
} from 'react-native';
import { HOST } from '../common/request';
import GoodsList from './GoodsList';
import Loading from '../component/Loading';
var {height,width} = Dimensions.get('window');
import { connect } from 'react-redux';
import { performClassifyAction } from '../actions/ClassifyAction'

class Classify extends Component {
    constructor(props) {
        super(props);
        this.state={
          search:null
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.renderGoods = this.renderGoods.bind(this);
        this.goodsListAction=this.goodsListAction.bind(this);
    }

    //GoodsList跳转
    goodsListAction(cate_id) {
        const {navigator} = this.props;
          InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: GoodsList,
              name: 'GoodsList',
              params: {
                   id: cate_id
               }
            });
          })
    }

    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        const {dispatch} = this.props;
        dispatch(performClassifyAction(0,0));
      });
    }

    _search(search){
      const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
          navigator.push({
            component: GoodsList,
            name: 'GoodsList',
            params: {
                 search: search
             }
          });
        })
    }

    render() {
      const {classify} = this.props;
      if (!classify.data) {
         return this.renderLoadingView();
       }
       let classifyData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
       .cloneWithRows(classify.data.data);
       let goodsData = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
       .cloneWithRows(classify.data.data[classify.index].children);
      return (
           <View style={{backgroundColor:'#fff',flex:1}}>
              <View style={{width:width,height:45,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:15,borderBottomWidth:1,borderColor:'#cbcbcb'}}>
                  <Image source={require('./img/pp_return.png')} style={{width:11,height:18,marginRight:10}}></Image>
                  <TextInput style={{width:width-100,height:31,backgroundColor:'#F2F2F2',paddingVertical:0,paddingHorizontal:6}}
                              placeholder={'搜索商品 分类'}
                              onChangeText={(search) => this.setState({search})}
                              value={this.state.search}
                              keyboardType='web-search'
                              underlineColorAndroid={'transparent'}></TextInput>
                  <TouchableOpacity onPress={()=>{this._search(this.state.search)}} style={{width:30,height:45,justifyContent:'center',alignItems:'flex-end'}}>
                    <Text style={{fontSize:14,color:'#999'}}>搜索</Text>
                  </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}}>
                <View style={{width:100}}>
                  <ListView
                    initialListSize={6}
                    dataSource={classifyData}
                    renderRow={this.renderItem}
                    style={{width:100,height:height-45-60,backgroundColor:'#F2F2F2',flexDirection:'column'}}
                    onEndReachedThreshold={10}
                    enableEmptySections={true}
                  />
                </View>
                <View style={{flex:1}}>
                  <ListView
                    initialListSize={12}
                    dataSource={goodsData}
                    renderRow={this.renderGoods}
                    onEndReachedThreshold={10}
                    enableEmptySections={true}
                    contentContainerStyle={styles.list}
                  />
                </View>
              </View>
           </View>
      );
    }


    renderLoadingView() {
      return (
        <Loading visible={true} />
      );
    }

    renderItem(rowData: array, sectionID: number, rowID: number){
      const {classify,dispatch} = this.props;
      return (
        <TouchableOpacity  style={[{width:100,height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#F2F2F2'},(rowData.cate_id==classify.active)&&{backgroundColor:'#fff'}]}
                        onPress={()=>{dispatch(performClassifyAction(1,rowData.cate_id,rowID))}} >
          <Text>{rowData.cate_name}</Text>
        </TouchableOpacity>
      )
    }


    renderGoods(data){
      return (
        <TouchableOpacity onPress={()=>{this.goodsListAction(data.cate_id)}} style={{width:(width-124)/3,justifyContent:'center',alignItems:'center',marginBottom:4}}>
          <Image style={{height:71,width:71}} source={{uri:data.cate_img}}></Image>
          <Text style={{fontSize:11}}>{data.cate_name}</Text>
        </TouchableOpacity>
      )
    }



}
const styles=StyleSheet.create({
  list: {
    flexDirection:'row',
    flexWrap:'wrap',
    padding:12,
    justifyContent:'flex-start',
    alignItems:'center',
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    width: 85,
    height: 85,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
 thumb: {
   width: 45,
   height: 45
 },
 text: {
   flex: 1,
   marginTop: 5,
   fontWeight: 'bold'
 },
});
// export default Classify;
function mapStateToProps(state) {
  const { classify } = state;
  return {
    classify
  }
}

export default connect(mapStateToProps)(Classify);
