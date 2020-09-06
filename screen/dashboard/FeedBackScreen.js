import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';

var options = [
    {
        value: "Issue",
        isSelected: true
    },
    {
        value: "Recognition",
        isSelected: false
    },
    {
        value: "Others",
        isSelected: false
    }
]

export default class FeedBackScreen extends Component {
    render() {
        return (
            <View style={styles.MainView}>
            <View style={[styles.View1,{marginTop:30}]}>
                <View style={styles.View2}>
                    <TouchableOpacity style={styles.BackButton} onPress={()=> this.props.navigation.pop(1)}>
                        <Image source={require('../../assets/Arrow.png')} style={styles.img} resizeMode="contain" />
                    </TouchableOpacity>
                    <View style={{justifyContent: "center", alignItems: "center", marginLeft:50 }}>
                        <Text style={styles.HeaderTitle}>Submit Feedback</Text>
                    </View>
                </View>
            </View>
                <ScrollView style={{ flex: 1 }} ref={x => this.mScroll = x}>
                    <Text style={styles.TXT1}>Select Response Time</Text>
                    <View style={{ paddingHorizontal: hp(2) }}>
                        {
                            options.map((data, index) => {
                                return (
                                    <View style={{ height: hp(5), justifyContent: "center" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <TouchableOpacity onPress={() => this.changeOptions(index)}>
                                                {
                                                    data.isSelected ?
                                                        <Image source={require('../../assets/checkedIcon.png')} style={{ height: hp(3), width: hp(3) }} resizeMode="contain" />
                                                        :
                                                        <Image source={require('../../assets/UncheckedIcon.png')} style={{ height: hp(3), width: hp(3) }} resizeMode="contain" />

                                                }
                                            </TouchableOpacity>
                                            <View style={{ flex: 1, justifyContent: "center", paddingLeft: hp(3) }}>
                                                <Text style={{ fontSize: hp(2), color: "#1C2D41" }}>{data.value}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={styles.View3}>
                        <View style={styles.titleView}>
                            <TextInput placeholder="Title" placeholderTextColor="#1C2D41" style={styles.TextInputST} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                placeholder="Add a Note..."
                                placeholderTextColor="#77818D"
                                style={styles.NoteText}
                                multiline
                            />
                        </View>
                    </View>
                    <Text style={{ marginHorizontal: hp(3), fontSize: hp(2.7), color: "#77818D" }}>
                        * All response submitted are anonymous. No
                        identifiable data will be provided with your
                        submission.
                    </Text>
                </ScrollView>
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", height: hp(6), borderRadius: hp(1), backgroundColor: "#201F3E", margin: hp(2) }} onPress={()=> this.props.navigation.pop(1)}>
                    <Text style={{ color: "white", fontSize: hp(2.5) }}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
    changeOptions = (ind) => {
        // for (let i = 0; i < options.length; i++) {
        //     if (i == ind) {
        //         options[ind].isSelected = true
        //     }
        //     else {
        //         options[ind].isSelected = false
        //     }
        // }
        options[ind].isSelected = !options[ind].isSelected
        this.setState({})
    }
}

const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-end"
    },
    titleView: {
        height: hp(6),
        width: "100%",
        borderBottomWidth: hp(0.3),
        borderColor: "#E8EDEF"
    },
    TextInputST: {
        flex: 1, fontSize: hp(3), color: "#1C2D41"
    },
    View1: {
        height: hp(9),
        backgroundColor: "white",
        elevation: 2,
        flexDirection:"row"
    },
    NoteText: {
        fontSize: hp(2),
        color: "#1C2D41"
    },
    View2: {
        // flexDirection: "row",
        flexDirection:"row",
        justifyContent: "center",
    },
    View3: {
        height: hp(40),
        marginVertical: hp(2),
        padding: hp(2),
        backgroundColor: "#F6FCFE",
        marginHorizontal: hp(2)
    },
    BackButton: {
        justifyContent: "center",marginLeft: hp(2)
    },
    img: {
        height: hp(4),
        width: hp(4)
    },
    HeaderTitle: {
        fontSize: hp(2.8),
        color: "#201F3E",
        fontWeight: "bold"
    },
    TXT1: {
        margin: hp(2),
        fontSize: hp(2.5),
        fontWeight: "bold",
        color: "#201F3E"
    }
})
