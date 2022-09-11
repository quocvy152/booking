import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import Login from './src/feature/authentication/Login';
import ForgotPassword from './src/feature/authentication/ForgotPassword';
import Register from './src/feature/authentication/Register';
import ValidateAccount from './src/feature/authentication/ValidateAccount';
import AlertValidateAccount from './src/feature/authentication/AlertValidateAccount';
import BottomNavigator from './src/components/BottomNavigator';
import BottomNavigatorAdmin from './src/components/BottomNavigatorAdmin';
import CarDetail from './src/feature/car/CarDetail';
import InfoUser from './src/feature/account/InfoUser';
import Support from './src/feature/support/Support';
import Favourite from './src/feature/favourite/Favourite';
import DetailInfoUser from './src/feature/account/DetailInfoUser';
import ListCarUser from './src/feature/account/ListCarUser';
import ListTripUser from './src/feature/account/ListTripUser';
import ListTripUserWaitApprove from './src/feature/account/ListTripUserWaitApprove';
import ListCarWaitApprove from './src/feature/account/ListCarWaitApprove';
import ListCarWaitPayed from './src/feature/account/ListCarWaitPayed';
import ListTripUserPayed from './src/feature/account/ListTripUserPayed';
import ListTripWaitPayed from './src/feature/account/ListTripWaitPayed';
import AddCar from './src/feature/account/AddCar';
import UpdateCar from './src/feature/account/UpdateCar';
import BorrowCar from './src/feature/account/BorrowCar';
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
          <Stack.Screen name='AlertValidateAccountScreen' component={AlertValidateAccount} />
          <Stack.Screen name='ValidateAccountScreen' component={ValidateAccount} />
          <Stack.Screen name='HomeScreen' component={BottomNavigator} />
          <Stack.Screen name='AdminScreen' component={BottomNavigatorAdmin} />
          <Stack.Screen name='InfoUserScreen' component={InfoUser} />
          <Stack.Screen name='SupportScreen' component={Support} />
          <Stack.Screen name='FavouriteScreen' component={Favourite} />
          <Stack.Screen name='DetaulInfoUserScreen' component={DetailInfoUser} /> 
          <Stack.Screen name='ListCarUserScreen' component={ListCarUser} /> 
          <Stack.Screen name='AddCarScreen' component={AddCar} /> 
          <Stack.Screen name='ListTripUserScreen' component={ListTripUser} /> 
          <Stack.Screen name='ListCarWaitApproveScreen' component={ListCarWaitApprove} /> 
          <Stack.Screen name='ListCarWaitPayedScreen' component={ListCarWaitPayed} /> 
          <Stack.Screen name='ListTripUserWaitApproveScreen' component={ListTripUserWaitApprove} /> 
          <Stack.Screen name='ListTripUserPayedScreen' component={ListTripUserPayed} /> 
          <Stack.Screen name='ListTripWaitPayedScreen' component={ListTripWaitPayed} /> 
          <Stack.Screen name='CarDetailScreen' component={CarDetail} /> 
          <Stack.Screen name='UpdateCarScreen' component={UpdateCar} /> 
          <Stack.Screen name='BorrowCarScreen' component={BorrowCar} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}