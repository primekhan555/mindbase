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
  FlatList,
  Animated,
  AsyncStorage,
  ActivityIndicator,
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
import {LineChart} from 'react-native-chart-kit';
import UserAuthServices from './Services/UserAuthServices.js';
import firebaseService from './firebaseService.js'
import Overlay from 'react-native-modal-overlay';
import Moment from 'moment';
import RBSheet from "react-native-raw-bottom-sheet";
import TimeAgo from 'react-native-timeago';

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

export default class ChatListScreen extends Component<{}>
{
  constructor(){
      super();
      this.state={
      isVisible : true,
      ismail:0,
      loadmood:true,
      user:{
        lastName:"",
        firstName:""
      },
      dataSource: [],
      mainlist:[],
      newlist:[],
      filter:[],
      animatedValue: new Animated.Value(- (Dimensions.get('window').width)),
      refreshing:false,
      isactivitylog:false,
     },
     this.delayValue = 500;
   }

   componentDidMount() {
    var that = this;
    var jsonData = [
      { "id": 1, "name": "Joyful" ,"image":require('../../assets/joyful_emoji.png')},
      { "id": 2, "name": "Love" ,"image":require('../../assets/love_emoji.png')},
      { "id": 3, "name": "Happy" ,"image":require('../../assets/happy_emoji.png')},
      { "id": 4, "name": "Positive" ,"image":require('../../assets/positive_emoji.png')},
      { "id": 5, "name": "Content" ,"image":require('../../assets/contented_emoji.png')},
      { "id": 6, "name": "Bored" ,"image":require('../../assets/board_emoji.png')},
      { "id": 7, "name": "Fustrated" ,"image":require('../../assets/frustrated_emoji.png')},
      { "id": 8, "name": "Overwhelmed" ,"image":require('../../assets/overwhelme_eMOJI.png')},
      { "id": 9, "name": "Worried" ,"image":require('../../assets/worried_emoji.png')},
      { "id": 10, "name": "Angry","image":require('../../assets/angry_emoji.png')},
      { "id": 11, "name": "Jealous" ,"image":require('../../assets/jealous_emoji.png')},
      { "id": 12, "name": "Sad" ,"image":require('../../assets/sad_emoji.png')},
    ];
     Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration:1000,
    }).start();

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
      console.log(this.state.user._id);
      this.setState({loadmood: true})
      const { data } = await UserAuthServices.GetChatUser(this.state.user.token,this.state.user.department._id)
      var datslit = []
      var datslitno = []
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

      console.log(data.data);
      var itemlengt = data.data.length-1
      var i=1
      this.setState({});

      // if (data.data.length>0) {
        data.data.map((item) => {
          if(item._id!=this.state.user._id){
            const FIREBASE_REF_MESSAGES = firebaseService.database().ref(this.state.user._id)
            FIREBASE_REF_MESSAGES.orderByChild("refid").equalTo(item._id).once("value", snapshot => {
               if (snapshot.exists()){
                  console.log("exists!");
                  const email = snapshot.val();
                  console.log("--asdasdhjkasdghjkashdjkasdkljasdjkas--------");
                  // console.log(Object.values(snapshot.val()).filter(user => user.seen === 1));
  
                  console.log("key");
                  let lastKey = Object.keys(snapshot.val()).pop()
                  console.log(lastKey);
                  let itemVal = snapshot.val()[lastKey]
                  console.log(itemVal);
  
  
                  if(itemVal.type!="my"){
                      if(itemVal.image){
                        if(item.firstName){
                            item["lastmsg"] = item.firstName+": "+"Send a image"
                        }else{
                            item["lastmsg"] = item.department+": "+"Send a image"
                        }
                      }else{
                        if(item.firstName){
                            item["lastmsg"] = item.firstName+": "+itemVal.text
                        }else{
                            item["lastmsg"] = item.department+": "+itemVal.text
                        }
                      }
  
                      item["count"] =   Object.values(snapshot.val()).filter(user => user.seen === 1 && user.id === itemVal.id).length;
                      console.log(item["count"]);
                    }else{
                      if(itemVal.image){
                          item["lastmsg"] = "You: " + "Send a image"
                      }else{
                          item["lastmsg"] = "You: " + itemVal.text
                      }
                    }
  
                  item["lastmsg_create"] = itemVal.createdAt
                  // snapshot.forEach(function(itemvalue) {
                  //   console.log("---------va;ue---------");
                  //   var itemVal = itemvalue.val();
                  //
                  //
                  // })
                  datslit.push(item)
               }else{
                 datslitno.push(item)
               }
               this.setState({
                 dataSource:datslit,
                 filter:datslit,
                 mainlist:data.data,
                 newlist:datslitno,
                 refreshing:false
               })
               console.log(datslitno);
               if(itemlengt == i){
                 this.setState({loadmood: false})
               }
               i = i+1
            });
          }
        })
        
      // }else{
      //   this.setState({loadmood:false})
      // }
      console.log(datslit);
    }catch(error){
      console.log("wewewew");
      console.log(error)
      this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
      this.setState({loadmood: !this.state.loadmood})
    }
  }

  load(){

  }

  searchlist(searchString){
    if(searchString==""){
      this.setState({
        dataSource: filter,
      })
      return
    }
    var  searclist= []
    this.state.mainlist.map((userData) => {
        if(userData.logo){
          if((userData.department).toLowerCase().includes(searchString.toLowerCase())){
            searclist.push(userData)
          }
        }else{
          if((userData.firstName+" "+userData.lastName).toLowerCase().includes(searchString.toLowerCase())){
            searclist.push(userData)
          }
        }
    });

    this.setState({
      dataSource:searclist,
    })
  }

   render()
   {
     return (
       <>
                <View style={styles.slide}>
                <StatusBar
                     backgroundColor = "#201F3E"
                     barStyle = "light-content"
                   />
                   <View style={[styles.navBar,{backgroundColor:"#201F3E",paddingTop:(Platform.OS === 'ios')?12:0}]}>

                      <View style={styles.leftContainer}>
                      <TouchableOpacity onPress={()=>this.props.draweropen.open()}>
                        <Image source={require("../../assets/bar-chart.png")} style={{width:30, height: 30, resizeMode: 'contain',margin:10}} />
                      </TouchableOpacity>
                        <Text style={{ fontSize:20,color: "#fff",textAlign:'center' ,marginLeft:5,margin:10,fontWeight:'bold'}}> Messages </Text>
                      </View>

                      <View style={styles.text_header}>

                      </View>

                      <View style={styles.rightContainer}>
                      <TouchableOpacity underlayColor='#FFFFF' onPress={()=> {this.setState({isactivitylog:true}); this.RBSheet.open(); }}>
                            <Image source={require("../../assets/pluse_top.png")} style={{ height: 40, resizeMode: 'contain',margin:10}} />
                      </TouchableOpacity>
                      </View>
                 </View>

                 <View style={{backgroundColor:"#201F3E",borderBottomLeftRadius:20,borderBottomRightRadius:20,height:100,overflow:"hidden"}}>
                 <TextInput
                     style={styles.input}
                     placeholder="Search"
                     autoCapitalize = 'none'
                     onChangeText={(searchString) => {this.searchlist(searchString)}}
                     underlineColorAndroid="transparent"
                 />
                 </View>

                  <View  style={{backgroundColor: "#fff",flex:1}}>
                  {
                    this.state.loadmood?
                  <ActivityIndicator size="large" color="#201F3E" />
                  :
                  <FlatList
                      showsVerticalScrollIndicator={false}
                      data={this.state.dataSource}
                      style={{flex:1}}
                      refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.GetChatList()}/>}
                      renderItem={({ item ,index }) => (
                        <Animated.View
                            style={[styles.button, { transform:  [
                                   {
                                      translateX: this.state.animatedValue
                                    }
                           ] }]}
                          >
                        <TouchableOpacity underlayColor='#FFFFF' onPress={()=> this.props.myprop.props.navigation.navigate("ChatScreen",{refid:item._id , name: item.logo?  "Department "+item.department:item.firstName+" "+item.lastName ,item:item} ) }>

                        <View style={{
                            backgroundColor: "#fff",
                            marginTop:15,
                            marginLeft:10,
                            marginBottom:15,
                            marginRight:10,
                            borderRadius:10,
                            elevation:10,
                            shadowOffset: { width: 5, height: 10 },
                            shadowColor: '#F2F2F2',
                            shadowOpacity: 1,
                            padding:5}}>
                                <View style={[styles.navBarnew,{backgroundColor:"#fff"}]}>
                                   <View style={{width:"70%",flexDirection:"row"}}>

                                    {
                                      item.logo?
                                      <View style={{borderRadius:150,width:40,height:40,overflow:"hidden",backgroundColor:"#201F3E",marginRight:10}}>
                                        <Image source={{uri:`${item.logo}`}} style={{width:40, height:40,marginRight:20}} />
                                      </View>
                                      :
                                      <View style={{borderRadius:150,width:40,height:40,overflow:"hidden",backgroundColor:"#201F3E",marginRight:10}}>
                                        <Image source={{uri:`${item.profile}`}} style={{width:40, height:40,marginRight:20}} />
                                      </View>
                                    }

                                     <View>
                                     {
                                       item.firstName?
                                       <Text style={{fontSize:18,color:'#1C2D41',justifyContent:'center',flex:1,alignItems: 'center',}}>
                                         {item.firstName+" "+item.lastName}
                                       </Text>
                                       :
                                       <Text style={{fontSize:18,color:'#1C2D41',justifyContent:'center',flex:1,alignItems: 'center',}}>
                                         Department {item.department}
                                       </Text>
                                     }
                                         <Text  numberOfLines={1} style={{fontSize:12,color:'#707070',justifyContent:'center',alignItems: 'center',}}>
                                            {item.lastmsg}
                                         </Text>
                                     </View>
                                   </View>

                                   <View style={styles.text_header}>

                                   </View>

                                   <View style={[{flexDirection:'column',alignItems:"center",}]}>
                                   {
                                     item.count?
                                     <View style={{width:20,height:20,backgroundColor:"#201F3E",borderRadius:20,justifyContent:"center"}}>
                                       <Text style={{fontSize:10,color:'#fff',textAlign:'center'}}>
                                        {item.count}
                                       </Text>
                                     </View>
                                     :
                                      null

                                    }
                                     <TimeAgo time={item.lastmsg_create} style={{fontSize:8,color:'#707070',textAlign: 'center',}}/>
                                   </View>
                              </View>
                              </View>
                              </TouchableOpacity>
                              </Animated.View>
                      )}
                      //Setting the number of column
                      numColumns={1}

                     />
                 }

                  </View>
                  <RBSheet
                        ref={ref => {
                          this.RBSheet = ref;
                        }}
                        height={(Dimensions.get('window').height-200)}
                        openDuration={250}
                        customStyles={{
                          container: {
                            alignItems: "center",
                            borderRadius:20,
                          }
                        }}
                      >
                      <Text style={{textAlign:"center",color:"#000",fontSize:16,fontWeight:"bold"}}>
                        New Chat
                      </Text>
                      <FlatList
                          showsVerticalScrollIndicator={false}
                          data={this.state.newlist}
                          style={{flex:1}}
                          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.GetChatList()}/>}
                          renderItem={({ item ,index }) => (
                            <Animated.View
                                style={[styles.button, { width:"100%"}]}
                              >
                            <TouchableOpacity underlayColor='#FFFFF' onPress={()=> {this.RBSheet.close(); this.props.myprop.props.navigation.navigate("ChatScreen",{refid:item._id , name: item.logo?  "Department "+item.department:item.firstName+" "+item.lastName ,item:item} ) }}>

                            <View style={{
                                backgroundColor: "#fff",
                                marginTop:15,
                                marginLeft:10,
                                marginBottom:10,
                                width:(Dimensions.get('window').width)-40,
                                marginRight:10,
                                borderRadius:10,
                                elevation:5,
                                shadowOffset: { width: 5, height: 10 },
                                shadowColor: '#F2F2F2',
                                shadowOpacity: 1}}>
                                    <View style={[styles.navBarnew,{backgroundColor:"#fff"}]}>
                                       <View style={styles.leftContainer}>

                                        {
                                          item.logo?
                                          <View style={{borderRadius:150,width:40,height:40,overflow:"hidden",backgroundColor:"#201F3E",marginRight:10}}>
                                            <Image source={{uri:`${item.logo}`}} style={{width:40, height:40,resizeMode: 'contain',marginRight:20}} />
                                          </View>
                                          :
                                          <View style={{borderRadius:150,width:40,height:40,overflow:"hidden",backgroundColor:"#201F3E",marginRight:10}}>
                                            <Image source={{uri:`${item.profile}`}} style={{width:40, height:40,resizeMode: 'contain',marginRight:20}} />
                                          </View>
                                        }

                                         <View style={{justifyContent:"center"}}>
                                         {
                                           item.firstName?
                                           <Text style={{marginTop:10,fontSize:18,color:'#1C2D41',alignSelf:'center',flex:1,textAlign: 'center',}}>
                                             {item.firstName+" "+item.lastName}
                                           </Text>
                                           :
                                           <Text style={{marginTop:10,fontSize:18,color:'#1C2D41',justifyContent:'center',flex:1,alignItems: 'center',}}>
                                             Department {item.department}
                                           </Text>
                                         }
                                         </View>
                                       </View>

                                       <View style={[styles.rightContainer,{flexDirection:'column'}]}>
                                       { /*
                                           <Text style={{fontSize:10,color:'#fff',justifyContent:'flex-end',padding:5,textAlign:'right',backgroundColor:"#201F3E",borderRadius:20}}>
                                            0
                                           </Text>

                                        */}
                                           <Text style={{fontSize:12,color:'#000',justifyContent:'flex-end',textAlign: 'right',}}>

                                           </Text>
                                       </View>
                                  </View>
                                  </View>
                                  </TouchableOpacity>
                                  </Animated.View>
                          )}
                          //Setting the number of column
                          numColumns={1}

                         />

                 </RBSheet>
               </View>
       </>
     );
   }
}
const styles = StyleSheet.create(
{
     slide: {
       flex:1,
       marginBottom:56,
       backgroundColor: "#FFFFFF",
     },

     navBar: {
      height: 70,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navBarnew: {
      marginTop:10,
      height: 70,
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
      borderColor:'#fff',
      backgroundColor:"#fff",
      height:45,
      borderWidth: 1,
      padding:20,
      margin:20,
      color: '#000',
    },
});
