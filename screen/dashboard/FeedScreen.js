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
  AsyncStorage,
  FlatList,
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
import IconLike from "react-native-vector-icons/AntDesign";
import {LineChart} from 'react-native-chart-kit';
import UserAuthServices from './Services/UserAuthServices.js';
import ImagesSwiper from "react-native-image-swiper";
import TimeAgo from 'react-native-timeago';
import Share from "react-native-share"
import DropdownAlert from 'react-native-dropdownalert';
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

export default class FeedScreen extends Component<{}>
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
      load:true,
      postdata:[],
      searchString:"",
      refreshing:false
     }
     this.userdata();
   }


   userdata(){
     AsyncStorage.getItem("User").then((value) => {
          this.setState({
            user:JSON.parse(value)
          })
          this.GetpPostList();
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

   async CommentPost(index,_id){
     if(this.state.searchString!=""){
       try {
         const { data } = await UserAuthServices.CommentPostuser(this.state.user.token,_id,this.state.searchString)

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

   async GetpPostList(){
     try {
       const { data } = await UserAuthServices.GetPostAll(this.state.user.token)
       console.log(data.data);
       this.setState({
         postdata: data.data,
         load: false,
         refreshing:false
         })
     }catch(error){
       console.log(error)
       this.setState({loadL: false})
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

                      <View style={styles.text_header}>
                        <Image source={require("../../assets/logo.png")} style={{ height: 35, resizeMode: 'contain',margin:10}} />
                      </View>

                      <View style={styles.rightContainer}>
                      <TouchableOpacity underlayColor='#FFFFF' onPress={()=> this.props.myprop.props.navigation.navigate("NotificationList") }>
                            <Icon
                             name='bell'
                             size={25}
                             color='#1c2d41'
                           />
                      </TouchableOpacity>
                      </View>
                 </View>

                 <View>
                 <TouchableHighlight underlayColor='#FFFFF' onPress={()=>  this.props.myprop.props.navigation.navigate("AddPostScreen")}>
                 <View
                     style={[styles.input,{justifyContent:'center'}]} >
                    <Text style={{alignItems:'center'}}>Whats on your mind? .. </Text>
                 </View>
                 </TouchableHighlight>
                 </View>
                 <View style={{backgroundColor:"#EBF4FF",marginBottom:170}}>
                 {
                   this.state.load?
                   <ActivityIndicator size="large" color="#201F3E" />
                   :

                   <FlatList
                     data={this.state.postdata}
                     refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.GetpPostList()}/>}
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
                           <View styles={{marginLeft:150}}>
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
                               autoplayTimeout={4}
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
                             value={this.state.searchString}
                             placeholder="Write Comment"
                             autoCapitalize = 'none'
                             onChangeText={(searchString) => {this.setState({searchString})}}
                             underlineColorAndroid="transparent"
                         />
                         <TouchableOpacity onPress={()=>this.CommentPost(index,item._id)}  style={{borderRadius:5,backgroundColor:"#201F3E",justifyContent:"center",height:35}}>
                            <Text style={{fontSize:12,color:"#fff",padding:5,marginLeft:5,marginRight:5}}>Send</Text>
                         </TouchableOpacity>
                       </View>
                    </View>

                 }
                 />
                }
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
       flex:1,
       marginBottom:56,
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
});
