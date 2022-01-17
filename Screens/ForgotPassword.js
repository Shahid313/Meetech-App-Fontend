import React from "react";
import {Text,  SafeAreaView, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, TextInput, StyleSheet} from 'react-native'
import axios from 'axios'
import baseUrl from '../baseUrl'

class ForgotPassword extends React.Component{
    state = {
        email:''
    }
    VerifyOTP(){
        // this.props.navigation.navigate('OTP')
        axios.get(baseUrl+`/apis/user/forgot_password?email=${this.state.email}`).then(res => {
            if(res.data.msg == "Verification Code Sent"){
                this.props.navigation.navigate("OTP", {user_id:res.data.user_id, otp:res.data.otp})
            }
        })
    }
    render(){
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.ForgotPassInfo}>
                    <Text style={styles.ForgotPassText}>Forgot password</Text>
                    <Text style={styles.EnterEmailToResetPassText}>Please enter your email address to reset your password</Text>
                </View>
                <View style={styles.EnteringData}>
                    <TextInput onChangeText={(e) => this.setState({email:e})} style={styles.EmailInput} placeholderTextColor="#929292" placeholder="Email"/>
                    
            <TouchableOpacity onPress={() => this.VerifyOTP()} style={styles.ContinueButton}>
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

    ForgotPassInfo:{
        marginTop:'15%',
    },

    ForgotPassText:{
        color:'#333333',
        fontSize:28
    },

    EnterEmailToResetPassText:{
        fontSize:16,
        marginTop:'6%',
        color:'gray'
    },

    EnteringData:{
        width:'100%',
        marginTop:'20%'

    },

    EmailInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
        color:'#929292',
        paddingLeft:10,
        
    },

    ContinueButton:{
        width:'100%',
        height:48,
        borderRadius:15,
        backgroundColor:'#6d28d9',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'20%'
    },

    ContinueButtonText:{
        color:'#fff',
        fontSize:20
    }
})

export default ForgotPassword;