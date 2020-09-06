/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationActions,StackActions } from "react-navigation";
import Swiper from "./Swiper";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView as GestureHandlerScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import CountDown from 'react-native-countdown-component';

export default class GroundScreen extends Component<{}>
{
  constructor(){
    super();
    this.state={
    isVisible : true,
    countdown:30,
    breath:false,
    sterch:false,
    mind:false
   }
 }
  Hide_Splash_Screen=()=>{
   this.setState({
     isVisible : false
   });
 }

 componentDidMount(){

  }

   render()
   {
     return (
       <>
       <View style={styles.SplashScreen_RootView}>
         <StatusBar
           backgroundColor = "#FFFFFF"
           barStyle = "dark-content"
         />
          <View style={styles.SplashScreen_ChildView}>
          <Swiper navigation={this.props.navigation} title={"Ground Yourself"} navigate={false}>
                {/* First screen */}
                <View style={styles.slide}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                            backgroundColor: "#fff",
                            margin:15,
                            borderRadius:10,
                            elevation:2,
                            marginTop:30,
                            width: (Dimensions.get('window').width)-30,
                            shadowOffset: { width: 5, height: 10 },
                            shadowColor: '#F2F2F2',
                            shadowOpacity: 1,
                            padding:10}}>

                      <Text style={{fontSize:18,color:'#000',justifyContent:'center',alignItems: 'center',fontWeight:"bold"}}>
                      1. Breathe
                      </Text>
                      <Text style={{fontSize:15,color:'#97a0a8',justifyContent:'center',alignItems: 'center',lineHeight: 25,}}>

                      Try what’s called “Boxed Breathing,” in which you’ll breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds, and so on until you feel grounded.
                      {'\n\n'}
                      You can also tighten your muscles and release them while breathing, focusing on the breath all the way through.
                      </Text>
                  </View>


                  <View style={{justifyContent:'center',alignItems: 'center'}}>

                  <View style={{
                        margin:15,
                        borderRadius:10,
                        justifyContent:'center',
                        width: (Dimensions.get('window').width)-50,
                        padding:5}}>

                      <CountDown
                              until={this.state.countdown}
                              running={this.state.breath}
                              size={50}
                              onFinish={() => alert('Finished')}
                              digitStyle={{backgroundColor: '#FFF'}}
                              digitTxtStyle={{color: '#000',fontSize:55}}
                              timeToShow={['M', 'S']}
                              timeLabels={{m: null, s: null}}
                              showSeparator
                            />
                  </View>

                  <TouchableOpacity style={{
                        backgroundColor: "#201F3E",
                        margin:15,
                        borderRadius:10,
                        selfAlign:'center',
                        justifyContent:'center',
                        elevation:2,
                        width: (Dimensions.get('window').width)-50,
                        padding:10}}
                        onPress={()=> this.setState({breath:!this.state.breath})} >

