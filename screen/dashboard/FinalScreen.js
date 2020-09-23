/**
 * Sample React Native App
 * htps://github.com/facebook/react-native
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
  TouchableHighlight,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Linking,
  AsyncStorage,
  BackHandler,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationActions, StackActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import {LineChart} from 'react-native-chart-kit';
import UserAuthServices from './Services/UserAuthServices.js';
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: 'rgba(26, 255, 146)',
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export default class FinalScreen extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: true,
      ismail: 0,
      ispasswoed: 0,
      user: {
        lastName: '',
        firstName: '',
      },
      listdata: {
        smsNo: '',
        callNo: '',
        smsText: '',
      },
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.userdata();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    this.props.navigation.goBack();
    return true;
  }

  userdata() {
    AsyncStorage.getItem('User')
      .then(value => {
        this.setState({
          user: JSON.parse(value),
        });
        this.GetChatList();
      })
      .done();
  }

  async GetChatList() {
    try {
      console.log(this.state.user._id);
      this.setState({loadmood: true});
      const {data} = await UserAuthServices.GetHelp(this.state.user.token);
      this.setState({
        listdata: data.data,
      });
    } catch (error) {
      console.log(error);
      this.dropDownAlertRef.alertWithType(
        'error',
        'Failed',
        error.response.data.message,
      );
      this.setState({loadmood: !this.state.loadmood});
    }
  }

  render() {
    // let sampleData = [30, 200, 170, 250, 10]
    return (
      <>
        <View style={styles.slide}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <View style={styles.navBar}>
            <View style={styles.leftContainer}>
              <TouchableHighlight
                underlayColor="#FFFFF"
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="chevron-left" size={35} color="#1c2d41" />
              </TouchableHighlight>
            </View>

            <Text style={{fontSize: 25, fontWeight: 'bold', marginLeft: 10}} />

            <View style={styles.rightContainer} />
          </View>

          <Text
            style={{
              fontSize: 30,
              color: '#000',
              justifyContent: 'center',
              fontWeight: 'bold',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            We're here for you
          </Text>

          <Text
            style={{
              fontSize: 20,
              color: '#77818D',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Connect With a live
          </Text>

          <Text
            style={{
              fontSize: 20,
              color: '#77818D',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Counselor for immmiediate help
          </Text>

          <Text
            style={{
              fontSize: 20,
              marginTop: 20,
              color: '#A4ABB3',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            Swipe left to call or
            {'\n'}
            right to text
          </Text>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 0,
              bottom: 0,
            }}>
            <Image
              source={require('../../assets/MindBase4.png')}
              style={{
                width: Dimensions.get('window').width,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: -30,
            }}>
            <TouchableOpacity
              onPress={async () => {
                const {data} = await UserAuthServices.GetChatUser(
                  this.state.user.token,
                  this.state.user.department._id,
                );
                await UserAuthServices.AddCallMessage(
                  this.state.user.token,
                  '0',
                  '1',
                );
                const item = data.data[0];
                this.props.navigation.navigate('ChatScreen', {
                  refid: item._id,
                  name: item.logo
                    ? 'Department ' + item.department
                    : item.firstName + ' ' + item.lastName,
                  item: item,
                });
                // this.props.navigation.navigate('ChatListScreen',{myprop:this})
                // let phoneNumber = '';
                // let phone = this.state.listdata.smsNo
                // if (Platform.OS !== 'android') {
                //   phoneNumber = `sms:${phone}?body=${this.state.listdata.smsText}`;
                // }
                // else {
                //   console.log("asas");
                //   phoneNumber = `sms:${phone}?body=${this.state.listdata.smsText}`;
                // }
                // Linking.openURL(phoneNumber)
              }}>
              <Image
                source={require('../../assets/msg_icon.png')}
                style={{width: 100, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              left: -30,
              top: 0,
              bottom: 0,
            }}>
            <TouchableOpacity
              onPress={async () => {
                await UserAuthServices.AddCallMessage(
                  this.state.user.token,
                  '1',
                  '0',
                );

                let phoneNumber = '';
                let phone = this.state.listdata.callNo;
                if (Platform.OS !== 'android') {
                  phoneNumber = `telprompt:${phone}`;
                } else {
                  console.log('asas');
                  phoneNumber = `tel:${phone}`;
                }
                Linking.openURL(phoneNumber);
              }}>
              <Image
                source={require('../../assets/callmain.png')}
                style={{width: 100, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: Dimensions.get('window').width / 1.5,
              paddingStart: 50,
              paddingEnd: 50,
              backgroundColor: 'white',
            }}>
            <Text style={{textAlign: 'center', color: 'grey'}}>
              To ensure privacy, all calls are confidential with a counselor who
              is not part of the your Police Department.
            </Text>
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  SplashScreen_RootView: {
    marginBottom: 150,
  },
  navBar: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBarnew: {
    marginTop: 10,
    width: Dimensions.get('window').width - 90,
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
    marginRight: 10,
    alignItems: 'center',
  },
  text_header: {
    flex: 1,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 0,
    borderRadius: 10,
    borderColor: '#cfd3d9',
    height: 50,
    borderWidth: 1,
    padding: 20,
    margin: 20,
    color: '#424242',
  },
});
