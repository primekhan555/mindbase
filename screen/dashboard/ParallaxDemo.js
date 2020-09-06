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
  TextInput,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  Animated,

} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationActions,StackActions } from "react-navigation";
import Icon from "react-native-vector-icons/Feather";
import IconLike from "react-native-vector-icons/AntDesign";
import {LineChart} from 'react-native-chart-kit';
import { Tab, Tabs, StyleProvider ,TabHeading,Body,Header, ScrollableTab,List, ListItem as Item, Title} from 'native-base';
import ExtraScreen from "./ExtraScreen.js";
import UserAuthServices from './Services/UserAuthServices.js';
import ImagesSwiper from "react-native-image-swiper";
import TimeAgo from 'react-native-timeago';
import DropdownAlert from 'react-native-dropdownalert';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from "react-native-linear-gradient";
import Moment from 'moment';

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const IMAGE_HEIGHT = 250;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = "rgba(85,186,255, 0.0 )";
const FADED_THEME_COLOR = "rgba(85,186,255, 0.8)";

export default class ProfileScreen extends Component
{
  constructor(props) {
    super(props);
      this.state={
      isVisible : true,
      ismail:0,
      ispasswoed:0,
      user:{
        lastName:"",
        firstName:""
      },
      postdata:[],
      notedata:[],
      load:true,
      loadnote:true,
      searchString:"",
      update:false,
      size:90,
      updatenote:{},
      activeTab: 0,
      height: 500
     }
      this.nScroll.addListener(Animated.event([{value: this.scroll}], {useNativeDriver: false}));
   }
    nScroll = new Animated.Value(0);
    scroll = new Animated.Value(0);
    textColor = this.scroll.interpolate({
      inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
      outputRange: [THEME_COLOR, FADED_THEME_COLOR, "white"],
      extrapolate: "clamp"
    });
    tabBg = this.scroll.interpolate({
      inputRange: [0, SCROLL_HEIGHT],
      outputRange: ["white", THEME_COLOR],
      extrapolate: "clamp"
    });
    tabY = this.nScroll.interpolate({
      inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
      outputRange: [0, 0, 1]
    });
    headerBg = this.scroll.interpolate({
      inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
      outputRange: ["transparent", "transparent", THEME_COLOR],
      extrapolate: "clamp"
    });
    imgScale = this.nScroll.interpolate({
      inputRange: [-25, 0],
      outputRange: [1.1, 1],
      extrapolateRight: "clamp"
    });
    imgOpacity = this.nScroll.interpolate({
      inputRange: [0, SCROLL_HEIGHT],
      outputRange: [1, 0],
    });
    tabContent = (x, i) => <View style={{height: this.state.height}}>
      <List onLayout={({nativeEvent: {layout: {height}}}) => {
        this.heights[i] = height;
        if (this.state.activeTab === i) this.setState({height})
      }}>
        {new Array(x).fill(null).map((_, i) => <Item key={i}><Text>Item {i}</Text></Item>)}
      </List></View>;
    heights = [500, 500];
    state = {
      activeTab: 0,
      height: 500
    };

   componentDidMount() {
      this.userdata();
    }

    userdata(){
      AsyncStorage.getItem("User").then((value) => {

           this.setState({
             user:JSON.parse(value)
           })
           console.log();
           this.GetpPostList(value);
           this.GetnoteAllUser();
        }).done();
    }

    async LikePost(index,_id){
      var mainpost = this.state.postdata
      if(mainpost[index]["isLiked"]){
        mainpost[index]["totalLikes"] = mainpost[index]["totalLikes"] - 1
      }else{
        mainpost[index]["totalLikes"] = mainpost[index]["totalLikes"] + 1
      }
      mainpost[index]["isLiked"] = !mainpost[index]["isLiked"]
      this.setState({
        postdata:mainpost
      })
      try {
        const { data } = await UserAuthServices.LikePostuser(this.state.user.token,_id)
      }catch(error){
        console.log(error)
        this.setState({loadL: false})
      }
    }

