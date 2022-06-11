import React, {useState, useEffect} from 'react';
import db from "../firebase";
import { doc,getDoc } from 'firebase/firestore';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { AntDesign } from '@expo/vector-icons';

const {width,height}= Dimensions.get('window');
const Detail = ({navigation, route}) => {
    const [words, setWords] = useState([]);
    const [isPressed, setPressed] = useState(false);
    const wordid = route.params.wordid;
    const day = route.params.day;
    
    useEffect(() => {
        const getWords = async () => {
            const docRef = doc(db, "words", wordid);
            let data = await getDoc(docRef);
            setWords(data.data(), data.id);
        };
        getWords();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const handleAudioPress = async () => {
        if(isPressed==false){
          setPressed(true);
          const playbackObj = new Audio.Sound();
          const wait = await playbackObj.loadAsync({uri: words.audioUrl}, {shouldPlay: true});
          if(wait){
            setTimeout(handlePressed, 2000);
          }
        }
    }
    function handlePressed() {
       setPressed(false);
    }

  return (
        <View style={{flex:1,height:height,width:width}}>
            <Image source={require('../assets/2.jpeg')} style={styles.Img} />
            <View style={{paddingLeft:width<380 ? 10:10,marginTop:height<400 ? 40:-920,}}>
              <Ionicons name="ios-chevron-back" size={30} color="white" onPress={navigation.goBack}/>
            </View>
            <View style={{alignItems:'center',justifyContent:"center",}}>
              <Text style={styles.word}>WORD FOR THE DAY</Text>
            </View>
            <View style={styles.wordBox}>
              {isPressed?<AntDesign name="sound" size={25} color="grey" onPress={handleAudioPress} style={{marginRight:width<380 ?-165:-190, marginTop:-60, color: 'blue'}} />:<AntDesign name="sound" size={25} color="black" onPress={handleAudioPress} style={{marginRight:width<380 ?-165:-190, marginTop:-60}} />}
                <BlurView intensity={20} > 
                  <Text style={styles.dayWord}>{words.word}</Text>
                </BlurView>
            </View>
            <View style={styles.Detail}>
                <ScrollView>
                  <Text style={{fontSize:18, fontWeight:'bold'}}>Meaning: </Text>
                  <Text style={{fontSize:17, paddingLeft:35,paddingTop:10}}>{words.meaning}</Text>
                  <Text style={{fontSize:18, fontWeight:'bold',paddingTop:10}}>Synonym:</Text>
                  <Text style={{fontSize:17, paddingLeft:33,paddingTop:10}}> {words.synonym}</Text>
                  <Text style={{fontSize:18, fontWeight:'bold',paddingTop:10}}>Translation:</Text>
                  <Text style={{fontSize:17, paddingLeft:33,paddingTop:10}}> {words.translation}</Text>
                </ScrollView>
            </View> 
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Activity', {wordid: wordid,day: day})}> 
              <Text style={styles.wordText}>Attempt Activity</Text>
            </TouchableOpacity>   
        </View>
  )
}
export default Detail;
const styles = StyleSheet.create({
    Img:{
      height:950,
      width:width,
    },
    word:{
      fontSize:30,
      fontWeight:'bold',
      color:'white',
    },
    wordBox:{
      height:height<380 ? 150:170,
      // width:width<380 ? 230:250,
      borderRadius:30,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'white',
      opacity:0.5,
      margin:width<400 ? 70:80,
      // marginRight:width<400 ? 40:45,
      marginTop:height<380 ? 30:10,
      marginBottom:height<380 ? 50:65,
    },
    dayWord:{
      fontSize:width<380 ? 35: 35,
      fontWeight:'bold',
      color:'black',
      marginTop:height<380 ? 10:20,
    },
    Detail:{
      flex:1,
      margin:30,
      marginBottom:30,
      marginTop:-50,
      backgroundColor:'white',
      borderRadius:30 ,
      padding:30,
      shadowColor:'grey',
      shadowOpacity:0.4,
      shadowRadius:2,
      shadowOffset:{width:3,height:5},
      elevation:9
    },
   button:{
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#12e6cd',
      height:50,
      // width:width<390 ? 170:190,
      // marginLeft:width<400 ? 105:115,
      margin:width<390 ? 95:110,
      marginTop:height<380 ? 50:-55,
      marginBottom:20,
      shadowColor:'grey',
      shadowOpacity:0.4,
      shadowRadius:2,
      shadowOffset:{width:3,height:5},
      elevation:9
      },
    wordText: {
      fontWeight: 'bold',
      fontSize: 20,
      color:'grey',
  },
});