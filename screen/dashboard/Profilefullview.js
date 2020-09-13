/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

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
  RefreshControl,
  Dimensions,
  TextInput,
  BackHandler
} from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import { NavigationActions,StackActions } from "react-navigation";
import Icon from "react-native-vector-icons/Feather";
import UserAuthServices from './Services/UserAuthServices.js';
import IconLike from "react-native-vector-icons/AntDesign";
import ImagesSwiper from "react-native-image-swiper";
import TimeAgo from 'react-native-timeago';
// import DropdownAlert from 'react-native-dropdownalert';
// import ImagePicker from 'react-native-image-picker';
import Moment from 'moment';
export default class Profilefullview extends Component//<{}>
{
  constructor() {
    super();
    this.state = {
      isVisible: true,
      ismail: 0,
      loadmood: true,
      load: false,
      user: {
        lastName: "",
        firstName: ""
      },
      refreshing: false,
      item: {}
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    this.userdata()
    this.setState({
      item: this.props.navigation.state.params.item,
      load: true
    })
    var that = this
    setTimeout(function () {
      console.log("inner")
      that.GetpPostList()
    }, 300);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.navigation.pop(1)
    return true;
  }

  userdata() {
    AsyncStorage.getItem("User").then((value) => {
      this.setState({
        user: JSON.parse(value)
      })
      // this.GetChatList();
    }).done();
  }


  async LikePost(_id) {
    var mainpost = this.state.item
    if (mainpost["isLiked"]) {
      mainpost["totalLikes"] = mainpost["totalLikes"] - 1
    } else {
      mainpost["totalLikes"] = mainpost["totalLikes"] + 1
    }
    mainpost["isLiked"] = !mainpost["isLiked"]
    this.setState({
      item: mainpost
    })
    try {
      const { data } = await UserAuthServices.LikePostuser(this.state.user.token, _id)
    } catch (error) {
      console.log(error)
      this.setState({ loadL: false })
    }
  }

  async CommentPost(_id) {
    if (this.state.searchString != "") {
      try {
        const { data } = await UserAuthServices.CommentPostuser(this.state.user.token, _id, this.state.searchString)
        console.log(data);
        var mainpost = this.state.item
        mainpost["totalComments"] = mainpost["totalComments"] + 1
        this.setState({
          searchString: "",
          item: mainpost
        })
        this.GetpPostList()
      } catch (error) {
        console.log(error)
        this.setState({ loadL: false })
      }
    } else {
      this.dropDownAlertRef.alertWithType('error', 'Failed', "Not Post blank Comment");
    }
  }

  async GetpPostList() {
    try {
      this.setState({
        loadmood: true
      })
      console.log(this.state.item._id);
      const { data } = await UserAuthServices.GetComment(this.state.user.token, this.state.item._id)
      console.log(data.data);
      this.setState({
        dataSource: data.data,
        loadmood: false
      })
    } catch (error) {
      console.log(error)
      this.setState({ loadL: false })
    }
  }

  async SharePost(_id, item) {
    let shareImage = {}
    if (item.media.length > 0) {
      shareImage = {
        title: "Pulse",//string
        message: item.text,//string
        url: item.media[0],// eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
      };
    } else {
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
      const { data } = await UserAuthServices.LikePostuser(this.state.user.token, _id, this.state.user._id)
    } catch (error) {
      console.log(error)
      this.setState({ loadL: false })
    }

  }

  render() {
    return (
      <>
        <View style={styles.slide}>
          <StatusBar
            backgroundColor="#201F3E"
            barStyle="light-content"
          />
          <View style={[styles.navBar, { backgroundColor: "#201F3E", paddingTop: (Platform.OS === 'ios') ? 12 : 0 }]}>

            <View style={styles.leftContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.pop(1)}>
                <Icon
                  name='chevron-left'
                  size={45}
                  color='#fff'
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, color: "#fff", textAlign: 'center', marginLeft: 5, margin: 10, fontWeight: 'bold' }}> Post </Text>
            </View>
          </View>
          <ScrollView>
            {
              this.state.load ?
                <View style={{
                  backgroundColor: "#fff",
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10,
                  borderRadius: 0,
                  elevation: 0,
                  width: (Dimensions.get('window').width) - 30,
                  padding: 10
                }}
                  onPress={() => this.props.myprop.props.navigation.navigate("ProfileScreen")}>

                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ borderRadius: 150, width: 40, height: 40, overflow: "hidden", backgroundColor: "#201F3E", marginRight: 10 }}>
                      <Image source={{ uri: `${this.state.item.user.profile}` }} style={{ width: 40, height: 40, resizeMode: 'contain', marginRight: 20 }} />
                    </View>
                    <View styles={{ marginLeft: 100 }}>
                      <Text style={{ fontSize: 15, color: '#000', justifyContent: 'center', flex: 1, alignItems: 'center', }}>
                        {this.state.item.user.firstName + " " + this.state.item.user.lastName}
                      </Text>
                      <Text style={{ fontSize: 10, color: '#1C2D41', justifyContent: 'center', flex: 1, alignItems: 'center', }}>
                        Fairfax County Police
                  </Text>
                      <TimeAgo time={this.state.item.createdAt} style={{ fontSize: 12, color: '#b3b9c1', justifyContent: 'center', flex: 1, alignItems: 'center', }} />
                    </View>
                  </View>

