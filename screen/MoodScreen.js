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
  Dimensions,
  RadioButton,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  FlatList
} from 'react-native';
// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import Slider from "react-native-slider";
// import { NavigationActions,StackActions } from "react-navigation";
// import Icon from "react-native-vector-icons/Feather";
import { CustomSlider } from './dashboard/components/CustomSlider';
import UserAuthServices from './dashboard/Services/UserAuthServices.js';
import DropdownAlert from 'react-native-dropdownalert';

export default class MoodScreen extends Component//<{}>
{
  constructor() {
    super();
    this.state = {
      verygood: 1,
      funny: 0,
      good: 0,
      oky: 0,
      bad: 0,
      checked: 'first',
      isyes: true,
      isalmost: false,
      isnot: false,
      mooddata: [],
      user: {},
      load: true,
      searchString: "",
      thought: 0,
      stres: 0,
      main_id: ""
    }
  }

  componentDidMount() {
    var that = this;
    this.userdata();
  }

  Chngedesctive() {
    this.setState({
      verygood: 0,
      funny: 0,
      good: 0,
      oky: 0,
      bad: 0,
    })
  }

  userdata() {
    console.log("-----------------");
    AsyncStorage.getItem("User").then((value) => {
      this.setState({
        user: JSON.parse(value)
      })
      this.GetMoodList();
    }).done();
  }

  async GetMoodList() {
    try {
      const { data } = await UserAuthServices.GetMoodList()
      this.setState({
        mooddata: data.data.main,
        dataSource: data.data.extra
      })
      this.setState({ load: !this.state.load })
    } catch (error) {
      console.log(error)
      this.dropDownAlertRef.alertWithType('error', 'Failed', error.response.data.message);
      this.setState({ load: !this.state.load })
    }
  }

  async AddMoodUser() {
    if (this.state.main_id != "") {
      try {
        var rested = " "
        if (this.state.isyes) {
          rested = "yes"
        } else if (this.state.isalmost) {
          rested = "almost"
        } else if (this.state.isnot) {
          rested = "not"
        }
        var thought = " "
        if (this.state.thought == 0) {
          thought = "empty"
        } else if (this.state.thought == 50) {
          thought = "composed"
        } else if (this.state.thought == 100) {
          thought = "racing"
        }
        const { data } = await UserAuthServices.Adddailymood(this.state.user.token, this.state.main_id, rested, thought, this.state.stres, this.state.searchString)
        console.log(data.data);
        this.dropDownAlertRef.alertWithType('success', 'Success', "Mood added success");
        this.props.navigation.pop(1);
        this.props.navigation.navigate("BottomNavigator")
      } catch (error) {
        console.log(error)
        this.dropDownAlertRef.alertWithType('error', 'Failed', error.response.data.message);
      }
    } else {
      this.dropDownAlertRef.alertWithType('error', 'Failed', "Select One mood");
    }
  }

