import React,{Component} from 'react';
import {View,Text,Image,StyleSheet,TextInput,FlatList,TouchableOpacity,Slider,Animated} from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

class VideoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      videos: this.props.data,
      videoWidth: Dimensions.width - 12,
      videoHeight: (Dimensions.width - 12) * 9 / 16,
      hideToolBar: true,
      refreshing: false,
    }
  }

  _pauseVideo(vid){
    let videos = this.state.videos;
    videos[vid].pause = true;
    this.setState({
      videos: videos
    });
  }

  _playVideo = (vid) => {
    let videos = this.state.videos;
    videos.forEach((item,index) => {
      if(index === vid){
        videos[index].pause = false;
      }else{
        videos[index].pause = true;
      }
    });
    this.setState({
      videos: videos
    });
  }

  _onloaded = (data,vid) => {
    let videos = this.state.videos;
    videos[vid].duration = data.duration;
    this.setState({
      videos: videos
    })
  }

  _setTime = (data,vid) => {
    let videos = this.state.videos;
    videos[vid].currentTime = data.currentTime;
    this.setState({
      videos: videos
    })
  }

  _formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
      i = parseInt(s / 60);
      s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
      return (v >> 0) < 10 ? "0" + v : v;
    };
    return [zero(i), zero(s)].join(":");
  }

  _showToolBar(){
    this.setState({
      hideToolBar: false
    });
    setTimeout(() => this.setState({
      hideToolBar: true
    }),2000);
  }

  render() {
    const videoMask = {
      height: this.state.videoHeight,
      width: this.state.videoWidth,
      backgroundColor: 'rgba(0,0,0,.2)',
      alignItems:'center',
      justifyContent: 'center',
    };
    const toolBar = {
      flexDirection: 'row',
      top: this.state.videoHeight - 32,
      left: 0,
      height: 32,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: 'rgba(0,0,0,.1)',
      alignContent: 'flex-start',
      alignItems: 'center',
      justifyContent: 'space-between'
    };
    const defVideo = {
      height: this.state.videoHeight,
      width: this.state.videoWidth
    };
    const timeText = {
      fontSize: 10,
      color: 'white'
    }
    return(
      <FlatList 
        data={this.state.videos}
        extraData={this.state}
        keyExtractor={(item,index) => index.toString()}
        decelerationRate="fast"
        renderItem={({item,index}) =>
        <View style={style.videoItem}>
          <View style={{top: 6,borderRadius: 6,overflow: 'hidden'}}>
          {item.pause ? 
            <TouchableOpacity style={{position: 'absolute',zIndex: 1}} onPress={() => this._playVideo(index)}>
            <View style={videoMask}>
              <Icon name="play" color="white" size={42} />
            </View>
            </TouchableOpacity>
            : 
            <View style={{position: 'absolute',zIndex: 1,height: this.state.videoHeight,width: this.state.videoWidth}}>
              {this.state.hideToolBar ? 
              <TouchableOpacity onPress={() => this._showToolBar()} style={{height: '100%',width: '100%'}}>

              </TouchableOpacity>
              :
              <View style={toolBar}>
              <TouchableOpacity onPress={() => this._pauseVideo(index)}>
                <Icon name="pause" size={24} color="white"/>
              </TouchableOpacity>
                <Text style={timeText}>{this._formatTime(item.currentTime)}</Text>
                <Slider
                  style={{width: '60%'}}
                  value={item.currentTime}
                  minimumValue={0}
                  maximumValue={item.duration}
                  minimumTrackTintColor='orange'
                  maximumTrackTintColor='#fff'
                  step={1}
                />
                <Text style={timeText}>{this._formatTime(item.duration)}</Text>
                <Icon name="fullscreen" size={24} color="white"/>
              </View>
              }
            </View>
          }
            
            <Video
              source={item.vsrc}
              paused={item.pause}
              style={defVideo}
              volume={1.0}
              onLoad={(data) => this._onloaded(data,index)}
              onEnd={() => this._pauseVideo(index)}
              onProgress = {(data) => this._setTime(data,index)}
              resizeMode="cover"
              posterResizeMode= 'cover'
            />
          </View>
          <Text style={{fontSize: 14,fontWeight: 'bold',lineHeight: 42,borderBottomColor: '#eee',borderBottomWidth: 0.5}} numberOfLines={1}>{item.videoTitle}</Text>
          <View style={{flexDirection: 'row',height: 50,alignItems: 'center',justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row',alignItems: 'center',}}>
              <Image source={item.img} style={{height: 32,width: 32,borderRadius: 18}}/>
              <Text style={{fontSize: 14,marginLeft: 6,width: 40}} numberOfLines={1}>{item.author}</Text>
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center'}}>
              <Icon name="thumb-up-outline" color="#888" size={20} />
              <Text style={{fontSize: 12,color: '#888',marginLeft: 6}}>99</Text>
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center'}}>
              <Icon name="comment-text-outline" color="#888" size={20} />
              <Text style={{fontSize: 12,color: '#888',marginLeft: 6}}>77</Text>
            </View>
            <Icon name="dots-horizontal" color="#888" size={20} />
          </View>
        </View>
        }
      />
    )
  }
}

export default class Boke extends Component{

  constructor(props){
    super(props);
    this.state = {
      videoList: [
        {
          poster: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg',
          videoTitle: '吉他版的 A Little Story 居然页这么好听~!',
          author: 'Vico',
          vsrc: {uri: 'http://58.16.42.195:9999/112.253.22.159/26/s/x/c/q/sxcqoavqtcoslgrzbpzqynohbfujgm/hc.yinyuetai.com/73E5015D63DB0A2A8244BA97AB0E4E19.mp4?sc=7ebacee232aea64e&br=433&vid=2915712&aid=16&area=HT&vst=0&ptp=ex&rd=www.truemv.com'},
          img: {uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'},
          pause: true,
          currentTime: 0,
          duration: 0
        },
        {
          poster: 'http://img1.imgtn.bdimg.com/it/u=1103639238,521860447&fm=200&gp=0.jpg',
          videoTitle: '一首好歌撑起整个CG',
          author: 'Vico',
          vsrc: {uri: 'http://58.16.42.204:9999/112.253.22.163/6/b/g/g/c/bggcjjoltkmubpopvabouybrckxzck/hc.yinyuetai.com/5CA30157306E09A329296A93EE5C7A87.flv?sc=a3f93dd90f33ca78&br=785&vid=2679611&aid=23284&area=US&vst=2&ptp=ex&rd=www.truemv.com'},
          img: {uri: 'http://img1.imgtn.bdimg.com/it/u=1103639238,521860447&fm=200&gp=0.jpg'},
          pause: true,
          currentTime: 0,
          duration: 0
        },
        {
          poster: 'http://img1.imgtn.bdimg.com/it/u=804522843,138196618&fm=200&gp=0.jpg',
          videoTitle: '七夕礼物 - 苏幕遮,结尾高能',
          author: 'Vico',
          vsrc: {uri: 'http://58.16.42.190:9999/112.253.22.164/8/w/p/p/y/wppyfaozpqlbesnhfmhfzpzhcxrayp/hc.yinyuetai.com/B2EF014F3F7E7604728EC15B7DE775FB.flv?sc=533b3e632d344b0f&br=782&vid=2352881&aid=79&area=KR&vst=0&cid=22&ptp=ex&rd=www.truemv.com'},
          img: {uri: 'http://img1.imgtn.bdimg.com/it/u=804522843,138196618&fm=200&gp=0.jpg'},
          pause: true,
          currentTime: 0,
          duration: 0
        }
      ],
    }
  }

  render(){
    return(
      <View style={{flex: 1}}>        
        <View style={style.head}>
          <View style={style.headBar}>
            <Icon name="video-plus" size={24} color="#ffffff" />
            <TextInput style={style.search} placeholder="Sakura Tears - NighySilin" placeholderTextColor="#FFF"></TextInput>
            <Icon name="poll" size={24} color="#ffffff" />
          </View>
        </View>
        <View style={style.container}>
          <ScrollableTabView
            tabBarBackgroundColor="#FF0033"
            tabBarInactiveTextColor="white"
            tabBarActiveTextColor="white"
            tabBarUnderlineStyle={{backgroundColor: 'white',borderRadius: 2,marginBottom: 6}}
            renderTabBar={() => <ScrollableTabBar/>}
          >
            <VideoList 
              tabLabel='推荐'
              data={this.state.videoList}
            />
            <View tabLabel='LOOK直播'>
              <Text>LOOK直播</Text>
            </View>
            <View tabLabel='现场'>
              <Text>现场</Text>
            </View>
            <View tabLabel='Because Of You'>
              <Text>Because Of You</Text>
            </View>
            <View tabLabel='翻唱'>
              <Text>翻唱</Text>
            </View>
            <View tabLabel='MV'>
              <Text>MV</Text>
            </View>
          </ScrollableTabView>
        </View>
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
    justifyContent: 'center'
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
  container:{
    flex: 1,
    backgroundColor: '#eee'
  },
  videoItem: {
    backgroundColor: '#fff',
    paddingLeft: 6,
    paddingRight: 6,
    marginBottom: 10
  }
});