                        <Text style={{fontSize:18,color:'#fff',justifyContent:'center',alignItems: 'center',fontWeight:"bold",textAlign:"center"}}>
                            {this.state.breath? "Stop Countdown" : "Start Countdown" }
                        </Text>
                  </TouchableOpacity>
                  </View>
                  </ScrollView>
                </View>
                {/* Second screen */}
                <View style={styles.slide}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                            backgroundColor: "#fff",
                            margin:15,
                            borderRadius:10,
                            marginTop:30,
                            elevation:2,
                            width: (Dimensions.get('window').width)-30,
                            shadowOffset: { width: 5, height: 10 },
                            shadowColor: '#F2F2F2',
                            shadowOpacity: 1,
                            padding:10}}>

                      <Text style={{fontSize:18,color:'#000',justifyContent:'center',alignItems: 'center',fontWeight:"bold"}}>
                      2. Stretch
                      </Text>
                      <Text style={{fontSize:15,color:'#97a0a8',justifyContent:'center',alignItems: 'center',lineHeight: 25,}}>

                      Perform light stretches while you focus on your breath as well, paying close attention to the physical sensations that arise from the activity.

                      </Text>
                  </View>
                    <View style={{justifyContent:'center',alignItems: 'center'}}>
                  <Image source={require("../../assets/strech.png")} style={{height: 200, resizeMode: 'contain' ,marginTop:10}} />

                  <View style={{
                        marginTop:15,
                        borderRadius:10,
                        width: (Dimensions.get('window').width)-50,
                        padding:5}}>

                      <CountDown
                              until={this.state.countdown}
                              running={this.state.sterch}
                              size={50}
                              onFinish={() => alert('Fterch')}
                              digitStyle={{backgroundColor: '#FFF'}}
                              digitTxtStyle={{color: '#000',fontSize:55}}
                              timeToShow={['M', 'S']}
                              timeLabels={{m: null, s: null}}
                              showSeparator
                            />
                  </View>

                  <TouchableOpacity style={{
                        backgroundColor: "#201F3E",
                        margin:15,
                        borderRadius:10,
                        elevation:2,
                        width: (Dimensions.get('window').width)-50,
                        padding:10}}
                        onPress={()=> this.setState({sterch:!this.state.sterch})} >

                        <Text style={{fontSize:18,color:'#fff',justifyContent:'center',alignItems: 'center',fontWeight:"bold",textAlign:"center"}}>
                            {this.state.sterch? "Stop Countdown" : "Start Countdown" }
                        </Text>
                  </TouchableOpacity>
                  </View>
                  </ScrollView>
                </View>
                {/* Third screen */}
                <View style={styles.slide}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                            backgroundColor: "#fff",
                            margin:15,
                            borderRadius:10,
                            elevation:2,
                            marginTop:30,
                            width: (Dimensions.get('window').width)-30,
                            shadowOffset: { width: 5, height: 10 },
                            shadowColor: '#F2F2F2',
                            shadowOpacity: 1,
                            padding:10}}>

                      <Text style={{fontSize:18,color:'#000',justifyContent:'center',alignItems: 'center',fontWeight:"bold"}}>
                      3. Write it Down
                      </Text>
                      <Text style={{fontSize:15,color:'#97a0a8',justifyContent:'center',alignItems: 'center',lineHeight: 25,}}>

                      Engage your senses by identifying 5 objects, 4 different sounds, 3 textures, 2 smells, and 1 taste. Focus your awareness on the present moment and bodily sensations.
                      {'\n\n'}
                      This grounding technique gets more effective with practice. The key is to observe your surroundings and draw your attention to the present.
                      </Text>
                  </View>


                <GestureHandlerScrollView horizontal={true} style={{marginTop:10}} showsHorizontalScrollIndicator={false}>
                  <View style=
                        {{
                           flexDirection: 'row',
                           margin:10,}}>

                          <TouchableOpacity underlayColor='#FFFFF'>
                              <Image source={require("../../assets/ear.png")} style={{width: 90, resizeMode: 'contain' ,marginTop:10}} />
                          </TouchableOpacity>

                          <TouchableOpacity underlayColor='#FFFFF'>
                              <Image source={require("../../assets/eye.png")} style={{width: 90, resizeMode: 'contain' ,marginTop:10}} />
                          </TouchableOpacity>

                          <TouchableOpacity underlayColor='#FFFFF'>
                              <Image source={require("../../assets/finger.png")} style={{width: 90, resizeMode: 'contain' ,marginTop:10}} />
                          </TouchableOpacity>

                        <TouchableOpacity underlayColor='#FFFFF'>
                              <Image source={require("../../assets/nose.png")} style={{width: 90, resizeMode: 'contain' ,marginTop:10}} />
                          </TouchableOpacity>
                      </View>
                  </GestureHandlerScrollView>
                  <View style={{justifyContent:'center',alignItems: 'center'}}>
                  <View style={{
                        marginTop:15,
                        borderRadius:10,
                        width: (Dimensions.get('window').width)-50,
                        padding:5}}>

                      <CountDown
                              until={this.state.countdown}
                              running={this.state.mind}
                              size={50}
                              onFinish={() => alert('Fterch')}
                              digitStyle={{backgroundColor: '#FFF'}}
                              digitTxtStyle={{color: '#000',fontSize:55}}
                              timeToShow={['M', 'S']}
                              timeLabels={{m: null, s: null}}
                              showSeparator
                            />
                  </View>

                  <TouchableOpacity style={{
                        backgroundColor: "#201F3E",
                        margin:15,
                        borderRadius:10,
                        elevation:2,
                        width: (Dimensions.get('window').width)-50,

                        padding:10}}
                        onPress={()=> this.setState({mind:!this.state.mind})} >

                        <Text style={{fontSize:18,color:'#fff',justifyContent:'center',alignItems: 'center',fontWeight:"bold",textAlign:"center"}}>
                            {this.state.mind? "Stop Countdown" : "Start Countdown" }
                        </Text>
                  </TouchableOpacity>
                  </View>
                  </ScrollView>
                </View>

                <View style={styles.slide}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                            backgroundColor: "#fff",
                            margin:15,
                            borderRadius:10,
                            elevation:2,
                            marginTop:30,
                            width: (Dimensions.get('window').width)-30,
                            shadowOffset: { width: 5, height: 10 },
                            shadowColor: '#F2F2F2',
                            shadowOpacity: 1,
                            padding:10}}>

                      <Text style={{fontSize:18,color:'#000',justifyContent:'center',alignItems: 'center',fontWeight:"bold"}}>
                      4. Senses
                      </Text>
                      <Text style={{fontSize:15,color:'#97a0a8',justifyContent:'center',alignItems: 'center',lineHeight: 25,}}>

                      Expanding on the previous exercise, focus on a particular sensation that might be standing out in your mind. This is called your "Key feeling" and will allow you to effectively reset your mind to support your grounding process.
                      {'\n\n'}
                      By now you might feel calm and composed. Practicing grounding techniques that focus on the body helps regulate the body periodically and helps you feel more prepared to tackle any challenges that may arise.
                      </Text>
                  </View>
                  <View style={{justifyContent:'center',alignItems: 'center'}}>
                  <Image source={require("../../assets/senses.png")} style={{height: 270, resizeMode: 'contain' ,marginTop:10}} />
                  </View>
                  </ScrollView>
                </View>
              </Swiper>
          </View>
        </View>
       </>
     );
   }
}

const iconStyles = {
  size: 100,
  color: "#f6585d"
};

const styles = StyleSheet.create(
{

  SplashScreen_RootView:
  {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  slide: {
    marginTop:30,
    alignItems: "center", // Center horizontally
    backgroundColor: "#FFFFFF"
  },
  spalsh_image: {
    marginTop:30,
  },
  // Header styles
  header: {
    color: "#f6585d",
    fontFamily: "Avenir",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15
  },
  // Text below header
  text: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 40,
    textAlign: "center"
  },
  SplashScreen_ChildView:
  {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      flex:1,
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
     borderRadius:10,
     margin:5,
     elevation:5,
     padding:10,
     shadowOffset: { width: 5, height: 10 },
     shadowColor: '#F2F2F2',
     shadowOpacity: 1,
    },
});
