import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import Login from './src/feature/authentication/Login';
import ForgotPassword from './src/feature/authentication/ForgotPassword';

const Stack = createStackNavigator(); 

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true }}>
        <Stack.Screen name='LoginScreen' component={Login} />
        <Stack.Screen name='ForgotPasswordScreen' component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}