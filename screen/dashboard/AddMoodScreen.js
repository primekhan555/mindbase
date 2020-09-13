/**
 * Sample React Native App
 * htps://github.com/facebook/react-native
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
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  BackHandler
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationActions, StackActions } from "react-navigation";
import Icon from "react-native-vector-icons/Feather";
import LineChart from "./src/line-chart";
import StepIndicator from 'react-native-step-indicator';
import DropdownAlert from 'react-native-dropdownalert';
import UserAuthServices from './Services/UserAuthServices.js';
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: 'rgba(26, 255, 146)',
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const labels = ["M", "T", "W", "T", "F", "S", "S"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}

export default class AddMoodScreen extends Component//<{}>
{
  constructor() {
    super();
    this.state = {
      isVisible: true,
      ismail: 0,
      ispasswoed: 0,
      currentPosition: 0,
      dataSource: [],
      mooddata: [],
      main_id: "",
      extramood: [],
      load: true
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    this.userdata();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.navigation.pop(1)
    return true;
  }

  userdata() {
    AsyncStorage.getItem("User").then((value) => {
      this.setState({
        user: JSON.parse(value)
      })
      this.GetMoodList();
    }).done();
  }

  addectra(idstate) {
    if (this.state.extramood.indexOf(idstate) == -1) {
      this.setState({
        extramood: [...this.state.extramood, idstate]
      })
    } else {
      var array = [...this.state.extramood]; // make a separate copy of the array
      var index = array.indexOf(idstate)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ extramood: array });
      }
    }
  }

  async GetMoodList() {
    try {
      const { data } = await UserAuthServices.GetMoodList()
      this.setState({
        mooddata: data.data.main,
        dataSource: data.data.extra
      })
      console.log(data.data);
      this.setState({ load: !this.state.load })
    } catch (error) {
      console.log(error)
      this.dropDownAlertRef.alertWithType('error', 'Failed', error.response.data.message);
      this.setState({ load: !this.state.load })
    }
    console.log(this.state.user);

  }


  async AddMoodUser() {
    if (this.state.main_id != "") {
      try {
        const { data } = await UserAuthServices.AddMooduser(this.state.user.token, this.state.main_id, this.state.extramood)
        console.log(data.data);
        this.dropDownAlertRef.alertWithType('success', 'Success', "Mood added success");
        this.props.navigation.pop(1)
      } catch (error) {
        console.log(error)
        this.dropDownAlertRef.alertWithType('error', 'Failed', error.response.data.message);
      }
    } else {
      this.dropDownAlertRef.alertWithType('error', 'Failed', "Select One mood");
    }
  }

  render() {
    let sampleData = [30, 200, 170, 250, 10]
    return (
      <>
        <View style={styles.slide}>
          <StatusBar
            backgroundColor="#fff"
            barStyle="dark-content"
          />
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginTop: 35, marginLeft: 10 }}>
              <TouchableOpacity underlayColor='#FFFFF' onPress={() => this.props.navigation.pop(1)}>
                <Icon
                  name='arrow-left'
                  size={25}
                  color='#1c2d41'
                />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{ fontSize: 20, color: "#000", marginTop: 30, fontWeight: 'bold', marginLeft: 25 }}>How do you feel{"\n"}right now?</Text>
              <Text style={{ fontSize: 16, color: "#97a0a8", marginTop: 10, fontWeight: 'bold', marginLeft: 25 }}>Select as many as apply?</Text>
            </View>
          </View>


          <View style={{ alignItems: 'center' }}>
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
                            <Image source={{ uri: `${item.image}` }} style={{ height: 60, width: 80, margin: 5, resizeMode: 'contain', }} />
                            <Text style={{ fontSize: 12, color: "#baa8ff", marginTop: 10, fontWeight: 'bold' }}>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                      }
                    />
                }

              </View>
            </ScrollView>
          </View>

          <View style={{ flex: 1, backgroundColor: "#f9f9f9", borderTopLeftRadius: 40, borderTopRightRadius: 40, overflow: "hidden" }}>
            <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, overflow: "hidden", justifyContent: 'center', alignItems: 'center', }}>
              {
                this.state.load ?
                  <View style={{ borderColor: '#201F3E', height: 100, width: 90, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#201F3E" />
                  </View>
                  :
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.dataSource}
                    renderItem={({ item }) => (
                      <TouchableOpacity underlayColor='#FFFFF' onPress={() => { this.addectra(item._id) }}>
                        <View style={[styles.flaxview, { borderWidth: (this.state.extramood.indexOf(item._id) !== -1) ? 1 : 0, borderColor: '#201F3E' }]}>
                          <Image source={{ uri: `${item.image}` }} style={{ height: 60, width: 80, margin: 5, resizeMode: 'contain', }} />
                          <Text style={{ fontSize: 12, color: "#000", marginTop: 10, fontWeight: 'bold' }}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    //Setting the number of column
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                  />
              }
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity underlayColor='#FFFFF' onPress={() => this.AddMoodUser()}>
              <Image source={require("../../assets/submit.png")} style={{ width: (Dimensions.get('window').width) - 40, resizeMode: 'contain', marginBottom: 10 }} />
            </TouchableOpacity>
          </View>

          <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

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
    SplashScreen_RootView:
    {

    },
    navBar: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text_header: {
      color: "#000",
      fontSize: 20,
      fontWeight: "bold",
      justifyContent: 'center',
      alignItems: 'center',
    },

    flaxview: {
      alignItems: 'center',
      backgroundColor: "#fff",
      borderRadius: 10,
      margin: 5,
      elevation: 4,
      padding: 10,
      shadowOffset: { width: 5, height: 10 },
      shadowColor: '#F2F2F2',
      shadowOpacity: 1,

    },
  });
