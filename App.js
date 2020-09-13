/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationActions,StackActions, createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from "./screen/SplashScreen.js";
import LoginScreen from "./screen/LoginScreen.js";
import SignupScreen from "./screen/SignupScreen.js";
import MoodScreen from "./screen/MoodScreen.js";
import BottomNavigator from "./screen/dashboard/BottomNavigator.js";
import DashBoardScreen from "./screen/dashboard/DashBoardScreen.js";
import AddMoodScreen from "./screen/dashboard/AddMoodScreen.js";
import ChatScreen from "./screen/dashboard/ChatScreen.js";
import AddPostScreen from "./screen/dashboard/AddPostScreen.js";
import SwiperScreen from "./screen/dashboard/SwiperScreen.js";
import GroundScreen from "./screen/dashboard/GroundScreen.js";
import TakeStepScreen from "./screen/dashboard/TakeStepScreen.js";
import FinalScreen from "./screen/dashboard/FinalScreen.js";
import TakeBreath from "./screen/dashboard/TakeBreath.js";
import ProfileScreen from "./screen/dashboard/ProfileScreen.js"
import Mindfulness from "./screen/dashboard/Mindfulness.js"
import PlayScreen from "./screen/dashboard/PlayScreen.js"
import FeedBackScreen from "./screen/dashboard/FeedBackScreen.js";
import NotificationList from "./screen/dashboard/NotificationList.js"
import Profilefullview from "./screen/dashboard/Profilefullview.js"
import EditProfile from "./screen/dashboard/EditProfile.js"
import EditpostScreen from "./screen/dashboard/EditpostScreen.js"
import ChatListScreen from './screen/dashboard/ChatListScreen';

console.disableYellowBox = true;
const App = createAppContainer(createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    LoginScreen: { screen: LoginScreen },
    SignupScreen: { screen: SignupScreen },
    MoodScreen: { screen: MoodScreen },
    DashBoardScreen:{ screen: DashBoardScreen },
    BottomNavigator:{ screen: BottomNavigator },
    AddMoodScreen:{ screen: AddMoodScreen },
    AddPostScreen:{ screen: AddPostScreen },
    ChatScreen:{ screen: ChatScreen },
    SwiperScreen:{ screen: SwiperScreen },
    FinalScreen:{ screen: FinalScreen },
    GroundScreen:{ screen: GroundScreen },
    TakeStepScreen:{screen:TakeStepScreen},
    TakeBreath:{screen:TakeBreath},
    ProfileScreen:{screen:ProfileScreen},
    Mindfulness:{screen:Mindfulness},
    PlayScreen:{screen:PlayScreen},
    FeedBackScreen:{screen:FeedBackScreen},
    NotificationList:{screen:NotificationList},
    Profilefullview:{screen:Profilefullview},
    EditProfile:{screen:EditProfile},
    EditpostScreen:{screen:EditpostScreen},
    ChatListScreen:{screen:ChatListScreen},
  },
  {
    // initialRouteKey:'DashBoardScreen',
    headerMode: 'none',
    gesturesEnabled: true,
    defaultNavigationOptions: {
      gestureEnabled: false,
    }
  }
));

export default App
