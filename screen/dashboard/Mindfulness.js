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
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  FlatList
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
import { ScrollView as GestureHandlerScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import CountDown from 'react-native-countdown-component';
import Icon from "react-native-vector-icons/Entypo";
import UserAuthServices from './Services/UserAuthServices.js';

export default class Mindfulness extends Component<{}>
{
  constructor(){
    super();
    this.state={
    isVisible : true,
    countdown:30,
    postdata:[],
    load:true,
    user:{
      lastName:"",
      firstName:""
    },

   }
 }

 componentDidMount(){

   this.userdata()
 }

 userdata(){
   AsyncStorage.getItem("User").then((value) => {
        this.setState({
          user:JSON.parse(value)
        })
        this.GetChatList();
     }).done();
 }

 async GetChatList(){
   try {
     console.log(this.state.user.token);
     const { data } = await UserAuthServices.GetMp3All(this.state.user.token)
     console.log(data);
     this.setState({
       postdata:data.data,
       load:false
     })
   }catch(error){
     console.log(error)
     this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
     this.setState({loadmood: !this.state.loadmood})
   }
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
          <View style={{ flexDirection:'row', marginTop:30,alignItems:'center',marginLeft:5}}>
           <TouchableOpacity  onPress={()=> this.props.navigation.goBack() }>
              <Icon
                name='chevron-left'
                size={35}
                color='#1c2d41'
              />
             </TouchableOpacity>
             <Text style={{fontSize: 21,color: "#1c2d41" ,fontWeight:'bold',marginLeft:15}}> Mindfulness For {'\n'} Your Everyday Life </Text>
          </View>
          </View>

          <View style={{borderBottomWidth: 1,borderBottomColor: '#e5e8ef',alignItems:'center', marginTop:10}}/>
          <View style={{ marginTop:10 , marginLeft:15}}>
            <View style={{ flexDirection:'row', marginTop:5,alignItems:'center',marginLeft:5,marginBottom:5}}>
               <View style={{backgroundColor:"#201F3E", padding:5,borderRadius:15}}>
               </View>
               <Text style={{fontSize: 16,color: "#707070" ,fontWeight:'bold',marginLeft:10}}> NEXT TO PLAY </Text>
            </View>

          </View>
          <View style={{borderBottomWidth: 0,borderBottomColor: '#e5e8ef',alignItems:'center', marginTop:10}}/>
          {
            this.state.load?
              <ActivityIndicator size="large" color="#201F3E" />
            :
            <FlatList
              data={this.state.postdata}
              renderItem={({ item ,index }) =>
              <TouchableOpacity underlayColor='#FFFFF' onPress={()=> this.props.navigation.navigate("PlayScreen" ,{item:item,playlist:this.state.postdata,index:index})}>
              <View style={{
                  backgroundColor: "#fff",
                  marginTop:15,
                  marginLeft:10,
                  marginBottom:3,
                  marginRight:10,
                  borderRadius:10,}}>
                      <View style={[styles.navBarnew,{backgroundColor:"#fff",alignItems:"center"}]}>
                         <View style={{flexDirection:'row',alignItems:'center'}}>
                          <View style={{borderRadius:7,overflow:'hidden'}}>
                            <Image source={{uri: `${item.image}`}} style={{width:60, height:60}} />
                            <View style={{
                                       backgroundColor:"#A4ABB350",
                                       position: 'absolute',
                                       alignItems:"center",
                                       justifyContent:"center",
                                       top: 0,
                                       left: 0,
                                       right: 0,
                                       bottom: 0
                                      }}>
                              <Text style={{fontSize:20,color:'#fff',justifyContent:'center',alignItems: 'center',fontWeight:"bold"}} > {index}</Text>
                            </View>
                          </View>
                          <View style={{alignItems:"center"}}>
                           <View style={{marginLeft:20,height:60,width:200,justifyContent: 'center', borderRadius:5,borderWidth:0.7,borderColor:"#DDDBDB",padding:10}}>
                               <Text style={{fontSize:16,color:'#000',justifyContent:'center',alignItems: 'center',}}>
                                 {item.title}
                               </Text>

                               <Text style={{fontSize:12,color:'#A4ABB3',justifyContent:'center',alignItems: 'center',}}>
                                  {item.duration} - {item.voiceType} Voice
                               </Text>

                           </View>
                           </View>
                         </View>
                    </View>
                    </View>
              </TouchableOpacity>
              }
            />
          }
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

  slide: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  SplashScreen_RootView:
  {
   flex: 1,
   backgroundColor:"#fff"
  },
  navBar: {
   height: 70,
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
 },
 navBarnew: {
   marginTop:10,
   width: (Dimensions.get('window').width)-90,
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
    marginRight:10,
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
   paddingVertical:0,
   borderRadius:10,
   borderColor:'#cfd3d9',
   height:50,
   borderWidth: 1,
   padding:20,
   margin:20,
   color: '#424242',
 },

 inputtext: {
   paddingVertical:0,
   borderColor:'#cfd3d9',
   height:50,
   color: '#424242',
 }
});
