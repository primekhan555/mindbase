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
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableHighlight,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Picker,
  ActivityIndicator,
  AsyncStorage,
  BackHandler
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
import UserAuthServices from './Services/UserAuthServices.js';
import Moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropdownAlert from 'react-native-dropdownalert';


export default class EditProfile extends Component//<{}>
{
    constructor(){
      super();
      this.state={
        isVisible : true,
        ismail:0,
        ispasswoed:0,
        isfirst:0,
        islast:0,
        isyes:true,
        isalmost:false,
        isofficer:0,
        isnot:false,
        isbirth:false,
        birth:0,
        date:"Birthdate",
        isDatePickerVisible:false,
        firstname:"",
        lastname:"",
        oferid:"",
        oficer:"",
        datenam:"",
        email:"",
        phoneno:"",
        password:"",
        load:false,
        user:{
          lastName:"",
          firstName:""
        },
        refreshing:false,
        departmentvalue:"",
        department:[]
     }
     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

    componentDidMount() {
      var that = this;
      this.userdata()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)

    }
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
    handleBackButtonClick() {
      // if(this.state.show){
      //     this.setState({show:!this.state.show})
      // }
      this.props.navigation.pop(1)
      return true;
    }

    userdata(){
      AsyncStorage.getItem("User").then((value) => {
           this.setState({
             user:JSON.parse(value)
           })

           console.log(value);
           var that = this
           setTimeout(function(){
             that.GetDeparetment()
           }, 300);
        }).done();
    }

    GetChatList(){
      this.setState({
        firstname:this.state.user.firstName,
        lastname:this.state.user.lastName,
        oferid:this.state.user.officerId,
        email:this.state.user.email,
        phoneno:this.state.user.phone.toString(),
        datenam:this.state.user.birthDate.substring(0, 10),
        departmentvalue:this.state.user.department._id
      })

      if(this.state.user.gender =="Male"){
          this.setState({
            isyes:true,
            isalmost:false,
          })
      }else{
          this.setState({
            isyes:false,
            isalmost:true,
          })
      }
    }

    async GetDeparetment(){
      try {
        const { data } = await UserAuthServices.GetDepartment()
        var datslit = []
        console.log(data);
        data.data.forEach(function(item) {
          datslit.push(<Picker.Item label={item.department} value={item._id} />)
        });
        this.setState({
          department:datslit
        })
        var that = this
        setTimeout(function(){
          that.GetChatList()
        }, 300);
      }catch(error){
        console.log(error)
        this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
        this.setState({loadmood: !this.state.loadmood})
      }
    }

