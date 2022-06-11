import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import db from "../firebase";
import { collection,doc,getDocs } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../components/Colors'

const {width,height}=Dimensions.get('window');
const Activity = ({navigation, route}) => {
    const wordid = route.params.wordid;
    const day = route.params.day;
    const [questions, setQuestions] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [display, setDisplay] = useState(false);
  
    const shuffleArray = array => {
      for (let i = array.length - 1; i>0; i--){
        let j = Math.floor(Math.random()*(i+1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    const getQuizAndQuestionDetails = async () => {
      const docRef = doc(db, "words", wordid);
      const colRef = collection(docRef, "q&a");
      const questions = await getDocs(colRef);

      let tempQuestions = [];
      await questions.docs.forEach(async res => {
        let question = res.data();
        question.allOptions = shuffleArray([
          ...question.incorrect_answer, 
          question.correct_answer
        ]);
      await tempQuestions.push(question);
      });
      setQuestions([...tempQuestions]);
    }
    useEffect(()=> {
        getQuizAndQuestionDetails();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getOptionTextOpacity = (currentQuestion, currentOption) => {
        if (currentQuestion.selectedOption) {
          if (currentOption == currentQuestion.selectedOption) {
            return COLORS.dark;
          }
          else {
            return COLORS.light;
          }
        } 
        else {
          return COLORS.light;
        }
      };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/10.png' )} style={styles.Bg} />
        <View style={{paddingLeft:width<380 ? 10:15,marginTop:height<400 ? 40:-670}}>
          <Ionicons name="ios-chevron-back" size={30} color="white" onPress={navigation.goBack}/>
        </View>
        <View style={{alignItems:'center',marginTop:height<400 ? 30:-13}}>
          <Image source={require('../assets/14.png')} style={{height:60, width:width<380 ? 150:150}}/>
        </View>
          <View style={styles.quiz}>
            <Text style={{fontSize:17,color:'#FF007F', fontWeight:'bold',marginTop:-10}}>Test your knowledge</Text>
            <View style={{marginTop:height<380 ? 100:-120,marginLeft:width<400 ? 200:230}}>
              <Image source={require('../assets/11.png')} style={{height:height<380 ? 100:130,width:width<380 ? 100:110}}/>
            </View>
              <ScrollView> 
                <FlatList
                  data={questions}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.question}
                  renderItem={({item, index}) => (
                    <View> 
                      <View style={{margin:7}}>
                        <Text style={styles.question} >
                          {index+1 +'.'}{item.question}
                        </Text>
                      </View>
                      {/* Options */}
                      {item.allOptions.map((option, optionIndex) => {
                        return (
                          <TouchableOpacity
                            key={optionIndex}
                            onPress={() => {
                              if (item.selectedOption) {
                                return null;
                              }
                              if (option == item.correct_answer) {
                                setCorrectCount(correctCount + 1);
                                setAnswers((prev)=>[...prev,true])                      
                              } else {
                                setIncorrectCount(incorrectCount + 1);
                                setAnswers((prev)=>[...prev,false])                      
                              }
                                let tempQuestions = [...questions];
                                tempQuestions[index].selectedOption = option;
                                setQuestions([...tempQuestions]);
                                setDisplay(true);
                            }}
                            style={styles.opt}
                            >
                              <View style={{flexDirection:'row'}}>
                                <View style={{borderWidth:1,height:15,width:15, borderRadius:10, justifyContent:'center',alignItems:'center', marginRight: 20}}>
                                  <View style={{backgroundColor:'black',height:9,width:9, borderRadius:10,opacity: getOptionTextOpacity(item,option)}}></View>
                                </View>
                                  <Text >{option}</Text>
                              </View>
                          </TouchableOpacity>
                        );
                      })}   
                    </View>
                  )}
                />
              </ScrollView>
          </View>
          <TouchableOpacity onPress={()=>{ 
            if(answers.length==5){
              navigation.navigate('Result',
              {score: correctCount, answers: answers, wordid: wordid, day: day}
              )}
            else{Alert.alert('Please answer all the questions!!!!')}}} style={styles.btn}>
              <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}
export default Activity;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      height:'100%',
      width:'100%',
      backgroundColor:'white'
    },
    Bg:{
      height:700,
      width:'100%',
    },
    quiz:{
      flex:1,
      backgroundColor:'white',
      marginTop:+8,
      margin:30,
      borderRadius:40,
      padding:30,
      paddingRight:0,
      elevation:10,
      shadowColor:'#c4c4c4',
      shadowOpacity:0.6,
      shadowRadius:2,
      shadowOffset:{width:3,height:6}
    },
    question: {
      fontWeight: 'bold',
      fontSize: 15
    },
    answer:{
      fontSize:15,
      padding:5,
      paddingLeft:10,
    },
    opt:{
      margin:5,
      marginRight:25,
      justifyContent:'center',
      padding:5,
      borderRadius:10,
      paddingLeft:20,
    },
    btn:{
      backgroundColor:'#fa2f9b',
      height:height<400 ? 30:40,
      width:width<400 ? 120:120,
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center',
      marginTop:height<380 ? 40:-50,
      margin:width<400 ? 130:150,
      marginBottom:height<400 ? 10:10,
      shadowColor:'grey',
      shadowOpacity:0.4,
      shadowRadius:2,
      shadowOffset:{width:3,height:5}
    },
  });