    updatekey(index){
      console.log(this.state.notedata[index].note);
      this.setState({
        update:true,
        updatenote:this.state.notedata[index],
        searchString:this.state.notedata[index].note,
        size:150,
      })
    }

    async CommentPost(index,_id){
      if(this.state.searchString!=""){
        try {
          const { data } = await UserAuthServices.CommentPostuser(this.state.user.token,this.state.user._id,this.state.searchString)
          console.log(data);
          console.log(data);
          var mainpost = this.state.postdata
          mainpost[index]["totalComments"] = mainpost[index]["totalComments"] + 1
          this.setState({
            searchString:"",
            postdata:mainpost
          })
        }catch(error){
          console.log(error)
          this.setState({loadL: false})
        }
      }else{
        this.dropDownAlertRef.alertWithType('error', 'Failed',"Not Post blank Comment");
      }

    }

    async SharePost(index,_id,item){
      let shareImage = {}
      if(item.media.length>0){
        shareImage = {
           title: "Pulse",//string
           message: item.text,//string
           url:item.media[0],// eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
         };
      }else{
        shareImage = {
           title: "Pulse",//string
           message: item.text,//string
         };
      }

     console.log(shareImage);
     Share.open(shareImage)
         .then((res) => { console.log(res) })
         .catch((err) => { err && console.log(err); });

     try {
       const { data } = await UserAuthServices.LikePostuser(this.state.user.token,_id,this.state.user._id)
     }catch(error){
       console.log(error)
       this.setState({loadL: false})
     }

    }
    async GetpPostList(){
      console.log(this.state.user);
      try {
        const { data } = await UserAuthServices.GetPostAllUser(this.state.user._id,this.state.user.token)
        console.log(data);
        this.setState({
          postdata: data.data,
          load: false
          })
      }catch(error){
        console.log(error)
        this.setState({load: false})
      }
    }

    async GetnoteAllUser(){
      try {
        const { data } = await UserAuthServices.GetnoteAllUser(this.state.user.token)
        console.log("----------------");
        console.log(data.data);
        this.setState({
          notedata: data.data,
          loadnote: false
          })
      }catch(error){
        console.log(error)
        this.setState({loadnote: false})
      }
    }

    async deletepost(postid){
      try {
        const { data } = await UserAuthServices.DeletePost(postid,this.state.user.token)
        console.log("----------------");
        this.setState({
          load: false
        })
        this.GetpPostList();
      }catch(error){
        console.log(error)
        this.setState({loadnote: false})
      }
    }

    Pivkimage(){
      const options = {
         title: 'Select Avatar',
         storageOptions: {
           skipBackup: true,
           path: 'images',
         },
       };
       ImagePicker.showImagePicker(options, (response) => {
         if (response.didCancel) {
           console.log('User cancelled image picker');
         } else if (response.error) {
           console.log('ImagePicker Error: ', response.error);
         } else {
           const source = "data:image/jpeg;base64," + response.data;
           var body = {
             "_id":this.state.user._id,
             "profile":source,
           }
           this.updateProfile(body)
         }
       });
    }

    async updateProfile(body){
      try {
        console.log(body);
       const { data } = await UserAuthServices.UserUpdate(this.state.user.token,body)
       var usermain = this.state.user
       usermain["profile"] = data.data.profile
       this.setState({
          user:usermain
       })
       await AsyncStorage.setItem(
         'User',
         JSON.stringify(usermain)
       );
       this.GetpPostList();
      }catch(error){
        console.log(error)
        this.setState({loadnote: false})
      }
    }

    async AddNoteUser(){
       if(this.state.searchString!=""){
         try {
           const { data } = await UserAuthServices.AddNoteuser(this.state.user.token,this.state.user.firstName + " " + this.state.user.lastName,this.state.searchString)
           console.log(data.data);
           this.dropDownAlertRef.alertWithType('success', 'Success',"Post added success");
           this.setState({
             loadnote: true
             })
            this.sendmsgtext.clear();
            this.GetnoteAllUser()
         }catch(error){
           console.log(error)
           this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
         }
       }else{
         this.dropDownAlertRef.alertWithType('error', 'Failed',"First Add image or Text");
       }
    }

