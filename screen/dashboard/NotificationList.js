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
  AsyncStorage,
  ImageBackground,
  TouchableOpacity,
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
import UserAuthServices from './Services/UserAuthServices.js';
import Moment from 'moment';
export default class NotificationList extends Component<{}>
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
      refreshing:false,
   }
  }

    componentDidMount() {
      var that = this;
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
        const { data } = await UserAuthServices.GetNotification(this.state.user.token)
        var datslit = data.data
        console.log(data.data);
        this.setState({
          dataSource:datslit,
          loadmood:false
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
       <View style={styles.slide}>
       <StatusBar
            backgroundColor = "#201F3E"
            barStyle = "light-content"
          />
          <View style={[styles.navBar,{backgroundColor:"#201F3E",paddingTop:(Platform.OS === 'ios')?12:0}]}>

             <View style={styles.leftContainer}>
               <TouchableOpacity onPress={()=>this.props.navigation.pop(1)}>
                   <Icon
                    name='chevron-left'
                    size={45}
                    color='#fff'
                  />
               </TouchableOpacity>
               <Text style={{ fontSize:20,color: "#fff",textAlign:'center' ,marginLeft:5,margin:10,fontWeight:'bold'}}> Notification List </Text>
             </View>
        </View>

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
              <View
                  style={[styles.button]}
                >
              <TouchableOpacity underlayColor='#FFFFF'>

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
                         <View style={styles.leftContainer}>
                          {
                            item.post.media?
                            <Image source={{uri: `${item.post.media[0]}`}} style={{width:50, height:50,resizeMode: 'contain',marginRight:20}} />
                            :
                            null
                          }

                           <View>
                             <Text style={{fontSize:15,color:'#000',justifyContent:'center',alignItems: 'center',}}>
                                {item.sender.firstName + " " + item.sender.lastName} {item.message}
                             </Text>

                             <Text style={{fontSize:12,color:'#000',justifyContent:'center',alignItems: 'center',}}>
                              {Moment(item.createdAt).format('DD MMM')}
                             </Text>

                           </View>
                         </View>

                    </View>
                    </View>
                    </TouchableOpacity>
                    </View>
            )}
            //Setting the number of column
            numColumns={1}

           />
       }

        </View>
       </>
     );
   }
}


const styles = StyleSheet.create(
{
  slide: {
    flex:1,
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
