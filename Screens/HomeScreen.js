import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    TextInput,
    Alert,
    Modal,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class HomeScreen extends React.Component{
    render(){
        return(
<View style = {{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#696969'}}>
                <Text style ={{color:'#0000ff'}}>This is Home Screen</Text>
            </View>
    )}
}