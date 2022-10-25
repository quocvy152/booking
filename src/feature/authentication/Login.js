import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, SafeAreaView, 
  Text, View, TouchableOpacity, 
  Image, Keyboard, Modal, Pressable, Alert
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

const Login = ({ navigation }) => {
  const navigate = useNavigation();
  const ADMIN_ROLE = 0;
  const USER_ROLE = 1;
  
  const dispatch = useDispatch();
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();

  // START TOASTCUSTOM MESSAGE
  const [isShowToast, setIsShowToast] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState();
  // END TOASTCUSTOM MESSAGE

  const [modalVisible, setModalVisible] = useState(false);

  // SHOW LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    const token = await AsyncStorage.getItem(AsyncStorageContstants.AUTH_USER_TOKEN);
    const role = await AsyncStorage.getItem(AsyncStorageContstants.ROLE);

    if(token) {
      await fetchInfoUser();

      if(+role == ADMIN_ROLE)
        navigate.navigate('AdminScreen');
      else if(+role == USER_ROLE)
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
      const { error, data: infoUser } = infoUserAPI.data;
 
      if(!error) {
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
      showToast({ content: 'Vui lòng điền đủ thông tin' })
      return;
    }

    let body = {
      username: Username,
      password: Password,
    }

    loginAPI(body)
      .then(res => {
        let { data, error, message } = res.data;
        if(error) {
          hideLoading();

            showToast({ type: 'error', content: message })
            return;

          // if(message == 'username or email in correct') {
          //   showToast({ type: 'error', content: 'Tài khoản hoặc Email không tồn tại' })
          //   return;
          // } 

          // if(message == 'password in correct') {
          //   showToast({ type: 'error', content: 'Mật khẩu không chính xác' })
          //   return;
          // }
        } else {
          let { token, user } = data;
          let { 
            _id, role, citizenIdentificationNo, drivingLicenseNo, 
            citizenIdentificationFront, citizenIdentificationBack, 
            drivingLicenseFront, drivingLicenseBack 
          } = user;

          hideLoading();

          AsyncStorage.setItem(
            AsyncStorageContstants.AUTH_USER_TOKEN,
            token,
          );

          AsyncStorage.setItem(
            AsyncStorageContstants.ROLE,
            JSON.stringify(role),
          );

          // save in store Redux
          dispatch(signIn({ token }));
          fetchInfoUser();

          showToast({ type: 'success', content: 'Đăng nhập thành công' });

          setTimeout(() => {
            switch (role) {
              case ADMIN_ROLE: {
                navigate.navigate('AdminScreen');
                break;
              }
              case USER_ROLE: {
                if(!citizenIdentificationNo || !drivingLicenseNo || !citizenIdentificationFront || !citizenIdentificationBack || !drivingLicenseFront || !drivingLicenseBack) {
                  // setTimeout(() => {
                  //   navigation.navigate('ValidateAccountScreen', { userID: _id });
                  // }, 3000)
                  navigate.navigate('AlertValidateAccountScreen', { userID: _id });
                } else {
                  navigate.navigate('HomeScreen');
                }
                break;
              }
              default:
                break;
            }
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
      {/* <View style={ styles.content }>
        <Text style={ styles.hiText }>
          Đăng Nhập Booking
        </Text>
        <Image 
          style={{ 
            width: 80, 
            height: 80,
            borderRadius: 40,
          }} 
          source={require('./../../../assets/adaptive-icon.png')} 
        />
      </View> */}
      <SafeAreaView style={ styles.container }>
        <StatusBar style='light' />
        <ToastCustom 
          isShowToast={isShowToast}
          contentToast={content}
          typeToast={type}
        />
        <View style={{ justifyContent: 'space-between', alignItems: 'center', }}>

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
                placeholderText='Nhập tài khoản'
                textColor={ COLORS.DEFAULT_TEXT } 
                textInputAction={(val) => {
                  setUsername(val)
                }}
            />
            </View>
            
            <View> 
            <TextInputCustom 
                icon='lock'
                placeholderText='Nhập mật khẩu'
                textColor={ COLORS.DEFAULT_TEXT }
                secureTextEntry={true}
                textInputAction={(val) => {
                  setPassword(val);
                }}
            />
            </View>
            
            <View style={{ marginTop: 15 }}>
              <ButtonCustom 
                  title='Đăng Nhập'
                  color='#2F4F4F'
                  btnAction={handleLoginSubmit}
                  btnLoading={isLoading}
              />
            </View>
        </View>

        <View style={ styles.action }>
            <TouchableOpacity style={ styles.buttonAction } onPress={openForgotPassword}>
              <Text style={ styles.buttonActionText }>Quên mật khẩu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ styles.buttonAction } onPress={openRegister}>
              <Text style={ styles.buttonActionText }>Đăng ký</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 30,
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Login;
