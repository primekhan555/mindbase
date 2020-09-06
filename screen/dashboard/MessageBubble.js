import React from 'react'

// Import react-native components
import {
  StyleSheet,
  View,
} from 'react-native'

import Svg, {
  Defs,
  LinearGradient,
  Pattern,
  Stop,
  G,
  Path,
  Text,
  TSpan,
  Image,
  Circle,
  SvgUri,
} from "react-native-svg"

import { moderateScale } from 'react-native-size-matters'


class MessageBubble extends React.Component {
  render(){
    return (
      <View style={[
          styles.message,
          this.props.mine ? styles.mine : styles.not_mine
        ]}>
          <View
            style={[
              styles.arrow_container,
              this.props.mine ? styles.arrow_left_container : styles.arrow_right_container
            ]}
          >
          {
            this.props.mine
            ?
            <View>
          <Svg
              width={300.999}
              height={96.001}
              viewBox="0 0 300.999 96.001"
              >
              <Defs>
                <Pattern
                  id="prefix__b"
                  preserveAspectRatio="xMidYMid slice"
                  width="100%"
                  height="100%"
                  viewBox="0 0 256 256"
                >
                <SvgUri
                  width="250"
                  height="250"
                  source={{uri:'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg'}}
                  />
                </Pattern>
              </Defs>
              <G data-name={1} transform="translate(-20 -137)">
                <G data-name="Group 11999">
                  <G
                    transform="translate(20 137)"
                    filter="url(#prefix__a)"
                    data-name="Group 11997"
                  >
                    <Path
                      data-name="Rounded Rectangle 1"
                      d="M49.148 77a3 3 0 01-3-3V39.724c-1.013-9.41-8.525-21.74-8.525-21.74-4.638-6.256 2.14-6.984 2.14-6.984H283a3 3 0 013 3v60a3 3 0 01-3 3z"
                      fill="#fff"
                    />
                  </G>
                  <G
                    data-name="Group 11998"
                    fontFamily="SourceSansPro-Regular,Source Sans Pro"
                  >
                    <Text
                      data-name="We've been busy all weekend. You?"
                      transform="translate(80 170)"
                      fill="#495767"
                      fontSize={12}
                    >
                      <TSpan x={0} y={0}>
                        {"We&apos;ve been busy all weekend. You?"}
                      </TSpan>
                    </Text>
                    <Text
                      data-name="10:30 AM"
                      transform="translate(264 205)"
                      fill="#a4abb3"
                      fontSize={8}
                    >
                      <TSpan x={0} y={0}>
                        {"10:30 AM"}
                      </TSpan>
                    </Text>
                  </G>
                </G>
                <Circle
                  cx={15}
                  cy={15}
                  r={15}
                  transform="translate(20 148)"
                  fill="url(#prefix__b)"
                />
              </G>
              </Svg>
              </View>
            :

            <View
                >
            <Svg width={280} height={83} viewBox="0 0 280 83">
              <Defs>
                <LinearGradient
                  id="prefix__linear-gradient"
                  x1={0.605}
                  y1={0.392}
                  x2={0.99}
                  y2={0.936}
                  gradientUnits="objectBoundingBox"
                >
                  <Stop offset={0} stopColor="#7755ef" />
                  <Stop offset={1} stopColor="#8e74e8" />
                </LinearGradient>
              </Defs>
              <G id="prefix___2" data-name={2} transform="translate(-135 -224)">
                <G id="prefix__Group_12001" data-name="Group 12001">
                  <G
                    transform="translate(135 224)"
                    filter="url(#prefix__Rounded_Rectangle_1)"
                  >
                    <Path
                      id="prefix__Rounded_Rectangle_1-2"
                      data-name="Rounded Rectangle 1"
                      d="M13.148 53H3.763s-6.778-.584-2.14-5.607c0 0 7.516-9.907 8.526-17.465V3a3 3 0 013-3H247a3 3 0 013 3v47a3 3 0 01-3 3z"
                      transform="rotate(180 132.5 32)"
                      fill="url(#prefix__linear-gradient)"
                    />
                  </G>
                  <G id="prefix__Group_12000" data-name="Group 12000">
                    <G
                      id="prefix__Icon_ionic-ios-done-all"
                      data-name="Icon ionic-ios-done-all"
                      transform="translate(366 270.5)"
                    >
                      <Path
                        id="prefix__Path_10365"
                        data-name="Path 10365"
                        className="prefix__cls-2"
                        d="M18.761 13.676a.149.149 0 000-.207l-.631-.669a.138.138 0 00-.1-.045.138.138 0 00-.1.045L15.806 15l.842.864z"
                        transform="translate(-11.814 -12.073)"
                      />
                      <Path
                        id="prefix__Path_10366"
                        data-name="Path 10366"
                        className="prefix__cls-2"
                        d="M7.634 17.742a.139.139 0 00-.2 0l-.641.66a.15.15 0 000 .21L8.8 20.684a.621.621 0 00.421.21.661.661 0 00.418-.2l.427-.44z"
                        transform="translate(-6.746 -14.895)"
                      />
                      <Path
                        id="prefix__Path_10367"
                        data-name="Path 10367"
                        className="prefix__cls-2"
                        d="M19.659 11.95l-.615-.656a.134.134 0 00-.1-.044.134.134 0 00-.1.044l-4.279 4.459-1.554-1.613a.135.135 0 00-.2 0l-.624.647a.148.148 0 000 .206l1.962 2.031a.6.6 0 00.41.206.642.642 0 00.407-.2l4.688-4.878a.146.146 0 00.005-.202z"
                        transform="translate(-9.698 -11.25)"
                      />
                    </G>
                    <Text
                      id="prefix___10:32_AM"
                      data-name="10:32 AM"
                      transform="translate(334 276)"
                      fontFamily="SourceSansPro-Regular,Source Sans Pro"
                      fontSize={7}
                      fill="#fff"
                    >
                      <TSpan x={0} y={0}>
                        {"10:32 AM"}
                      </TSpan>
                    </Text>
                    <Text
                      id="prefix__I_was_on-call_this_weekend__Really_busy___"
                      data-name="I was on-call this weekend. Really busy..."
                      transform="translate(162 257)"
                      fontSize={12}
                      fontFamily="SourceSansPro-Regular,Source Sans Pro"
                      fill="#fff"
                    >
                      <TSpan>
                        {"I was on-call this weekend. Really busy.."}
                      </TSpan>
                    </Text>
                  </G>
                </G>
              </G>
            </Svg>
            </View>
         }
        </View>
      </View>
    )
  }
}

export default MessageBubble

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
  arrow_left: {
    left: moderateScale(-6, 0.5)
  },
  arrow_right: {
    right: moderateScale(-6, 0.5)
  }

})
