/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableHighlight,
  TextInput,
  Dimensions
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationActions,StackActions ,createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/Feather";
import MessageBubble from "./MessageBubble.js";
import HomeScreen from "./HomeScreen.js";
import ExtraScreen from "./ExtraScreen.js";
import FeedScreen from "./FeedScreen.js";
import ChatListScreen from "./ChatListScreen.js";
import BottomNavigator from "./BottomNavigator";

const TabNavigator = createBottomTabNavigator(
{
Top: {
  screen: HomeScreen,
  navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/home.png')}
        style={{tintColor: tintColor}}
      />
    ),
  },
},

New: {
  screen: FeedScreen,
  navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/feed.png')}
        style={{tintColor: tintColor}}
      />
    ),
  },
},
Ask: { // big plus icon in the middle
  screen: MessageBubble,
  navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <View
        style={{
          position: 'absolute',
          bottom: 20, // space from bottombar
          height: 58,
          width: 58,
          borderRadius: 58,
          backgroundColor: '#eef1f6',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/pulse_bottom.png')}
          style={{
            justifyContent: 'center',
            alignContent: 'center',
          }}
        />
      </View>
    ),
  },
},
Show: {
  screen: ChatListScreen,
  navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/chat.png')}
        style={{tintColor: tintColor}}
      />
    ),
  },
},
Jobs: {
  screen: ExtraScreen,
  navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/profile.png')}
        style={{tintColor: tintColor,height:15,resizeMode:'center'}}
      />
    ),
  },
},
},
{
tabBarOptions: {
  activeTintColor: '#201F3E',
  inactiveTintColor: '#8997B0',
  showIcon: true,
  showLabel: false,
  style: {
    elevation:10,
    backgroundColor: '#fff',
  },
},
},
);
// export default createAppContainer(TabNavigator)

export default class DashBoardScreen extends Component//<{}>
{
  constructor(){
      super();
      this.state={
      isVisible : true,
      ismail:0,
      ispasswoed:0,
     }
   }
   render()
   {

     return (
       <>
         <View style={styles.slide}>
          <BottomNavigator/>

        </View>
       </>
     );
   }
}
const styles = StyleSheet.create(
{
     slide: {
       flex: 1,
       backgroundColor: "#FFFFFF"
     },
     navBar: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navBarnew: {
      marginTop:10,
      width: (Dimensions.get('window').width)-90,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
      leftContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    rightContainer: {
      flex: 1,
       flexDirection: 'row',
       justifyContent: 'flex-end',
       marginRight:10,
       alignItems: 'center',
    },
    text_header: {
      color: "#000",
      fontSize: 20,
      fontWeight: "bold",
      justifyContent: 'center',
      alignItems: 'center',
    },
});
