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
  TextInput,
  Dimensions,
  TouchableOpacity,
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
import { LineChart } from 'react-native-chart-kit';
import Animated, { Easing } from "react-native-reanimated";
import { runTiming } from "react-native-redash";
import CountDown from 'react-native-countdown-component';
import CircleSlider from './components/CircleSlider';



export default class TakeBreath extends Component
{
  constructor() {
    super();
    this.state = {
      isVisible: true,
      ismail: 0,
      ispasswoed: 0,
      isVisible: true,
      countdown: 90,
      breath: false,
      sterch: false,
      mind: false,
      till: 0,
      loader: [<CircleSlider
        value={90}
      />]
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.navigation.goBack()
    return true;
  }

  loadding(value) {
    this.setState({
      till: value,
      loader: [<CircleSlider
        value={(360 * (90 - value)) / 100}
      />]
    });
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
          <View style={styles.navBar}>

            <View style={styles.leftContainer}>
              <TouchableOpacity underlayColor='#FFFFF' onPress={() => this.props.navigation.goBack()}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon
                    name='chevron-left'
                    size={30}
                    color='#1c2d41'
                  />
                  <Text style={{ fontSize: 25, color: '#000', justifyContent: 'center', fontWeight: 'bold', alignItems: 'center', textAlign: 'center' }}>
                    Take Breth
                           </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={{ fontSize: 18, color: '#000', justifyContent: 'center', margin: 20 }}>
            Slow down and take a breath
                </Text>

          <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, bottom: 100, right: 0, left: 0, top: 70 }}>
            <Image source={require("../../assets/elipse.png")} style={{ height: 220, width: 220, alignItems: 'center', justifyContent: 'center' }} />
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, bottom: 100, right: 0, left: 0, top: 70 }}>

            <CountDown
              until={this.state.countdown}
              running={this.state.breath}
              size={25}
              onFinish={() => alert('Finished')}
              onChange={(value) => {
                this.loadding(value);
              }}
              digitStyle={{ backgroundColor: 'tracparent' }}
              digitTxtStyle={{ color: '#fff', fontSize: 40 }}
              timeToShow={['M', 'S']}
              timeLabels={{ m: null, s: null }}
              showSeparator
              separatorStyle={{ color: "#fff" }}
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, bottom: 100, right: 0, left: 0, top: 70 }}>
            {this.state.loader[0]}
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 10, right: 0, left: 0 }}>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity>
                <Image source={require("../../assets/filter.png")} style={{ height: 180, width: 70, alignItems: 'center', justifyContent: 'center', margin: 10 }} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ breath: !this.state.breath })}>

                {
                  this.state.breath ?
                    <Image source={require("../../assets/play.png")} style={{ height: 180, width: 70, alignItems: 'center', justifyContent: 'center', margin: 10 }} />
                    :
                    <Image source={require("../../assets/pouse.png")} style={{ height: 180, width: 70, alignItems: 'center', justifyContent: 'center', margin: 10 }} />
                }

              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ countdown: 90 })}>
                <Image source={require("../../assets/reset.png")} style={{ height: 180, width: 70, alignItems: 'center', justifyContent: 'center', margin: 10 }} />
              </TouchableOpacity>

            </View>

          </View>

        </View>
      </>
    );
  }
}
const styles = StyleSheet.create(
  {
    slide: {
      flex: 1,
      backgroundColor: "#f9f9f9",
      paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    SplashScreen_RootView:
    {
      marginBottom: 150
    },
    navBar: {
      height: 70,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navBarnew: {
      marginTop: 10,
      width: (Dimensions.get('window').width) - 90,
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
      color: "#000",
      fontSize: 20,
      fontWeight: "bold",
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
