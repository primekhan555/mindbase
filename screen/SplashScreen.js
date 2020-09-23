/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  AsyncStorage,
  ImageBackground,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationActions, StackActions} from 'react-navigation';
import OneSignal from 'react-native-onesignal';
import firebaseService from './dashboard/firebaseService.js';
import UserAuthServices from './dashboard/Services/UserAuthServices.js';
import DropdownAlert from 'react-native-dropdownalert';
import moment from 'moment';

export default class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  async componentDidMount() {
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init('9928e333-258c-4ac8-b0b2-80b8ef117ba7', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    var that = this;

    var value = await AsyncStorage.getItem('User');

    // firebaseService.auth()
    //  .signInWithEmailAndPassword("test2@test.com", "123123")
    //  .catch(error => {
    //     console.log("--------------")
    //    console.log(error.message);
    //  })
    // let unsubscribe = firebaseService.auth()
    // .onAuthStateChanged(user => {
    //   if (user) {
    //     console.log(user);
    //   }else{
    //     console.log("no user");
    //   }
    // })
    //
    // firebaseService.auth()
    //    .signOut()
    //    .then(() => {
    //      console.log("log sucess");
    //    })
    //    .catch(error => {
    //      console.log(error.message)
    //    })
    setTimeout(function() {
      console.log('inner');

      if (value == null) {
        console.log('inner');
        that.props.navigation.pop(1);
        // that.props.navigation.navigate("DashBoardScreen");
        that.props.navigation.navigate('LoginScreen');
      } else {
        // console.log("login")

        that.GetMoodList(value);
        //
      }
    }, 2000);
  }

  async GetMoodList(user) {
    try {
      var value = JSON.parse(user);
      console.log(user['token']);
      const {data} = await UserAuthServices.GetActivityMood(
        value.token,
        moment().format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      );
      console.log(data);
      if (data.data[0].isMood) {
        this.props.navigation.pop(1);
        this.props.navigation.navigate('BottomNavigator');
      } else {
        this.props.navigation.pop(1);
        this.props.navigation.navigate('MoodScreen');
        // this.props.navigation.navigate('LoginScreen');
      }
      console.log(data.data.length);
    } catch (error) {
      console.log(error);
      this.dropDownAlertRef.alertWithType(
        'error',
        'Failed',
        error.response.data.message,
      );
      this.setState({load: !this.state.load});
      this.props.navigation.pop(1);
      this.props.navigation.navigate('BottomNavigator');
    }
    console.log(this.state.user);
  }

  render() {
    return (
      <>
        <View style={styles.MainContainer}>
          <StatusBar backgroundColor="#fff" barStyle="light-content" />

          <Image
            style={{width: 270}}
            resizeMode="contain"
            source={require('../assets/spash.png')}
          />
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
