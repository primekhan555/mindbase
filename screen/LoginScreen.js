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
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
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
import UserAuthServices from './dashboard/Services/UserAuthServices.js';
import DropdownAlert from 'react-native-dropdownalert';
import firebaseService from './dashboard/firebaseService.js';

export default class LoginScreen extends Component //<{}> 
{
  constructor() {
    super();
    this.state = {
      isVisible: true,
      ismail: 0,
      ispasswoed: 0,
      email: '',
      password: '',
      load: false,
    };
  }

  //  async componentDidMount(){ }

  async loginuser() {
    if (this.state.email == '' || this.state.password == '') {
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        'Email and Password not be empty',
      );
      return;
    }
    try {
      this.setState({load: !this.state.load});
      const {data} = await UserAuthServices.UserLogin(
        this.state.email,
        this.state.password,
      );
      console.log(data);
      firebaseService
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => {
          console.log('--------------');
          console.log(error.message);
        });
      await AsyncStorage.setItem('User', JSON.stringify(data.data));
      this.setState({load: !this.state.load});
      this.props.navigation.navigate('BottomNavigator');
    } catch (error) {
      console.log(error);
      console.log(error.data);
      this.dropDownAlertRef.alertWithType(
        'error',
        'Failed',
        'Authentication Failed',
      );
      this.setState({load: !this.state.load});
    }
  }

  render() {
    return (
      <>
        <ScrollView style={styles.SplashScreen_RootView}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <View style={styles.slide}>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',position: 'relative',height:150}}>
              <Image source={require('../assets/MindBase4.png')} style={{width:120,resizeMode: 'contain',marginTop: 30,}}/>
              <Image
                source={require('../assets/bgimage.png')}
                style={{
                  width: 200,
                  margin: 10,
                  resizeMode: 'contain',
                  // justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>

            <Text style={styles.text}>Login</Text>
            <Text style={styles.textlabale}>Please sign in to continue</Text>

            <View
              style={[
                styles.searchSection,
                {
                  elevation: this.state.ismail,
                  shadowOffset: {
                    width: this.state.ismail / 2,
                    height: this.state.ismail,
                  },
                  shadowColor: '#F2F2F2',
                  shadowOpacity: 1,
                },
              ]}>
              <View
                style={{
                  marginRight: 10,
                  justifyContent: 'center',
                  borderRightColor: '#E0E0E0',
                }}>
                <Icon name="mail" size={25} color="#1c2d41" />
              </View>

              <TextInput
                onFocus={() => this.setState({ismail: 20})}
                onBlur={() => this.setState({ismail: 0})}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#201F3E"
                autoCapitalize="none"
                onChangeText={searchString => {
                  this.setState({email: searchString});
                }}
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#e5e8ef',
                width: Dimensions.get('window').width - 40,
                marginLeft: 20,
                marginRight: 20,
                alignItems: 'center',
              }}
            />
            <View
              style={[
                styles.searchSection,
                {
                  elevation: this.state.ispasswoed,
                  shadowOffset: {
                    width: this.state.ispasswoed / 2,
                    height: this.state.ispasswoed,
                  },
                  shadowColor: '#F2F2F2',
                  shadowOpacity: 1,
                },
              ]}>
              <View
                style={{
                  marginRight: 10,
                  justifyContent: 'center',
                  borderRightColor: '#E0E0E0',
                }}>
                <Icon name="lock" size={25} color="#1c2d41" />
              </View>

              <TextInput
                onFocus={() => this.setState({ispasswoed: 20})}
                onBlur={() => this.setState({ispasswoed: 0})}
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#201F3E"
                onChangeText={searchString => {
                  this.setState({password: searchString});
                }}
                underlineColorAndroid="transparent"
              />
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#e5e8ef',
                width: Dimensions.get('window').width - 40,
                marginLeft: 20,
                marginRight: 20,
                alignItems: 'center',
              }}
            />

            <TouchableHighlight underlayColor="#FFFFF">
              <Text
                style={{
                  color: '#878788',
                  fontSize: 15,
                  marginLeft: 20,

                  marginTop: 20,
                }}>
                Forget Password?
              </Text>
            </TouchableHighlight>

            <View style={styles.slide_login}>
              {this.state.load ? (
                <ActivityIndicator size="large" color="#201F3E" />
              ) : (
                <TouchableOpacity
                  underlayColor="#FFFFF"
                  onPress={() => this.loginuser()}>
                  <Image
                    source={require('../assets/login.png')}
                    style={{
                      width: Dimensions.get('window').width - 40,
                      resizeMode: 'contain',
                      marginTop: 30,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={{marginRight: 20}}>
              <Text style={{color: '#959da5', textAlign: 'right'}}>
                Don't Have an account ?{' '}
                <Text
                  style={{color: '#000'}}
                  onPress={() =>
                    this.props.navigation.navigate('SignupScreen')
                  }>
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>

          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </ScrollView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  SplashScreen_RootView: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  slide: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide_login: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 30,
  },
  textlabale: {
    color: '#b2b3b2',
    fontSize: 15,

    marginLeft: 30,
    marginBottom: 30,
  },
  text_foget: {
    color: '#f6585d',
    fontSize: 15,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6585d',
    flex: 1,
  },
  searchSection: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 13,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  input: {
    paddingVertical: 0,
    marginLeft: 2,
    flex: 1,
    backgroundColor: '#fff',
    color: '#424242',
  },

  cardView_InsideText: {
    height: 55,
    fontSize: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rowbutton: {
    marginTop: 30,
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
