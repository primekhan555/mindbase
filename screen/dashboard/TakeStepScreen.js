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
  TouchableOpacity ,
  FlatList,
} from 'react-native';

import Icon from "react-native-vector-icons/Feather";
import RBSheet from "react-native-raw-bottom-sheet";

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

export default class TakeStepScreen extends Component
{
  constructor(){
      super();
      this.state={
      isVisible : true,
      ismail:0,
      ispasswoed:0,
      datasourse:[],
      item: { "id": 1, "name": " Reach ou" ,"title":"Reach out to friend and family","sub":"Feeling Supported by others can help you ride out tough feelings.","image":require("../../assets/family.png")},
     }
   }

   componentDidMount() {
    var that = this;
    var jsonData = [
      { "id": 1,"color":"#F2EBFE" ,"name": " Reach ou" ,"title":"Reach out to friend and family","sub":"Feeling Supported by others can help you ride out tough feelings.","image":require("../../assets/family.png")},
      { "id": 2,"color":"#FCEEEE" , "name": "Go for a Walk " ,"title":"Reach out to friend and family","sub":"Feeling Supported by others can help you ride out tough feelings." ,"image":require('../../assets/walk.png')},
      { "id": 3,"color":"#E9F8FE" , "name": "Grab a bite " ,"title":"Reach out to friend and family","sub":"Feeling Supported by others can help you ride out tough feelings." ,"image":require('../../assets/eat.png')},
      { "id": 4,"color":"#FCF3ED" , "name": "Shift your focus" ,"title":"Reach out to friend and family","sub":"Feeling Supported by others can help you ride out tough feelings." ,"image":require('../../assets/soothing.png')},
      { "id": 5,"color":"#F2EBFE" , "name": "Unwind" ,"title":"Reach out to friend and family","sub":"Feeling Supported by others can help you ride out tough feelings." ,"image":require('../../assets/distract.png')}
    ];
    that.setState({
      dataSource: jsonData,
    });
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
                      <TouchableHighlight underlayColor='#FFFFF' onPress={()=> this.props.navigation.goBack()}>
                      <Icon
                            name='chevron-left'
                            size={30}
                            color='#1c2d41'
                        />
                     </TouchableHighlight>



                      <Text style={{fontSize:25,fontWeight: "bold",marginLeft:10,selfAlign:'center'}}>
                          Take a Small Step
                      </Text>

                      </View>
                 </View>


                <ScrollView>

                  <Text style={{fontSize:20,margin:10,textAlign:'center'}}>
                       Here are some additional quick tips that
                       can help when feeling uneasy.
                  </Text>

                  <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.dataSource}
                        renderItem={({ item }) => (
                            <TouchableOpacity style=
                            {{
                              margin:20,
                              elevation:6,
                              borderRadius:15,
                              padding:10,
                              shadowOffset: { width: 5, height: 10 },
                              shadowColor: '#87878860',
                              shadowOpacity: 1,
                              backgroundColor:item.color,}} onPress={() => { this.setState({item:item}); this.RBSheet.open()}}>

                                <View style={{
                                      justifyContent: 'center', alignItems: 'center', }}>

                                    <Image source={item.image} style={{height: 100, resizeMode: 'contain'}} />

                                <Text style={{fontSize:18,color:"#5232c8"}}>{item.name}</Text>
                                </View>

                            </TouchableOpacity>
                        )}
                        //Setting the number of column
                        numColumns={1}

                       />


              </ScrollView>


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

                                    <Image source={this.state.item.image} style={{height: 100, resizeMode: 'contain'}} />

                                    <Text style={{fontSize:18,color:"#000",fontWeight:'bold'}}>{this.state.item.title}</Text>

                                    <Text style={{fontSize:18,color:"#000",marginTop:20,textAlign:'center'}}>{this.state.item.sub}</Text>

                                    <TouchableOpacity style={{
                                      borderRadius:50,
                                      marginTop:10,
                                      backgroundColor:"#5232c8",
                                      width:(Dimensions.get('window').width)-130,
                                      padding:10,
                                      justifyContent: 'center', alignItems: 'center', }} onPress={() => this.RBSheet.close()}>

                                          <Text style={{fontSize:18,color:"#fff",fontWeight:'bold'}}>Close</Text>

                                    </TouchableOpacity>

                              </View>

                            </View>

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
       backgroundColor: "#f8f9fb",
       paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
     },
     SplashScreen_RootView:
     {
      marginBottom:150
     },
     navBar: {
      height: 60,
      backgroundColor: "#fff",
      flexDirection: 'row',
      justifyContent: 'center',
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
