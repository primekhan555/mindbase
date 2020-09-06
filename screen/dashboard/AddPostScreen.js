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
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  AsyncStorage
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
import ImagePicker from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
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
  user:{
    lastName:"",
    firstName:""
  },
  useShadowColorFromDataset: false // optional
};

export default class AddPostScreen extends Component<{}>
{
  constructor(){
      super();
      this.state={
      isVisible : true,
      ismail:0,
      ispasswoed:0,
      pickupimages:[],
      avatarSource:[],
      searchString:"",
      load:false
     }
     this.userdata();
   }
   userdata(){
     AsyncStorage.getItem("User").then((value) => {
          this.setState({
            user:JSON.parse(value)
          })
       }).done();
   }

   removeimage(index){
     var logimage = this.state.pickupimages
     var largeimage = this.state.avatarSource

     logimage.splice(index, 1);
     largeimage.splice(index, 1);
     this.setState({
       avatarSource: largeimage,
       pickupimages:logimage
     });
   }

   imagepickup(){
     var logimage = this.state.pickupimages
     var largeimage = this.state.avatarSource
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
          const source = { uri: response.uri };
          logimage.push(response.uri)
          this.setState({})
          console.log(logimage);
          // You can also display the image using data:
          var main = response.data;
          largeimage.push(main)
          this.setState({
            avatarSource: largeimage,
          });
        }
      });
   }


   async AddPostUser(){
     // console.log(this.state.searchString);
     // console.log(this.state.pickupimages.length);
      if(this.state.searchString!=""){
        this.setState({
          load:true
        })
        var bse64 = []
        this.state.avatarSource.forEach(function(item) {
            bse64.push('data:image/jpeg;base64,'+item);
        })

        try {
          const { data } = await UserAuthServices.AddPostuser(this.state.user.token,this.state.searchString,bse64)
          console.log(data.data);
          this.dropDownAlertRef.alertWithType('success', 'Success',"Post added success");
          this.props.navigation.pop(1)
          this.setState({
            load:false
          })
        }catch(error){
          console.log(error)
          this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
          this.setState({
            load:false
          })
        }
      }else{
        this.dropDownAlertRef.alertWithType('error', 'Failed',"First Add image or Text");
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

                   <View style={styles.navBar}>

                    <View style={styles.leftContainer}>
                    <TouchableOpacity style={{marginTop:15}} onPress={()=> this.props.navigation.goBack() }>
                       <Icon
                         name='arrow-left'
                         size={35}
                         color='#1c2d41'
                       />
                      </TouchableOpacity>
                        <Text style={{fontSize: 20,color: "#000", marginTop:10 ,fontWeight:'bold',marginLeft:10}}>Create Post</Text>
                      </View>

                      <View style={styles.text_header}>
                      </View>

                      <View style={styles.rightContainer}>
                      {
                        this.state.load?
                        <ActivityIndicator size="large" color="#201F3E" />
                        :
                        <TouchableOpacity underlayColor='#FFFFF' onPress={()=> this.AddPostUser() }>
                              <Text style={{fontSize: 20,color: "#201F3E", marginTop:10 ,fontWeight:'bold',marginRight:10}}>Post</Text>
                        </TouchableOpacity>
                      }

                      </View>
                    </View>

                 <View style={{
                     backgroundColor: "#fff",
                     margin:15,
                     borderRadius:10,
                     elevation:18,
                     width: (Dimensions.get('window').width)-30,
                     padding:10}}>
                     <View>
                     <TextInput
                         style={styles.input}
                         multiline={true}
                         placeholder="Whats on your mind? .."
                         onChangeText={(searchString) => {this.setState({searchString})}}
                         underlineColorAndroid="transparent"
                     />
                 </View>

                 <View style={{flexDirection:"row"}}>
                 <TouchableOpacity style={{
                     justifyContent: 'center',
                     alignItems:'center',
                     backgroundColor: "#f8f9fb",
                     margin:10,
                     height:100,
                     width:100,
                     elevation:2,
                     borderRadius:20,
                     padding:10}} onPress={()=> {this.imagepickup()} }>
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
                   </TouchableOpacity>

                   <FlatList
                     data={this.state.pickupimages}
                     showsHorizontalScrollIndicator={false}
                     horizontal={true}
                     renderItem={({ item ,index}) =>
                     <View style={{
                       justifyContent: 'center',
                       alignItems:'center',
                       backgroundColor: "#f8f9fb",
                       margin:5,
                       height:100,
                       width:100,
                       overflow:"hidden",
                       elevation:2,
                       borderRadius:20}}>
                       <Image source={{uri: `${item}`}} style={{width:100, height: 100,margin:10}} />
                       <TouchableOpacity style={{position:"absolute",top:1,right:1,backgroundColor:"#eef1f6",borderRadius:20}} onPress={()=> this.removeimage()}>
                         <Icon
                           name='x-circle'
                           size={30}
                           color='#1c2d41'
                         />
                       </TouchableOpacity>
                     </View>
                   }
                   />

                   </View>
                 <View style={{borderBottomWidth: 2,borderBottomColor: '#e5e8ef',alignItems:'center'}}/>

                 <View style={{padding:10,borderRadius:10,marginLeft:5,marginRight:5,flexDirection:'row',alignItems: 'center',}}>
                 <View style={{
                     justifyContent: 'center',
                     alignItems:'center',
                     backgroundColor: "#eef1f6",
                     height:40,
                     width:40,
                     borderRadius:2,
                     padding:5}}>
                       <Icon
                         name='plus'
                         size={25}
                         color='#1c2d41'
                       />
                 </View>
                   <Text style={{ fontSize:12, color: "#000",textAlign:'center',marginLeft:5}}> Add Photos</Text>
                 </View>
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
      alignItems:"center",
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
      height:100,
      padding:20,
      color: '#424242',
    },
    message: {
      flexDirection: 'row',
    },
    mine: {
      marginLeft: 20,
    },
    not_mine: {
      alignSelf: 'flex-end',
      marginRight: 20
    },

    text: {
      paddingTop: 3,
      fontSize: 17,
      lineHeight: 22
    },
    arrow_container: {
      position:'absolute',
      top: 0,
      left:0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      flex: 1
    },
    arrow_left_container: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start'
    },
    arrow_right_container: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },

});
