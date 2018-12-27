import React,{Component} from 'react';
import {View,Text,Image,TextInput,StyleSheet,TouchableOpacity,Slider,ScrollView,KeyboardAvoidingView,FlatList,StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

export default class Detail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      player: {
        vsrc: {uri: 'http://58.16.42.195:9999/112.253.22.159/26/s/x/c/q/sxcqoavqtcoslgrzbpzqynohbfujgm/hc.yinyuetai.com/73E5015D63DB0A2A8244BA97AB0E4E19.mp4?sc=7ebacee232aea64e&br=433&vid=2915712&aid=16&area=HT&vst=0&ptp=ex&rd=www.truemv.com'},
        pause: false,
        duration: 0,
        currentTime: 0
      },
      recommends: [
        {
          img: {uri: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3018939648,878407930&fm=26&gp=0.jpg'},
          title: '现场燃炸了，打call太疯狂!大家燥起来!~',
          author: 'Vico'
        },
        {
          img: {uri: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=65015900,436119932&fm=26&gp=0.jpg'},
          title: '香港群星合唱《铁血丹心》，震撼无比！',
          author: 'Vico'
        },
        {
          img: {uri: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=350572253,601086075&fm=26&gp=0.jpg'},
          title: '国风极乐夜，终于见到双笙啦。',
          author: 'Vico'
        },
      ],
      vtitle: '现场燃炸了，打call太疯狂!大家燥起来!~',
      //videoWidth: Dimensions.width ,
      videoHeight: Dimensions.width * 9 / 16,
      hideToolBar: true,
      isFull: false
    }
  }

  componentDidMount(){
    let player = {};
    let vtitle = '';
    const { navigation } = this.props;
    const vid = navigation.getParam('vid', 0);

    switch(vid){
      case 0:
      vtitle = '现场燃炸了，打call太疯狂!大家燥起来!~';
      player.vsrc = {uri: 'http://58.16.42.195:9999/112.253.22.159/26/s/x/c/q/sxcqoavqtcoslgrzbpzqynohbfujgm/hc.yinyuetai.com/73E5015D63DB0A2A8244BA97AB0E4E19.mp4?sc=7ebacee232aea64e&br=433&vid=2915712&aid=16&area=HT&vst=0&ptp=ex&rd=www.truemv.com'};
      break;
      case 1:
      vtitle = '香港群星合唱《铁血丹心》，震撼无比！';
      player.vsrc = {uri: 'http://58.16.42.204:9999/112.253.22.163/6/b/g/g/c/bggcjjoltkmubpopvabouybrckxzck/hc.yinyuetai.com/5CA30157306E09A329296A93EE5C7A87.flv?sc=a3f93dd90f33ca78&br=785&vid=2679611&aid=23284&area=US&vst=2&ptp=ex&rd=www.truemv.com'};
      break;
      case 2:
      vtitle = '国风极乐夜，终于见到双笙啦。';
      player.vsrc = {uri: 'http://58.16.42.190:9999/112.253.22.164/8/w/p/p/y/wppyfaozpqlbesnhfmhfzpzhcxrayp/hc.yinyuetai.com/B2EF014F3F7E7604728EC15B7DE775FB.flv?sc=533b3e632d344b0f&br=782&vid=2352881&aid=79&area=KR&vst=0&cid=22&ptp=ex&rd=www.truemv.com'};
      break;
    }

    this.setState({
      player: player,
      vtitle: vtitle
    })
  }

  _pauseVideo() {
    let player = this.state.player;
    player.pause = true;
    this.setState({
      player: player
    });
  }

  _playVideo = () => {
    let player = this.state.player;
    player.pause = !player.pause;
    this.setState({
      player: player
    });
  }

  _onloaded = (data) => {
    let player = this.state.player;
    player.duration = data.duration;
    this.setState({
      player: player
    })
  }

  _setTime = (data) => {
    let player = this.state.player;
    player.currentTime = data.currentTime;
    this.setState({
      player: player
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
    }),5000);
  }

  _fullScreen() {
    let isFull = this.state.isFull;
    if(isFull){
      Orientation.lockToPortrait();
      this.setState({
        isFull: false,
        //videoWidth: Dimensions.width,
        videoHeight: Dimensions.width * 9 / 16
      })
    }else{
      Orientation.lockToLandscape();
      this.setState({
        isFull: true,
        //videoWidth: Dimensions.height,
        videoHeight: Dimensions.width
      })
    }
  }

  _renderItem({item,index}) {
    return(
      <View style={styles.recItem}>
        <Image source={item.img} style={{flex: 1,height: 68,marginHorizontal: 6,borderRadius: 4}} />
        <View style={{flex: 2,borderBottomColor: '#eee',borderBottomWidth: .5}}>
          <Text style={{flex: 2,fontSize: 16,color: '#333',paddingRight: 12,marginTop: 6}} numberOfLines={2}>{item.title}</Text>
          <Text style={{flex: 1,fontSize: 12,color: '#999',paddingRight: 12}} numberOfLines={2}>by {item.author}</Text>
        </View>
      </View>
    )
  }

  render() {

    const videoMask = {
      height: this.state.videoHeight,
      position: 'absolute',
      zIndex: 1,
      width: '100%',
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
      width: '100%'
    };
    const timeText = {
      fontSize: 10,
      color: 'white'
    };
    const btnBack = {
      position: 'absolute',
      top: 24,
      left: 8,
      zIndex: 12
    }

    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar  
         animated={true}
         hidden={this.state.isFull}
         translucent={true}
         barStyle={'light-content'}
        >  
        </StatusBar> 
        <View>
          <TouchableOpacity style={btnBack} onPress={() => { if(this.state.isFull){this._fullScreen()} else{goBack() }}}>
          <Icon name="chevron-left" size={42} color="rgba(255,255,255,.6)" />
          </TouchableOpacity>
        {this.state.player.pause ? 
          <TouchableOpacity style={videoMask} onPress={() => this._playVideo()}>
            <Icon name="play" color="white" size={42} />
          </TouchableOpacity>
          : 
          <View style={{position: 'absolute',zIndex: 1,height: this.state.videoHeight,width: '100%'}}>
            {this.state.hideToolBar ? 
            <TouchableOpacity onPress={() => this._showToolBar()} style={{height: '100%',width: '100%'}}>

            </TouchableOpacity>
            :
            <View style={toolBar}>
            <TouchableOpacity onPress={() => this._pauseVideo()}>
              <Icon name="pause" size={24} color="white"/>
            </TouchableOpacity>
              <Text style={timeText}>{this._formatTime(this.state.player.currentTime)}</Text>
              <Slider
                style={{width: '60%'}}
                value={this.state.player.currentTime}
                minimumValue={0}
                maximumValue={this.state.player.duration}
                minimumTrackTintColor='orange'
                maximumTrackTintColor='#fff'
                step={1}
                onValueChange={(value) => this.player.seek(value)}
              />
              <Text style={timeText}>{this._formatTime(this.state.player.duration)}</Text>
              <TouchableOpacity onPress={() => this._fullScreen()}>
                <Icon name={this.state.isFull? 'fullscreen-exit' : 'fullscreen'} size={24} color="white"/>
              </TouchableOpacity>
            </View>
            }
          </View>
        }
          
          <Video
            ref={(ref) => (this.player = ref)}
            source={this.state.player.vsrc}
            paused={this.state.player.pause}
            style={defVideo}
            volume={1.0}
            onLoad={(data) => this._onloaded(data)}
            onEnd={() => this._pauseVideo()}
            onProgress = {(data) => this._setTime(data)}
            resizeMode="cover"
            posterResizeMode= 'cover'
          />
        </View>
        <ScrollView style={{flex: 1,backgroundColor: '#fff',marginBottom: 48}}>
          <View style={{borderBottomColor: '#eee',borderBottomWidth: 1,padding: 6}}>
            <Text style={{fontSize: 16,color: '#333',marginTop: 12}} numberOfLines={2}>{this.state.vtitle}</Text>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',marginVertical: 6}}>
              <Text style={{fontSize: 12,color: '#999'}}>发布：2017-10-17</Text>
              <Text style={{fontSize: 12,color: '#999'}}>播放：234.1万</Text>
            </View>
            <View style={{flexDirection: 'row',flexWrap: 'wrap',alignItems: 'center',justifyContent: 'flex-start'}}>
              <Text style={{fontSize: 9,color: '#333',height: 20,paddingVertical: 4,paddingHorizontal: 8,borderColor: '#eee',borderWidth: 1,borderRadius: 11,margin: 6}}>音乐推荐</Text>
              <Text style={{fontSize: 9,color: '#333',height: 20,paddingVertical: 4,paddingHorizontal: 8,borderColor: '#eee',borderWidth: 1,borderRadius: 11,margin: 6}}>音乐推</Text>
              <Text style={{fontSize: 9,color: '#333',height: 20,paddingVertical: 4,paddingHorizontal: 8,borderColor: '#eee',borderWidth: 1,borderRadius: 11,margin: 6}}>音乐</Text>
              <Text style={{fontSize: 9,color: '#333',height: 20,paddingVertical: 4,paddingHorizontal: 8,borderColor: '#eee',borderWidth: 1,borderRadius: 11,margin: 6}}>音</Text>
              <Text style={{fontSize: 9,color: '#333',height: 20,paddingVertical: 4,paddingHorizontal: 8,borderColor: '#eee',borderWidth: 1,borderRadius: 11,margin: 6}}>音乐推</Text>
              <Text style={{fontSize: 9,color: '#333',height: 20,paddingVertical: 4,paddingHorizontal: 8,borderColor: '#eee',borderWidth: 1,borderRadius: 11,margin: 6}}>音乐音乐推荐</Text>
              <Text style={{fontSize: 9,color: '#333',height: 20,paddingVertical: 4,paddingHorizontal: 8,borderColor: '#eee',borderWidth: 1,borderRadius: 11,margin: 6}}>音乐</Text>
              <Text style={{fontSize: 9,color: '#333',height: 20,paddingVertical: 4,paddingHorizontal: 8,borderColor: '#eee',borderWidth: 1,borderRadius: 11,margin: 6}}>音乐推荐</Text>
            </View>
            <Text style={{fontSize: 12,color: '#666'}}>There are several additional functions present on this.props.navigation based on the kind of the current navigator.

  If the navigator is a stack navigator, several alternatives to navigate and goBack are provided and you can use whichever you prefer. The functions are:</Text>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',margin: 12}}>
              <View style={{alignItems: 'center'}}>
                <Icon name="thumb-up-outline" size={28} color="#666" />
                <Text style={{fontSize: 10,color: '#999',textAlign: 'center',marginVertical: 2}}>21894</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Icon name="folder-outline" size={28} color="#666" />
                <Text style={{fontSize: 10,color: '#999',textAlign: 'center',marginVertical: 2}}>21894</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Icon name="comment-text-outline" size={28} color="#666" />
                <Text style={{fontSize: 10,color: '#999',textAlign: 'center',marginVertical: 2}}>21894</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Icon name="share-outline" size={28} color="#666" />
                <Text style={{fontSize: 10,color: '#999',textAlign: 'center',marginVertical: 2}}>21894</Text>
              </View>
            </View>
          </View>
          <View style={styles.userInfo}>
            <View style={{flex: 4,flexDirection: 'row',alignItems: 'center'}}>
              <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=804522843,138196618&fm=200&gp=0.jpg'}} style={styles.avater} />
              <Text style={styles.userName}>Vico</Text>
            </View>
            <View style={[{flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: 'center'},styles.like]}>
              <Icon name="plus" size={16} color="#ff0033" />
              <Text style={{fontSize: 12,color: '#ff0033',marginLeft: 2}}>关注</Text>
            </View>
          </View>
          <View>
            <View style={{height: 24,backgroundColor: '#eee',justifyContent: 'center'}}>
              <Text style={{fontSize: 12,color: '#999',marginLeft: 6}}>相关推荐</Text>
            </View>
            <View>
              <FlatList
                data={this.state.recommends}
                keyExtractor={(item,index) => index.toString()}
                renderItem={this._renderItem}
              />
            </View>
          </View>
          <View>
            <View style={{height: 24,backgroundColor: '#eee',justifyContent: 'center'}}>
              <Text style={{fontSize: 12,color: '#999',marginLeft: 6}}>精彩评论</Text>
            </View>
            <View style={{height: 100,alignItems: 'center',justifyContent: 'center'}}>
              <Text style={{fontSize: 14,color: '#999'}}>还没有人评论哟~</Text>
            </View>
          </View>
        </ScrollView>
        {this.state.isFull ?
        <View />
        :
        <KeyboardAvoidingView behavior="padding" style={{position: 'absolute',left: 0,bottom: 0}}>
        <View style={{flexDirection: 'row',height: 48,width: Dimensions.width,borderTopColor: '#eee',borderTopWidth: 1,alignItems: 'center',paddingHorizontal: 6,backgroundColor: '#fffffd'}}>
          <TextInput placeholder="发表评论" style={{height: 30,width: '88%',fontSize: 14,borderRadius: 16,borderColor: '#eee',borderWidth: 1,paddingVertical: 0,paddingLeft: 8,backgroundColor: '#fff'}} />
          <Icon name="comment-text-outline" size={28} color="#666" style={{marginLeft: 8}}/>
        </View>
        </KeyboardAvoidingView>
        }
      </View>
    )
  }
}

const Dimensions = require('Dimensions').get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  userInfo: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6
  },
  avater: {
    height: 30,
    width: 30,
    borderRadius: 15
  },
  userName: {
    fontSize: 16,
    color: '#333',
    marginLeft: 6
  },
  like: {
    width: 42,
    height: 26,
    borderColor: '#ff0033',
    borderWidth: 1,
    borderRadius: 14
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,

  }
})