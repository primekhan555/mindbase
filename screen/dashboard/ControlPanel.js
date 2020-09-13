import React, { PropTypes, Component } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  AsyncStorage,
  Switch,
  Dimensions
} from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import UserAuthServices from './Services/UserAuthServices.js';

export default class ControlPanel extends Component {

  constructor(){
      super();
      this.state={
      user:{
        lastName:"",
        firstName:"",
        department:{
          department:""
        }
      },
      isEnabled:false
     }
   }

   componentDidMount() {
      this.userdata();
    }

   userdata(){
     AsyncStorage.getItem("User").then((value) => {
          this.setState({
            user:JSON.parse(value)
          })
          this.update();
       }).done();
   }

     update(){
       this.setState({
         isEnabled:this.state.user.peerSupport
       })
     }

     async UpdateUser(){
       var user = this.state.user
       user.peerSupport = !this.state.isEnabled
       this.setState({isEnabled:!this.state.isEnabled,user:user})
       await AsyncStorage.setItem(
         'User',
         JSON.stringify(this.state.user)
       );

         try {
           var  body = {
              "_id":this.state.user._id,
              "peerSupport":this.state.isEnabled
           }
           const { data } = await UserAuthServices.UserUpdate(this.state.user.token,body)
           console.log(data.data)
         }catch(error){
           console.log(error)
           this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
         }
     }


  render() {
    let {closeDrawer} = this.props
    return (
      <ScrollView style={styles.container}>
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
        <View style={{backgroundColor:"#707070",height:130,borderTopRightRadius:50,}}>
        </View>

        <View style={{backgroundColor:"#fff",height:40,borderTopRightRadius:50,}}>
        </View>

        <View style={{marginTop:45,marginLeft:15}}>
          <TouchableOpacity onPress={()=>this.props.clickdraver("home")} style={{marginTop:10}}>
              <View style={{margin:10,flexDirection:'row',alignItems:'center'}}>
                  <Image source={require("../../assets/homelist.png")} style={{ height:20,width:20,resizeMode: 'contain',tintColor:"#1C2D41"}} />
                  <Text style={{fontSize:20,color:'#1C2D41',marginLeft:15}}>
                    Home
                  </Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.props.clickdraver("profile")} style={{marginTop:10}}>
              <View style={{margin:10,flexDirection:'row',alignItems:'center'}}>
                  <Image source={require("../../assets/profile1.png")} style={{ height:20,width:20,resizeMode: 'contain',tintColor:"#1C2D41"}} />
                  <Text style={{fontSize:20,color:'#1C2D41',marginLeft:15}}>
                    Profile
                  </Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.props.clickdraver("messages")} style={{marginTop:10}}>
              <View style={{margin:10,flexDirection:'row',alignItems:'center'}}>
                  <Image source={require("../../assets/messageslist.png")} style={{ height:20,width:20,resizeMode: 'contain',tintColor:"#1C2D41"}} />
                  <Text style={{fontSize:20,color:'#1C2D41',marginLeft:15}}>
                  Messages
                  </Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.props.clickdraver("feedback")} style={{marginTop:10}}>
              <View style={{margin:10,flexDirection:'row',alignItems:'center'}}>
                  <Image source={require("../../assets/feedbacklist.png")} style={{ height:20,width:20,resizeMode: 'contain',tintColor:"#1C2D41"}} />
                  <Text style={{fontSize:20,color:'#1C2D41',marginLeft:15}}>
                    Feedback
                  </Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.props.clickdraver("logout")} style={{marginTop:10}}>
              <View style={{margin:10,flexDirection:'row',alignItems:'center'}}>
                  <Image source={require("../../assets/logoutlist.png")} style={{ height:20,width:20,resizeMode: 'contain',tintColor:"#1C2D41"}} />
                  <Text style={{fontSize:20,color:'#1C2D41',marginLeft:15}}>
                    Logout
                  </Text>
              </View>
          </TouchableOpacity>
        </View>
        <View style={{position:'absolute',top:90,left:10,flexDirection:'row',alignItems:'center'}}>

          {
            this.state.user.profile?
            <View style={{borderRadius:500,overflow:"hidden",backgroundColor:"#201F3E",marginRight:20,}}>
              <Image  source={{uri: `${this.state.user.profile}` }} style={{width:70,height:70,resizeMode: 'cover',overflow:"hidden"}} />
            </View>
            :
              <Image source={require("../../assets/face_left.png")} style={{marginRight:20,width:130,height:130,resizeMode: 'contain'}} />
          }
              <View>
              <Text style={{fontSize:15,color:'#fff',marginTop:35,bottom:30,fontWeight:"bold"}}>
              {this.state.user.firstName + " " + this.state.user.lastName}
              </Text>
              <Text style={{fontSize:12,color:'#000',position:"absolute",marginTop:40,fontWeight:"bold"}}>
                {this.state.user.department.department}
              </Text>
              </View>
        </View>
        <View style={{position:'absolute',top:130,right:5,justifyContent:"center",flexDirection:'row',alignItems:'center'}}>
        <View style={{padding:4,borderRadius:30,marginLeft:0}}>
          <Image source={require("../../assets/psum.png")} style={{ height:25,width:25}} />
        </View>
          <Switch
            trackColor={{ false: "#767577", true: "#54D584" }}
            thumbColor={this.state.isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={()=>{this.UpdateUser() }}
            value={this.state.isEnabled}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:(Dimensions.get('window').width)-100,
    backgroundColor: '#F9F9F9',
    borderTopRightRadius:50,
    overflow:"hidden"
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  }
})
