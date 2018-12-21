import React,{Component} from 'react';
import { View,Text,StyleSheet,ScrollView,Image,TouchableWithoutFeedback,TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Mitem = (props) => {
  return(
    <TouchableNativeFeedback>
    <View style={styles.menuItem}>
      <Icon name={props.ic} size={32} color="#FF0033" style={{marginLeft: 16}}/>
      <View style={{flexDirection: 'row',width: '80%',height: 61,paddingRight: 12,alignItems: 'center',justifyContent:'space-between',borderBottomColor: '#eee',borderBottomWidth: 0.5}}>
        <Text style={{color: '#333',fontSize: 16}}>{props.mTitle}</Text>
        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent:'flex-end'}}>
          <Text style={{color: '#888',fontSize: 14}}>{props.num}</Text>
          <Icon name="chevron-right" size={24} color="#999" />
        </View>
      </View>
    </View>
    </TouchableNativeFeedback>
  )
}

const Litem = (props) => {
  return(
    <View style={styles.listItem}>
      <Image source={props.pic} style={{height: 60,width: 60,borderRadius: 4}} />
      <View style={{marginLeft: 12}}>
        <Text style={{color: '#333',fontSize: 16,lineHeight: 28}}>{props.sTitle}</Text>
        <Text style={{color: '#888',fontSize: 12,}}>{props.total}首，已下载{props.done}首</Text>
      </View>
    </View>
  )
}

export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          mTitle: '本地音乐',
          num: 252,
          ic: 'music'
        },
        {
          mTitle: '最近播放',
          num: 108,
          ic: 'play-speed'
        },
        {
          mTitle: '我的电台',
          num: 0,
          ic: 'radio-tower'
        },
        {
          mTitle: '我的收藏',
          num: '专辑/歌手/视频/专栏',
          ic: 'star-outline'
        },
        {
          mTitle: 'Sati 空间',
          num: '特别的聆听模式',
          ic: 'weather-night'
        },
      ],
      songList: [
        {
          sTitle: '我喜欢的音乐',
          pic: {uri: 'http://img1.imgtn.bdimg.com/it/u=1103639238,521860447&fm=200&gp=0.jpg'},
          total: 28,
          done: 11
        },
        {
          sTitle: '我喜欢的音乐',
          pic: {uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'},
          total: 28,
          done: 11
        },
        {
          sTitle: '我喜欢的音乐',
          pic: {uri: 'http://img1.imgtn.bdimg.com/it/u=804522843,138196618&fm=200&gp=0.jpg'},
          total: 28,
          done: 11
        },
        {
          sTitle: '我喜欢的音乐',
          pic: {uri: 'http://img1.imgtn.bdimg.com/it/u=1103639238,521860447&fm=200&gp=0.jpg'},
          total: 28,
          done: 11
        },
      ],
      hidelist: false
    }
  }

  _hideList = () => {
    let hidelist = this.state.hidelist;
    this.setState({
      hidelist: !hidelist
    })
  }

  render() {
    return(
      <View style={{backgroundColor: '#fff',flex: 1}}>
        <View style={{backgroundColor: '#ff0033'}}>
          <View style={styles.headBar}>
            <Icon name="cloud-outline" size={28} color="#FFF" />
            <Text style={{color: '#FFF',fontSize: 16}}>我的音乐</Text>
            <Icon name="poll" size={28} color="#FFF" />
          </View>
        </View>
        <ScrollView style={{flex: 1}}>
          {
            this.state.menu.map((item,index) =>
              <Mitem key={index} mTitle={item.mTitle} ic={item.ic} num={item.num} />
            )
          }
          <TouchableWithoutFeedback onPress={() => this._hideList()}>
          <View style={styles.listTitle}>
            <View style={{flexDirection: 'row',alignItems: 'center'}}>
              <Icon name={this.state.hidelist ? 'chevron-right' : 'chevron-down'} size={20} color="#777" />
              <Text style={{color: '#777',fontSize: 12,marginLeft: 12}}>我创建的歌单(1)</Text>
            </View>
            <Icon name="dots-horizontal" size={20} color="#777" />
          </View>
          </TouchableWithoutFeedback>
          {this.state.hidelist ? 
          <View />
          :
          <View style={styles.myList}>
            {
              this.state.songList.map((item,index) => 
              <Litem key={index} sTitle={item.sTitle} pic={item.pic} total={item.total} done={item.done} />
            )
            }
          </View>
          }
        </ScrollView>
      </View>
    )
  }
}

const StatusBar = require('StatusBar');
const Dimensions = require('Dimensions').get('window');

const styles = StyleSheet.create({

  headBar: {
    height: 40,
    marginTop: StatusBar.currentHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12
  },
  menuItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTitle: {
    height: 28,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12
  },
  myList: {
    paddingHorizontal: 12
  },
  listItem: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center'
  }

});