    async registeruser(){
      if(this.state.firstname=="" ||this.state.lastname=="" || this.state.email==""|| this.state.phoneno==""){
          this.dropDownAlertRef.alertWithType('error', 'Error', "All Fileds not be empty");
        return
      }
      try {
        this.setState({load: !this.state.load})
        var gender = "Female"
        if(this.state.isyes){
          gender="Male"
         }
        const { data } = await UserAuthServices.UserUpdatem(this.state.user._id,this.state.user.token,this.state.firstname, this.state.lastname, this.state.oferid,this.state.email, gender, this.state.phoneno,this.state.datenam,this.state.departmentvalue)
        console.log(data.data);
        console.log(this.state.departmentvalue);
        var usermain = this.state.user
        usermain["firstName"] = this.state.firstname
        usermain["lastName"] = this.state.lastname
        usermain["officerId"] = this.state.oferid
        usermain["phone"] = this.state.phoneno
        usermain["birthDate"] = this.state.datenam
        usermain["gender"] = data.data["gender"]
        usermain["department"]["_id"] = this.state.departmentvalue
        usermain["department"]["department"] = data.data.department.department
        this.setState({
           user:usermain
        })
        await AsyncStorage.setItem(
          'User',
          JSON.stringify(usermain)
        );
        this.dropDownAlertRef.alertWithType('success', 'Success', "Update Successfull");
      }catch(error){
        console.log(error)
        console.log(error.response.data)
        this.dropDownAlertRef.alertWithType('error', 'Failed', error.response.data.message);
        this.setState({load: !this.state.load})
      }
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

             <View style={[styles.leftContainer,{flexDirection:"row",height:56,alignItems:"center"}]}>
               <TouchableOpacity onPress={()=>this.props.navigation.pop(1)}>
                   <Icon
                    name='chevron-left'
                    size={45}
                    color='#fff'
                  />
               </TouchableOpacity>
               <Text style={{ fontSize:20,color: "#fff",textAlign:'center' ,marginLeft:5,margin:10,fontWeight:'bold'}}> EditProfile </Text>
             </View>
        </View>

        <ScrollView style={styles.SplashScreen_RootView}>
          <View style={styles.slide}>

           <View style={[styles.searchSection,{  elevation: this.state.isfirst,}]}>
           <View
           style={{
               marginRight:10,
               justifyContent: 'center',
               borderRightColor: '#E0E0E0',
           }}
           >
             <Icon
              name='user'
              size={25}
              color='#1c2d41'
            />
           </View>

           <TextInput
               onFocus={ () => this.setState({isfirst:20}) }
               onBlur={ () => this.setState({isfirst:0})}
               style={styles.input}
               value={this.state.firstname}
               placeholder="First Name"
               onChangeText={(searchString) => {this.setState({ firstname:searchString})}}
               underlineColorAndroid="transparent"
           />
          </View>
          <View style={{borderBottomWidth: 2,borderBottomColor: '#e5e8ef',width: (Dimensions.get('window').width)-40,marginLeft:20,marginRight:20,alignItems:'center'}}/>

            <View style={[styles.searchSection,{  elevation: this.state.islast,}]}>
            <View
            style={{
                marginRight:10,
                justifyContent: 'center',
                borderRightColor: '#E0E0E0',
            }}
            >
              <Icon
               name='user'
               size={25}
               color='#1c2d41'
             />
            </View>

            <TextInput
                onFocus={ () => this.setState({islast:20}) }
                onBlur={ () => this.setState({islast:0})}
                style={styles.input}
                value={this.state.lastname}
                placeholder="Last Name"
                onChangeText={(searchString) => {this.setState({ lastname:searchString})}}
                underlineColorAndroid="transparent"
            />
           </View>
           <View style={{borderBottomWidth: 2,borderBottomColor: '#e5e8ef',width: (Dimensions.get('window').width)-40,marginLeft:20,marginRight:20,alignItems:'center'}}/>


           <View style={{
               width: (Dimensions.get('window').width)-40,marginLeft:25,marginRight:20,marginTop:20}}>
                <Text style={{fontSize: 14,color:"#7d8092",fontWeight: "bold",}}>Gender</Text>

               <View style={{ flex:1,  flexDirection: 'row',marginTop: 10 ,alignItems:'center' }}>
               <TouchableHighlight underlayColor='#FFFFF' onPress={()=> this.setState({ isyes:true,isalmost:false,isnot:false })}  style={{ flex:1, }}>
                <View style={{flexDirection: 'row' , opacity: this.state.isyes? 1 : 0.5 , alignItems: 'center',}}>
                   <View>
                    <TouchableOpacity
                     onPress={()=> this.setState({ isyes:true,isalmost:false,isnot:false })}
                     style={ [styles.button,{  backgroundColor:'#201F3E'}] }
                    >
                      <View style={ styles.checkedButton } />
                    </TouchableOpacity>
                    </View>
                   <Text> Male </Text>
                 </View>
                 </TouchableHighlight>

                 <TouchableHighlight underlayColor='#FFFFF' onPress={()=> this.setState({ isyes:false,isalmost:true,isnot:false })} style={{ flex:1, }}>
                 <View style={{ flex:1, flexDirection: 'row' , opacity: this.state.isalmost? 1 : 0.5 , alignItems: 'center',}}>
                    <View>
                     <TouchableOpacity
                       onPress={()=> this.setState({ isyes:false,isalmost:true,isnot:false })}
                       style={ [styles.button,{  backgroundColor:'#201F3E'}] }
                     >
                       <View style={ styles.checkedButton } />
                     </TouchableOpacity>
                     </View>
                    <Text> Female </Text>
                  </View>
                  </TouchableHighlight>
               </View>
           </View>


           <View style={[styles.searchSection,{  elevation: this.state.isofficer,}]}>
           <View
           style={{
               marginRight:10,
               justifyContent: 'center',
               borderRightColor: '#E0E0E0',
           }}
           >
             <Icon
              name='user'
              size={25}
              color='#1c2d41'
            />
           </View>

           <TextInput
               onFocus={ () => this.setState({isofficer:20}) }
               onBlur={ () => this.setState({isofficer:0})}
               style={styles.input}
               value={this.state.oferid}
               placeholder="Officer Id"
               onChangeText={(searchString) =>  {this.setState({ oferid:searchString})} }
               underlineColorAndroid="transparent"
           />
          </View>
          <View style={{borderBottomWidth: 2,borderBottomColor: '#e5e8ef',width: (Dimensions.get('window').width)-40,marginLeft:20,marginRight:20,alignItems:'center'}}/>

          <View style={{
              width: (Dimensions.get('window').width)-40,marginLeft:25,marginRight:20,marginTop:10}}>
           <Text style={{fontSize: 14,color:"#7d8092",fontWeight: "bold",}}>Department</Text>
             <Picker
               style={{ width: (Dimensions.get('window').width)-70 ,fontWeight:'bold'}}
               itemStyle={{fontWeight:'bold'}}
               selectedValue={this.state.departmentvalue}
               onValueChange={(value) => {
                  this.setState({departmentvalue: value});
                }}
             >
              <Picker.Item label={'Select Department'} value={""} />
              {this.state.department}
            </Picker>
          </View>



         {/* <View style={{borderBottomWidth: 2,borderBottomColor: '#e5e8ef',width: (Dimensions.get('window').width)-40,marginLeft:20,marginRight:20}}/>
           <TouchableOpacity onPress={()=> this.setState({ isDatePickerVisible:true }) }>
             <View style={{ flexDirection: 'row',
             position: 'relative',
             backgroundColor: "#fff",
             borderRadius: 5,
             padding:13,
             marginLeft:20,
             marginRight:20,
             marginTop:20,
             overflow: "hidden",
             elevation: this.state.ismail,}}>
               <View
               style={{
                   marginRight:10,
                   borderRightColor: '#E0E0E0',
               }}
               >
                 <Icon
                  name='calendar'
                  size={25}
                  color='#1c2d41'
                />
               </View>

               <View
                   onFocus={ () => this.setState({ismail:20}) }
                   onBlur={ () => this.setState({ismail:0})}
               >
                 <Text style={{color:"#b9bac3",marginLeft:8}}>{this.state.date}</Text>
               </View>
            </View>
            </TouchableOpacity>
          */}

         <View style={[styles.searchSection,{  elevation: this.state.birth,}]}>
          <View
          style={{
              marginRight:10,
              justifyContent: 'center',
              borderRightColor: '#E0E0E0',
          }}
          >
            <Icon
             name='calendar'
             size={25}
             color='#1c2d41'
           />
          </View>

          <TextInput
              onFocus={ () => this.setState({birth:20}) }
              onBlur={ () => this.setState({birth:0})}
              style={styles.input}
              value={this.state.datenam}
              keyboardType='numeric'
              placeholder="YYYY-MM-DD"
              onChangeText={(searchString) =>  {this.setState({ datenam:searchString})}}
              underlineColorAndroid="transparent"
          />
         </View>


            <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={(date) => this.handleConfirm(date) }
                onCancel={() => this.setState({ isDatePickerVisible:false })}
              />

           <View style={{borderBottomWidth: 2,borderBottomColor: '#e5e8ef',width: (Dimensions.get('window').width)-40,marginLeft:20,marginRight:20,alignItems:'center'}}/>
              <View style={[styles.searchSection,{  elevation: this.state.ismail,}]}>
              <View
              style={{
                  marginRight:10,
                  justifyContent: 'center',
                  borderRightColor: '#E0E0E0',
              }}
              >
                <Icon
                 name='mail'
                 size={25}
                 color='#1c2d41'
               />
              </View>

              <TextInput
                  onFocus={ () => this.setState({ismail:20}) }
                  onBlur={ () => this.setState({ismail:0})}
                  style={styles.input}
                  placeholder="Work Email"
                  value={this.state.email}
                  editable={false}
                  autoCapitalize = 'none'
                  onChangeText={(searchString) =>  {this.setState({ email:searchString})} }
                  underlineColorAndroid="transparent"
              />
             </View>
                 <View style={{borderBottomWidth: 2,borderBottomColor: '#e5e8ef',width: (Dimensions.get('window').width)-40,marginLeft:20,marginRight:20,alignItems:'center'}}/>

                 <View style={[styles.searchSection,{  elevation: this.state.isphone,}]}>
                 <View
                 style={{
                     marginRight:10,
                     justifyContent: 'center',
                     borderRightColor: '#E0E0E0',
                 }}
                 >
                   <Icon
                    name='phone'
                    size={25}
                    color='#1c2d41'
                  />
                 </View>

                 <TextInput
                     onFocus={ () => this.setState({isphone:20}) }
                     onBlur={ () => this.setState({isphone:0})}
                     style={styles.input}
                     keyboardType='numeric'
                     placeholder="Phone No"
                     value={this.state.phoneno}
                     onChangeText={(searchString) => {this.setState({ phoneno:searchString})}}
                     underlineColorAndroid="transparent"
                 />
                </View>
                <View style={{borderBottomWidth: 2,marginBottom:5,borderBottomColor: '#e5e8ef',width: (Dimensions.get('window').width)-40,marginLeft:20,marginRight:20,alignItems:'center'}}/>

                </View>
        </ScrollView>
        <TouchableOpacity style={{backgroundColor:'#201F3E',padding:5,height:50,justifyContent:"center"}} onPress={()=> this.registeruser()}>
            <Text style={{color:"#fff",textAlign:"center",fontSize:20}}>Edit Profile
            </Text>
        </TouchableOpacity>
         <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

        </View>
       </>
     );
   }
}


