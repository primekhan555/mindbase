/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState} from 'react';

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
  Picker,
  ActivityIndicator,
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DropdownAlert from 'react-native-dropdownalert';
import UserAuthServices from './dashboard/Services/UserAuthServices.js';
import firebaseService from './dashboard/firebaseService.js';

export default class SignupScreen extends Component<{}> {
  showDatePicker() {
    this.setState({
      isDatePickerVisible: true,
    });
  }

  handleConfirm(date) {
    var newDate = moment(Date(date)).format('DD-MM-YYYY');
    this.setState({
      date: newDate,
    });
  }

  constructor() {
    super();
    this.state = {
      isVisible: true,
      ismail: 0,
      ispasswoed: 0,
      isfirst: 0,
      islast: 0,
      isyes: true,
      isalmost: false,
      isofficer: 0,
      isnot: false,
      isbirth: false,
      birth: 0,
      date: 'Birthdate',
      isDatePickerVisible: false,
      firstname: '',
      lastname: '',
      oferid: '',
      oficer: '',
      datenam: '',
      email: '',
      phoneno: '',
      password: '',
      load: false,
      departmentvalue: '',
      department: [],
    };
  }

  componentDidMount() {
    console.log('hello');

    this.GetChatList();
  }

  async GetChatList() {
    console.log("333333333333333333333333333333333ddddd");

    try {
      const {data} = await UserAuthServices.GetDepartment();

      var datslit = [];
      console.log("dddddddddddddddddddddddddddddddddd");
      // console.log(data);
      data.data.forEach(function(item) {
        datslit.push(<Picker.Item label={item.department} value={item._id} />);
      });
      this.setState({
        department: datslit,
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

  async registeruser() {
    if (
      this.state.firstname == '' ||
      this.state.lastname == '' ||
      this.state.email == '' ||
      this.state.phoneno == '' ||
      this.state.password == '' ||
      this.state.departmentvalue == ''
    ) {
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        'All Fileds not be empty',
      );
      return;
    }
    if (this.state.password.length < 6) {
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        'Password length must be greater than 6',
      );
      return;
    }
    try {
      this.setState({load: !this.state.load});
      var gender = 'Female';
      if (this.state.isyes) {
        gender = 'Male';
      }
      const {data} = await UserAuthServices.UserRegister(
        this.state.firstname,
        this.state.lastname,
        this.state.oferid,
        this.state.email,
        gender,
        this.state.phoneno,
        this.state.password,
        this.state.datenam,
        this.state.departmentvalue,
      );
      console.log(data);

      firebaseService
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => {
          dispatch(sessionError(error.message));
        });
      this.setState({load: !this.state.load});
      this.props.navigation.navigate('LoginScreen');
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      this.dropDownAlertRef.alertWithType(
        'error',
        'Failed',
        error.response.data.message,
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
            <View style={{position: 'absolute', right: -15, top: 30}}>
              <Image
                source={require('../assets/bgimage.png')}
                style={{
                  width: 200,
                  margin: 10,
                  resizeMode: 'contain',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
            <Text style={styles.text}>Sign Up</Text>
            <Text style={styles.textlabale}>Signup to get Started</Text>

            <View
              style={[styles.searchSection, {elevation: this.state.isfirst}]}>
              <View
                style={{
                  marginRight: 10,
                  justifyContent: 'center',
                  borderRightColor: '#E0E0E0',
                }}>
                <Icon name="user" size={25} color="#1c2d41" />
              </View>

              <TextInput
                onFocus={() => this.setState({isfirst: 20})}
                onBlur={() => this.setState({isfirst: 0})}
                style={styles.input}
                placeholderTextColor="#201F3E"
                placeholder="First Name"
                onChangeText={searchString => {
                  this.setState({firstname: searchString});
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
              style={[styles.searchSection, {elevation: this.state.islast}]}>
              <View
                style={{
                  marginRight: 10,
                  justifyContent: 'center',
                  borderRightColor: '#E0E0E0',
                }}>
                <Icon name="user" size={25} color="#1c2d41" />
              </View>

              <TextInput
                onFocus={() => this.setState({islast: 20})}
                onBlur={() => this.setState({islast: 0})}
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#201F3E"
                onChangeText={searchString => {
                  this.setState({lastname: searchString});
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
              style={{
                width: Dimensions.get('window').width - 40,
                marginLeft: 25,
                marginRight: 20,
                marginTop: 20,
              }}>
              <Text
                style={{fontSize: 14, color: '#7d8092', fontWeight: 'bold'}}>
                Gender
              </Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <TouchableHighlight
                  underlayColor="#FFFFF"
                  onPress={() =>
                    this.setState({isyes: true, isalmost: false, isnot: false})
                  }
                  style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      opacity: this.state.isyes ? 1 : 0.5,
                      alignItems: 'center',
                    }}>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            isyes: true,
                            isalmost: false,
                            isnot: false,
                          })
                        }
                        style={[styles.button, {backgroundColor: '#201F3E'}]}>
                        <View style={styles.checkedButton} />
                      </TouchableOpacity>
                    </View>
                    <Text> Male </Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  underlayColor="#FFFFF"
                  onPress={() =>
                    this.setState({isyes: false, isalmost: true, isnot: false})
                  }
                  style={{flex: 1}}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      opacity: this.state.isalmost ? 1 : 0.5,
                      alignItems: 'center',
                    }}>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            isyes: false,
                            isalmost: true,
                            isnot: false,
                          })
                        }
                        style={[styles.button, {backgroundColor: '#201F3E'}]}>
                        <View style={styles.checkedButton} />
                      </TouchableOpacity>
                    </View>
                    <Text> Female </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>

