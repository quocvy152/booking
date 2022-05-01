import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import Login from './src/feature/authentication/Login';
import ForgotPassword from './src/feature/authentication/ForgotPassword';
import Register from './src/feature/authentication/Register';
import Home from './src/feature/home/Home';
import BottomNavigator from './src/components/BottomNavigator';
import CarDetail from './src/feature/car/CarDetail';
import DetailInfoCustomer from './src/feature/account/DetailInfoUser';
import { Provider } from 'react-redux';
import store from './src/store/index';

const Stack = createStackNavigator(); 

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation, route }) => ({
            headerTitle: null,
            headerShown: false,
        })}>
          <Stack.Screen name='LoginScreen' component={Login} />
          <Stack.Screen name='ForgotPasswordScreen' component={ForgotPassword} />
          <Stack.Screen name='RegisterScreen' component={Register} />
          <Stack.Screen name='HomeScreen' component={BottomNavigator} />
          <Stack.Screen name='DetaulInfoCustomerScreen' component={DetailInfoCustomer} /> 
          <Stack.Screen name='CarDetailScreen' component={CarDetail} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}