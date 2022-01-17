import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, Image, View, FlatList} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseUrl from '../baseUrl';
import axios from 'axios'

const ItemDetails = ({route}) => {
    const [details, setDetails] = useState([])
    const item_id = route.params.item_id;

    useEffect(() => {
        getData();
    },[])

    const getData = () => {
        axios.get(baseUrl+`/apis/items/view_item_details_by_item_id?item_id=${item_id}`).then(res => {
            setDetails(res.data.item[0])
        })
    }

    return(
        <SafeAreaView style={styles.container}>
            <Image resizeMode='contain' style={styles.DetailImage} source={{uri:baseUrl+'/uploads/'+details.item_picture}}/>
            <Text style={styles.ItemName}>Item Name: {details.item_name}</Text>
            <Text style={styles.ItemAddress}>Address: {details.complete_address}</Text>
            <Text style={styles.PlaceItemFoundIn}>Place Item Found In: {details.place_item_found}</Text>
            <Text style={styles.ItemColor}>Item Color: {details.item_color}</Text>
            <Text style={styles.MobileNo}>Mobile No: {details.mobile_no}</Text> 
        </SafeAreaView> 
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        paddingRight:'5%',
        paddingLeft:'5%',
        flex:1
    },

    DetailImage:{
        width:'100%',
        height:250,
    },

    ItemName:{
        fontSize:20,
        color:'#000000',
        marginTop:10,
    },

    ItemAddress:{
        fontSize:20,
        color:'#000000',
        marginTop:10,
    },

    PlaceItemFoundIn:{
        fontSize:20,
        color:'#000000',
        marginTop:10,
    },

    ItemColor:{
        fontSize:20,
        color:'#000000',
        marginTop:10,
    },

    MobileNo:{
        fontSize:20,
        color:'#000000',
        marginTop:10,
    }
})

export default ItemDetails;