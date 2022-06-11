import React from 'react'
import { View,ScrollView, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height}= Dimensions.get('window');
const Level = ({navigation}) => {
  const removeData = async () => {
    await AsyncStorage.removeItem('scoreCount');
}

  return (
    <View style={{flex:1}}>
      <View style={StyleSheet.container} >
        <Image source={require('../assets/lll.png')} style={styles.BgImage}/>
        <View style={styles.second}>
          <Text style={styles.head}>EVERYDAY IS A NEW DAY TO LEARN</Text>
          <Text style={styles.subHead}>TsigZung</Text>
        </View>
      </View>
      <View style={styles.bodyCon}>
        <Text style={{fontSize:15,paddingLeft:width<380 ? 60:70,fontWeight:'bold'}}>Please Click on Levels To View Days</Text>
        <ScrollView>
          <TouchableOpacity style={styles.Touch1} onPress={()=>navigation.navigate('Day', {x:0,y:30})}>
              <Text style={styles.wordText}>Level 1</Text> 
          </TouchableOpacity >
          <TouchableOpacity  style={styles.Touch} onPress={()=>navigation.navigate('Day', {x:31,y:59})}>
              <Text style={styles.wordText}>Level 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Touch}  onPress={()=>navigation.navigate('Day', {x:60,y:90})}>
              <Text style={styles.wordText}>Level 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Touch}  onPress={()=>navigation.navigate('Day', {x:91,y:120})}>
              <Text style={styles.wordText}>Level 4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Touch}  onPress={()=>navigation.navigate('Day', {x:121,y:151})}>
              <Text style={styles.wordText}>Level 5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Touch} onPress={()=>navigation.navigate('Day', {x:152,y:181})}>
              <Text style={styles.wordText}>Level 6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Touch}  onPress={()=>navigation.navigate('Day', {x:182,y:212})}>
              <Text style={styles.wordText}>Level 7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Touch}  onPress={()=>navigation.navigate('Day', {x:213,y:243})}>
              <Text style={styles.wordText}>Level 8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Touch}  onPress={()=>navigation.navigate('Day', {x:244,y:273})}>
              <Text style={styles.wordText}>Level 9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Touch}  onPress={()=>navigation.navigate('Day', {x:274,y:304})}>
              <Text style={styles.wordText}>Level 10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Touch}  onPress={()=>navigation.navigate('Day', {x:305,y:334})}>
              <Text style={styles.wordText}>Level 11</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Touch}  onPress={()=>navigation.navigate('Day', {x:335,y:365})}>
              <Text style={styles.wordText}>Level 12</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Touch}  onPress={()=>{removeData()}}>
              <Text style={styles.wordText}>Restart</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
}

export default Level;
const styles=StyleSheet.create({
    container:{
        flex:1,
        height:350,
        width:width,
      },
    BgImage:{
        height:height<400 ? 350:350,
        width:'100%',
      },
    second:{
        marginTop:height<400 ? 40:-280,
        width:width<380 ? 215:215,
        paddingLeft:20
      },
      head:{
        fontSize:30,
        fontWeight:'bold',
        // fontFamily:'Nunito-Regular',
        color:'white'
      },
      subHead:{
        fontSize:15,
        fontWeight:'bold',
        color:'grey',
      },
      bodyCon:{
        flex:1,
        backgroundColor:'#e6e6e6',
        marginTop:height<400 ? 20: 50,
        borderTopRightRadius:40,
        borderTopLeftRadius:40,
        paddingTop:10
      },
      wordText: {
        fontWeight: 'bold',
        fontSize: 18,
        color:'black',
      },
      Touch:{
       marginLeft:20,
        marginRight:20,
        marginBottom:10,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        height:60,
        elevation:10,
        shadowColor:'grey',
        shadowOpacity:0.3,
        shadowOffset:{width:9,height:8},
      },
      Touch1:{
        marginLeft:20,
        marginTop:10,
        marginRight:20,
        marginBottom:10,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        height:60,
        elevation:10,
        shadowColor:'grey',
        shadowOpacity:0.3,
        shadowOffset:{width:9,height:8}
       },
}
)