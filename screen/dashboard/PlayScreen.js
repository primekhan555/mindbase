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
  TouchableOpacity
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
import Animated, { Easing } from "react-native-reanimated";
import { runTiming } from "react-native-redash";
import CountDown from 'react-native-countdown-component';
import Slider from "react-native-slider";
import Moment from "moment";
import TrackPlayer, {ProgressComponent} from "react-native-track-player";
import UserAuthServices from './Services/UserAuthServices.js';

export default class PlayScreen extends TrackPlayer.ProgressComponent
{

  // constructor(){
  //     super();
  //     this.state={
  //     isVisible : true,
  //     ismail:0,
  //     ispasswoed:0,
  //     isVisible : true,
  //     countdown:90,
  //     breath:false,
  //     sterch:false,
  //     mind:false,
  //     trackLength: 28,
  //     timeElapsed: "0:00",
  //     timeRemaining: "5:00",
  //     load:true,
  //     playbackState:0,
  //     corrent:0,
  //    }
  //
  //  }

   changeTime = seconds => {
    console.log("sad");
    this.setState({ timeElapsed: Moment.utc(seconds * 1000).format("m:ss") });
    this.setState({ timeRemaining: Moment.utc((this.state.trackLength - seconds) * 1000).format("m:ss") });
  };

  componentDidMount(){
    super.componentDidMount()
    console.log(this.props.navigation.state.params.item);
    this.setState({
          isVisible : true,
          mainitem: this.props.navigation.state.params.item,
          playlistmain:this.props.navigation.state.params.playlist,
          index:this.props.navigation.state.params.index,
          ismail:0,
          ispasswoed:0,
          isVisible : true,
          countdown:90,
          breath:false,
          sterch:false,
          mind:false,
          trackLength: 0,
          timeElapsed: "0:00",
          timeRemaining: "5:00",
          load:true,
          playbackState:0,
          corrent:0,
          button : require("../../assets/ic_play_arrow_48px.png")
    })
    onTrackChange:""
    this.setup()

  }

  async setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE
      ]
    });
    TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
      this.setState({
        button:require("../../assets/ic_play_arrow_48px.png")
      })
    });
    console.log("setop");

    this.onTrackChange = TrackPlayer.addEventListener('playback-track-changed', async (data) => {

      console.log("chn-------------------------age");

    });
            // console.log("-------------------");
            // console.log(data.nextTrack);
            // if(data.nextTrack!=null){
            //   let trackObject = await TrackPlayer.getTrack(data.nextTrack);
            //
            //   console.log(trackObject);
            //   console.log("----check data---------");
            //   console.log(trackObject.title);
            // }
            // let trackId = await TrackPlayer.getCurrentTrack();

            // console.log("---------------------------");
            // if(trackObject!=null){
            //   console.log(trackObject);
            //   console.log(trackObject.artwork);
            //   if(trackObject){
            //     console.log("done");
            //   }
              // item["image"] = trackObject.artwork
              // item["title"] = trackObject.title
              // item["_id"] = trackObject.id
              // item["mp3"] = trackObject.url
              // this.setState({
              //     mainitem: item
              // });
            // }else{
            //   console.log("no");
            // }

            // track.then((value)=>{
            //     console.log(value.title);
            //     // item["image"] = value.artwork
            //     // item["title"] = value.title
            //     // item["_id"] = value.id
            //     // item["mp3"] = value.url
            //     // this.setState({
            //     //     mainitem: item
            //     // });
            // })


    this.changeTime(28)
}


