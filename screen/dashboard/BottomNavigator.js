import React, { Component } from 'react';
import { BackHandler,AsyncStorage,FlatList,View, Image, StyleSheet, TouchableOpacity,Dimensions,TouchableHighlight ,TouchableWithoutFeedback, Animated, Text, Alert ,ScrollView} from 'react-native';
import HomeScreen from "./HomeScreen.js";
import ExtraScreen from "./ExtraScreen.js";
import FeedScreen from "./FeedScreen.js";
import ChatListScreen from "./ChatListScreen.js";
import ProfileScreen from "./ProfileScreen.js";
import Overlay from 'react-native-modal-overlay';
import Drawer from 'react-native-drawer'
import ControlPanel from './ControlPanel.js'
import UserAuthServices from './Services/UserAuthServices.js';
import RBSheet from "react-native-raw-bottom-sheet";
import { NavigationContainer } from '@react-navigation/native';

export default class BottomNavigator extends Component {

    toggleOpen = () => {
          this.setState({ isVisiblepayment:true})
    }

    constructor(){
        super();
        this.state={
        home : true,
        feed : false,
        chat : false,
        profile : false,
        isactivitylog:false,
        view:null,
        activity:[],
        activitylog:[],
        isVisiblepayment : false,
        user:null,
        item: { "id": 1, "name": "" ,"title":"","description":"","image":""},
       }
       this.clickdraver = this.clickdraver.bind(this);
       this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
     }

