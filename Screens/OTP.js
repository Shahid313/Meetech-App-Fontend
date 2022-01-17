import React from "react";
import {Text,  SafeAreaView, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, TextInput, StyleSheet} from 'react-native'

class OTP extends React.Component{

    componentDidMount = () => {
        this.refs.num1ref.focus();
    }

    state = {
        num1:'',
        num2:'',
        num3:'',
        num4:'',
    }

    CreateNewPassWord(){
        if(this.props.route.params.otp == this.state.num1 + this.state.num2 + this.state.num3 + this.state.num4){
            this.props.navigation.navigate("CreateNewPassword", {user_id:this.props.route.params.user_id})
        }else{
            alert("Please enter the correct OTP")
        }

    }
    render(){
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.OTPInfo}>
                    <Text style={styles.OTPText}>Verification Code</Text>
                    <Text style={styles.VerifyOTPText}>OTP has been send to your email Please Verify</Text>
                </View>
                <View style={styles.EnteringData}>
                    <View style={styles.OTPInputBoxes}>
                        <View style={styles.Fields}>
                        <TextInput 
                        maxLength={1}
                        keyboardType="numeric"
                        textAlign="center"
                        value={this.state.num1}
                        ref={"num1ref"}
                        onChangeText={(num1) => {this.setState({num1:num1})
                        if(num1 != ""){
                            this.refs.num2ref.focus()
                        }
                        }}
                        style={styles.OtpInputField}/>

                        <TextInput 
                        maxLength={1}
                        textAlign="center"
                        keyboardType="numeric"
                        onChangeText={(num2) => {this.setState({num2:num2})
                        if(num2 != ""){
                            this.refs.num3ref.focus()
                        }
                        }}
                        ref={"num2ref"}
                        value={this.state.num2}
                        style={styles.OtpInputField}/>

                        <TextInput 
                        keyboardType="numeric"
                        textAlign="center"
                        onChangeText={(num3) => {this.setState({num3:num3})
                        if(num3 != ""){
                            this.refs.num4ref.focus()
                        }
                        }}
                        value={this.state.num3}
                        ref={"num3ref"}
                        maxLength={1}
                        
                        style={styles.OtpInputField}/>

                        <TextInput 
                        keyboardType="numeric"
                        textAlign="center"
                        maxLength={1}
                        onChangeText={(num4) => {this.setState({num4:num4})
                        // if(num4 != ""){
                        //     this.CreateNewPassWord()
                        // }
                        }}
                        ref={"num4ref"}
                        value={this.state.num4}
                        style={styles.OtpInputField}/>
                        </View>
                </View>
                    
            <TouchableOpacity onPress={() => this.CreateNewPassWord()} style={styles.ContinueButton}>
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

    OTPInfo:{
        marginTop:'15%',
    },

    OTPText:{
        color:'#333333',
        fontSize:28
    },

    VerifyOTPText:{
        fontSize:16,
        marginTop:'6%',
        color:'gray'
    },

    EnteringData:{
        width:'100%',
        marginTop:'5%'

    },

    OTPInputBoxes:{
        width:'100%',
        alignItems:'center',
        marginTop:'20%',
    },

    OtpInputField:{
        width:55, 
        height:55,
        borderColor:'gray',
        borderWidth:1,
        fontSize:28,
        


    },

    Fields:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around'
    },

    ContinueButton:{
        width:'100%',
        height:48,
        borderRadius:15,
        backgroundColor:'#6d28d9',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'10%'
    },

    ContinueButtonText:{
        color:'#fff',
        fontSize:20
    },

    ResendLink:{
        marginLeft:5
    },

    DidntRecievedTheCode:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'10%'
    },

    DidntRecievedTheCodeResendLink:{
        color:'#5FA7C0',
        fontSize:18,
        textDecorationLine:'underline'
    },

    DidntRecievedTheCodeText:{
        fontSize:18
    },
})

export default OTP;