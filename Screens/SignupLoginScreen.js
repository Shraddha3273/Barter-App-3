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

export default class  SignupLoginScreen extends React.Component{
    constructor(){
        super();
        this.state = {
        emailId : '',
        password : '',
        isModalVisible : false,
        firstName : '',
        lastName : '',
        contact : '',
        address : '',
        }
    }

userLogin = (emailId,password) => {
  firebase.auth().signInWithEmailAndPassword(emailId,password).then(()=>{
   // return Alert.alert("Login successful!")  
   this.props.navigation.navigate('HomeScreen') 
     })
     .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
    })
    } 
    
    userRegister = (emailId,password,confirmPassword) => {
        if(password !== confirmPassword){
            return Alert.alert("Passwords don't match!\nCheck your password!")
        }
        else {
  firebase.auth().createUserWithEmailAndPassword(emailId,password).then(()=>{
    db.collection('Users').add({
    EmailId : this.state.emailId,
    Password : this.state.password,
    First_name : this.state.firstName,
    Last_Name : this.state.lastName,
    Address : this.state.address,
    Contact : this.state.contact
    })
    return Alert.alert("Account successfully created!", 
   "",[{text : 'Ok',
  onPress : ()=> this.setState({"isModalVisible" : false })
 }])
})
.catch((error)=>{
    var errorCode = error.code;
    var errorMessage = error.message;
    return Alert.alert(errorMessage)
})
}
}

showModal = () => {
    return(
        <Modal 
        animationType = "fade" 
        transparent = {true}
        visible = {this.state.isModalVisible}
        >
<View>
<ScrollView style = {styles.scrollview}>
<KeyboardAvoidingView>
    <View style = {styles.signUpView}>
<Text style = {styles.signupText}>Register here</Text>
</View>
<View style = {{flex : 0.95}}>
<Text style={styles.label}>First Name </Text>
<TextInput 
placeholder = {"First Name"}
maxLength = {15}
onChangeText = {(text)=>{
    this.setState({firstName : text})
}}
/>

<Text style={styles.label}>Last Name </Text>
<TextInput 
placeholder = {"Last Name"}
maxLength = {15}
onChangeText = {(text)=>{
    this.setState({lastName : text})
}}
/>

<Text style={styles.label}>Contact Number </Text>
<TextInput 
placeholder = {"Contact Number"}
maxLength = {10}
onChangeText = {(text)=>{
    this.setState({contact : text})
}}
/>

<Text style={styles.label}>Address </Text>
<TextInput 
placeholder = {"Address"}
multiline = {true}
onChangeText = {(text)=>{
    this.setState({address : text})
}}
/>

<Text style={styles.label}>Email Id </Text>
<TextInput 
placeholder = {"Email Id"}
maxLength = {20}
onChangeText = {(text)=>{
    this.setState({emailId : text})
}}
/>

<Text style={styles.label}>Password </Text>
<TextInput 
placeholder = {"Password"}
maxLength = {20}
secureTextEntry = {true}
onChangeText = {(text)=>{
    this.setState({password : text})
}}
/>

<Text style={styles.label}>Confirm Password </Text>
<TextInput 
placeholder = {"Confirm Password"}
maxLength = {20}
secureTextEntry = {true}
onChangeText = {(text)=>{
    this.setState({confirmPassword : text})
}}
/>
</View>

<View style={{flex:0.2,alignItems:'center'}}>
    <TouchableOpacity 
     style = {styles.Button}
    onPress = {()=> this.userRegister(
    this.state.emailId, 
    this.state.password,
    this.state.confirmPassword)}
    >
        <Text style={styles.registerButtonText}>Register</Text>
    </TouchableOpacity>
</View>
<View>
    <Text
    style={styles.cancelButtonText}
    onPress = {() => this.setState({
        isModalVisible : false})}
    >
    Cancel
    </Text>
</View>
</KeyboardAvoidingView>
</ScrollView>
</View>
</Modal>
);
};


render(){
    return(
        <View style={styles.container}>
            {this.showModal()}
            <View/>
            <View style={{ flex: 0.25}}>
            <Text style = {styles.title}>Barter App</Text>
            </View>
        <View style = {styles.viewStyle}>
        <TextInput
            style={styles.loginBox,{marginTop:15}}
            placeholder="abc@example.com"
            placeholderTextColor="gray"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
  <TextInput
            style={styles.loginBox,{marginTop:15}}
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          </View>
          <View style={{flex:0.5,  alignItems:"center",}}>
 <TouchableOpacity 
 style = {styles.signInBtn}
 onPress = { () => {
this.userLogin(this.state.emailId,this.state.password)
 }
}
 >
     <Text>Sign In</Text>
 </TouchableOpacity>

 <TouchableOpacity 
  style = {styles.signInBtn}
 onPress = { () => this.setState({'isModalVisible' : true})}
 >
     <Text>No Account? Register here!</Text>
 </TouchableOpacity>
        </View>
        </View>
    )
    }
}


const styles = StyleSheet.create({

title : {
textAlign : 'center'
},
emailBox : {
width: 200,
height: 40,
borderWidth: 1.5,
fontSize: 20,
paddingLeft:10,
margin:10,
},
passwordBox : {
width: 200,
height: 40,
borderWidth: 1.5,
fontSize: 20,
paddingLeft:10,
margin:10,
},
signInBtn : {
backgroundColor: '#2196F3',
paddingTop: 10,
width : 230,
height:40,
justifyContent : 'center',
alignItems : 'center',
borderRadius : 50,
margin : 10
},
viewStyle : {
backgroundColor:'#7912ff', 
flex:1, 
justifyContent:'center', 
alignItems:'center', 
marginTop : 500
},
scrollview:{
    flex: 1,
    backgroundColor: "#fff"
  },
signupView:{
  flex:0.05,
  justifyContent:'center',
  alignItems:'center'
},
signupText:{
  fontSize:20,
  fontWeight:"bold",
  color:"#32867d"
},
label:{
    fontSize:13,
    color:"#717D7E",
    fontWeight:'bold',
    paddingLeft:10,
    marginLeft:20
  },
  registerButton: {
    width: "75%",
    height: 50,
    marginTop:20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 10,
  },
  registerButtonText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButtonText:{
    fontSize : 20,
    fontWeight:'bold',
    color: "#32867d",
    marginTop:10
  },
  container: {
    flex: 1,
    backgroundColor: "#6fc0b8",
  },
  loginBox: {
    width: "80%",
    height: 50,
    borderWidth: 1.5,
    borderColor: "#ffffff",
    fontSize: 20,
    paddingLeft: 10,
  },
})