async togglePlayback() {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log("start");
  if (currentTrack == null) {
    await TrackPlayer.reset();
    console.log(this.props.navigation.state.params.playlist);
    this.state.playlistmain.map((item)=>{
      console.log(item.title);
      console.log(item.mp3);
        TrackPlayer.add({
          id: item._id,
          url: item.mp3,
          title: item.title,
          artist: item.voiceType,
          artwork: item.image,
        });
    })
    await TrackPlayer.play();
    await TrackPlayer.skip(this.props.navigation.state.params.item._id);

    this.setState({
      button:require("../../assets/pausemain.png")
    })
  } else {
    console.log(this.state.position);
    console.log(this.state.bufferedPosition);
    console.log(this.state.duration);
    console.log(await TrackPlayer.getPosition());
    TrackPlayer.getState().then((value)=>{
      if (value === TrackPlayer.STATE_PAUSED) {
        TrackPlayer.play();
        this.setState({
          button:require("../../assets/pausemain.png")
        })
      } else {
         TrackPlayer.pause();
         this.setState({
           button:require("../../assets/ic_play_arrow_48px.png")
         })
      }
    })
 }
}

async nextplay(){

  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack != null) {
    await TrackPlayer.skipToNext()
    console.log("next");
    if(this.state.index < this.state.playlistmain.length){
      console.log("next main");
      this.setState({
          index:this.state.index+1
      })
    }
    // const currentTrack = await TrackPlayer.getCurrentTrack();
    // console.log(currentTrack);
    // let trackObject = await TrackPlayer.getTrack(currentTrack);
    //
    // console.log(trackObject);
    // const regilter = this.state.mainitem
    // regilter["image"] = trackObject.artwork
    // regilter["title"] = trackObject.title
    // regilter["_id"] = trackObject.id
    // regilter["mp3"] = trackObject.url
    // this.setState({
    //     mainitem: item
    // });

  }
}

async previos(){
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack != null) {
    await TrackPlayer.skipToPrevious()
    console.log("privous");
    if(this.state.index > 0){
      console.log("privous main");
      this.setState({
          index:this.state.index-1
      })
      console.log(this.state.index);
    }
    // const currentTrack = await TrackPlayer.getCurrentTrack();
    // console.log(currentTrack);
    // let trackObject = await TrackPlayer.getTrack(currentTrack);
    //
    // console.log(trackObject);
    // const regilter = this.state.mainitem
    // regilter["image"] = trackObject.artwork
    // regilter["title"] = trackObject.title
    // regilter["_id"] = trackObject.id
    // regilter["mp3"] = trackObject.url
    // this.setState({
    //     mainitem: item
    // });
  }
}

async getduration() {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack != null) {
    TrackPlayer.getDuration().then((value)=>{
      this.setState({
        trackLength:value
      })
    })
  }
}

