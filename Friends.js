import React,{Component} from 'react';
import {Text,View,Image,StyleSheet,ScrollView,Animated,Easing} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Pics = (props) => {
  return(
    <View>
      {props.imgs.map((item,index) => 
        <Image key={index} source={item} style={{width: Dimensions.width / 2,height: 160,marginTop: 2,borderRadius: 4}} />
      )}
    </View>
  )
}

const Ditem = (props) => {
  return(
    <View style={styles.dtItem}>
      <View style={{height: 40,flexDirection: 'row',alignItems: 'center'}}>
        <Image source={props.img} style={{height: 36,width: 36,borderRadius: 18}} />
        <View style={{marginLeft: 6}}>
          <Text style={{color: 'steelblue',fontSize: 14}}>{props.userName} :</Text>
          <Text style={{color: '#999',fontSize: 10}}>{props.sendTime}</Text>
        </View>
        <View style={{marginLeft: 'auto',backgroundColor: '#FF0033',height: 24,width: 60,borderRadius: 12,flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
          <Icon name="plus" size={18} color="#fff" />
          <Text style={{color: '#fff',fontSize: 14}}>关注</Text>
        </View>
      </View>
      <View style={{marginTop: 12,marginLeft: 42,marginRight: 8}}>
        <Text style={{color: '#333',fontSize: 14}}>{props.contents}</Text>
        {props.pics.length > 0 ?
          <Pics imgs={props.pics} /> : <View />
        }
        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',marginTop: 12}}>
          <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}}>
            <Icon name="thumb-up-outline" size={16} color="#999" />
            <Text style={{color: '#999',fontSize: 12,marginLeft: 2}}>{props.zan}</Text>
          </View>
          <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}}>
            <Icon name="comment-text-outline" size={16} color="#999" />
            <Text style={{color: '#999',fontSize: 12,marginLeft: 2}}>{props.comment}</Text>
          </View>
          <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}}>
            <Icon name="share-outline" size={16} color="#999" />
            <Text style={{color: '#999',fontSize: 12,marginLeft: 2}}>{props.share}</Text>
          </View>
          <Icon name="dots-horizontal" size={20} color="#999" style={{flex: 2,textAlign: 'right'}}/>
        </View>
      </View>
    </View>
  )
}

export default class Friends extends Component {

  constructor(props) {
    super(props);
    this.state = {
      news: [
        {
          img: {uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'},
          userName: 'Vico',
          sendTime: '41分钟前',
          contents: '浦东的朋友，徐汇的朋友，虹口的朋友，静安的朋友，举起你的手，告诉我，上海最火的夜场到底是哪个？',
          pics: [
            {uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jp'},
            {uri: 'http://img1.imgtn.bdimg.com/it/u=1103639238,521860447&fm=200&gp=0.jpg'}
          ],
          zan: 287,
          comment: 101,
          share: 4
        },
        {
          img: {uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'},
          userName: 'Vico',
          sendTime: '41分钟前',
          contents: '浦东的朋友，徐汇的朋友，虹口的朋友，静安的朋友，举起你的手，告诉我，上海最火的夜场到底是哪个？',
          pics: [],
          zan: 287,
          comment: 101,
          share: 4
        },
        {
          img: {uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'},
          userName: 'Vico',
          sendTime: '41分钟前',
          contents: '浦东的朋友，徐汇的朋友，虹口的朋友，静安的朋友，举起你的手，告诉我，上海最火的夜场到底是哪个？',
          pics: [
            {uri: 'http://img1.imgtn.bdimg.com/it/u=1103639238,521860447&fm=200&gp=0.jpg'}
          ],
          zan: 287,
          comment: 101,
          share: 4
        },
        {
          img: {uri: 'http://img1.imgtn.bdimg.com/it/u=2294962178,1125129695&fm=200&gp=0.jpg'},
          userName: 'Vico',
          sendTime: '41分钟前',
          contents: '浦东的朋友，徐汇的朋友，虹口的朋友，静安的朋友，举起你的手，告诉我，上海最火的夜场到底是哪个？',
          pics: [],
          zan: 287,
          comment: 101,
          share: 4
        },
      ],
      transAni: new Animated.Value(0),
      isSelect: 0,
      currentScrollTop: 0,
      aniBarTop: StatusBar.currentHeight + 40
    }
  }

  _switch(sid) {
    this.setState({
      isSelect: sid,
    });
    Animated.spring(
      this.state.transAni,
      {
        toValue: sid,
        speed: 16
      }
    ).start();
  }

  render() {
    return(
      <View style={{backgroundColor: '#fff',flex: 1}}>
        <View style={{backgroundColor: '#FF0033'}}>
          <View style={styles.headBar}>
            <Icon name="account-plus-outline" size={28} color="#fff" />
            <View style={styles.btnGrup}>
              <Animated.View style={{position: 'absolute',width: '50%',height: 28,backgroundColor: '#fff',borderRadius: 14,left: this.state.transAni.interpolate({inputRange: [0,1],outputRange: ['0%','50%']})}} />
              <Text style={{width: '50%',color: this.state.isSelect === 0 ? '#FF0033' : '#fff',fontSize: 14,lineHeight: 28,textAlign: 'center',fontWeight: 'bold'}} onPress={() => this._switch(0)}>动态</Text>
              <Text style={{width: '50%',color: this.state.isSelect === 1 ? '#FF0033' : '#fff',fontSize: 14,lineHeight: 28,textAlign: 'center',fontWeight: 'bold'}} onPress={() => this._switch(1)}>附近</Text>
            </View>
            <Icon name="poll" size={28} color="#fff" />
          </View>
        </View>
        
        <ScrollView 
        decelerationRate="fast" 
        style={{flex: 1}}
        scrollEventThrottle = {200}
        >
        <View style={{height: 36,flexDirection: 'row',alignItems: 'center',justifyContent: 'center',backgroundColor: '#FF0033'}}>
          <View style={{flexDirection: 'row',alignItems: 'center',width: '49%',justifyContent: 'center',borderRightColor: 'rgba(255,255,255,.3)',borderRightWidth: 0.5}}>
            <Icon name="square-edit-outline" size={24} color="#fff" />
            <Text style={{color: '#fff',fontSize: 14,marginLeft: 8,fontWeight: 'bold'}}>发动态</Text>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center',width: '49%',justifyContent: 'center'}}>
            <Icon name="vhs" size={24} color="#fff" />
            <Text style={{color: '#fff',fontSize: 14,marginLeft: 8,fontWeight: 'bold'}}>发布视频</Text>
          </View>
        </View>
        {this.state.news.map((item,index) => 
          <Ditem
            key={index}
            img={item.img}
            userName={item.userName}
            sendTime={item.sendTime}
            contents={item.contents}
            pics={item.pics}
            zan={item.zan}
            comment={item.comment}
            share={item.share}
          />
        )}
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
  btnGrup: {
    height: 28,
    width: '44%',
    borderRadius: 14,
    borderColor: '#eee',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dtItem: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  }
})