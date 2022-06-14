import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView, } from 'react-native';
import Day from './screens/Day';
import Detail from './screens/Detail';
import Activity from './screens/Activity';
import Result from './screens/Result';
import Level from './screens/Level';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const Stack = createNativeStackNavigator();
  useFonts({
    'Abril': require('./assets/Fonts/AbrilFatface-Regular.ttf'),
    'Anton': require('./assets/Fonts/Anton-Regular.ttf'),
    'Alfa': require('./assets/Fonts/AlfaSlabOne-Regular.ttf'),
    'Blaka': require('./assets/Fonts/Blaka-Regular.ttf'),
    'DMSeri': require('./assets/Fonts/DMSerifDisplay-Regular.ttf'),
    'Ultra': require('./assets/Fonts/Ultra-Regular.ttf'),
    'Nunito-Regular': require('./assets/Fonts/Nunito-Regular.ttf'),
    'Roboto-Regular': require('./assets/Fonts/Roboto-Regular.ttf'),
  })

  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer >
          <Stack.Navigator>
              <Stack.Screen name="Level" component={Level} options={{headerShown:false}}/>
              <Stack.Screen name="Day" component={Day} options={{headerShown:false}}/>
              <Stack.Screen name="Detail" component={Detail} options={{headerShown:false}} />
              <Stack.Screen name="Activity" component={Activity} options={{headerShown:false}}/>
              <Stack.Screen name="Result" component={Result} options={{headerShown:false}}/>
          </Stack.Navigator>
          <StatusBar mode="light" />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
