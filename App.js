/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,Image,ScrollView,TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import {createStackNavigator,createBottomTabNavigator} from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import SongList from './songList';
import Boke from './video';
import Mine from './Mine';  
import Friends from './Friends';
import Account from './Account';
import Detail from './Detail';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tabs: [
        {
          id: 0,
          name: '个性推荐',
        },
        {
          id: 1,
          name: '主播电台',
        }
      ],
      currentTabIndex: 0,
      entries: [
        {
          title: '在强大与渺小中挣扎',
          img: {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545374816778&di=ea8ba75350dd4b70d771771d936277b4&imgtype=0&src=http%3A%2F%2Fwww.jammyfm.com%2Fwordpress%2Fwp-content%2Fuploads%2F2016%2F05%2F13217508_1612368995492863_4156330830509506238_o.jpg'},
        },
        {
          title: '我竟然看见了音乐',
          img: {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545374786021&di=f55ea356f17b1adf6d9a578c07cc4cfa&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0177985544d8ad0000019ae903e1cb.jpg'},
        },
        {
          title: '富有诗意，充满幻想',
          img: {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545375188573&di=f6f01d7f289eb9972e23e2395d3c47c2&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011bc655453ac10000019ae90dab33.jpg%401280w_1l_2o_100sh.png'},
        },
        {
          title: '戏腔婉转了流年',
          img: {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545374682168&di=a1081ae5d23af424d958cd269534307d&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2Fbabc44a016385d9d21ac6c528d8a40769d60a666.jpg'},  
        },
        
      ],
      currentSlideIndex: 1
    };
    
    this._onPressTabItem = this._onPressTabItem.bind(this);
    this._onSnapTabItem = this._onSnapTabItem.bind(this);
  }
 
  _onPressTabItem(tabIndex) {
    this.setState({
      currentTabIndex: tabIndex
    })
  }

  _onSnapTabItem(idx) {
    this.setState({
      currentSlideIndex: idx
    })
  }
  
  _renderItem ({item, index}) {
    return (
        <View style={{borderRadius: 6,overflow: 'hidden',backgroundColor: '#fff'}}>
          <Image source={item.img} style={{height: 120}} />
          <Text style={{fontSize: 16,color: '#333',height: 32,lineHeight: 32,marginHorizontal: 4}}>{item.title}</Text>
        </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{backgroundColor: '#eee',flex: 1}}>
        <View style={style.head}>
          <View style={style.headBar}>
            <Icon name="microphone" size={24} color="#ffffff" />
            <TextInput style={style.search} placeholder="Sakura Tears - NighySilin" placeholderTextColor="#FFF"></TextInput>
            <Icon name="poll" size={24} color="#ffffff" />
          </View>
          <View style={style.tab}>
          {
            this.state.tabs.map((item,index) =>
              <Text key={item.id} style={this.state.currentTabIndex === index ? [style.tabItem,style.tabActive] : style.tabItem } onPress={() => this._onPressTabItem(index)}>{item.name}</Text>
            )
          }
          </View>
        </View>
        <ScrollView style={style.scroll} decelerationRate="fast">
          <View style={style.swiperBg}></View>
          <View style={style.swiper}>
            <Swiper
              width={Dimensions.width - 20}
              height={160}
              horizontal={true}
              paginationStyle={{bottom: 6}}
              activeDotColor="#FF0033"
              showsButtons={false}
              autoplay={true}>
              <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'}} style={style.img}/>
              <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=1103639238,521860447&fm=200&gp=0.jpg'}} style={style.img}/>
              <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=804522843,138196618&fm=200&gp=0.jpg'}} style={style.img}/>
            </Swiper>
          </View>
          <View style={style.menu}>
            <View style={style.menuItem}>
              <Icon name="radio" size={24} style={style.menuIcon} color="#FFFFFF" />
              <Text style={style.menuItemText}>私人FM</Text>
            </View>
            <View style={style.menuItem}>
              <Icon name="calendar-check" size={24} style={style.menuIcon} color="#FFFFFF" />
              <Text style={style.menuItemText}>每日推荐</Text>
            </View>
            <View style={style.menuItem}>
              <Icon name="format-list-checkbox" size={24} style={style.menuIcon} color="#FFFFFF" />
              <Text style={style.menuItemText}>歌单</Text>
            </View>
            <View style={style.menuItem}>
              <Icon name="chart-bar" size={24} style={style.menuIcon} color="#FFFFFF" />
              <Text style={style.menuItemText}>排行榜</Text>
            </View>
          </View>
          <View style={style.songList}>
            <View style={style.listTitle}>
              <Text style={{color: '#333',fontSize: 16,marginLeft: 6,lineHeight: 32}}>推荐歌单<Icon name="chevron-right" size={16} color="#333" /></Text>
            </View>
            <View style={style.listContent}>
              <TouchableNativeFeedback onPress={() => navigate('Profile',{listId: 0})}>
                <View style={style.songItem}>
                  <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'}} style={{height: Dimensions.width / 3.2,borderRadius: 4}}/>
                  <View style={{position: 'absolute' ,top: 4,right: 6,flexDirection: 'row',justifyContent: 'center'}}>
                    <Icon name="headphones" size={16} color="#fff" />
                    <Text style={{fontSize: 12,color: '#fff'}}>141万</Text>
                  </View>
                  <Text style={{color: '#333',fontSize: 12,marginTop: 4}}>2018年十月最热新歌TOP50</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => navigate('Profile',{listId: 1})}>
                <View style={style.songItem}>
                  <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=1103639238,521860447&fm=200&gp=0.jpg'}} style={{height: Dimensions.width / 3.2,borderRadius: 4}} />
                  <View style={{position: 'absolute' ,top: 4,right: 6,flexDirection: 'row',justifyContent: 'center'}}>
                    <Icon name="headphones" size={16} color="#fff" />
                    <Text style={{fontSize: 12,color: '#fff'}}>141万</Text>
                  </View>
                  <Text style={{color: '#333',fontSize: 12,marginTop: 4}}>最值得单曲循环的古风歌曲</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => navigate('Profile',{listId: 2})}>
                <View style={style.songItem}>
                  <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=804522843,138196618&fm=200&gp=0.jpg'}} style={{height: Dimensions.width / 3.2,borderRadius: 4}} />
                  <View style={{position: 'absolute' ,top: 4,right: 6,flexDirection: 'row',justifyContent: 'center'}}>
                    <Icon name="headphones" size={16} color="#fff" />
                    <Text style={{fontSize: 12,color: '#fff'}}>141万</Text>
                  </View>
                  <Text style={{color: '#333',fontSize: 12,marginTop: 4}}>一曲戏腔极尽风流，一抹笑颜...</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => navigate('Profile',{listId: 0})}>
                <View style={style.songItem}>
                  <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'}} style={{height: Dimensions.width / 3.2,borderRadius: 4}}/>
                  <View style={{position: 'absolute' ,top: 4,right: 6,flexDirection: 'row',justifyContent: 'center'}}>
                    <Icon name="headphones" size={16} color="#fff" />
                    <Text style={{fontSize: 12,color: '#fff'}}>141万</Text>
                  </View>
                  <Text style={{color: '#333',fontSize: 12,marginTop: 4}}>2018年十月最热新歌TOP50</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => navigate('Profile',{listId: 1})}>
                <View style={style.songItem}>
                  <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=1103639238,521860447&fm=200&gp=0.jpg'}} style={{height: Dimensions.width / 3.2,borderRadius: 4}} />
                  <View style={{position: 'absolute' ,top: 4,right: 6,flexDirection: 'row',justifyContent: 'center'}}>
                    <Icon name="headphones" size={16} color="#fff" />
                    <Text style={{fontSize: 12,color: '#fff'}}>141万</Text>
                  </View>
                  <Text style={{color: '#333',fontSize: 12,marginTop: 4}}>最值得单曲循环的古风歌曲</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => navigate('Profile',{listId: 2})}>
                <View style={style.songItem}>
                  <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=804522843,138196618&fm=200&gp=0.jpg'}} style={{height: Dimensions.width / 3.2,borderRadius: 4}} />
                  <View style={{position: 'absolute' ,top: 4,right: 6,flexDirection: 'row',justifyContent: 'center'}}>
                    <Icon name="headphones" size={16} color="#fff" />
                    <Text style={{fontSize: 12,color: '#fff'}}>141万</Text>
                  </View>
                  <Text style={{color: '#333',fontSize: 12,marginTop: 4}}>一曲戏腔极尽风流，一抹笑颜...</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => navigate('Profile',{listId: 0})}>
                <View style={style.songItem}>
                  <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'}} style={{height: Dimensions.width / 3.2,borderRadius: 4}}/>
                  <View style={{position: 'absolute' ,top: 4,right: 6,flexDirection: 'row',justifyContent: 'center'}}>
                    <Icon name="headphones" size={16} color="#fff" />
                    <Text style={{fontSize: 12,color: '#fff'}}>141万</Text>
                  </View>
                  <Text style={{color: '#333',fontSize: 12,marginTop: 4}}>2018年十月最热新歌TOP50</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => navigate('Profile',{listId: 1})}>
                <View style={style.songItem}>
                  <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=1103639238,521860447&fm=200&gp=0.jpg'}} style={{height: Dimensions.width / 3.2,borderRadius: 4}} />
                  <View style={{position: 'absolute' ,top: 4,right: 6,flexDirection: 'row',justifyContent: 'center'}}>
                    <Icon name="headphones" size={16} color="#fff" />
                    <Text style={{fontSize: 12,color: '#fff'}}>141万</Text>
                  </View>
                  <Text style={{color: '#333',fontSize: 12,marginTop: 4}}>最值得单曲循环的古风歌曲</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => navigate('Profile',{listId: 2})}>
                <View style={style.songItem}>
                  <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=804522843,138196618&fm=200&gp=0.jpg'}} style={{height: Dimensions.width / 3.2,borderRadius: 4}} />
                  <View style={{position: 'absolute' ,top: 4,right: 6,flexDirection: 'row',justifyContent: 'center'}}>
                    <Icon name="headphones" size={16} color="#fff" />
                    <Text style={{fontSize: 12,color: '#fff'}}>141万</Text>
                  </View>
                  <Text style={{color: '#333',fontSize: 12,marginTop: 4}}>一曲戏腔极尽风流，一抹笑颜...</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={{height: 260}}>
            <Image source={this.state.entries[this.state.currentSlideIndex].img} blurRadius={20} style={{position: 'absolute',top: 0,left: 0,height: 260,width: Dimensions.width}} />
            <Text style={{fontSize: 16,color: '#eee',marginVertical: 12,textAlign: 'center'}}>会员专区</Text>
            <Carousel
              ref={(c) => { this._carousel = c }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.width}
              itemWidth={Dimensions.width / 1.4}
              firstItem={1}
              onSnapToItem={this._onSnapTabItem}
            />
            <View style={{flexDirection: 'row',marginVertical: 14,height: 28,borderRadius: 14,alignSelf: 'center',borderColor: '#999',borderWidth: 1,paddingHorizontal: 8,alignItems: 'center'}}>
              <Text style={{fontSize: 12,color: '#eee'}}>进入会员中心</Text>
              <Icon name="chevron-right" size={22} color="#999" />
            </View>
          </View>
          <View style={{marginTop: 6}}>
            <TouchableNativeFeedback  onPress={() => navigate('Detail',{vid: 0})}>
            <View style={style.videoItem}>
              <View style={{height: 120,width: 120,alignItems: 'center',justifyContent: 'center'}}>
                <Image source={{uri: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3018939648,878407930&fm=26&gp=0.jpg'}} style={{height: 120,width: 120,borderRadius: 4,position: 'absolute',left: 0,top: 0}} />
                <Icon name="play" size={24} color="#ff0033" style={{backgroundColor: 'rgba(255,255,255,.8)',borderRadius: 20,padding: 8}} />
              </View>
              <View style={style.videoInfo}>
                <View style={{flex: 2,borderBottomColor: '#eee',borderBottomWidth: 1}}>
                  <Text style={{fontSize: 14,color: '#333',marginVertical: 6}} numberOfLines={2} >现场燃炸了，打call太疯狂!大家燥起来!~</Text>
                  <View style={{flexDirection: 'row',alignItems: 'center'}}>
                    <Icon name="comment-text-outline" size={16} color="#999" />
                    <Text style={{fontSize: 12,color: '#999'}}>12万</Text>
                  </View>
                </View>
                <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}}>
                  <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'}} style={{height: 28,width: 28,borderRadius: 14}} />
                  <Text style={{fontSize: 14,color: '#333',marginLeft: 6}}>Vico</Text>
                </View>
              </View>
            </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback  onPress={() => navigate('Detail',{vid: 1})}>
            <View style={style.videoItem}>
              <View style={{height: 120,width: 120,alignItems: 'center',justifyContent: 'center'}}>
                <Image source={{uri: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=65015900,436119932&fm=26&gp=0.jpg'}} style={{height: 120,width: 120,borderRadius: 4,position: 'absolute',left: 0,top: 0}} />
                <Icon name="play" size={24} color="#ff0033" style={{backgroundColor: 'rgba(255,255,255,.8)',borderRadius: 20,padding: 8}} />
              </View>
              <View style={style.videoInfo}>
                <View style={{flex: 2,borderBottomColor: '#eee',borderBottomWidth: 1}}>
                  <Text style={{fontSize: 14,color: '#333',marginVertical: 6}} numberOfLines={2} >香港群星合唱《铁血丹心》，震撼无比！</Text>
                  <View style={{flexDirection: 'row',alignItems: 'center'}}>
                    <Icon name="comment-text-outline" size={16} color="#999" />
                    <Text style={{fontSize: 12,color: '#999'}}>12万</Text>
                  </View>
                </View>
                <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}}>
                  <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'}} style={{height: 28,width: 28,borderRadius: 14}} />
                  <Text style={{fontSize: 14,color: '#333',marginLeft: 6}}>Vico</Text>
                </View>
              </View>
            </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback  onPress={() => navigate('Detail',{vid: 2})}>
            <View style={style.videoItem}>
              <View style={{height: 120,width: 120,alignItems: 'center',justifyContent: 'center'}}>
                <Image source={{uri: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=350572253,601086075&fm=26&gp=0.jpg'}} style={{height: 120,width: 120,borderRadius: 4,position: 'absolute',left: 0,top: 0}} />
                <Icon name="play" size={24} color="#ff0033" style={{backgroundColor: 'rgba(255,255,255,.8)',borderRadius: 20,padding: 8}} />
              </View>
              <View style={style.videoInfo}>
                <View style={{flex: 2,borderBottomColor: '#eee',borderBottomWidth: 1}}>
                  <Text style={{fontSize: 14,color: '#333',marginVertical: 6}} numberOfLines={2} >国风极乐夜，终于见到双笙啦。</Text>
                  <View style={{flexDirection: 'row',alignItems: 'center'}}>
                    <Icon name="comment-text-outline" size={16} color="#999" />
                    <Text style={{fontSize: 12,color: '#999'}}>12万</Text>
                  </View>
                </View>
                <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}}>
                  <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'}} style={{height: 28,width: 28,borderRadius: 14}} />
                  <Text style={{fontSize: 14,color: '#333',marginLeft: 6}}>Vico</Text>
                </View>
              </View>
            </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
      </View>
    )
  }
}


