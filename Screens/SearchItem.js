import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
import baseUrl from '../baseUrl';

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

import {Text, View , ActivityIndicator,SafeAreaView, ScrollView, StyleSheet,Image, TouchableOpacity} from 'react-native';

//colors
const {brand,darkLight,primary} = colors;

//keyboard avoiding view
// import {KeyboardAvoidingWrapper} from './../Components/KeyboardAvoidingWrapper';
// const KeyboardAvoidingWrapper = require('./../Components/KeyboardAvoidingWrapper');

//API
import axios from 'axios';

const SearchItem = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [SearchedItem, setSearchedItem] = useState([]);
    const [showCard, setShowCard] = useState(false)

    const Search = (credentials, setSubmitting) =>{
    

        axios.get(baseUrl+`/apis/items/search_item?item_name=${credentials.ItemName}&&item_color=${credentials.ItemColor}&&place_item_found=${credentials.PlaceName}&&complete_address=${credentials.Address}`).then(res => {
            setSearchedItem(res.data.items)
            setShowCard(true)
            setSubmitting(false)
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
                    <PageTitle>Search Item</PageTitle>
                    {/* <SubTitle>Edit Your Registered Details</SubTitle> */}
                    <Line/>
                    
                    <Formik
                        initialValues={{ItemName : '', ItemColor: '', PlaceName: '', Address:'', }}
                        onSubmit={(values, {setSubmitting}) =>{
                            // console.log(values);
                            // navigation.navigate("Welcome");
                            if(values.ItemName == '' || values.PlaceName == ''){
                                handleMessage('please fill all the necessary fields');
                                setSubmitting(false)
                            }
                            else{
                                Search(values, setSubmitting);
                            }
                        }}
                    >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting})=>(<StyledFormArea>
                    
                        <MyTextInput 
                            label= "Item Name"
                            icon= "briefcase"
                            placeholder = "Item Name"
                            placeholderTextColor = {darkLight}
                            onChangeText = {handleChange('ItemName')}
                            onBlur = {handleBlur('ItemName')}
                            value = {values.ItemName}
                        />
                         <MyTextInput 
                            label= "Item Color"
                            icon= "tag"
                            placeholder = "Item Color"
                            placeholderTextColor = {darkLight}
                            onChangeText = {handleChange('ItemColor')}
                            onBlur = {handleBlur('ItemColor')}
                            value = {values.ItemColor}
                        />
                        <MyTextInput 
                            label= "Place Item You Lost"
                            icon= "location"
                            placeholder = "Place Name"
                            placeholderTextColor = {darkLight}
                            onChangeText = {handleChange('PlaceName')}
                            onBlur = {handleBlur('PlaceName')}
                            value = {values.PlaceName}
                        />
                        <MyTextInput 
                            label= "Complete Address If You Remember"
                            icon= "home"
                            placeholder = "Address item found in"
                            placeholderTextColor = {darkLight}
                            onChangeText = {handleChange('Address')}
                            onBlur = {handleBlur('Address')}
                            value = {values.Address}
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
                   {showCard && SearchedItem ? 
                <TouchableOpacity onPress={() => SeeItemDetails(SearchedItem._id)} style={styles.card}>

                <Image resizeMode='contain' source={{uri: baseUrl+'/uploads/'+SearchedItem.item_picture}} style={styles.cardImage} />
                    <View style={styles.cardRight}>
                    <Text style={styles.cardName}>{SearchedItem.item_name}</Text>
                    <Text style={styles.cardColor}>{SearchedItem.item_color}</Text>
                    <Text style={styles.cardPlace}>{SearchedItem.place_item_found}</Text>
                    </View>
                </TouchableOpacity>
                :null}

                    
                    
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
export default SearchItem;

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
elevation: 10
    },
    cardImage:{
        width: 80,
    height: 60,
    borderRadius: 30,
},
    cardRight:{
        marginLeft: 10
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
        color: '#ccc'
    },
})