            <View
              style={[styles.searchSection, {elevation: this.state.isofficer}]}>
              <View
                style={{
                  marginRight: 10,
                  justifyContent: 'center',
                  borderRightColor: '#E0E0E0',
                }}>
                <Icon name="user" size={25} color="#1c2d41" />
              </View>

              <TextInput
                onFocus={() => this.setState({isofficer: 20})}
                onBlur={() => this.setState({isofficer: 0})}
                style={styles.input}
                placeholderTextColor="#201F3E"
                placeholder="Officer Id"
                onChangeText={searchString => {
                  this.setState({oferid: searchString});
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
              style={{
                width: Dimensions.get('window').width - 40,
                marginLeft: 25,
                marginRight: 20,
                marginTop: 10,
              }}>
              <Text
                style={{fontSize: 14, color: '#7d8092', fontWeight: 'bold'}}>
                Department
              </Text>
              <Picker
                style={{
                  width: Dimensions.get('window').width - 70,
                  fontWeight: 'bold',
                }}
                itemStyle={{fontWeight: 'bold'}}
                selectedValue={this.state.departmentvalue}
                onValueChange={value => {
                  this.setState({departmentvalue: value});
                }}>
                <Picker.Item label={'Select Department'} value={''} />
                {this.state.department}
              </Picker>
            </View>

            {/* <View style={{borderBottomWidth: 2,borderBottomColor: '#e5e8ef',width: (Dimensions.get('window').width)-40,marginLeft:20,marginRight:20}}/>
          <TouchableOpacity onPress={()=> this.setState({ isDatePickerVisible:true }) }>
            <View style={{ flexDirection: 'row',
            position: 'relative',
            backgroundColor: "#fff",
            borderRadius: 5,
            padding:13,
            marginLeft:20,
            marginRight:20,
            marginTop:20,
            overflow: "hidden",
            elevation: this.state.ismail,}}>
              <View
              style={{
                  marginRight:10,
                  borderRightColor: '#E0E0E0',
              }}
              >
                <Icon
                 name='calendar'
                 size={25}
                 color='#1c2d41'
               />
              </View>

              <View
                  onFocus={ () => this.setState({ismail:20}) }
                  onBlur={ () => this.setState({ismail:0})}
              >
                <Text style={{color:"#b9bac3",marginLeft:8}}>{this.state.date}</Text>
              </View>
           </View>
           </TouchableOpacity>
         */}

            <View style={[styles.searchSection, {elevation: this.state.birth}]}>
              <View
                style={{
                  marginRight: 10,
                  justifyContent: 'center',
                  borderRightColor: '#E0E0E0',
                }}>
                <Icon name="calendar" size={25} color="#1c2d41" />
              </View>

              <TextInput
                onFocus={() => this.setState({birth: 20})}
                onBlur={() => this.setState({birth: 0})}
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor="#201F3E"
                placeholder="YYYY-MM-DD"
                onChangeText={searchString => {
                  this.setState({datenam: searchString});
                }}
                underlineColorAndroid="transparent"
              />
            </View>

            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="date"
              onConfirm={date => this.handleConfirm(date)}
              onCancel={() => this.setState({isDatePickerVisible: false})}
            />

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
              style={[styles.searchSection, {elevation: this.state.ismail}]}>
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
                placeholderTextColor="#201F3E"
                placeholder="Work Email"
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
              style={[styles.searchSection, {elevation: this.state.isphone}]}>
              <View
                style={{
                  marginRight: 10,
                  justifyContent: 'center',
                  borderRightColor: '#E0E0E0',
                }}>
                <Icon name="phone" size={25} color="#1c2d41" />
              </View>

              <TextInput
                onFocus={() => this.setState({isphone: 20})}
                onBlur={() => this.setState({isphone: 0})}
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor="#201F3E"
                placeholder="Phone No"
                onChangeText={searchString => {
                  this.setState({phoneno: searchString});
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
                {elevation: this.state.ispasswoed},
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
                placeholderTextColor="#201F3E"
                secureTextEntry={true}
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

            {this.state.load ? (
              <ActivityIndicator size="large" color="#201F3E" />
            ) : (
              <View style={styles.slide_login}>
                <TouchableHighlight
                  underlayColor="#FFFFF"
                  onPress={() => this.registeruser()}>
                  <Image
                    source={require('../assets/signup.png')}
                    style={{
                      width: Dimensions.get('window').width - 40,
                      resizeMode: 'contain',
                      marginTop: 30,
                    }}
                  />
                </TouchableHighlight>
              </View>
            )}

            <View style={{marginRight: 20}}>
              <Text style={{color: '#959da5', textAlign: 'right'}}>
                Already have an Account?{' '}
                <Text
                  style={{color: '#000'}}
                  onPress={() => this.props.navigation.goBack()}>
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
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
    marginBottom: 15,
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
    marginTop: 180,
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
    overflow: 'hidden',
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
  button: {
    height: 25,
    width: 25,
    borderRadius: 20,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  checkedButton: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
});
