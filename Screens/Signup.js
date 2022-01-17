import React, {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import {Text,Alert} from 'react-native'
import baseUrl from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage'

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';
//datetime picker
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from './../Components/Styles';
import Axios from 'axios'

import {View, TouchableOpacity} from 'react-native'; 

import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';

//colors
const {brand,darkLight,primary} = colors;

const _retrieveData = async (navigation) => {

    const value = await AsyncStorage.getItem('loggedIn');
    const parse = JSON.parse(value)
    if (parse != null) {
      navigation.reset({
          index:0,
          routes:[{name:'Welcome'}],
         
      });
    }else{
        return false
    }
  
};
    
const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setshow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [email, setEmail] = useState('');
    const [fullName,setfullName] = useState('');
    const [password, setPassword] = useState('');

    //actual date of birth to be sent
    const [dob, setDob] = useState(new Date());

    useEffect(() => {
       
        _retrieveData(navigation)
     },[])
 

  const sendCred= ()=>{
        let formData = new FormData()
        formData.append("email",email)
        formData.append("fullName",fullName)
        formData.append("dateOfBirth",dob.toDateString())
        formData.append("password",password)
       

         Axios.post(baseUrl+'/apis/user/signup',formData)
        .then(res=>{
            if(res.data.msg == "User Registered Successfully"){
                setfullName('')
                setEmail('')
                setPassword('')

                Alert.alert(res.data.msg)

            }else{
                Alert.alert(res.data.msg)
            }
        })
        .catch(err=>{
            console.log(err)
        })

        
    }


    const onChange = (selectedDate) => {
        const currentDate = selectedDate ;
        setshow(false);
        setDate(currentDate);
        setDob(currentDate);
    }
    
    const showDatePicker = () =>{
        setshow(true);
    }

   
    return (
        <>
            <StyledContainer>
                <StatusBar style="dark"/>
                <InnerContainer>
                    {/* <PageLogo resizeMode = "cover" source={require('../assets/reallogo.png')}/> */}
                    <PageTitle>Meetech</PageTitle>
                    <SubTitle>Account Signup</SubTitle>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={dob}
                        mode='date'
                        is24Hour={true}
                        display="default"
                      
                        onChange={(date)=>{
                                console.log(date)
                                if(date.type != 'dismissed'){
                                    console.log(date.nativeEvent.timestamp)
                           
                                    onChange(date.nativeEvent.timestamp)
                                }else{
                                    setshow(false)
                                }
                               
                           
                           
                        }}
                        />
                    )}

                    <Formik
                        initialValues={{fullName: '', email: '', dateOfBirth: '', password: ''}}
                        onSubmit={(values) =>{
                        console.log(values); 

                        navigation.navigate("Welcome")
                        }}
                    >
                    {({handleChange, handleBlur, handleSubmit, values})=>(<StyledFormArea>

                        <MyTextInput 
                            label= "Full Name"
                            icon= "person"
                            placeholder = "Ahsan Akbar"
                            placeholderTextColor = {darkLight}
                            onChangeText = {(val)=>setfullName(val)}
                            onBlur = {handleBlur('fullName')}
                            value = {fullName}
                        />

                        <MyTextInput 
                            label= "Email Address"
                            icon= "mail"
                            placeholder = "ahsan.123@gmail.com"
                            placeholderTextColor = {darkLight}
                            onChangeText = {(val)=>setEmail(val)}

                            onBlur = {handleBlur('email')}
                            value = {email}
                            keyboardType = 'email-address'
                        />

                        <MyTextInput 
                            label= "Date of Birth"
                            icon= "calendar"
                            placeholder = "YYYY - MM - DD"
                            placeholderTextColor = {darkLight}
                            value={dob.toDateString()}
                            isDate = {true}
                            editable = {false}
                            showDatePicker={()=>setshow(true)}
                        />
                        <TouchableOpacity onPress={()=>setshow(true)}>

                        </TouchableOpacity>

                        <MyTextInput 
                            label= "Password"
                            icon= "lock"
                            placeholder = "* * * * * * * * * "
                            placeholderTextColor = {darkLight}
                            onChangeText = {(val)=>setPassword(val)}

                            onBlur = {handleBlur('password')}
                            value = {password}
                            secureTextEntry = {hidePassword}
                            isPassword = {true}
                            hidePassword= {hidePassword}
                            setHidePassword={setHidePassword}
                        />

                        <MsgBox>...</MsgBox>
                        <StyledButton onPress={()=>sendCred()}>
                            <ButtonText >Signup</ButtonText>
                        </StyledButton>
                        <Line />
                        <ExtraView>
                            <ExtraText>Already have an account?</ExtraText>
                            <TextLink onPress={()=>navigation.navigate("Login")}>
                                <TextLinkContent> Login</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}

                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </>
    )
}

const MyTextInput = ({label, icon,isPassword,hidePassword,setHidePassword, isDate, showDatePicker, ...props}) => {
    return(
        <View>
             <LeftIcon>
                 <Octicons name={icon} size={30} colors = {brand}/>
             </LeftIcon>
             <StyledInputLabel>{label}</StyledInputLabel>
             {!isDate && <StyledTextInput {...props}/> }
             {isDate && (
                 <TouchableOpacity onPress={showDatePicker}>
                     <StyledTextInput {...props}/>
                 </TouchableOpacity>
             )}

             {isPassword && (
                    <RightIcon onPress = {()=> setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                    </RightIcon>
             ) }
        </View>
    )
} ;
export default Signup;
