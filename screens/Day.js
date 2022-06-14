import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Image, Text, Dimensions } from 'react-native';
import db from "../firebase";
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Word from '../components/Word';
import Word2 from '../components/Word2';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height}= Dimensions.get('window');
const Day = ({navigation, route}) => {
    const [counter, setCount] = useState([]);
    const [words, setWords] = useState([{word: "loading", id: "initial"}]);
    const x = route.params.x;
    const y = route.params.y;

    useEffect(() => {
          getTodosFromUserDevice();
        },[]);

    const getTodosFromUserDevice = async () => {
          try {
            const count = await AsyncStorage.getItem('scoreCount');
            if (count != null) {
              setCount(JSON.parse(count));
            }
          } catch (error) {
            console.log(error);
          }
        };
    
    useEffect(() => {
        const collectionRef = collection(db, "words");
        const q = query(collectionRef, orderBy("createdAt", "asc"));
        onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setWords(data);
        });
      }, []);
      
  return (   
      <View style={styles.container}>
        <ScrollView>
          <Image source={require('../assets/D.png')} style={styles.Photo}/>
          <View style={{paddingLeft:width<400 ? 10:10,marginTop:height<400 ? 40:-720}}>
            <Ionicons name="ios-chevron-back" size={30} color="white" onPress={navigation.goBack}/>
          </View>
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:20,color:'white'}}>Learn new words and</Text>
            <Text style={{fontSize:35,color:'white',fontWeight:'bold'}}>UNLEASH YOUR</Text>
            <Text style={{fontSize:35,color:'white', fontWeight:'bold'}}>SOUL</Text>
          </View>
          <View style={{marginTop:height<400 ? 40:220,paddingLeft:width<400 ? 85:95}}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>Unlock new words each day</Text>
          </View>
          <View style={styles.bodyCon}>
            {words.slice(0,counter+1).slice(x,y).map(({ id, day  })=>(
              <Word key={id} id={id} day={day} navigation={navigation} />
                ))}
            {words.slice(counter+1,365).slice(x,y).map(({ id, day  })=>(
              <Word2 key={id} id={id} day={day}  />
            ))}
          </View> 
        </ScrollView>
     </View>
  )
}

export default Day;
const styles = StyleSheet.create({
    container: {
      flex:1,
      height:'100%',
      width:'100%'
    },
    Photo:{
      height:height<380 ? 700:750,
      width:'100%',
    },
    bodyCon:{
      flex:1,
      backgroundColor:'#f5f5f2',
      paddingTop:10,  
      borderTopLeftRadius:40,
      borderTopRightRadius:40
    }
  });