   componentDidMount() {

     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
      this.setState({
        view:<HomeScreen myprop={this} draweropen={this._drawer}/>
      })
      this.userdata();
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    async GetActivityList(){
      console.log(this.state.user.token)
      try {
        const { data } = await UserAuthServices.GetActivityAll(this.state.user.token)
        var datalist=[]
        var that = this
        console.log(data);
        data.data.forEach(function(item) {
            datalist.push(
              <TouchableOpacity underlayColor='#FFFFF'  style={{ borderRadius:10,width:(Dimensions.get('window').width)-120,backgroundColor:"#E5D7FE",height: 60, margin:5,justifyContent:"center"}} onPress={()=> { that.setState({item:item,isactivitylog:false}); that.RBSheet.open() } }>
                <View style={{flexDirection:'row'}}>
                  <Image source={{uri: `${item.image}`}} style={{ height:25,width:25,resizeMode: 'contain' ,marginLeft:15}} />
                  <Text style={{fontSize:18,color:'#000',marginLeft:5,marginLeft:10}}>
                    {item.shortTitle}
                  </Text>
                </View>
              </TouchableOpacity>
            );
        })
        this.setState({
           activitylog:datalist
        })
        console.log(data.data);
      }catch(error){
        console.log(error)
        this.dropDownAlertRef.alertWithType('error', 'Failed',error.response.data.message);
        this.setState({loadmood: !this.state.loadmood})
      }
    }

    userdata(){
      AsyncStorage.getItem("User").then((value) => {

           this.setState({
             user:JSON.parse(value)
           })
           this.GetActivityList()
        }).done();
    }

    handleBackButtonClick() {
      return true;
    }

    clickdraver(string){
      if(string=="home" && !this.state.home){
        this.setState({ view:<HomeScreen myprop={this} draweropen={this._drawer}/>
         ,home : true,
          feed : false,
          chat : false,
          profile : false,  })
      }else if(string=="profile" && !this.state.profile){
        this.setState({ view:<ProfileScreen myprop={this} draweropen={this._drawer}/>
          ,home : false,
           feed : false,
           chat : false,
           profile : true, })
      }else if(string=="messages" && !this.state.chat){
        this.setState({ view:<ChatListScreen myprop={this} draweropen={this._drawer}/>
          ,home : false,
           feed : false,
           chat : true,
           profile : false,  })
      }else if(string=="feedback" && !this.state.feed){
        this.props.navigation.navigate("FeedBackScreen");
      }else if(string=="logout"){

        this.removeItemValue("User");
      }
      this._drawer.close()
    }

    async removeItemValue(key) {
    try {
        await AsyncStorage.removeItem(key);
        this.props.navigation.pop(1)
        this.props.navigation.navigate("LoginScreen");
        return true;
    }
    catch(exception) {
        return false;
    }
  }
    render() {

        return (
          <NavigationContainer>
          <Drawer
            ref={(ref) => this._drawer = ref}
            type="overlay"
            content={
              <ControlPanel closeDrawer={this.closeDrawer} clickdraver={this.clickdraver}/>
            }
            acceptDoubleTap
            styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
            onOpen={() => {
              console.log('onopen')
              this.setState({drawerOpen: true})
            }}
            onClose={() => {
              console.log('onclose')
              this.setState({drawerOpen: false})
            }}
            captureGestures={false}
            tweenDuration={100}
            panThreshold={0.08}
            disabled={this.state.drawerDisabled}
            openDrawerOffset={(viewport) => {
              return 100
            }}

            negotiatePan
            >
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'grey',
                elevation:20,
            }}>

                  {this.state.view}

                <View style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    backgroundColor: '#fff',
                    width: 56,
                    height: 56,
                    borderRadius: 35,
                    bottom: 25,
                    zIndex: 10
                }}>

                    <TouchableWithoutFeedback onPress={this.toggleOpen}>
                        <View style={[styles.button, styles.actionBtn]}>

                          {
                            this.state.isVisiblepayment?
                            <Image style={{ width: 40, height: 40 ,marginLeft:0}}
                                resizeMode="contain"
                                  source={require('../../assets/cross.png')} />
                            :
                            <Image style={{ width: 40, height: 40 ,marginLeft:0}}
                                resizeMode="contain"
                                  source={require('../../assets/pulse_bottom.png')} />
                          }

                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{

                    position: 'absolute',
                    backgroundColor: 'white',
                    border: 2,
                    radius: 3,
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    shadowOffset: {
                        height: 3, width: 3
                    },
                    x: 0,
                    y: 0,
                    style: { marginVertical: 5 },
                    bottom: 0,
                    width: '100%',
                    height: 56,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 25


                }}>

                    <View style={{


                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                        style={{
                            flexDirection: 'column',alignItems: 'center',justifyContent:'center'
                        }}
                        
                        onPress={() =>  {this.setState({ view:<HomeScreen myprop={this} draweropen={this._drawer}/>
                         ,home : true,
                          feed : false,
                          chat : false,
                          profile : false,  })}} >
                            <Image

                                style={{ width: 18, height: 20 , tintColor:this.state.home ?"#201F3E" :"#babfc5"}}
                                source={require('../../assets/home.png')}
                                onPress={()=>{Alert.alert("")}}
                            >

                            </Image>
                            <Text style={{justifyContent:'center',alignItems:'center',textAlign:'center',color: this.state.home ?"#201F3E" :"#babfc5"}}>Home</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center',justifyContent:'center',marginStart:30
                    }}>

                        <TouchableOpacity
                        style={{
                            flexDirection: 'column',alignItems: 'center',justifyContent:'center'
                        }}
                            onPress={() => this.setState({ view:<FeedScreen myprop={this} draweropen={this._drawer}/>
                              ,home : false,
                               feed : true,
                               chat : false,
                               profile : false, }) }
                        >
                            <Image
                                style={{  width: 20, height: 20 ,tintColor:this.state.feed ?"#201F3E" :"#babfc5"}}
                                source={require('../../assets/feed.png')}
                                onPress={() => { Alert.alert("click") }}
                            />

                            <Text style={{justifyContent:'center',alignItems:'center',textAlign:'center',color:  this.state.feed ?"#201F3E" :"#babfc5" }}>Feed </Text>
                        </TouchableOpacity>
                    </View>

                        <View style={{
                             flexDirection: 'column', alignItems: 'center',justifyContent:'space-between',marginStart:85,
                        }}>

                            <TouchableOpacity
                            style={{
                                flexDirection: 'column',alignItems: 'center',justifyContent:'center'
                            }}
                                onPress={() => this.setState({ view:<ChatListScreen myprop={this} draweropen={this._drawer}/>
                                  ,home : false,
                                   feed : false,
                                   chat : true,
                                   profile : false,  })}
                            >
                                <Image
                                    source={require('../../assets/chat.png')}
                                    onPress={() => { Alert.alert("click") }}
                                    style={{ marginHorizontal: 16, width: 20, height: 20 ,tintColor:this.state.chat ?"#201F3E" :"#babfc5"}}
                                    containerStyle={{ marginHorizontal: 16 }}
                                />

                                <Text style={{justifyContent:'center',alignItems:'center',color:  this.state.chat ?"#201F3E" :"#babfc5" }}>Chat </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                             flexDirection: 'column', alignItems: 'center',justifyContent:'space-between',
                        }}>

                            <TouchableOpacity
                            style={{
                                flexDirection: 'column',alignItems: 'center',justifyContent:'center'
                            }}
                                onPress={() => this.setState({ view:<ProfileScreen myprop={this} draweropen={this._drawer}/>
                                  ,home : false,
                                   feed : false,
                                   chat : false,
                                   profile : true, }) }
                            >
                                <Image
                                    source={require('../../assets/profile.png')}

                                    style={{ marginHorizontal: 16, width: 20, height: 20 ,tintColor:this.state.profile ?"#201F3E" :"#babfc5"}}
                                    containerStyle={{ marginHorizontal: 16 }}
                                />

                                <Text style={{justifyContent:'center',alignItems:'center',color:  this.state.profile ?"#201F3E" :"#babfc5"}}>Profile </Text>
                            </TouchableOpacity>
                        </View>

                        <Overlay visible={this.state.isVisiblepayment} onClose={()=> this.setState({ isVisiblepayment: false})} closeOnTouchOutside
                         containerStyle={{
                             backgroundColor: "#00000099",
                           }}
                           childrenWrapperStyle={{
                               borderRadius:15,
                               position:'absolute',
                               alignItems:"center",
                               left:0,
                               right:0,
                               margin:30,
                               bottom:90,
                             }}>
                             <View style={{marginTop:10}}>
                             </View>
                             <ScrollView style={styles.SplashScreen_RootView}>
                               <View style={{ justifyContent: 'center',alignItems:"center"}}>
                                <TouchableHighlight underlayColor='#FFFFF' onPress={()=> { this.setState({ isVisiblepayment: false}); this.props.navigation.navigate("TakeBreath")} }>
                                    <Image source={require("../../assets/take_a_breath.png")} style={{ height: 45, resizeMode: 'contain',marginBottom:10}} />
                                </TouchableHighlight>

                                <TouchableHighlight underlayColor='#FFFFF' onPress={()=> { this.setState({ isVisiblepayment: false,isactivitylog:true}) }}>
                                    <Image source={require("../../assets/tips.png")} style={{ height: 45, resizeMode: 'contain',marginBottom:10}} />
                                </TouchableHighlight>


                                <TouchableHighlight underlayColor='#FFFFF' onPress={()=> { this.setState({ isVisiblepayment: false}); this.props.navigation.navigate("FinalScreen")} }>
                                    <Image source={require("../../assets/get_help.png")} style={{ height: 45, resizeMode: 'contain',marginBottom:10}} />
                                </TouchableHighlight>
                               </View>
                             </ScrollView>
                       </Overlay>


                       <Overlay visible={this.state.isactivitylog} onClose={()=> this.setState({ isactivitylog: false})} closeOnTouchOutside
                           containerStyle={{
                               backgroundColor: "#00000099",
                             }}
                             childrenWrapperStyle={{
                                 borderRadius:15,
                                 position:'absolute',
                                 alignItems:"center",
                                 left:0,
                                 right:0,
                                 margin:30,
                                 bottom:90,
                               }}>
                            <ScrollView style={styles.SplashScreen_RootView}>
                            <View style={{marginTop:5,marginBottom:10}}>
                            <Text style={{textAlign:"center",color:"#A4ABB3"}}>
                            Here are some additional quick tips that
                              can help when feeling uneasy.
                            </Text>
                            </View>
                              <View style={{marginTop:0,alignItems:"center"}}>
                                {this.state.activitylog}
                              </View>
                            </ScrollView>

                      </Overlay>
                </View>

                <RBSheet
                      ref={ref => {
                        this.RBSheet = ref;
                      }}
                      height={310}
                      openDuration={250}
                      customStyles={{
                        container: {
                          alignItems: "center",
                          borderRadius:20,
                        }
                      }}
                    >

                        <View style=
                            {{
                              margin:5,
                              padding:10,}}>

                          <View style={{
                                justifyContent: 'center', alignItems: 'center', }}>

                              <View style={{borderRadius:50,overlay:"hidden"}}>
                                <Image source={{uri: `${this.state.item.image}`}} style={{ height:90,width:90,resizeMode: 'contain',borderRadius:50 }} />
                              </View>

                              <Text style={{fontSize:18,color:"#000",fontWeight:'bold'}}>{this.state.item.title}</Text>

                              <Text style={{fontSize:18,color:"#000",marginTop:20,textAlign:'center'}}>{this.state.item.description}</Text>

                              <TouchableOpacity style={{
                                borderRadius:50,
                                marginTop:10,
                                backgroundColor:"#201F3E",
                                width:(Dimensions.get('window').width)-130,
                                padding:10,
                                justifyContent: 'center', alignItems: 'center', }} onPress={() => this.RBSheet.close()}>

                                    <Text style={{fontSize:18,color:"#fff",fontWeight:'bold'}}>Close</Text>

                              </TouchableOpacity>

                        </View>

                      </View>

               </RBSheet>
            </View>



            </Drawer>
        </NavigationContainer>
        );
    }


}


const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 0,
        right: 5,
        top:1,
        left: -2,
        shadowOpacity: 5.0,

    },
    actionBtn: {
      justifyContent: 'center',
      alignItems: 'center',
        backgroundColor: '#e9ebed',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#fff'


    }


});
