import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,ScrollView,TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Menu = (props) => {
  return(
    <View style={{borderBottomColor: '#eee',borderBottomWidth: 10}}>
    {props.mdata.map((item,index) => 
    <TouchableNativeFeedback key={index} >
      <View style={{height: 50,flexDirection: 'row',alignItems: 'center'}}>
        <Icon name={item.ic} size={24} color="#999" style={{flex: 1,marginLeft: 12}} />
        <View style={{flex: 9,height: 51,borderBottomColor: '#eee',borderBottomWidth: 0.5,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
          <Text style={{color: '#333',fontSize:16}}>{item.mTitle}</Text>
          <Icon name="chevron-right" size={24} color="#999" style={{marginRight: 12}} />
        </View>
      </View>
    </TouchableNativeFeedback>
    )
    }
    </View>
  )
  
}

export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myMessage: [
        {
          ic: 'email-outline',
          mTitle: '我的消息'
        }
      ],
      myCenetr: [
        {
          ic: 'album',
          mTitle: '会员中心'
        },
        {
          ic: 'cart-outline',
          mTitle: '商城'
        },
        {
          ic: 'gamepad-variant',
          mTitle: '游戏推荐'
        },
        {
          ic: 'shopping-music',
          mTitle: '在线听歌免流量'
        },
      ],
      settings: [
        {
          ic: 'settings',
          mTitle: '设置'
        },
        {
          ic: 'qrcode-scan',
          mTitle: '扫码'
        },
        {
          ic: 'clock-outline',
          mTitle: '定时关闭'
        },
        {
          ic: 'car-side',
          mTitle: '驾驶模式'
        },
        {
          ic: 'ticket',
          mTitle: '优惠券'
        },
      ]
    }
  }

  render() {
    return(
      <View style={{backgroundColor: '#fff',flex: 1}}>
        <View style={{backgroundColor: '#FF0033'}}>
          <View style={styles.headBar}>
            <Text style={{color: '#eee',fontSize: 16,fontWeight: 'bold'}}>账号</Text>
          </View>
        </View>
        <ScrollView style={{flex: 1}}>
          <View style={styles.user}>
            <View style={styles.userInfo}>
              <View style={{flexDirection: 'row',alignItems: 'center'}}>
                <Image source={{uri: 'http://img1.imgtn.bdimg.com/it/u=1103639238,521860447&fm=200&gp=0.jpg'}} style={{height: 60,width: 60,borderRadius: 30}} />
                <View style={{marginLeft: 10}}>
                  <Text style={{color: '#333',fontSize: 16,marginBottom: 6}}>Vico</Text>
                  <Text style={{color: '#999',fontSize: 10,borderWidth: 1,borderColor: '#999',borderRadius: 8,paddingHorizontal: 4,textAlign: 'center'}}>Lv.5</Text> 
                </View>
              </View>
              <View style={{height: 28,width: 64,flexDirection: 'row',alignItems: 'center',justifyContent: 'center',borderColor: "#FF0033",borderWidth: 1,borderRadius: 14}}>
                <Icon name="database" size={16} color="#FF0033" />
                <Text style={{color: '#FF0033',fontSize: 12,marginLeft: 2}}>签到</Text>
              </View>
            </View>
            <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start',paddingVertical: 6}}>
              <View style={{flex: 1,alignItems: 'center',borderRightColor: '#eee',borderRightWidth: 0.5}}>
                <Text style={{color: '#999',fontSize: 12}}>动态</Text>
                <Text style={{color: '#333',fontSize: 14}}>0</Text>
              </View>
              <View style={{flex: 1,alignItems: 'center',borderRightColor: '#eee',borderRightWidth: 0.5}}>
                <Text style={{color: '#999',fontSize: 12}}>关注</Text>
                <Text style={{color: '#333',fontSize: 14}}>3</Text>
              </View>
              <View style={{flex: 1,alignItems: 'center',borderRightColor: '#eee',borderRightWidth: 0.5}}>
                <Text style={{color: '#999',fontSize: 12}}>粉丝</Text>
                <Text style={{color: '#333',fontSize: 14}}>0</Text>
              </View>
              <View style={{flex: 1,alignItems: 'center'}}>
                <Icon name="pencil" size={16} color="#999" />
                <Text style={{color: '#999',fontSize: 12}}>我的资料</Text>
              </View>
            </View>
          </View>
          <Menu mdata={this.state.myMessage} />
          <Menu mdata={this.state.myCenetr} />
          <Menu mdata={this.state.settings} />
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
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  user: {
    height: 140,
    borderBottomColor: '#eee',
    borderBottomWidth: 10
  },
  userInfo: {
    flex: 2,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12
  }
})