import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import baseUrl from '../baseUrl';
// import KeyboardSpacer from 'react-native-keyboard-spacer';

//kyeboard avoiding
// import {KeybaordAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

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

import {Text, View , ActivityIndicator,SafeAreaView, ScrollView, StyleSheet,Image} from 'react-native';

//colors
const {brand,darkLight,primary} = colors;

//keyboard avoiding view
// import {KeyboardAvoidingWrapper} from './../Components/KeyboardAvoidingWrapper';
// const KeyboardAvoidingWrapper = require('./../Components/KeyboardAvoidingWrapper');

//API
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';

const SearchItemByKeywords = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [searchedItem, setSearchedItem] = useState([]);
    const [showCard, setShowCard] = useState(false);
    const [NoResultShown, setNoResultShow] = useState(false);

    const SearchByKeywords = (credentials, setSubmitting) =>{

        axios.get(baseUrl+`/apis/items/search_item_by_keywords?keywords=${credentials.Keywords}`).then(res => {
            if(res.data.msg == "ItemFound"){
                setSearchedItem(res.data.items)
                setShowCard(true)
                setSubmitting(false)
                setNoResultShow(false)
            }else{
                // setNoResultShow(true)
                setShowCard(false)
                setSubmitting(false)
                setNoResultShow(true)
            }
            
            
        })

        

        
    }

    const SeeItemDetails = (item_id) => {

        navigation.navigate('ItemDetails', {item_id:item_id})

    }

    const handleMessage =(message, type = 'FAILED')=>{
        setMessage(message);
        setMessageType(type);
    }
    return (
        <StyledContainer>
                <StatusBar style="dark"/>
                <SafeAreaView>
                        <ScrollView> 
                <InnerContainer>
                    <PageTitle>Search By Keywords</PageTitle>
                    {/* <SubTitle>Edit Your Registered Details</SubTitle> */}
                    <Line/>
                    
                    <Formik
                        initialValues={{Keywords : '' }}
                        onSubmit={(values, {setSubmitting}) =>{
                            // console.log(values);
                            // navigation.navigate("Welcome");
                            if(values.Keywords == ''){
                                handleMessage('please fill all the necessary fields');
                                setSubmitting(false)
                            }
                            else{
                                SearchByKeywords(values, setSubmitting);
                            }
                        }}
                    >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting})=>(<StyledFormArea>
                    
                        <MyTextInput 
                            label= "Keywords Matching"
                            icon= "key"
                            placeholder = "Laptop, black, Dell"
                            placeholderTextColor = {darkLight}
                            onChangeText = {handleChange('Keywords')}
                            onBlur = {handleBlur('Keywords')}
                            value = {values.Keywords}
                        />
                    
                        <MsgBox type={messageType}>{message}</MsgBox>
                        {!isSubmitting &&<StyledButton onPress={handleSubmit}>
                            <ButtonText>Search</ButtonText>
                        </StyledButton>}

                        {isSubmitting &&<StyledButton disabled = {true}>
                            <ActivityIndicator size="large" color={primary}/>
                        </StyledButton>}
                        <ExtraView>
                            <ExtraText>Want to go back on welcome page?</ExtraText>
                            <TextLink onPress={()=>navigation.navigate("Welcome")}>
                                <TextLinkContent> Click here</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}

                    </Formik>
                   { /* card */}
                   {showCard ?
                   <FlatList data={searchedItem}
                   keyExtractor={(item, index) => item.key}
                   horizontal
                   showsHorizontalScrollIndicator={true}
                   renderItem={({item}) => (
                    <TouchableOpacity onPress={() => SeeItemDetails(item._id)} style={styles.card}>
                    <Image resizeMode='contain' source={{uri: baseUrl+'/uploads/'+item.item_picture}} style={styles.cardImage} />
                    <View style={styles.cardRight}>
                    <Text style={styles.cardName}>{item.item_name}</Text>
                    <Text style={styles.cardColor}>{item.item_color}</Text>
                    <Text style={styles.cardPlace}>{item.place_item_found}</Text>
                    </View>
                </TouchableOpacity>
                   )}/>
                
                :null}

                {
                    NoResultShown ? <Text>No Item Found</Text> :null
                }
                    
                </InnerContainer>

                </ScrollView>

                    </SafeAreaView>
            </StyledContainer>
    )
}

const MyTextInput = ({label, icon,isPassword,hidePassword,setHidePassword, ...props}) => {
    return(
        <View>
             <LeftIcon>
                 <Octicons name={icon} size={30} colors = {brand}/>
             </LeftIcon>
             <StyledInputLabel>{label}</StyledInputLabel>
             <StyledTextInput {...props}/>
        </View>
    )
} ;
export default SearchItemByKeywords;

const styles= StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginLeft:5,
elevation: 10
    },
    cardImage:{
        width: 60,
    height: 60,
    borderRadius: 30
},
    cardRight:{
        marginLeft: 15
    },
    cardName:{
        fontSize: 18,
        color: 'red'
    },
    cardColor:{
        fontSize: 16,
        color: 'green'
    },
    cardPlace:{
        fontSize: 16,
        color: 'gray'
    },
})