                  <Text style={{ fontSize: 12, color: "#1C2D41", marginLeft: 5, marginTop: 10 }}>{this.state.item.text}</Text>

                  {
                    (this.state.item.media.length != 0) ?
                      <View style={{ marginTop: 10, borderRadius: 5, overflow: "hidden" }}>
                        <ImagesSwiper
                          images={this.state.item.media}
                          autoplay={true}
                          autoplayTimeout={2}
                          showsPagination={false}
                          width={(Dimensions.get('window').width) - 50}
                          height={200}
                        />
                      </View>
                      :
                      null
                  }

                  <View style={{ borderBottomWidth: 2, borderBottomColor: '#e5e8ef', alignItems: 'center', marginTop: 10 }} />

                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>

                    <TouchableOpacity style={{ flex: 1, padding: 10, borderRadius: 10, marginLeft: 5, marginRight: 5, flexDirection: 'row' }} onPress={() => this.LikePost(this.state.item._id)}>
                      {
                        this.state.item.isLiked ?
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

                      <Text style={{ fontSize: 10, color: "#000", textAlign: 'center', marginLeft: 5 }}> {this.state.item.totalLikes} Like </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1, padding: 10, borderRadius: 10, marginLeft: 5, marginRight: 5, flexDirection: 'row' }}>
                      <Icon
                        name='message-square'
                        size={20}
                        color='#1c2d41'
                      />
                      <Text style={{ fontSize: 10, color: "#000", textAlign: 'center', marginLeft: 5 }}> {this.state.item.totalComments} Comments </Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={{ flex:1,padding:10,borderRadius:10,marginLeft:5,marginRight:5,flexDirection:'row'}} onPress={()=>this.SharePost(this.state.item._id,item)}>
                <Icon
                  name='corner-up-right'
                  size={20}
                  color='#1c2d41'
                />
                  <Text style={{ fontSize:10,color: "#000",textAlign:'center' ,marginLeft:5}}>  {this.state.item.totalShare} Share </Text>
                </TouchableOpacity> */}

                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={{
                        borderRadius: 0,
                        borderColor: '#B5B1B1',
                        borderBottomLeftRadius: 7,
                        borderTopLeftRadius: 7,
                        height: 35,
                        fontSize: 12,
                        width: (Dimensions.get('window').width) - 110,
                        backgroundColor: "#E2DDDD",
                        borderWidth: 0,
                        color: '#424242'
                      }}
                      value={this.state.searchString}
                      placeholder="Write Comment"
                      autoCapitalize='none'
                      onChangeText={(searchString) => { this.setState({ searchString }) }}
                      underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity onPress={() => this.CommentPost(this.state.item._id)} style={{ borderRadius: 5, backgroundColor: "#201F3E", justifyContent: "center", height: 35 }}>
                      <Text style={{ fontSize: 12, color: "#fff", padding: 5, marginLeft: 5, marginRight: 5 }}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                :
                null
            }


            {
              this.state.loadmood ?
                <ActivityIndicator size="large" color="#201F3E" />
                :


                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.dataSource}
                  style={{ flex: 1 }}
                  refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.GetpPostList()} />}
                  renderItem={({ item, index }) => (
                    <View
                      style={[styles.button]}
                    >
                      <TouchableOpacity underlayColor='#FFFFF' >

                        <View style={{
                          backgroundColor: "#fff",
                          marginTop: 5,
                          marginLeft: 20,
                          borderBottomWidth: 1,
                          marginBottom: 5,
                          marginRight: 20,
                          padding: 5
                        }}>
                          <View style={[styles.navBarnew, { backgroundColor: "#fff" }]}>
                            <View style={styles.leftContainer}>
                              <View>
                                <Text style={{ fontSize: 15, color: '#000', justifyContent: 'center', alignItems: 'center', }}>
                                  {item.user.firstName + " " + item.user.lastName}
                                </Text>

                                <Text style={{ fontSize: 18, color: '#000', justifyContent: 'center', alignItems: 'center', }}>
                                  {item.text}
                                </Text>

                                <Text style={{ fontSize: 12, color: '#000', justifyContent: 'center', alignItems: 'center', }}>
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
          </ScrollView>
        </View>
      </>
    );
  }
}


const styles = StyleSheet.create(
  {
    slide: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },

    navBar: {
      height: 70,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navBarnew: {
      marginTop: 10,
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
      marginRight: 10,
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
      paddingVertical: 0,
      borderRadius: 10,
      borderColor: '#fff',
      backgroundColor: "#fff",
      height: 45,
      borderWidth: 1,
      padding: 20,
      margin: 20,
      color: '#000',
    },
  });
