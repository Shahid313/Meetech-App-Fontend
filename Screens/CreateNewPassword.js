import React from "react";
import {Text, Image,  SafeAreaView, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, TextInput, StyleSheet} from 'react-native'
import axios from 'axios'
import baseUrl from "../baseUrl";

class CreateNewPassword extends React.Component{

    state = {
        showPass: true,
        showRetypePass:true,
        password:'',
        confirmpassword:''
    }


    Update(){
        if(this.state.password != this.state.confirmpassword){
            alert("Passwords doesn't match")
        }else if(this.state.password == '' || this.state.confirmpassword == ''){
            alert("Please fill all the fields")

        }
        else{
            const data = new FormData()
            data.append('user_id', this.props.route.params.user_id)
            data.append('password', this.state.password)
            axios.post(baseUrl+'/apis/user/create_new_password', data).then(res => {
                if(res.data.msg == "Password Updated"){
                    alert("Password Updated")
                    this.props.navigation.navigate("Login")
                }else{
                    alert("Something Went Wrong")
                }
            })
        }
    }




    render(){
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.NewPassWordInfo}>
                    <Text style={styles.CreateNewPassText}>Create New Password</Text>
                    <Text style={styles.PleaseSetYourPasswordForLogin}>Please set your password for login</Text>
                </View>
                <View style={styles.EnteringData}>
                
                <Text style={styles.PasswordPlaceholder}>Password</Text>
                <View style={styles.PasswordInput}>

                <TouchableOpacity style={styles.LockButton}>
                <Image source={require('../assets/lock.png')} style={styles.LockImageStyle}/>
                </TouchableOpacity>

                <TextInput onChangeText={(e) => this.setState({password:e})} secureTextEntry={this.state.showPass} style={styles.InputField}/>
                {this.state.showPass == true ? 
                <TouchableOpacity onPress={() => this.setState({showPass:!(this.state.showPass)})} style={styles.EyeButton}>
                <Image source={require('../assets/eye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>:
                <TouchableOpacity onPress={() => this.setState({showPass:!(this.state.showPass)})} style={styles.EyeButton}>
                <Image source={require('../assets/crosseye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>
                }
                
               </View>

               <Text style={styles.PasswordPlaceholder}>Retype Password</Text>
               <View style={styles.ConfirmPasswordInput}>

               <TouchableOpacity style={styles.LockButton}>
                <Image source={require('../assets/lock.png')} style={styles.LockImageStyle}/>
                </TouchableOpacity>

                <TextInput  onChangeText={(e) => this.setState({confirmpassword:e})} secureTextEntry={this.state.showRetypePass} style={styles.InputField}/>

                {this.state.showRetypePass == true ? 
                <TouchableOpacity onPress={() => this.setState({showRetypePass:!(this.state.showRetypePass)})} style={styles.EyeButton}>
                <Image source={require('../assets/eye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>:
                <TouchableOpacity onPress={() => this.setState({showRetypePass:!(this.state.showRetypePass)})} style={styles.EyeButton}>
                <Image source={require('../assets/crosseye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>}
                
               </View>
            <TouchableOpacity onPress={() => this.Update()} style={styles.ContinueButton}>
                    <Text style={styles.ContinueButtonText}>Continue</Text>
            </TouchableOpacity>

                </View>
            </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        padding:'5%'
    },

    NewPassWordInfo:{
        marginTop:'15%',
    },

    CreateNewPassText:{
        color:'#333333',
        fontSize:28
    },

    PleaseSetYourPasswordForLogin:{
        fontSize:16,
        marginTop:'5%',
        color:'gray'
    },

    EnteringData:{
        width:'100%',
        marginTop:'15%'

    },

    PasswordInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
        marginTop:'3%',
        marginBottom:'7%',
        color:'#929292',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    PasswordPlaceholder:{
        fontSize:16,
        color:'#494949'
    },

    ConfirmPasswordInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
        marginTop:'3%',
        color:'#929292',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    imageStyle: {
        padding: 0,
        height: 24,
        width: 24,
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    InputField:{
        flex:1,
        fontSize:17,
        color:'#929292',
        paddingLeft:10
    },

    ContinueButton:{
        width:'100%',
        height:48,
        borderRadius:15,
        backgroundColor:'#6d28d9',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'25%'
    },

    ContinueButtonText:{
        color:'#fff',
        fontSize:20
    },

    EyeButton:{
        marginRight:15
    },

    LockButton:{
        marginLeft:15
    },

    LockImageStyle:{
        height: 17.5,
        width: 13.5,
        resizeMode: 'stretch',
    }
})

export default CreateNewPassword;