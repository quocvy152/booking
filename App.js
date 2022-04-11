import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import Login from './src/feature/authentication/Login';
import ForgotPassword from './src/feature/authentication/ForgotPassword';
import Register from './src/feature/authentication/Register';
import Home from './src/feature/home/Home';
import BottomNavigator from './src/components/BottomNavigator';

const Stack = createStackNavigator(); 

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true }}>
        <Stack.Screen name='LoginScreen' component={Login} />
        <Stack.Screen name='ForgotPasswordScreen' component={ForgotPassword} />
        <Stack.Screen name='RegisterScreen' component={Register} />
        <Stack.Screen name='HomeScreen' component={Home} />
        <Stack.Screen name='BottomNavigator' component={BottomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}