async getcuttentpoition() {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack != null) {
    TrackPlayer.getPosition().then((value)=>{
      console.log(value);
      this.setState({
        corrent:value
      })
    })
  }
}

  async backopen(){
    await TrackPlayer.reset();
    // await TrackPlayer.destroy()
    this.props.navigation.pop(1)
  }

  componentWillUnmount() {
    TrackPlayer.reset();
    TrackPlayer.destroy()
     this.onTrackChange.remove();
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
                      <TouchableOpacity underlayColor='#FFFFF' onPress={()=>  this.backopen()}>
                            <View style={{flexDirection:'row'}}>
                              <Icon
                                    name='chevron-left'
                                    size={30}
                                    color='#1c2d41'
                                />
                             </View>
                         </TouchableOpacity>
                      </View>
                      <Text style={{fontSize:18,color:'#000',justifyContent:'center',alignItems: 'center',textAlign:'center'}}>
                                  NOW PLAYING
                      </Text>
                      <TouchableOpacity style={styles.rightContainer}>
                        <Icon
                            name='more-vertical'
                            size={30}
                            color='#1c2d41'
                          />
                      </TouchableOpacity>
                 </View>

                <View style={{alignItems:'center',flex:1}}>

                {
                  this.state.load?
                  <View style={{width:"80%"}}>
                  <View style={{ alignItems: "center" }}>
                      <View style={styles.coverContainer}>
                        <Image source={{uri: `${this.state.playlistmain[this.state.index].image}`}} style={styles.cover}></Image>
                      </View>

                  </View>
                  <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text style={[styles.textDark, { fontSize: 25, fontWeight: "500" }]}>{this.state.playlistmain[this.state.index].title}</Text>
                    <Text style={[styles.text, { fontSize: 16, marginTop: 5 }]}>{this.state.playlistmain[this.state.index].duration} - {this.state.playlistmain[this.state.index].voiceType} Voice</Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center",marginTop: 20,marginBottom: 10}}>
                  <TouchableOpacity style={{marginLeft:5,marginRight:5}}>
                      <Image source={require("../../assets/ic_shuffle_24px.png")} style={{ height: 40, resizeMode: 'contain',margin:10}} />
                  </TouchableOpacity>
                  <TouchableOpacity  style={{marginLeft:10,marginRight:5}}>
                      <Image source={require("../../assets/hart.png")} style={{ height: 40, resizeMode: 'contain',margin:10}} />
                  </TouchableOpacity>
                  <TouchableOpacity  style={{marginLeft:5,marginRight:5}}>
                      <Image source={require("../../assets/repeat.png")} style={{ height: 40, resizeMode: 'contain',margin:10}} />
                  </TouchableOpacity>
                  </View>

                  <View style={{ marginTop:0, flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={[styles.textLight, styles.timeStamp]}>{Moment.utc(this.state.position * 1000).format("m:ss")}</Text>
                  <Text style={[styles.textLight, styles.timeStamp]}>{Moment.utc((this.state.duration) * 1000).format("m:ss")}</Text>
                  </View>
                  </View>
                  :
                  null
                }


                    {
                      this.state.load?
                      <Slider
                      minimumValue={0}
                      maximumValue={this.state.duration}
                      trackStyle={styles.track}
                      value={this.state.position}
                      thumbStyle={styles.thumb}
                      minimumTrackTintColor="#4C94FF"
                      onValueChange={seconds => {this.changeTime(seconds)}}
                      >
                      </Slider>
                      :
                      null
                    }



                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center",position:"absolute",bottom:8,right:0,left:0}}>
                  <TouchableOpacity style={{marginLeft:5,marginRight:5}} onPress={()=>{this.previos()}}>
                      <Image source={require("../../assets/ic_skip_previous_48px.png")} style={{ height: 40, resizeMode: 'contain',margin:10}} />
                  </TouchableOpacity>
                  <TouchableOpacity  style={{marginLeft:10,marginRight:5}} onPress={()=> this.togglePlayback()}>
                      <Image source={this.state.button} style={{ height: 40, resizeMode: 'contain',margin:10}} />
                  </TouchableOpacity>
                  <TouchableOpacity  style={{marginLeft:5,marginRight:5}} onPress={()=>{this.nextplay()}}>
                      <Image source={require("../../assets/ic_skip_previous_right_48px.png")} style={{ height: 40, resizeMode: 'contain',margin:10}} />
                  </TouchableOpacity>
                  </View>
                </View>

               </View>
       </>
     );
   }
}
const styles = StyleSheet.create(
{
     slide: {
       flex:1,
       backgroundColor: "#FFF",
       paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
       height: (Dimensions.get('window').height),
     },
     SplashScreen_RootView:
     {
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
    container: {
     flex: 1,
     backgroundColor: "#EAEAEC"
 },
 textLight: {
     color: "#000"
 },
 text: {
     color: "#8E97A6"
 },
 textDark: {
     color: "#3D425C"
 },
 coverContainer: {
     marginTop: 10,
     alignItems:'center',
     shadowColor: "#5D3F6A",
     shadowOffset: { height: 15 },
     shadowRadius: 8,
     shadowOpacity: 0.3
 },
 cover: {
     width: 190,
     height: 280,
     borderRadius: 15
 },
 track: {
     height:5,
     borderRadius: 1,
     width: (Dimensions.get('window').width)-70,
     backgroundColor: "#858585"
 },
 thumb: {
     width: 10,
     height: 10,
     backgroundColor: "#4C94FF"
 },
 timeStamp: {
     fontSize: 11,
     fontWeight: "500"
 },
 playButtonContainer: {
     width: 60,
     height: 70,
     borderRadius: 64,
     alignItems: "center",
     justifyContent: "center",
     marginHorizontal: 32,
 }
});
