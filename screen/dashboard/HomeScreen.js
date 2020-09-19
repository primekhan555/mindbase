/**
 * Sample React Native App
 * htps://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , { Component } from 'react';

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
  Animated,
  Easing,
  Platform,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  RefreshControl
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationActions,StackActions } from "react-navigation";
import Icon from "react-native-vector-icons/Feather";
import LineChart from "./src/line-chart";
import StepIndicator from 'react-native-step-indicator';
import DropdownAlert from 'react-native-dropdownalert';
import UserAuthServices from './Services/UserAuthServices.js';
import * as firebase from 'firebase'
import { firebaseConfig } from './firebase'
import Moment from 'moment';
import firebaseService from './firebaseService.js'
import { sendMessage } from './actions.js'
import moment from 'moment';

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

const labels = ["M","T","W","T","F","S","S"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
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

export default class HomeScreen extends Component//<{}>
{
  constructor(){
      super();
      this.state={
      isVisible : true,
      ismail:0,
      ispasswoed:0,
      currentPosition: 0,
      sday:false,
      fday:true,
      mday:false,
      loadmood:true,
      mooddata:[],
      loadmap:true,
      user:{
        lastName:"",
        firstName:""
      },
      lable: ["1", "2", "3", "4", "5", "6","7","8","9","10","11","12","13","14"],
      mapdata:[
            30,
            20,
            40,
            30,
            40,
            30,
            50,
            40,
            30,
            30,
            20,
            10,
            10,
            30
      ],
      mapdata7:[50,50,50,50,50,50,50],
      mapdata14:[50,50,50,50,50,50,50,50,50,50,50,50,50,50],
      data7:[],
      progress:["M","T","W","T","F","S","S"],
      x: new Animated.Value(-Dimensions.get('window').width),
      y: new Animated.Value(-Dimensions.get('window').height),
      postdata:[]
     }
    this.animatedValue = new Animated.Value(0)
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


   componentDidMount() {
     var thiat = this
     // let currentUser = firebaseService.auth().currentUser
     // let createdAt = new Date().getTime()
     // var chatMessage = {
     //   refid:"sender2",
     //   text: "hey bolo",
     //   createdAt: createdAt,
     //   id: currentUser.uid,
     // }


     // const FIREBASE_REF_SEND_MESSAGES = firebaseService.database().ref("sender2")
     //
     // FIREBASE_REF_MESSAGES.push().set(chatMessage, (error) => {
     //   if (error) {
     //     console.log("-------------sdqeqweqweqweqwasdasdase----------");
     //     console.log(error.message);
     //   } else {
     //     console.log("-------------sdqeqweqweqweqwasdasdase----------");
     //     console.log("done");
     //   }
     // })
     //
     // chatMessage = {
     //   refid:currentUser.uid,
     //   text: "hey bolo",
     //   createdAt: createdAt,
     //   id: "sender2",
     // }
     //
     // FIREBASE_REF_SEND_MESSAGES.push().set(chatMessage, (error) => {
     //   if (error) {
     //     console.log("-------------sdqeqweqweqweqwasdasdase----------");
     //     console.log(error.message);
     //   } else {
     //     console.log("-------------sdqeqweqweqweqwasdasdase----------");
     //     console.log("done");
     //   }
     // })


     setTimeout(function(){
         thiat.handleAnimation()
       },200)

      //  Animated.timing(this.state.x, {
      //   toValue: 0,
      //   duration:1000,
      // }).start();

      this.userdata();
      // let unsubscribe = firebaseService.auth()
      // .onAuthStateChanged(user => {
      //   if (user) {
      //     console.log(user);
      //   }else{
      //     console.log("no user");
      //   }
      // })



   }



   userdata(){
     AsyncStorage.getItem("User").then((value) => {
          this.setState({
            user:JSON.parse(value)
          })
          this.GetMoodList();
          this.GetDailyMoodList14();
          this.GetDailyMoodList7();
          this.GetChatList();
          this.GetDailyMoodListweek();
       }).done();
   }

    loading(){
      this.GetMoodList();
      this.GetDailyMoodList14();
      this.GetDailyMoodList7();
      this.GetChatList();
    }


 handleAnimation(){
     Animated.timing(this.animatedValue, {
         toValue: 1,
         duration: 200,
         easing: Easing.ease
     }).start(() => {

       Animated.timing(this.animatedValue, {
           toValue: 0,
           duration: 200,
           easing: Easing.ease
       }).start()

      })
 }

 async GetDailyMoodList14(){
   try {
     const { data } = await UserAuthServices.GetActivityMood(this.state.user.token,moment().subtract(13, 'd').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD'))
     var mapdata14 =[]
     data.data.map((item)=>{
        if(item.isMood){
          mapdata14.push(50)
        }else{
          mapdata14.push(10)
        }
     })
     this.setState({
         mapdata:mapdata14,
         mapdata14:mapdata14
     })
   }catch(error){
     console.log(error)
     this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
     this.setState({load: !this.state.load})
     this.props.navigation.pop(1);
     this.props.navigation.navigate("BottomNavigator");
   }
   console.log(this.state.user);
 }

 async GetDailyMoodList7(){
   try {
     const { data } = await UserAuthServices.GetActivityMood(this.state.user.token,moment().subtract(6, 'd').format('YYYY-MM-DD'),moment().format('YYYY-MM-DD'))
     var mapdata14 =[]
     data.data.map((item)=>{
        if(item.isMood){
          mapdata14.push(50)
        }else{
          mapdata14.push(10)
        }
     })
     this.setState({
         mapdata7:mapdata14
     })
   }catch(error){
     console.log(error)
     this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
     this.setState({load: !this.state.load})
     this.props.navigation.pop(1);
     this.props.navigation.navigate("BottomNavigator");
   }
   console.log(this.state.user);
 }


 async GetDailyMoodListweek(){
   try {
     const { data } = await UserAuthServices.GetActivityMood(this.state.user.token,moment().startOf('week').add(1,"d").format('YYYY-MM-DD'),moment().endOf('week').add(1,"d").format('YYYY-MM-DD'))

     this.setState({
         data7:data.data
     })

   }catch(error){
     console.log(error)
     this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
     this.setState({load: !this.state.load})
     this.props.navigation.pop(1);
     this.props.navigation.navigate("BottomNavigator");
   }
   console.log(this.state.user);
 }

 async GetMoodList(){
   this.setState({loadmood: true})
   try {
     const { data } = await UserAuthServices.GetMoodListUser(this.state.user.token)
     this.setState({
       mooddata:data.data
       })
     this.setState({loadmood: !this.state.loadmood,refreshing:false})
   }catch(error){
     console.log(error)
     this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
     this.setState({loadmood: !this.state.loadmood,refreshing:false})
   }
 }

 change(string){

   if(string=="7"){
     this.setState({
         sday:true,
         fday:false,
         mday:false,
         mapdata:this.state.mapdata7,
         lable: ["1", "2", "3", "4", "5", "6","7"]
       })
   }else if(string=="14"){
     this.setState({
         sday:false,
         fday:true,
         mday:false,
         mapdata:this.state.mapdata14,
         lable: ["1", "2", "3", "4", "5", "6","7","8","9","10","11","12","13","14"]
       })
   }

      
 }

   render()
   {
     let sampleData = [30, 200, 170, 250, 10]
     return (
       <>
                <View style={styles.slide}>
                  <StatusBar
                     backgroundColor = "#fff"
                     barStyle = "dark-content"
                   />

                   <View style={[styles.navBar,{marginTop:(Platform.OS === 'ios')?12:0}]}>
                        <View style={styles.leftContainer}>
                          <TouchableOpacity onPress={()=>this.props.draweropen.open()}>
                          <Image source={require("../../assets/drawe_opener.png")} style={{width:30, height: 30, resizeMode: 'contain',margin:10}} />
                          </TouchableOpacity>
                        </View>
                      <Text style={styles.text_header}>
                        {this.state.user.firstName + " " + this.state.user.lastName}
                      </Text>
                      <View style={styles.rightContainer}>
                      <TouchableOpacity underlayColor='#FFFFF' onPress={()=> this.props.myprop.props.navigation.navigate("NotificationList") }>
                            <Image source={require("../../assets/notfication.png")} style={{width:25,marginRight:10}} />
                            {/* <Icon
                             name='bell'
                             size={25}
                             color='#1c2d41'
                           /> */}
                      </TouchableOpacity>
                      </View>
                 </View>
              <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.loading()}/>}>
                  <ScrollView style={[styles.SplashScreen_RootView]} horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View
                       style={{
                            alignSelf: 'center',
                       }}
                   >
                   <View style={{flexDirection: 'row',}}>
                      <View style={{
                          justifyContent: 'center',
                          alignItems:'center',
                          backgroundColor: "#f8f9fb",
                          margin:10,
                          height:140,
                          width:100,
                          elevation:2,
                          borderRadius:10,
                          padding:10}}>

                        <TouchableHighlight underlayColor='#FFFFF' onPress={()=> this.props.myprop.props.navigation.navigate("AddMoodScreen") }>
                          <View style={{
                              justifyContent: 'center',
                              alignItems:'center',
                              backgroundColor: "#eef1f6",
                              margin:10,
                              height:45,
                              width:45,
                              borderRadius:20,
                              padding:10}}>
                                <Icon
                                  name='plus'
                                  size={25}
                                  color='#1c2d41'
                                />
                          </View>
                          </TouchableHighlight>
                          <Text style={{fontSize:15,color:'#000'}}>
                            Add Mood
                          </Text>
                        </View>


                        {
                          this.state.loadmood?
                          <ActivityIndicator size="large" color="#201F3E" />
                          :
                          <FlatList
                            data={this.state.mooddata}
                            horizontal={true}
                            renderItem={({ item , index }) =>
                            <View style={{
                                backgroundColor: `${(index+1)%2?"#6256FF":"#FF7D6B"}`,
                                margin:5,
                                height:140,
                                width:100,
                                elevation:2,
                                borderRadius:10,
                                padding:10}}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems:'center',
                                    backgroundColor: "transparent",
                                    height:40,
                                    width:40,
                                    borderRadius:30,
                                    padding:10}}>
                                    <Image source={require("../../assets/feelinggood.png")} style={{width:20, height: 20, resizeMode: 'contain',margin:10}} />
                                </View>
                                <Text style={{fontSize:8,color:'#FFFF',marginLeft:5,marginTop:5,}}>
                                  {Moment(item.createdAt).format('DD MMM')}
                                </Text>
                                <Text style={{fontSize:12,color:'#FFFF',marginLeft:5,marginTop:5,}}>
                                  {item.mainFeeling.name}
                                </Text>
                                <Text style={{fontSize:12,color:'#FFFF',marginLeft:5,marginTop:5,}}>
                                  Cheerful
                                </Text>

                                <Text style={{fontSize:12,color:'#fff',marginLeft:5,marginTop:5,}}>
                                  `+{item.extraFeeling.length} more`
                                </Text>
                              </View>
                          }
                          />
                        }

                          </View>
                      </View>
                  </ScrollView>

                  <View style={{backgroundColor: "#ededed",marginTop:20,borderTopLeftRadius:40,borderTopRightRadius:40,overflow:"hidden",marginBottom:70 }}>
                     <View style={{borderTopLeftRadius:40,borderTopRightRadius:40,padding:10}}>

                     <View style={{flexDirection:"row"}}>
                       <Text style={{fontSize:20,color:'#000',marginLeft:15,marginTop:15,width:"45%"}}>
                        Mood Overview
                       </Text>
                       <View style={{flexDirection: 'row',marginTop:10,alignItems:'center',justifyContent:'center'}}>
                         <TouchableOpacity style={{ backgroundColor:this.state.sday?"#201F3E":"#201F3E40",padding:8,borderRadius:10,marginLeft:5,marginRight:5}} onPress={()=>this.change("7")}>
                           <Text style={{color:this.state.sday?"#FFF":"#000",textAlign:'center',fontSize:12,paddingRight:10,paddingLeft:10}}> 7 Days </Text>
                         </TouchableOpacity>

                         <TouchableOpacity style={{ backgroundColor:this.state.fday?"#201F3E":"#201F3E60",padding:8,borderRadius:10,marginLeft:5,marginRight:5}} onPress={()=>this.change("14")}>
                           <Text style={{color: this.state.fday?"#FFF":"#000",textAlign:'center',fontSize:12,paddingRight:10,paddingLeft:10}}> 14 Days </Text>
                         </TouchableOpacity>

                       </View>
                      </View>
                       <View
                            style={{
                                 alignSelf: 'center',
                            }}
                        >
                      <LineChart
                        data={{
                          labels: this.state.lable,
                          datasets: [
                            {
                              data: this.state.mapdata
                            }
                          ]
                        }}
                        width={Dimensions.get("window").width-30} // from react-native
                        height={160}
                        yAxisInterval={1}
                        yAxisLabel="$" // optional, defaults to 1
                        chartConfig={{
                          backgroundColor: "#ededed",
                          backgroundGradientFrom: "#ededed",
                          backgroundGradientTo: "#ededed",
                          decimalPlaces: 2, // optional, defaults to 2dp
                          color: (opacity = 1) => `#201F3E`,
                          labelColor: (opacity = 1) => `#201F3E`,
                          style: {
                            borderRadius: 16
                          },
                          propsForDots: {
                            r: "4",
                            strokeWidth: "0",
                            stroke: "#fff"
                          }
                        }}
                        style={{
                          marginTop:40
                        }}
                      />

                </View>
                      <View style={{
                          backgroundColor: "#fff",
                          margin:5,
                          elevation:1,
                          marginTop:20,
                          marginBottom:10,
                          borderRadius:5,
                          padding:10}}>

                          <Text style={{fontSize:15,color:'#000',marginLeft:5,marginTop:5,}}>
                            Progress this week
                          </Text>

                          <Text style={{fontSize:12,color:'#69737f',marginLeft:5,marginTop:5,}}>
                          Complete a mood check-in everyday to complete the
                          streak. <Text style={{fontSize:12,color:'#69737f',marginLeft:5,marginTop:5,fontWeight:"bold"}}>You're doing great!</Text>
                          </Text>

                          <View style={{flexDirection:"row",width:"100%",justifyContent:"center",marginBottom:10}}>
                          {
                            this.state.data7.map((item,index) => {
                              return (
                                <View style={{flexDirection:"row"}}>
                                <View
                                style={{
                                    width:15,
                                    height:15,
                                    alignSelf:"center",
                                    justifyContent: 'center',
                                    borderWidth:1,
                                    borderRadius:30,
                                    marginTop:15,
                                    borderColor:"#000",
                                    backgroundColor:this.state.data7[index].isMood?"#000":"#fff"
                                }}
                                >
                                <Text style={{color:this.state.data7[index].isMood?"#fff":"#000",textAlign:"center",fontSize:10}}>{this.state.progress[index]}</Text>
                                </View>

                                {
                                  (index!=6)?
                                  <View
                                  style={{
                                      width:35,
                                      alignSelf:"center",
                                      justifyContent: 'center',
                                      borderBottomWidth:2,
                                      marginTop:15,
                                      borderBottomColor: '#000',
                                  }}
                                  >
                                  </View>
                                  :
                                  null
                                }

                                </View>
                              )
                            })
                          }
                          </View>
                     </View>
                     </View>

                     <View style={[styles.SplashScreen_ChildView,{backgroundColor:"#fff" }]}>
                     <View style={{ flexDirection:'row', marginTop:30,alignItems:'center',marginLeft:5}}>
                        <Text style={{fontSize: 18,color: "#1c2d41" ,fontWeight:'bold',marginLeft:10 }}> Mindfulness Sessions </Text>
                     </View>
                     {
                       this.state.load?
                         <ActivityIndicator size="large" color="#201F3E" />
                       :

                       <FlatList
                         data={this.state.postdata}
                         renderItem={({ item ,index }) =>
                         <TouchableOpacity underlayColor='#FFFFF' onPress={()=> this.props.myprop.props.navigation.navigate("PlayScreen" ,{item:item,playlist:this.state.postdata,index:index})}>
                         <View style={{
                             backgroundColor: "transparent",
                             marginTop:15,
                             marginLeft:10,
                             marginBottom:3,
                             marginRight:10,
                             borderRadius:10,}}>
                                 <View style={[styles.navBarnew,{backgroundColor:"transparent",alignItems:"center"}]}>
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
                  </View>

                </ScrollView>
               </View>
               <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
       </>
     );
   }
}
const styles = StyleSheet.create(
{
     slide: {
       backgroundColor: "#FFFFFF",
       flex:1
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
      color: "#000",
      fontSize: 20,
      fontWeight: "bold",
      justifyContent: 'center',
      alignItems: 'center',
    },
});
