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
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler'


export default class SwiperScreen extends Component
{
  constructor(){
    super();
    this.state={
    isVisible : true,
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
          <Swiper navigation={this.props.navigation} title={"Shift your thinking"} navigate={true}>
                {/* First screen */}
                <View style={styles.slide}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                            backgroundColor: "#fff",
                            margin:15,
                            borderRadius:10,
                            elevation:2,
                            width: (Dimensions.get('window').width)-30,
                            shadowOffset: { width: 5, height: 10 },
                            shadowColor: '#F2F2F2',
                            shadowOpacity: 1,
                            padding:10}}>

                      <Text style={{fontSize:18,color:'#000',justifyContent:'center',alignItems: 'center',fontWeight:"bold"}}>
                        1.Allow, Don't Judge
                      </Text>
                      <Text style={{fontSize:15,color:'#97a0a8',justifyContent:'center',alignItems: 'center',lineHeight: 25,}}>

                        This is not just about judging your thoughts, this is about allowing them. What we resist persists. When you allow yourself to observe your thoughts, you create a space to manifest something that does not already exist. Allowing opens up the flow and creativity of new possibilities.
                        {'\n\n'}
                        Take a minute to observe your current thoughts.
                      </Text>
                  </View>
                  <View style={{justifyContent:'center',alignItems: 'center'}}>
                  <Image source={require("../../assets/slide_image1.png")} style={{selfAlign:"center", height: 270, resizeMode: 'contain' ,marginTop:5}} />
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
                            elevation:2,
                            width: (Dimensions.get('window').width)-30,
                            shadowOffset: { width: 5, height: 10 },
                            shadowColor: '#F2F2F2',
                            shadowOpacity: 1,
                            padding:10}}>

                      <Text style={{fontSize:18,color:'#000',justifyContent:'center',alignItems: 'center',fontWeight:"bold"}}>
                      2.  Ask A Question
                      </Text>
                      <Text style={{fontSize:15,color:'#97a0a8',justifyContent:'center',alignItems: 'center',lineHeight: 25,}}>

                        Asking yourself the right questions instead of judging, opens up a space for you to receive new information that you may not have considered or allowed previously. Ask: What is possible here? What is good about this? What do I know that I need to know to make this work beneficially in my life? How does it get any better than this?
                        {'\n\n'}
                        The answers may not come immediately, and that's okay. The point is you offered something different for your mind to focus on.
                        {'\n\n'}
                        Take a minute to ask yourself these questions .
                        You might be surprised on what you come up with.

                      </Text>
                  </View>
                  <View style={{justifyContent:'center',alignItems: 'center'}}>
                  <Image source={require("../../assets/slide_image2.png")} style={{height: 270, resizeMode: 'contain' ,marginTop:5}} />
                  </View>
                </ScrollView>
                </View>
                {/* Third screen */}
                <View style={styles.slide}>
                  <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={{
                            backgroundColor: "#fff",
                            margin:15,
                            borderRadius:10,
                            elevation:2,
                            width: (Dimensions.get('window').width)-40,
                            shadowOffset: { width: 5, height: 10 },
                            shadowColor: '#F2F2F2',
                            shadowOpacity: 1,
                            padding:10}}>

                      <Text style={{fontSize:18,color:'#000',justifyContent:'center',alignItems: 'center',fontWeight:"bold"}}>
                      3. Write it Down
                      </Text>
                      <Text style={{fontSize:15,color:'#97a0a8',justifyContent:'center',alignItems: 'center',lineHeight: 25,}}>

                      Write down the automatic thoughts you experienced when you felt the mood. The most significant of these are your "hot thoughts."
                      {'\n\n'}
                      This exercise will shine a light on everything that is in the way of your progress and will lessen its hold on you, allowing you to receive more of what you do wan
                      </Text>
                  </View>
                  <View style={{justifyContent:'center',alignItems: 'center'}}>
                  <Image source={require("../../assets/slide_image3.png")} style={{height: 260,width:300, resizeMode: 'contain' ,marginTop:10}} />
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
                            width: (Dimensions.get('window').width)-30,
                            shadowOffset: { width: 5, height: 10 },
                            shadowColor: '#F2F2F2',
                            shadowOpacity: 1,
                            padding:10}}>

                      <Text style={{fontSize:18,color:'#000',justifyContent:'center',alignItems: 'center',fontWeight:"bold"}}>
                      4. Visualize What You Want
                      </Text>
                      <Text style={{fontSize:15,color:'#97a0a8',justifyContent:'center',alignItems: 'center',lineHeight: 25,}}>

                      Use visualization to see your worries and concerns, allow them to unfold in your mind's eye without judgement. Thank them for showing you what is really going on.
                      {'\n\n'}
                      Play a new scene out in your mind of a situation without those issues. The subconscious mind does not know the difference between real and imagined, which is why this works.
                      {'\n\n'}
                      Take a minute to think about what you want and what's important to you right now
                      </Text>
                  </View>
                  <View style={{justifyContent:'center',alignItems: 'center'}}>
                  <Image source={require("../../assets/slide_image4.png")} style={{height: 270, resizeMode: 'contain' ,marginTop:5}} />
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
                            width: (Dimensions.get('window').width)-30,
                            shadowOffset: { width: 5, height: 10 },
                            shadowColor: '#F2F2F2',
                            shadowOpacity: 1,
                            padding:10}}>

                      <Text style={{fontSize:18,color:'#000',justifyContent:'center',alignItems: 'center',fontWeight:"bold"}}>
                      5. Identify Fair & Balanced Thoughts
                      </Text>
                      <Text style={{fontSize:15,color:'#97a0a8',justifyContent:'center',alignItems: 'center',lineHeight: 25,}}>

                      By this stage, you've looked at both sides of the situation. You should now have the information you need to take a fair, balanced view of what happened.
                      {'\n\n'}
                      The situation might feel different by now or it might not, both are okay. Understanding distortions that apply to either thought  allow you to replace challenges with something more reasonable or realistic.
                      {'\n\n'}
                      Take a moment to think about  your thoughts and feelings.
                      </Text>
                  </View>
                  <View style={{justifyContent:'center',alignItems: 'center'}}>
                  <Image source={require("../../assets/slide_image5.png")} style={{height: 270, resizeMode: 'contain' ,marginTop:5}} />
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
                            width: (Dimensions.get('window').width)-30,
                            shadowOffset: { width: 5, height: 10 },
                            shadowColor: '#F2F2F2',
                            shadowOpacity: 1,
                            padding:10}}>

                      <Text style={{fontSize:18,color:'#000',justifyContent:'center',alignItems: 'center',fontWeight:"bold"}}>
                      6. Monitor Your Present Mood
                      </Text>
                      <Text style={{fontSize:15,color:'#97a0a8',justifyContent:'center',alignItems: 'center',lineHeight: 25,}}>

                      You should now have a clearer view of the situation, and you're likely to find that your mood has improved. Write down how you feel.
                      {'\n\n'}
                      Next, reflect on what you could do about the situation. (By taking a balanced view, the situation may cease to be important, and you might decide that you don't need to take action.)
                      {'\n\n'}
                      If you still feel uncertain, discuss the situation with other people (peer support unit) in your department by clicking  the chat tab or reach out to a counselor who's ready to help by clicking on the Pulse icon in the center of the app and selecting "Get Help".
                      </Text>
                  </View>
                  <View style={{alignItems:'center'}}>
                  <GestureHandlerScrollView horizontal={true} style={{marginTop:10}} showsHorizontalScrollIndicator={false}>
                  <View style=
                        {{
                           flexDirection: 'row',
                           margin:10,}}>

                          <TouchableHighlight underlayColor='#FFFFF' onPress={()=> this.setState({verygood : 1,funny : 0, good : 0,oky : 0, bad : 0,})}>
                            <View style={[styles.flaxview,{borderWidth: this.state.verygood,borderColor: '#201F3E'}]}>
                              <Image source={require("../../assets/verygood.png")} style={{height:70,width:90,resizeMode: 'contain'}} />
                              <Text style={{fontSize: 12,color: "#baa8ff", marginTop:10 ,fontWeight:'bold'}}>Very Good</Text>
                            </View>
                          </TouchableHighlight>

                          <TouchableHighlight underlayColor='#FFFFF' onPress={()=> this.setState({verygood : 0,funny : 0, good : 1,oky : 0, bad : 0,})}>
                            <View style={[styles.flaxview,{borderWidth: this.state.good,borderColor: '#201F3E'}]}>
                              <Image source={require("../../assets/good.png")} style={{height:70,width:90, resizeMode: 'contain',}} />
                              <Text style={{fontSize: 12,color: "#f77d6b", marginTop:10,fontWeight:'bold'}}>Good</Text>
                            </View>
                          </TouchableHighlight>

                          <TouchableHighlight underlayColor='#FFFFF' onPress={()=> this.setState({verygood : 0,funny : 0, good : 0,oky : 1, bad : 0,})}>
                              <View style={[styles.flaxview,{borderWidth: this.state.oky,borderColor: '#201F3E'}]}>
                              <Image source={require("../../assets/okay.png")} style={{height:70,width:90, resizeMode: 'contain',}} />
                              <Text style={{fontSize: 12,color: "#f9b167", marginTop:10,fontWeight:'bold'}}>Oky</Text>
                            </View>
                          </TouchableHighlight>

                          <TouchableHighlight underlayColor='#FFFFF' onPress={()=> this.setState({verygood : 0,funny : 0, good : 0,oky : 0, bad : 1,})}>
                              <View style={[styles.flaxview,{borderWidth: this.state.bad,borderColor: '#201F3E'}]}>
                              <Image source={require("../../assets/bad.png")} style={{height:70,width:90,resizeMode: 'contain',}} />
                              <Text style={{fontSize: 12,color: "#495767", marginTop:10,fontWeight:'bold'}}>Bad</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor='#FFFFF' onPress={()=> this.setState({verygood : 0,funny : 1, good : 0,oky : 0, bad : 0,})}>
                          <View style={[styles.flaxview,{borderWidth: this.state.funny,borderColor: '#201F3E'}]}>
                            <Image source={require("../../assets/verybad.png")} style={{height:70,width:90,resizeMode: 'contain',}} />
                            <Text style={{fontSize: 12,color: "#f77d6b", marginTop:10,fontWeight:'bold'}}>Very Bad</Text>
                          </View>
                        </TouchableHighlight>
                      </View>
                  </GestureHandlerScrollView>
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
      backgroundColor: "#FFFFFF",
    },
  slide: {
    marginTop:30,
    alignItems: "center", // Center horizontally
    justifyContent:'center',
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