    async UpNoteUser(){
       if(this.state.searchString!=""){
         try {
           const { data } = await UserAuthServices.UpdateNoteuser(this.state.user.token,this.state.updatenote._id,this.state.searchString)
           console.log(data.data);
           this.dropDownAlertRef.alertWithType('success', 'Success',"Post added success");
           this.setState({
             update: false,
             updatenote:{},
             size:90,
             })
            this.sendmsgtext.clear();
            this.GetnoteAllUser()
         }catch(error){
           console.log(error)
           this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
         }
       }else{
         try {
           const { data } = await UserAuthServices.DeleteNoteuser(this.state.user.token,this.state.updatenote._id)
           console.log(data.data);
           this.dropDownAlertRef.alertWithType('success', 'Success',"Delete Note");
           this.setState({
             update: false,
             updatenote:{},
             size:90,
           })
           this.sendmsgtext.clear();
           this.GetnoteAllUser()
         }catch(error){
           console.log(error)
           this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
         }
       }
    }

   async deleteuser(){
        try {
          const { data } = await UserAuthServices.DeleteNoteuser(this.state.user.token,this.state.updatenote._id)
          console.log(data.data);
          this.dropDownAlertRef.alertWithType('success', 'Success',"Delete Note");
          this.setState({
            update: false,
            updatenote:{},
            size:90,
          })
          this.sendmsgtext.clear();
          this.GetnoteAllUser()
        }catch(error){
          console.log(error)
          this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
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
                   <View style={[styles.navBar,{paddingTop:(Platform.OS === 'ios')?12:0}]}>

                      <View style={styles.leftContainer}>
                      <TouchableOpacity onPress={()=>this.props.draweropen.open()} >
                          <Image source={require("../../assets/drawe_opener.png")} style={{width:30, height: 30, resizeMode: 'contain',margin:10}} />
                      </TouchableOpacity>
                      </View>

                      <Text style={{fontSize:25,fontWeight: "bold",marginLeft:10}}>
                      </Text>

                      <View style={styles.rightContainer}>

                        <TouchableOpacity style={{backgroundColor:'#201F3E',padding:5,borderRadius:5}} onPress={()=>this.props.myprop.props.navigation.navigate("EditProfile")}>
                            <Text style={{color:"#fff"}}>Edit Profile
                            </Text>
                        </TouchableOpacity>

                      </View>
                 </View>

                 <Animated.ScrollView
                    scrollEventThrottle={5}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.nScroll}}}], {useNativeDriver: true})}
                    style={{zIndex: 0}}>
                    <Animated.View style={{
                      transform: [{translateY: Animated.multiply(this.nScroll, 0.65)}, {scale: this.imgScale}],
                      backgroundColor: THEME_COLOR
                    }}>
                    <View style={{alignItems:"center",justifyContent:"center"}}>
                       <View>
                          {
                            this.state.user.profile?
                            <View style={{borderRadius:500,overflow:"hidden",backgroundColor:"#201F3E"}}>
                              <Image  source={{uri: `${this.state.user.profile}` }} style={{width:130,height:130,resizeMode: 'contain',overflow:"hidden"}} />
                            </View>
                            :
                              <Image source={require("../../assets/face_left.png")} style={{width:130,height:130,resizeMode: 'contain'}} />
                          }
                          {
                            this.state.user.peerSupport?
                            <View style={{position:"absolute",left:-10}}>
                                <Image source={require("../../assets/psu.png")} style={{width:30, height: 30, resizeMode: 'contain',margin:10}} />
                            </View>
                            :
                            null
                         }


                           <TouchableOpacity style={{position:"absolute",right:-10,bottom:0}} onPress={()=> this.Pivkimage()}>
                               <Image source={require("../../assets/cameram.png")} style={{width:30, height: 30, resizeMode: 'contain',margin:10}} />
                           </TouchableOpacity>
                       </View>
                         <Text style={{color:"#000",fontSize:20,fontWeight:'bold'}}>
                           {this.state.user.firstName + " " + this.state.user.lastName}
                         </Text>
                         <Text style={{color:"#a4abb3",fontSize:15}}>Seattel police Department
                         </Text>

                         <Text style={{color:"#000",fontSize:15}}>Officer #{this.state.user.officerId}
                         </Text>
                    </View>
                  </Animated.View>


                 <Tabs
                      prerenderingSiblingsNumber={3}
                      onChangeTab={({i}) => {
                        this.setState({height: this.heights[i], activeTab: i})
                      }}
                      renderTabBar={(props) =>
                        <Animated.View
                        style={{transform: [{translateY: this.tabY}], zIndex: 1, width: "100%", backgroundColor: "white"}} tabStyle={styles.tabStyle} activeTabStyle={styles.tabStyle} activeTextStyle={{ color: '#201F3E',}} textStyle={{ color: '#959da5'}}>
                        <ScrollableTab {...props}
                                underlineStyle={{backgroundColor: "#201F3E"}} style={{backgroundColor:"#fff"}} />
                        </Animated.View>
                      }>
                      <Tab heading={<TabHeading style={{backgroundColor:"#fff"}}>
                                      <Icon
                                        name='credit-card'
                                        size={20}
                                        color='#201F3E'
                                      />
                                      <Text style={{marginLeft:10}}>Post</Text>
                                      </TabHeading>} tabStyle={styles.tabStyle}  activeTabStyle={styles.tabStyle} activeTextStyle={{ color: '#201F3E',}} textStyle={{ color: '#959da5'}}>
                      <View style={{backgroundColor:"#EBF4FF",marginBottom:56}}>
                      {
                        this.state.load?
                        <ActivityIndicator size="large" color="#EBF4FF" />
                        :

                        <FlatList
                          data={this.state.postdata}
                          renderItem={({ item , index}) =>
                          <View style={{
                              backgroundColor: "#fff",
                              marginLeft:10,
                              marginRight:10,
                              marginTop:10,
                              borderRadius:0,
                              elevation:0,
                              width: (Dimensions.get('window').width)-30,
                              padding:10}}
                              onPress={()=> this.props.myprop.props.navigation.navigate("Profilefullview",{item:item})}>

                              <View style={{ flexDirection:'row'}}>
                                <View style={{borderRadius:150,width:40,height:40,overflow:"hidden",backgroundColor:"#201F3E",marginRight:10}}>
                                <Image source={{uri:`${item.user.profile}`}} style={{width:40, height:40,marginRight:20}} />
                                </View>
                                <View styles={{marginLeft:100}}>
                                  <Text style={{fontSize:15,color:'#000',justifyContent:'center',flex:1,alignItems: 'center',}}>
                                    {item.user.firstName+" "+item.user.lastName}
                                  </Text>
                                  <Text style={{fontSize:10,color:'#1C2D41',justifyContent:'center',flex:1,alignItems: 'center',}}>
                                    Fairfax County Police
                                  </Text>
                                 <TimeAgo time={item.createdAt} style={{fontSize:12,color:'#b3b9c1',justifyContent:'center',flex:1,alignItems: 'center',}}/>
                                </View>
                              </View>

                              <Text style={{ fontSize:12, color: "#1C2D41",marginLeft:5,marginTop:10}}>{item.text}</Text>

                              {
                                (item.media.length!=0)?
                                <TouchableOpacity style={{marginTop:10,borderRadius:5,overflow:"hidden"}} onPress={()=> this.props.myprop.props.navigation.navigate("Profilefullview",{item:item})}>
                                 <ImagesSwiper
                                    images={item.media}
                                    autoplay={false}
                                    autoplayTimeout={2}
                                    showsPagination={false}
                                    width={(Dimensions.get('window').width)-50}
                                    height={180}
                                  />
                                </TouchableOpacity>
                                :
                                null
                              }

                              <View style={{borderBottomWidth: 2,borderBottomColor: '#e5e8ef',alignItems:'center', marginTop:10}}/>

                              <View style={{flex:1,alignItems:'center',justifyContent: 'center',  flexDirection: 'row',marginTop:10,marginBottom:10}}>

                                <TouchableOpacity style={{ flex:1,padding:10,borderRadius:10,marginLeft:5,marginRight:5 ,flexDirection:'row'}} onPress={()=>this.LikePost(index,item._id)}>
                                {
                                  item.isLiked?
                                  <IconLike
                                    name='heart'
                                    size={20}
                                    color='#f44336'
                                  />
                                  :
                                  <Icon
                                    name='heart'
                                    size={20}
                                    color='#1c2d41'
                                  />
                                }
                                    <Text style={{fontSize:10,color: "#000",textAlign:'center',marginLeft:5}}> {item.totalLikes} Like </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ flex:1,padding:10,borderRadius:10,marginLeft:5,marginRight:5,flexDirection:'row'}} onPress={()=> this.props.myprop.props.navigation.navigate("Profilefullview",{item:item})}>
                                <Icon
                                  name='message-square'
                                  size={20}
                                  color='#1c2d41'
                                />
                                  <Text style={{ fontSize:10, color: "#000",textAlign:'center',marginLeft:5}}> {item.totalComments} Comments </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ flex:1,padding:10,borderRadius:10,marginLeft:5,marginRight:5,flexDirection:'row'}} onPress={()=>this.SharePost(index,item._id,item)}>
                                <Icon
                                  name='corner-up-right'
                                  size={20}
                                  color='#1c2d41'
                                />
                                  <Text style={{ fontSize:10,color: "#000",textAlign:'center' ,marginLeft:5}}>  {item.totalShare} Share </Text>
                                </TouchableOpacity>

                              </View>
                              <View style={{flexDirection:'row'}}>
                              <TextInput
                                style={{
                                  borderRadius:0,
                                  borderColor:'#B5B1B1',
                                  borderBottomLeftRadius:7,
                                  borderTopLeftRadius:7,
                                  height:35,
                                  fontSize:12,
                                  width: (Dimensions.get('window').width)-110,
                                  backgroundColor:"#E2DDDD",
                                  borderWidth: 0,
                                  color: '#424242'
                                  }}
                                  placeholder="Write Comment"
                                  autoCapitalize = 'none'
                                  onChangeText={(searchString) => {this.setState({searchString})}}
                                  underlineColorAndroid="transparent"
                              />
                              <TouchableOpacity onPress={()=>this.CommentPost(index,item._id)}  style={{borderRadius:5,backgroundColor:"#201F3E",justifyContent:"center",height:35}}>
                                 <Text style={{fontSize:12,color:"#fff",padding:5,marginLeft:5,marginRight:5}}>Send</Text>
                              </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={{position:"absolute",top:1,right:1,backgroundColor:"#fff"}} onPress={()=> this.props.myprop.props.navigation.navigate("EditpostScreen",{item:item})}>
                              <Icon
                                name='more-vertical'
                                size={20}
                                color='#1c2d41'
                              />
                            </TouchableOpacity>
                         </View>
                      }
                      />
                     }
                     </View>
                     </Tab>

                     <Tab heading={<TabHeading style={{backgroundColor:"#fff"}}>
                                     <Icon
                                       name='file-text'
                                       size={20}
                                       color='#201F3E'
                                     />
                                     <Text style={{marginLeft:10}}>Notes</Text>
                                     </TabHeading>} tabStyle={styles.tabStyle} tabStyle={styles.tabStyle}  activeTabStyle={styles.tabStyle} activeTextStyle={{ color: '#201F3E',}} textStyle={{ color: '#959da5'}}>

                     <View style={{backgroundColor:"#EBF4FF",marginBottom:56}}>
                         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',margin:10}}>
                         <TextInput
                            ref={ref => this.sendmsgtext = ref}
                             style={{
                                 borderTopLeftRadius:10,
                                 borderBottomLeftRadius:10,
                                 borderColor:'#cfd3d9',
                                 height:40,
                                 width: (Dimensions.get('window').width)-this.state.size,
                                 backgroundColor:"#E2DDDD",
                                 borderWidth: 0,
                                 color: '#424242'
                               }}
                             placeholder="Add Note"
                             autoCapitalize = 'none'
                             value={this.state.searchString}
                             onChangeText={(searchString) => {this.setState({searchString})}}
                             underlineColorAndroid="transparent"
                         />
                        {
                          this.state.update?
                          <View style={{flexDirection:"row"}}>
                            <TouchableOpacity onPress={()=>this.UpNoteUser()}  style={{borderRadius:5,backgroundColor:"#201F3E",justifyContent:"center",height:40,left:-2}}>
                               <Text style={{fontSize:12,color:"#fff",padding:5,marginLeft:5,marginRight:5}}> Update </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.deleteuser()}  style={{borderRadius:5,backgroundColor:"red",justifyContent:"center",height:40,left:-2}}>
                               <Text style={{fontSize:12,color:"#fff",padding:5,marginLeft:5,marginRight:5}}> Delete </Text>
                            </TouchableOpacity>
                          </View>
                          :
                          <TouchableOpacity onPress={()=>this.AddNoteUser()}  style={{borderRadius:5,backgroundColor:"#201F3E",justifyContent:"center",height:40,left:-2}}>
                             <Text style={{fontSize:12,color:"#fff",padding:5,marginLeft:5,marginRight:5}}> Add </Text>
                          </TouchableOpacity>

                        }


                       </View>

                       {
                         this.state.loadnote?
                         <ActivityIndicator size="large" color="#201F3E" />
                         :
                         <FlatList
                           style={{marginBottom:63}}
                           data={this.state.notedata}
                           renderItem={({ item ,index }) =>
                             <View style={{
                                 backgroundColor: `${(index+1)%2?"#201F3E":"#fff"}`,
                                 marginRight:10,
                                 marginLeft:10,
                                 marginTop:10,
                                 borderRadius:5,
                                 elevation:2,
                                 shadowOffset: { width: 5, height: 10 },
                                 shadowColor: '#F2F2F2',
                                 shadowOpacity: 1,
                                 width: (Dimensions.get('window').width)-30,
                                 padding:10}}>
                                 <Text style={{fontSize:14,color:`${(index+1)%2?"#fff":"#000"}`,fontWeight:'bold'}}>{item.title}</Text>
                                 <Text style={{fontSize:12,color:`${(index+1)%2?"#fff":"#000"}`,}}>{Moment(item.createdAt).format('MMMM DD, yyyy')}</Text>
                                 <Text style={{fontSize:14,color:`${(index+1)%2?"#fff":"#000"}`,}}>{item.note}</Text>
                                 <TouchableOpacity style={{position:"absolute",top:1,right:1}} onPress={()=> {this.updatekey(index)}}>
                                   <Icon
                                     name='more-vertical'
                                     size={20}
                                     color={(index+1)%2?"#fff":"#000"}
                                   />
                                 </TouchableOpacity>
                              </View>
                            }
                          />
                       }
                       </View>
                     </Tab>
                </Tabs>
                </Animated.ScrollView>
               </View>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
       </>
     );
   }
}
const styles = StyleSheet.create(
{
     slide: {
       flex:1,
       backgroundColor: "#FFFFFF"
     },
     SplashScreen_RootView:
     {
      marginBottom:150
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
    tabStyle:{
      backgroundColor: "#FFFFFF"
    },
    tabBarUnderlineStyle:{
      backgroundColor: "#201F3E"
    },
});
