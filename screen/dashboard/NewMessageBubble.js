import React from 'react'

// Import react-native components
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

// Import react-native-svg
// from 'https://github.com/react-native-community/react-native-svg'


// Import react-native-size-matters
// from 'https://github.com/nirsky/react-native-size-matters'
import { moderateScale } from 'react-native-size-matters'
import Moment from 'moment';
import Share from "react-native-share"
// Props info list
// 1. mine (bool) => renders blue bubble on right
// 2. text (string) => renders text message
// 3. image (image file) => renders image inside bubble

// Declare component
class NewMessageBubble extends React.Component {

  SharePost(url){
    let shareImage = {}
    shareImage = {
       url:url,// eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
     }

   Share.open(shareImage)
       .then((res) => { console.log(res) })
       .catch((err) => { err && console.log(err); });

   }


  render(){
    return (
      <View style={[
          styles.message,
          this.props.mine ? styles.mine : styles.not_mine
        ]}
      >
      {
        this.props.mine?

          <View>
            {
              this.props.item.logo?
              <View style={{borderRadius:150,width:40,height:40,overflow:"hidden",backgroundColor:"#201F3E",marginRight:10,alignItems:"center"}}>
                <Image source={{uri:`${this.props.item.logo}`}}style={{alignSelf:'center',width:40, height: 40, resizeMode: 'contain'}} />
              </View>
              :
              <View style={{borderRadius:150,width:40,height:40,overflow:"hidden",backgroundColor:"#201F3E",marginRight:10,justifyContent:"center"}}>
                <Image source={{uri:`${this.props.item.profile}`}}style={{alignSelf:'center',width:40, height: 40, resizeMode: 'contain'}} />
              </View>
            }
           </View>
        :

        null
      }
        <View
          style={[
            styles.cloud,
            {
              backgroundColor: (this.props.mine || this.props.image) ? '#fff' : '#201F3E',
              elevation:(this.props.mine && !this.props.image) ? 15 : 0,
              shadowOffset: { width: 5, height: 10 },
              shadowColor: '#F2F2F2',
              shadowOpacity: 1,
            }
          ]}
        >
          {
            this.props.image
            ?
            <TouchableOpacity onPress={()=>this.SharePost(this.props.image)}>
              <Image
                style={{alignSelf: this.props.mine ? 'flex-start' : 'flex-end', height:120,width:200}}
                borderRadius={10}
                source={{uri:`${this.props.image}`}}
              />
            </TouchableOpacity>
            :
              null
          }
          {
            this.props.text
            ?
              <View>
                <Text
                  style={[
                    styles.text,
                    {
                      color: this.props.mine ? 'black' : 'white'
                    }
                  ]}
                >
                  {this.props.text}
                </Text>

                <View style={{flexDirection:"row",alignItems:"flex-end",marginRight:12,justifyContent: this.props.mine ?'flex-start':'flex-end'}}>
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize:8,
                      color: this.props.mine ? 'black' : 'white',
                      textAlign: 'right', alignSelf: 'stretch',
                    }
                  ]}
                >
                  {Moment(this.props.time).format('hh:mm a')}
                </Text>
                  <Image  source={require("../../assets/tick.png")} style={{ height: 20, marginLeft:5 ,resizeMode: 'contain',alignSelf: this.props.mine ? 'flex-start' : 'flex-end'}} />
                </View>
              </View>
            :
              null
          }
        </View>
        <View
          style={[
            styles.arrow_container,
            this.props.mine ? styles.arrow_left_container : styles.arrow_right_container
          ]}
        >
        </View>
      </View>
    )
  }
}

export default NewMessageBubble

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    marginVertical: moderateScale(7,2)
  },
  mine: {
    marginLeft: 20,
  },
  not_mine: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  cloud: {
    maxWidth: moderateScale(190,2),
    paddingHorizontal: moderateScale(10,2),
    paddingTop: moderateScale(5,2),
    paddingBottom: moderateScale(7,2),
    marginRight:12,
    borderRadius:5
  },
  text: {
    paddingTop: 3,
    fontSize: 12,
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
    alignItems: 'flex-start'
  },
  arrow_right_container: {
    alignItems: 'flex-end'
  },
  arrow_left: {
    left: moderateScale(-6, 0.5)
  },
  arrow_right: {
    right: moderateScale(-6, 0.5)
  }

})