const styles = StyleSheet.create(
{
  SplashScreen_RootView:
  {
    height:'100%',
    backgroundColor: "#FFFFFF",
    flex:1,
  },
  slide: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  slide_login: {
     flex:1,
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:15
  },
  text: {
    color: "#000000",
    fontSize: 30,

    fontWeight: "bold",
    marginTop:150,
    marginLeft:30,
  },
  textlabale: {
    color: "#b2b3b2",
    fontSize: 15,

    marginLeft:30,
    marginBottom:30
  },
  text_foget: {
    color: "#f6585d",
    fontSize: 15,
    marginLeft:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
SplashScreen_ChildView:
{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6585d',
    flex:1,
},
searchSection: {
   flexDirection: 'row',
   position: 'relative',
   backgroundColor: "#fff",
   borderRadius: 5,
   padding:13,
   marginLeft:20,
   marginRight:20,
   marginTop:20,
   overflow: "hidden",
   justifyContent: 'center',
 },
 input: {
   paddingVertical:0,
   marginLeft:2,
   flex:1,
   backgroundColor: '#fff',
   color: '#424242',
 },

cardView_InsideText:{
  height:55,
  fontSize: 20,
  padding:20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',

},
rowbutton: {
  marginTop:30,
  marginLeft:30,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: "#FFFFFF"
},
button: {
 height: 25,
 width: 25,
 borderRadius: 20,
 borderWidth: 0,
 alignItems: 'center',
 justifyContent: 'center',
 marginRight: 5
},
checkedButton: {
width: 25,
height: 25,
borderRadius: 20,
}
});