const StatusBar = require('StatusBar');
const Dimensions = require('Dimensions').get('window');

const style = StyleSheet.create({
  head: {
    backgroundColor: '#FF0033',
  },
  headBar: {
    marginTop: StatusBar.currentHeight,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    height: 24,
    width: Dimensions.width - 100,
    padding: 0,
    backgroundColor: 'rgba(225,255,255,.5)',
    borderRadius: 12,
    marginLeft: 12,
    marginRight: 12,
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center'
  },
  tab: {
    height: 36,
    width: 180,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabItem: {
    height: 24,
    color: 'white',
    fontSize: 12,
  },
  tabActive: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'white'
  },
  scroll: {
    // height: Dimensions.height - 144,
    flex: 1,
  },
  swiperBg: {
    height: 120,
    width: Dimensions.width,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FF0033'
  },
  swiper:{
    height: 160,
    width: Dimensions.width - 20,
    alignSelf: 'center',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#FF0033',
    elevation: 4
  },
  img: {
    height: 160,
    width: Dimensions.width - 20
  },
  menu: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    backgroundColor: '#fff'
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    elevation: 4,
    backgroundColor: '#FF0033',
    textAlign: 'center',
    lineHeight: 44
  },
  menuItemText: {
    color: '#333333',
    fontSize: 12,
    marginTop: 4
  },
  songList: {
    backgroundColor: '#fff'
  },
  listTitle: {
    height: 32
  },
  listContent: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: 6,
    paddingRight: 6,
  },
  songItem: {
    width: Dimensions.width / 3.2,
    height: Dimensions.width / 2.2
  },
  videoItem: {
    height: 140,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginBottom: 6
  },
  videoInfo: {
    flex: 1,
    height: 120,
    marginLeft: 6
  }
});

