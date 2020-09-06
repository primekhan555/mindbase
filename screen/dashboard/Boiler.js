import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
//import { StackNavigator } from "react-navigation";
export default class Boiler extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#f6585d",
      elevation: null
    },
    headerLeft: null
  };
  render() {
    return <Text>OLA</Text>;
  }
}

const styles = StyleSheet.create({});

AppRegistry.registerComponent("Boiler", () => Boiler);
