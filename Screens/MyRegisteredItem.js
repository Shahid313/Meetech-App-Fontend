import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, Image, View, FlatList} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseUrl from '../baseUrl';
import axios from 'axios'

const MyRegisteredItem = ({navigation}) => {
    const [myItems, setMyItems] = useState([])
    const getitems = async () => {
        const value = await AsyncStorage.getItem('loggedIn');
        const parse = JSON.parse(value)

        await axios.get(baseUrl+`/apis/items/view_items_by_user_id?id=${parse._id}`).then(res => {
            setMyItems(res.data.item)
        })
    }

    useEffect(() => {
        getitems();
    },[])

    const deleteItem = (item_id) => {
        axios.get(baseUrl+`/apis/items/delete_item?item_id=${item_id}`).then(res => {
            if(res.data.msg == "Deleted"){
                alert("Item Deleted Successfully")
            }
            getitems();
        })
    }

    const updateItem = (item_id) => {

        navigation.navigate('EditYourRegisteredItem', {item_id:item_id})

    }

    const ViewDetails = (item_id) => {
        navigation.navigate('ItemDetails', {item_id:item_id})
    }
    return(
        <SafeAreaView style={styles.container}>
            <FlatList
            keyExtractor={item => item._id.toString()}
            numColumns={2}
            data={myItems}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => ViewDetails(item._id)} style={styles.Item}>  
                <Image style={styles.ItemImage} source={{uri: baseUrl+'/uploads/'+item.item_picture}}/>
                <Text style={styles.ItemName}>{item.item_name}</Text>
                <View style={styles.Icons}>
                <TouchableOpacity onPress={() => deleteItem(item._id)}>
                <AntDesign name="delete" size={24} color="#FFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateItem(item._id)} style={styles.EditIcon}>
                <AntDesign name="edit" size={24} color="#FFFF" />
                </TouchableOpacity>
                </View>
            </TouchableOpacity>
            )}
            />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFF',
        paddingTop:'4%',
        flex:1,
    },

    Item:{
        backgroundColor:'#6d28d9',
        width:'40%',
        height:200,
        padding:'3%',
        margin:'5%'
    },

    ItemName:{
        color:'#FFFF',
        fontSize:20,
        marginTop:10
    },

    ItemImage:{
        width:'100%',
        height:100
    },

    Icons:{
        flexDirection:'row',
        marginTop:10
    },

    EditIcon:{
        marginLeft:15
    }
})

export default MyRegisteredItem;