const TransitionConfiguration = () => ({
  screenInterpolator: (sceneProps) => {
      const {scene} = sceneProps;
      const {route} = scene;
      const params = route.params || {};
      const transition = params.transition || 'forHorizontal';
      return StackViewStyleInterpolator[transition](sceneProps);
  }
});

const Nav = createStackNavigator(
  {
    Home: {
      screen: App,
      navigationOptions: {
        header: null
      }
    },
    Profile: {
      screen: SongList,
      navigationOptions: {
        header: null
      }
    },
    Detail: {
      screen: Detail,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Home',
    transitionConfig: TransitionConfiguration
  }
);

const tabVisible = (navigation) => {
  let show = true;
  if (navigation.state.index > 0) {
    show = false;
  }
  return show;
}

const Tabs = createBottomTabNavigator(
  {
    Home: {
      screen: Nav,
      navigationOptions: ({navigation}) => ({
        tabBarVisible: tabVisible(navigation),
        title: '发现',
        tabBarIcon: ({tintColor})=>(
          <Icon name="cloud-search-outline" size={24} color={tintColor}/>
        )
      })
      // navigationOptions:{
      //   title: '发现',
      //   tabBarIcon: ({tintColor})=>(
      //     <Icon name="cloud-search-outline" size={24} color={tintColor}/>
      //   )
      // }
    },
    Videos: {
      screen: Boke,
      navigationOptions:{
        title: '视频',
        tabBarIcon: ({tintColor})=>(
          <Icon name="play-circle-outline" size={24} color={tintColor}/>
        )
      }
    },
    Mine: {
      screen: Mine,
      navigationOptions:{
        title: '我的',
        tabBarIcon: ({tintColor})=>(
          <Icon name="music" size={24} color={tintColor}/>
        )
      }
    },
    Friends: {
      screen: Friends,
      navigationOptions:{
        title: '朋友',
        tabBarIcon: ({tintColor})=>(
          <Icon name="account-multiple-outline" size={24} color={tintColor}/>
        )
      }
    },
    account: {
      screen: Account,
      navigationOptions:{
        title: '账号',
        tabBarIcon: ({tintColor})=>(
          <Icon name="account-box-outline" size={24} color={tintColor}/>
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#FF0033',
      showIcon: true,
    }
  }
);

export default class myapp extends React.Component {
  render() {
    return <Tabs />;
  }
}

