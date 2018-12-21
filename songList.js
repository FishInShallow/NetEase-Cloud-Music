
import React, {Component} from 'react';
import {StyleSheet,Image,Text,View,TouchableOpacity,ScrollView,findNodeHandle,UIManager} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';

export default class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listInfo: {},
      pause: true,
      songUri: require('./All-About-You.mp3'),
      currentSongId: null,
      pageTitle: '歌单'
    }

    this._tapList = this._tapList.bind(this);
    this._nextOne = this._nextOne.bind(this);
  }

  componentDidMount(){
    let listInfo = {};
    const { navigation } = this.props;
    const listId = navigation.getParam('listId', 0);

    switch(listId){
      case 0:
      listInfo = {
        img: {uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'},
        listTitle: '2018年十月最新热歌TOP50',
        author: 'Vico'
      }
      break;
      case 1:
      listInfo = {
        img: {uri: 'http://img1.imgtn.bdimg.com/it/u=1103639238,521860447&fm=200&gp=0.jpg'},
        listTitle: '最值得单曲循环的古风歌曲',
        author: 'Vico'
      }
      break;
      case 2:
      listInfo = {
        img: {uri: 'http://img1.imgtn.bdimg.com/it/u=804522843,138196618&fm=200&gp=0.jpg'},
        listTitle: '一曲戏腔极尽风流，一抹笑颜...',
        author: 'Vico'
      }
      break;
    }

    this.setState({
      listInfo: listInfo
    });
  }

  _tapList(songIndex){
    let pause = this.state.pause;
    let currentSongId = this.state.currentSongId;
    let songUri = this.state.songUri;

    if(songIndex === currentSongId){
      pause = !pause;
    }else{
      pause = false;
      currentSongId = songIndex;
      songUri = hotSongs[songIndex].songUri;
    }

    this.setState({
      pause: pause,
      currentSongId: currentSongId,
      songUri: songUri
    });
  }

  _nextOne(){
    let currentSongId = this.state.currentSongId;
    
    if(currentSongId < hotSongs.length - 1){
      this._tapList(currentSongId + 1);
    }
  }

  _pageScroll(){
    UIManager.measure(findNodeHandle(this.playList),(x,y,width,height,pageX,pageY) => {
      let pageTitle = this.state.listInfo.listTitle;
      if(pageY >= 150){
        pageTitle = '歌单'
      }
      this.setState({
        pageTitle: pageTitle
      });
    });
  }

  render() {
    const { goBack } = this.props.navigation;
    const listInfo = this.state.listInfo;
    
    return (
      <View style={{flex: 1}}>
        <Image
          source={listInfo.img}
          style={style.headBarBg}
          blurRadius={20}
        />
        <View style={style.headBar}>
          <TouchableOpacity onPress={() => goBack()}>
            <Icon name="arrow-left" size={32} color="#EEE" />
          </TouchableOpacity>
          <Text style={{color: '#EEE',fontSize: 18,width: 160,textAlign: 'center'}} numberOfLines={1}>{this.state.pageTitle}</Text>
          <Icon name="dots-horizontal" size={32} color="#EEE" />
          <Icon name="poll" size={32} color="#EEE" />
        </View>
        <ScrollView 
          style={{flex: 1}}
          decelerationRate="fast"
          onScroll = {() => this._pageScroll()}
        >
          <View style={style.info}>
            <Image 
              source={listInfo.img}
              style={{height: 120,width: 120,borderRadius: 6}}
            />
            <View>
              <Text style={{color: '#EEE',fontSize: 18,fontWeight: 'bold',width: Dimensions.width - 160}}>{listInfo.listTitle}</Text>
              <View style={{flexDirection: 'row',alignContent: 'flex-start',marginTop: 16}}>
                <Image 
                  source={listInfo.img}
                  style={{height: 32,width: 32,borderRadius: 16,marginRight: 8}}
                />
                <Text style={{color: '#CCC',fontSize: 16,lineHeight: 32}}>{listInfo.author}</Text>
                <Icon name="chevron-right" size={24} color="#CCC" style={{lineHeight: 32}}/>
              </View>
            </View>
          </View>
          <View style={style.menu}>
            <View >
              <Icon name="comment-text-outline" size={28} color="#EEE" />
              <Text style={{color: '#CCC',fontSize: 12,textAlign: 'center'}}>519</Text>
            </View>
            <View>
              <Icon name="share-variant" size={28} color="#EEE" />
              <Text style={{color: '#CCC',fontSize: 12,textAlign: 'center'}}>519</Text>
            </View>
            <View>
              <Icon name="download" size={28} color="#EEE" />
              <Text style={{color: '#CCC',fontSize: 12,textAlign: 'center'}}>下载</Text>
            </View>
            <View>
              <Icon name="checkbox-marked-outline" size={28} color="#EEE" />
              <Text style={{color: '#CCC',fontSize: 12,textAlign: 'center'}}>多选</Text>
            </View>
          </View>
          <View style={style.playList} ref={(ref) => this.playList = ref}>
            <View style={{flexDirection: 'row',justifyContent: 'space-between',borderBottomColor: '#eee',borderBottomWidth: 0.5}}>
              <View style={{flexDirection: 'row',width: 100,height: 50,paddingLeft: 10,alignItems: 'center'}}>
                <Icon name="play-circle-outline" color="#333" size={24} />
                <Text style={{color: '#333',fontSize: 16,lineHeight: 24}}> 播放全部</Text>
                <Text style={{color: '#888',fontSize: 14,lineHeight: 24}}> (共{hotSongs.length}首)</Text>
              </View>
              <View style={{backgroundColor: '#FF0033',height: 50,width: 120}}>
                <Text style={{color: '#FFF',fontSize: 14,lineHeight: 50,textAlign: 'center'}}>+ 收藏 (1132)</Text>
              </View>
            </View>
            <View>
              {hotSongs.map((item,index) => 
                <TouchableOpacity key={item.id} onPress={() => this._tapList(index)}>
                <View style={style.songItem}>
                {this.state.currentSongId === index ?
                  <Icon name={this.state.pause ? 'pause' : 'volume-high'} size={18} color="#FF0033" style={{width: 20,textAlign: 'center'}} />
                :
                  <Text style={{fontSize: 16,color: '#ccc',width: 20,textAlign: 'center'}}>{index + 1}</Text>
                }
                  <View style={{width: Dimensions.width - 160}}>
                    <Text style={{color: this.state.currentSongId === index ? '#FF0033' : '#333',fontSize: 16}} numberOfLines={1}>{item.songTitle}</Text>
                    <Text style={{color: '#ccc',fontSize: 12}} numberOfLines={1}>{item.album}</Text>
                  </View>
                  <Icon name="youtube" size={20} color='#ccc' />
                  <Icon name="poll" size={20} color='#ccc' />
                </View>
                </TouchableOpacity>
              )}
            </View>
            <Video playInBackground={true} volume={1.0} paused={this.state.pause} source={this.state.songUri} onEnd={this._nextOne}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const hotSongs = [
  {
    id: 1,
    songTitle: 'All About You',
    album: 'McFly - Wonderland',
    songUri: {uri: 'https://music.163.com/song/media/outer/url?id=21071905.mp3'},
  },
  {
    id: 2,
    songTitle: 'Just One Last Dance',
    album: 'Sarah Connor & Mark Terenzi',
    songUri: {uri: 'https://music.163.com/song/media/outer/url?id=21674656.mp3'},
  },
  {
    id: 3,
    songTitle: 'I Knew You Were Trouble.',
    album: 'Taylor Swift',
    songUri: {uri: 'https://newtabz.stream/PxcVvB:2Ks1rB'},
  },
  {
    id: 4,
    songTitle: 'Only my Railgun',
    album: 'FripSide - To Aru Kagaku no Railgun OP1',
    songUri: {uri: 'https://music.163.com/song/media/outer/url?id=725692.mp3'},
  },
  {
    id: 5,
    songTitle: '戏台',
    album: '陈粒 - 戏台',
    songUri: {uri: 'https://music.163.com/song/media/outer/url?id=461301042.mp3'},
  },
  {
    id: 6,
    songTitle: 'Wonderful Tonight',
    album: 'Eric Clapton - friends',
    songUri: {uri: 'https://music.163.com/song/media/outer/url?id=5048569.mp3'},
  },
  {
    id: 7,
    songTitle: 'I Have Nothing',
    album: 'Whitny Houston - The Bodyguard',
    songUri: {uri: 'https://music.163.com/song/media/outer/url?id=3819588.mp3'},
  },
  {
    id: 8,
    songTitle: 'I Will AlwaysLove You',
    album: 'Whitny Houston - I Will Always Love You',
    songUri: {uri: 'https://music.163.com/song/media/outer/url?id=3819561.mp3'},
  },
  {
    id: 9,
    songTitle: "What's Up",
    album: "4 Non Blonds - What's Up",
    songUri: {uri: 'https://music.163.com/song/media/outer/url?id=2112908.mp3'},
  },
  {
    id: 10,
    songTitle: 'Everybody Knows',
    album: 'Sigrid - Justice League',
    songUri: {uri: 'https://music.163.com/song/media/outer/url?id=518015108.mp3'},
  },
  {
    id: 11,
    songTitle: 'All I Want For Chritsmas Is You',
    album: 'Mariah Garey - Merry Christmas',
    songUri: {uri: 'https://music.163.com/song/media/outer/url?id=540350803.mp3'},
  },
  {
    id: 12,
    songTitle: '清平调(独唱版)',
    album: '王菲 - 清平调(独唱版)',
    songUri: {uri: 'https://music.163.com/song/media/outer/url?id=33510199.mp3'},
  },
  
];

const StatusBar = require('StatusBar');
const Dimensions = require('Dimensions').get('window');

const style = StyleSheet.create({
  headBarBg: {
    height: 300,
    width: Dimensions.width,
    position: 'absolute',
    top: 0,
    left: 0
  },
  headBar: {
    height: 40,
    width: Dimensions.width,
    marginTop: StatusBar.currentHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  info: {
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12
  },
  menu: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  },
  playList: {
    // height: Dimensions.height - StatusBar.currentHeight - 40,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  songItem: {
    height: 50,
    borderBottomColor: '#EEE',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12
  }

});
