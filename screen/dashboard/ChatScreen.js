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
  Image,
  Text,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  BackHandler,
  Keyboard
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import MessageBubble from "./MessageBubble.js";
import NewMessageBubble from "./NewMessageBubble.js"
import { NavigationActions,StackActions } from "react-navigation";
import Icon from "react-native-vector-icons/Feather";
import {LineChart} from 'react-native-chart-kit';
import firebaseService from './firebaseService.js'
import EmojiBoard from 'react-native-emoji-board'
import ImagePicker from 'react-native-image-picker';
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

export default class ChatScreen extends Component<{}>
{
  constructor(){
      super();
      this.state={
      isVisible : true,
      ismail:0,
      ispasswoed:0,
      user:{
        lastName:"",
        firstName:""
      },
      msglist:[],
      load:true,
      refid:"",
      searchString:"",
      dataSource:[],
      Searclist:[],
      show:false,
     }
     this.ListView_Ref
     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
     this._keyboardDidShow = this._keyboardDidShow.bind(this);

   }

   componentDidMount() {
     console.log(this.props.navigation.state.params.item)
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
    that.setState({
      refid:this.props.navigation.state.params.refid
    });
    setTimeout(function(){
      that.userdata()
    },200)

  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

    _keyboardDidShow () {
      if(this.state.show){
        this.setState({show:!this.state.show})
      }
      // alert('Keyboard Shown');
    }

    _keyboardDidHide () {
      // alert('Keyboard Hidden');
    }

  clickemoji(emoji){
    console.log(this.state.searchString);
    this.setState({
      searchString:this.state.searchString + emoji.code
    })
    console.log(emoji);
  }
  userdata(){
    AsyncStorage.getItem("User").then((value) => {
         this.setState({
           user:JSON.parse(value)
         })
         this.chatlist();
      }).done();
  }

  imagepickup(){
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
         const source = "data:image/png;base64,"+response.data;
         this.UploadImageUrl(source)
       }
     });
  }


  async UploadImageUrl(main){
    try {
      const { data } = await UserAuthServices.UploadImageUrl(this.state.user.token,main)
      console.log(data.data);
      this.addchatimage(data.data.media[0])
    }catch(error){
      console.log(error)
      this.setState({loadL: false})
    }
  }


  updateset(){
    const FIREBASE_REF_MESSAGES = firebaseService.database().ref(this.state.user._id)
    FIREBASE_REF_MESSAGES.orderByChild("refid").equalTo(this.state.refid).once('value', (snapshot) => {
      var datalist = []
      snapshot.forEach(function(item) {
        item.ref.update({
            seen: 0
        });
      });

    });
  }

  chatlist(){
    var that = this
    var ietems = this.props.navigation.state.params.item
    let currentUser = firebaseService.auth().currentUser
    console.log("start log"); 
    console.log(this.state.user._id);
    const FIREBASE_REF_MESSAGES = firebaseService.database().ref(this.state.user._id)
    console.log(FIREBASE_REF_MESSAGES);
    console.log(this.state.refid);
    FIREBASE_REF_MESSAGES.orderByChild("refid").equalTo(this.state.refid).on('value', (snapshot) => {
      var datalist = []
      snapshot.forEach(function(item) {
          var itemVal = item.val();
          console.log(itemVal);
          if(itemVal.image){
              datalist.push(<NewMessageBubble mine={(itemVal.type!="my")} text={itemVal.text} time={itemVal.createdAt} image={itemVal.image} item={ietems}/>);
          }else{
              datalist.push(<NewMessageBubble mine={(itemVal.type!="my")} text={itemVal.text} time={itemVal.createdAt} item={ietems}/>);
          }

      });
      this.setState({
        load:false,
        dataSource:datalist
      })
      var that = this
      try{
        setTimeout(function()
          {
            if(that.ListView_Ref){
                that.ListView_Ref.scrollToEnd({ animated: true })
            }

          },300)
      }catch(error){
        console.log(error);
      }

    }, (errorObject) => {
      console.log(errorObject.message)
    })
    this.updateset();
  }

  addchatimage(image){
    console.log(image);
    var massage = this.state.searchString
    let currentUser = firebaseService.auth().currentUser
    let createdAt = new Date().getTime()
    var chatMessage = {
      refid:this.state.refid,
      text: massage,
      createdAt: createdAt,
      type:"my",
      image:image,
      id: this.state.user._id,
      seen:0,
    }

    const FIREBASE_REF_MESSAGES = firebaseService.database().ref(this.state.user._id)
    const FIREBASE_REF_SEND_MESSAGES = firebaseService.database().ref(this.state.refid)

    FIREBASE_REF_MESSAGES.push().set(chatMessage, (error) => {
      if (error) {
        console.log(error.message);
      } else {
      }
    })

    chatMessage = {
      refid:this.state.user._id,
      text: massage,
      createdAt: createdAt,
      type:"ref",
      image:image,
      id: this.state.refid,
      seen:1,
    }

    FIREBASE_REF_SEND_MESSAGES.push().set(chatMessage, (error) => {
      if (error) {
        console.log(error.message);
      } else {
      }
    })
    // //
    this.sendmsgtext.clear();
    this.setState({
      searchString:""
      })
    var that = this
    try{
      if(that.ListView_Ref){
          that.ListView_Ref.scrollToEnd({ animated: true })
      }
    }catch(error){
      console.log(error);
    }
  }


  addchat(){
    if(this.state.searchString==""){
      return
    }
    var massage = this.state.searchString
    let currentUser = firebaseService.auth().currentUser
    let createdAt = new Date().getTime()
    var chatMessage = {
      refid:this.state.refid,
      text: massage,
      createdAt: createdAt,
      type:"my",
      id: this.state.user._id,
      seen:0,
    }

    const FIREBASE_REF_MESSAGES = firebaseService.database().ref(this.state.user._id)
    const FIREBASE_REF_SEND_MESSAGES = firebaseService.database().ref(this.state.refid)

    FIREBASE_REF_MESSAGES.push().set(chatMessage, (error) => {
      if (error) {
        console.log(error.message);
      } else {
      }
    })

    chatMessage = {
      refid:this.state.user._id,
      text: massage,
      createdAt: createdAt,
      type:"ref",
      id: this.state.refid,
      seen:1,
    }

    FIREBASE_REF_SEND_MESSAGES.push().set(chatMessage, (error) => {
      if (error) {
        console.log(error.message);
      } else {
      }
    })
    // //
    this.sendmsgtext.clear();
    this.setState({
      searchString:""
      })
    var that = this
    try{
      if(that.ListView_Ref){
          that.ListView_Ref.scrollToEnd({ animated: true })
      }
    }catch(error){
      console.log(error);
    }
  }



  handleBackButtonClick() {
    if(this.state.show){
        this.setState({show:!this.state.show})
    }
    this.props.navigation.goBack()
    return true;
  }

   render()
   {
    //  let sampleData = [30, 200, 170, 250, 10]
     return (
       <>
                <View style={[styles.slide, this.state.show?{
                  height:this.state.show?(Dimensions.get('window').height)-270:(Dimensions.get('window').height)
                  }:{flex:1}]}>
                <StatusBar
                     backgroundColor = "#fff"
                     barStyle = "dark-content"
                   />

                   <View style={{ flexDirection:'row', marginTop:30,alignItems:'center',marginLeft:5}}>
                    <TouchableOpacity  onPress={()=> this.props.navigation.goBack() }>
                       <Icon
                         name='arrow-left'
                         size={35}
                         color='#1c2d41'
                       />
                      </TouchableOpacity>
                      <Text style={{fontSize: 21,color: "#1c2d41" ,fontWeight:'bold',marginLeft:15}}>{Object.keys(this.props.navigation.state.params.item.department).length>2?this.props.navigation.state.params.item.department:this.props.navigation.state.params.name}</Text>
                   </View>

                   <View style={{ flex:1,marginTop:20 }}>
                   {
                     this.state.load?
                   <ActivityIndicator size="large" color="#201F3E" />
                   :
                   null
                  }
                  <ScrollView ref={(ref) => {
                                     this.ListView_Ref = ref;
                                   }}  showsVerticalScrollIndicator={false}>
                  {this.state.dataSource}
                  </ScrollView>
                   </View>
                       <View
                           style={[styles.input,{height:50,justifyContent:'center',flexDirection:'row',alignItems:'center',backgroundColor:"#DFE5EB"}]} >
                           <TouchableOpacity onPress={()=>{Keyboard.dismiss(); this.setState({show:!this.state.show})} }>
                                <Image  source={require("../../assets/smile.png")} style={{ height: 45, marginLeft:10,marginLeft:5,resizeMode: 'contain',alignSelf: this.props.mine ? 'flex-start' : 'flex-end'}} />
                           </TouchableOpacity>
                           <TextInput
                            ref={ref => this.sendmsgtext = ref}
                             style={[styles.inputtext,{width: (Dimensions.get('window').width)-170}]}
                             placeholder='Type Message here'
                             value={this.state.searchString}
                             onChangeText={(searchString) => {this.setState({searchString:searchString})}}
                             underlineColorAndroid="transparent"
                             onSubmitEditing={()=>{this.addchat()}}
                           />
                           <TouchableOpacity onPress={()=> this.imagepickup()}>
                           <Image  source={require("../../assets/imageico.png")} style={{ height: 45, marginRight:14,resizeMode: 'contain',alignSelf: this.props.mine ? 'flex-start' : 'flex-end'}} />
                           </TouchableOpacity>

                           <TouchableOpacity>
                            <Image  source={require("../../assets/mic.png")} style={{ height: 45, marginRight:7 ,resizeMode: 'contain',alignSelf: this.props.mine ? 'flex-start' : 'flex-end'}} />
                           </TouchableOpacity>

                           <TouchableOpacity onPress={()=> this.addchat()}>
                              <Image  source={require("../../assets/sendbutton.png")} style={{ height: 45, marginLeft:7 ,resizeMode: 'contain',alignSelf: this.props.mine ? 'flex-start' : 'flex-end'}} />
                           </TouchableOpacity>
                       </View>
               </View>

           <EmojiBoard showBoard={this.state.show} onClick={(emoji)=>{this.clickemoji(emoji)}} />
       </>
     );
   }
}
const styles = StyleSheet.create(
{
     slide: {
       backgroundColor: "#FFFFFF",
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

    inputtext: {
      paddingVertical:0,
      borderColor:'#cfd3d9',
      height:50,
      color: '#424242',
    }

});
