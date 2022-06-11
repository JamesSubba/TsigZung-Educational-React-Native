import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height}=Dimensions.get('window');
const Result = ({navigation, route}) => {
    const [storeCount, setStoreCount] = useState(0);
    const score = route.params.score;
    const answers = route.params.answers;
    const wordid = route.params.wordid;
    const day = route.params.day;

    const addcounter = () => {
      setStoreCount(storeCount+1);
      add();
    }

    useEffect(() => {
      getTodosFromUserDevice();
    },[]);

    const getTodosFromUserDevice = async () => {
      try {
        const count = await AsyncStorage.getItem('scoreCount');
        if (count != null) {
          setStoreCount(JSON.parse(count));
        }
      } catch (error) {
        console.log(error);
      }
    };

    const add = async () => {
      try {
        const Day = day-1;
        if(storeCount==Day){
          await AsyncStorage.setItem('scoreCount', JSON.stringify(storeCount+1));
          navigation.navigate('Level');
        }
        else{
          navigation.navigate('Level');
        }
      } catch (error) {
        console.log(error);
      }
    };

    const Finish = () =>{
        addcounter();
    }

    const TryAgain = () =>{
        navigation.navigate('Detail', {wordid: wordid, day: day});
    }

  return (
    <View style={{flex:1,height:'100%', width:'100%'}}>
      <Image source={require('../assets/r.png')} style={styles.Img}/>
        <View style={{alignItems:'center',marginTop:-430}}>
          <Text style={styles.wordText}>{score}/5</Text>
        </View>
        <View style={styles.result}>
          {score>2?<Text style={styles.text}>You passed!</Text>:<Text style={styles.text2}>You Failed!</Text>}
        </View>
        <View style={styles.ansCon}>
          <ScrollView>
            {answers.map((answer, answerIndex)=> {
              return (
                <View key={answerIndex} style={styles.ans}>
                  <Text style={styles.que}>Question {answerIndex+1}</Text>
                    {answer==true?<AntDesign name="checkcircle" size={24} color="green" />:<AntDesign name="closecircle" size={24} color="red" />}
                </View>
              )
          })}
          </ScrollView> 
        </View>
      {score>2?<TouchableOpacity style={styles.button} onPress={()=>Finish()}> 
        <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Finish</Text>
      </TouchableOpacity>:<TouchableOpacity style={styles.button2} onPress={()=>TryAgain()}> 
        <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Try Again</Text>
      </TouchableOpacity>}
    </View>
  )
}

export default Result
const styles = StyleSheet.create({
    Img:{
      width:'100%',
      height:540,
      borderBottomRightRadius:200,
      borderBottomLeftRadius:200
    },
    wordText: {
      fontSize: 50,
      color:'#fc51a7'
    },
    result:{
      marginLeft:30,
      marginTop:75,
      marginRight:30,
      marginBottom:0,
      alignItems:'center',
      justifyContent:'center'
    },
    text:{
      fontSize:30,
      fontWeight:'bold',
      color:'white'
    },
    text2:{
      fontSize:30,
      fontWeight:'bold',
      color:'white'
    },
    ansCon:{
      backgroundColor:'white',
      flex:1,
      margin:25,
      marginBottom:30,
      paddingTop:15,
      marginTop:+5,
      borderRadius:30,
      alignItems:'center',
      shadowColor:'grey',
      elevattion:9,
      shadowOpacity:0.5,
      shadowRadius:2,
      shadowOffset:{width:3,height:6}
    },
    ans:{
      height:50,
      alignItems:'center',
      flexDirection:'row',
      backgroundColor:"#f5f5f2",
      borderRadius:10,
      paddingLeft:20,
      paddingRight:20,
      shadowColor:'grey',
      shadowOpacity:0.5,
      shadowRadius:2,
      shadowOffset:{width:3,height:5},
      margin:9,
      elevation:9
    },
    que:{
      fontSize:20,
      fontWeight:'bold',
      paddingRight:100
    },
    button:{
      alignItems:'center',
      justifyContent:'center',
      height:40,
      backgroundColor:'green',
      marginLeft:130,
      marginRight:130,
      borderRadius:12,
      marginTop:-50,
      marginBottom:15,
      shadowColor:'grey',
      shadowOpacity:0.4,
      // shadowRadius:2,
      shadowOffset:{width:3,height:5},
      elevation:10
    },
    button2:{
      alignItems:'center',
      justifyContent:'center',
      height:40,
      backgroundColor:'red',
      marginLeft:130,
      marginRight:130,
      borderRadius:12,
      marginTop:-50,
      marginBottom:15,
      shadowColor:'grey',
      shadowOpacity:0.5,
      shadowRadius:2,
      shadowOffset:{width:3,height:5},
      elevation:9
    },
  });