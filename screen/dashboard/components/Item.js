import React,{Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';

export class Item extends Component {
    render() {
        return (
            <View>
                <Text style={ [ this.checkActive() ? styles.active : styles.inactive]}>{this.props.value}</Text>
                <Text style={[ this.checkActive() ? styles.line : styles.notline ]}> { '|' }</Text>
            </View>
        );
    }

    checkActive =()=>{
        if(this.props.value == this.props.second)
            return true
        else
            return false
    }
}

const styles = StyleSheet.create({
    active:{
        textAlign: 'center',
        fontSize:20,
        height:27,
        width:24,
        bottom:5,
        alignSelf:"center",
        backgroundColor:"#fff",
        elevation:10,
        color:'#201F3E',
    },
    inactive:{
        flex:1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight:'normal',
        color:'#fff',
    },
    line:{
        fontSize:10,
        textAlign: 'center',
        color:'#fff',
        bottom:-5
    },
    notline:{
        fontSize:10,
        textAlign: 'center',
        color:'#fff',
    }
});
