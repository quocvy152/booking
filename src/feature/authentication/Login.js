import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, SafeAreaView, 
  Text, View, TouchableOpacity, 
  Image, Keyboard, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@expo/vector-icons/Entypo';

import { COLORS } from '../../constant/colors';
import images from '../../resources/images';
import ButtonCustom from '../../components/ButtonCustom';
import TextInputCustom from '../../components/TextInputCustom';
import ToastCustom from '../../components/ToastCustom';
import { loginAPI, getInfoUser } from '../../api/auth';
import { signIn } from '../../store/auth';
import { AsyncStorageContstants } from "../../constant/AsyncStorageContstants";

const Login = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();

  // START TOASTCUSTOM MESSAGE
  const [isShowToast, setIsShowToast] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState();
  // END TOASTCUSTOM MESSAGE

  // SHOW LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    const token = await AsyncStorage.getItem(AsyncStorageContstants.AUTH_USER_TOKEN);
    if(token) {
      await fetchInfoUser();
      navigate.navigate('HomeScreen');
    }
  }, []);

  const openForgotPassword = () => {
    navigate.navigate('ForgotPasswordScreen');
  }

  const openRegister = () => {
    navigate.navigate('RegisterScreen');
  }

  const showToast = ({ content, type }) => {
    setIsShowToast(true);
    setContent(content);
    setType(type);
    setTimeout(() => {
      setIsShowToast(false);
    }, 1500)
  }

  const showLoading = () => {
    setIsLoading(true);
  }

  const hideLoading = () => {
    setIsLoading(false);
  }

  const fetchInfoUser = async () => {
    try {
      let infoUserAPI = await getInfoUser();
      const { success, data: infoUser } = infoUserAPI.data;

      if(success) {
        AsyncStorage.setItem(
          AsyncStorageContstants.AUTH_USER_INFO,
          JSON.stringify(infoUser),
        );
      }

      dispatch(signIn({ infoUser }));
    } catch (error) {
      console.log({ error })
    }
  }

  const handleLoginSubmit = async () => {
    Keyboard.dismiss();
    showLoading();

    if(!Username || !Password) {
      hideLoading();
      showToast({ content: 'Vui l??ng ??i???n ????? th??ng tin' })
      return;
    }

    let body = {
      Username,
      Password,
    }

    loginAPI(body)
      .then(res => {
        let { data: token, success, message } = res.data;
        console.log({ token, success, message })
        if(!success) {
          hideLoading();

            showToast({ type: 'error', content: message })
            return;

          // if(message == 'username or email in correct') {
          //   showToast({ type: 'error', content: 'T??i kho???n ho???c Email kh??ng t???n t???i' })
          //   return;
          // } 

          // if(message == 'password in correct') {
          //   showToast({ type: 'error', content: 'M???t kh???u kh??ng ch??nh x??c' })
          //   return;
          // }
        } else {
          hideLoading();

          AsyncStorage.setItem(
            AsyncStorageContstants.AUTH_USER_TOKEN,
            token,
          );

          // save in store Redux
          dispatch(signIn({ token }));
          fetchInfoUser();

          showToast({ type: 'success', content: '????ng nh???p th??nh c??ng' });
          setTimeout(() => {
            navigate.navigate('HomeScreen');
          }, 1000);
        }
      })
      .catch( err => {
        console.log({ err });
        return;
      })
    console.log('login');
  }
    
  return (
    <>
      <SafeAreaView style={ styles.container }>
        <StatusBar style='light' />
        <ToastCustom 
          isShowToast={isShowToast}
          contentToast={content}
          typeToast={type}
        />
        <View style={ styles.content }>
            <Text style={ styles.hiText }>
              ????ng Nh???p Booking
            </Text>
        </View>

        <View>
          <Image 
            style={{ 
              width: 350, 
              height: 150,
              marginBottom: 25, 
              borderRadius: 10,
            }} 
            source={ images.bg_login } 
          />
        </View>

        <View style={ styles.form }>
            <View style={{ marginBottom: 10, }}> 
            <TextInputCustom 
                icon='user-alt'
                placeholderText='Nh???p t??i kho???n'
                textColor={ COLORS.DEFAULT_TEXT } 
                textInputAction={(val) => {
                  setUsername(val)
                }}
            />
            </View>
            
            <View> 
            <TextInputCustom 
                icon='lock'
                placeholderText='Nh???p m???t kh???u'
                textColor={ COLORS.DEFAULT_TEXT }
                secureTextEntry={true}
                textInputAction={(val) => {
                  setPassword(val);
                }}
            />
            </View>
            
            <View style={{ marginTop: 15 }}>
              <ButtonCustom 
                  title='????ng Nh???p'
                  color='#2F4F4F'
                  btnAction={handleLoginSubmit}
                  btnLoading={isLoading}
              />
            </View>
        </View>

        <View style={ styles.action }>
            <TouchableOpacity style={ styles.buttonAction } onPress={openForgotPassword}>
              <Text style={ styles.buttonActionText }>Qu??n m???t kh???u</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ styles.buttonAction } onPress={openRegister}>
              <Text style={ styles.buttonActionText }>????ng k??</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const DEFAULT_TEXT = {
  color: COLORS.WHITE,
  textAlign: 'center'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
  },

  hiText: {
    ...DEFAULT_TEXT,
    fontSize: 20,
    lineHeight: 50,
    fontWeight: 'bold',
  },

  content: {
    paddingHorizontal: 30,
  },

  form: {
    width: '90%',
  },

  buttonActionText: {
    ...DEFAULT_TEXT,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonAction: {
    paddingHorizontal: 90,
    paddingVertical: 20
  },

  action: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default Login;