  singleSliderValueCallback = (values) => {
    this.setState({
      stres: values[0]
    })
    console.log(values);
  }
  render() {
    return (
      <>
        <View style={styles.slide}>
          <StatusBar
            backgroundColor="#201F3E"
            barStyle="light-content"
          />

          <Text style={[styles.text, { textAlign: 'center' }]}>Today</Text>
          <Text style={[styles.text, { marginLeft: 30 }]}>Hey,</Text>
          <Text style={styles.textlabale}>how are you feeling?</Text>

          <View style={{ flex: 1, backgroundColor: "#fff", marginTop: 20, borderTopLeftRadius: 40, borderTopRightRadius: 40, overflow: "hidden" }}>
            <ScrollView style={[styles.SplashScreen_RootView, { borderTopLeftRadius: 40, borderTopRightRadius: 40 }]}>
              <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                <ScrollView horizontal={true} style={{ marginTop: 15 }} showsHorizontalScrollIndicator={false}>
                  <View style=
                    {{
                      flexDirection: 'row',
                      margin: 10,
                    }}>

                    {
                      this.state.load ?
                        <View style={{ borderColor: '#201F3E', height: 100, width: 90, alignItems: 'center' }}>
                          <ActivityIndicator size="large" color="#201F3E" />
                        </View>
                        :
                        <FlatList
                          data={this.state.mooddata}
                          horizontal={true}
                          renderItem={({ item }) =>
                            <TouchableOpacity underlayColor='#FFFFF' onPress={() => this.setState({ main_id: item._id, })}>
                              <View style={[styles.flaxview, { borderWidth: (this.state.main_id == item._id) ? 1 : 0, borderColor: '#201F3E' }]}>
                                <Image source={{ uri: `${item.image}` }} style={{ height: 50, width: 50, margin: 5, resizeMode: 'contain', }} />
                                <Text style={{ fontSize: 12, color: `${item.color}`, marginTop: 5, fontWeight: 'bold' }}>{item.name}</Text>
                              </View>
                            </TouchableOpacity>
                          }
                        />
                    }

                  </View>
                </ScrollView>
                <View style={{
                  justifyContent: 'center',
                  backgroundColor: "#fef6f6",
                  margin: 10,
                  elevation: 6,
                  shadowOffset: { width: 5, height: 10 },
                  shadowColor: '#F2F2F2',
                  shadowOpacity: 1,
                  padding: 20
                }}>
                  <Text style={{ fontSize: 16, color: "#000", fontWeight: "bold", }}>Do you feel well rested?</Text>

                  <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <TouchableHighlight underlayColor='#FFFFF' onPress={() => this.setState({ isyes: true, isalmost: false, isnot: false })} style={{ flex: 1, }}>
                      <View style={{ flexDirection: 'row', opacity: this.state.isyes ? 1 : 0.5, alignItems: 'center', }}>
                        <View>
                          <TouchableOpacity
                            onPress={() => this.setState({ isyes: true, isalmost: false, isnot: false })}
                            style={[styles.button, { backgroundColor: '#6255ff' }]}
                          >
                            <View style={styles.checkedButton} />
                          </TouchableOpacity>
                        </View>
                        <Text> Yes </Text>
                      </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor='#FFFFF' onPress={() => this.setState({ isyes: false, isalmost: true, isnot: false })} style={{ flex: 1, }}>
                      <View style={{ flex: 1, flexDirection: 'row', opacity: this.state.isalmost ? 1 : 0.5, alignItems: 'center', }}>
                        <View>
                          <TouchableOpacity
                            onPress={() => this.setState({ isyes: false, isalmost: true, isnot: false })}
                            style={[styles.button, { backgroundColor: '#f77d6b' }]}
                          >
                            <View style={styles.checkedButton} />
                          </TouchableOpacity>
                        </View>
                        <Text> Almost </Text>
                      </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor='#FFFFF' onPress={() => this.setState({ isyes: false, isalmost: false, isnot: true })} style={{ flex: 1, }}>
                      <View style={{ flex: 1, flexDirection: 'row', opacity: this.state.isnot ? 1 : 0.5, alignItems: 'center', }}>
                        <View>
                          <TouchableOpacity
                            onPress={() => this.setState({ isyes: false, isalmost: false, isnot: true })}
                            style={[styles.button, { backgroundColor: '#56dafe' }]}
                          >
                            <View style={styles.checkedButton} />
                          </TouchableOpacity>
                        </View>
                        <Text> Not Really </Text>
                      </View>
                    </TouchableHighlight>

                  </View>
                </View>

                <View style={{
                  justifyContent: 'center',
                  backgroundColor: "#201F3E",
                  margin: 10,
                  elevation: 6,
                  shadowOffset: { width: 5, height: 10 },
                  shadowColor: '#F2F2F2',
                  shadowOpacity: 1,
                  padding: 20
                }}>
                  <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold", }}>Now lets check your stress</Text>
                  <CustomSlider
                    min={0}
                    max={10}
                    LRpadding={40}
                    callback={this.singleSliderValueCallback}
                    single={true}
                  />

                  <Text style={{ fontSize: 16, color: "#fff", textAlign: "center", width: "100%" }}>0 = No stress, 10 = Extremely stressed</Text>
                </View>

                <View style={{
                  justifyContent: 'center',
                  backgroundColor: "#faf9fb",
                  margin: 10,
                  elevation: 6,
                  shadowOffset: { width: 5, height: 10 },
                  shadowColor: '#F2F2F2',
                  shadowOpacity: 1,
                  padding: 20
                }}>
                  <Text style={{ fontSize: 16, color: "#000", fontWeight: "bold", }}>What are your thoughts like?</Text>

                  <Slider
                    step={50}
                    minimumValue={0}
                    maximumValue={100}
                    thumbStyle={{
                      width: 20,
                      height: 20,
                      backgroundColor: '#f77d6b',
                      borderColor: '#f77d6b',
                      borderWidth: 5,
                      borderRadius: 10,
                      shadowColor: 'black',
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 2,
                      shadowOpacity: 0.35,
                    }}
                    trackStyle={{
                      height: 10,
                      borderRadius: 4,
                      backgroundColor: '#e4dcdc',
                      shadowColor: 'black',
                      shadowOffset: { width: 0, height: 1 },
                      shadowRadius: 1,
                      shadowOpacity: 1,
                    }}
                    minimumTrackTintColor="#f77d6b"

                    style={{ width: '100%', marginTop: 8 }}
                    value={this.state.thought}
                    onValueChange={(value) => this.setState({ thought: value })}
                  />

                  <View style={{ flex: 1, flexDirection: 'row', marginTop: 4, }}>

                    <View style={{ flex: 1, }}>
                      <Text style={{ color: "#77818c" }}> Empty </Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#77818c", textAlign: 'center' }}> Composed </Text>
                    </View>

                    <View style={{ flex: 1, }}>
                      <Text style={{ color: "#77818c", textAlign: 'right' }}> Empty </Text>
                    </View>

                  </View>
                </View>

                <View style={{
                  backgroundColor: "#f6fcfe",
                  margin: 10,
                  height: 150,
                  shadowOffset: { width: 5, height: 10 },
                  shadowColor: '#F2F2F2',
                  shadowOpacity: 1,
                  elevation: 6,
                  padding: 20
                }}>
                  <View style={{ borderBottomWidth: 2, borderBottomColor: '#e5e8ef', width: (Dimensions.get('window').width) - 60, alignItems: 'center' }} />
                  <TextInput
                    style={styles.input}
                    multiline={true}
                    placeholder="Add Note.."
                    onChangeText={(searchString) => { this.setState({ searchString }) }}
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>
            </ScrollView>

            <View style={{ alignItems: 'center' }}>
              <TouchableHighlight underlayColor='#FFFFF' onPress={() => { this.AddMoodUser() }}>
                <Image source={require("../assets/submit.png")} style={{ width: (Dimensions.get('window').width) - 40, resizeMode: 'contain', marginBottom: 10 }} />
              </TouchableHighlight>
            </View>
          </View>

          <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

        </View>
      </>
    );
  }
}
const styles = StyleSheet.create(
  {
    SplashScreen_RootView:
    {
      height: (Dimensions.get('window').height),
      flex: 1,
    },
    slide: {
      flex: 1,
      backgroundColor: "#201F3E"
    },
    slide_login: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15
    },
    text: {
      color: "#fff",
      fontSize: 20,

      fontWeight: "bold",
      marginTop: 20
    },
    textlabale: {
      color: "#fff",
      fontSize: 15,

      marginLeft: 30,
    },
    flaxview: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#fff",
      borderRadius: 10,
      margin: 5,
      elevation: 5,
      shadowOffset: { width: 5, height: 10 },
      shadowColor: '#F2F2F2',
      shadowOpacity: 1,
      padding: 10
    },
    button: {
      height: 25,
      width: 25,
      borderRadius: 20,
      borderWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 5
    },
    checkedButton: {
      width: 25,
      height: 25,
      borderRadius: 20,
    }
  });
