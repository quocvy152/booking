import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get('screen');
const contentWidth = width - 30;
import { 
  getListMyCar,
  getListCustomerBookingMyCar,
  getListCustomerReturnMyCar,
  getListCarBooking
} from '../../api/general';

import { COLORS } from '../../constant/colors';
import ButtonCustom from '../../components/ButtonCustom';
import { StatusBar } from 'expo-status-bar';
import images from '../../resources/images';

const InfoUser = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const avatar = infoUser?.avatar?.path;
  const [totalMyCar, setTotalMyCar] = useState();

  const [listCarWaitApprove, setListCarWaitApprove] = useState([]);
  const [listCarWaitPay, setListCarWaitPay] = useState([]);
  const [listCarBooking, setListCarBooking] = useState([]);

  const handleLogoutBtn = async () => {
    await AsyncStorage.clear();
    navigation.navigate('LoginScreen');
  }

  const fetchInfoNoti = async ({ page, name }) => {
    let TYPE_GET_LIST_CAR_WAIT_APPROVE = 3;
    let TYPE_GET_LIST_CAR_WAIT_PAYED = 4;
    let TYPE_GET_LIST_TRIP = 1;

    let resultGetAll = await Promise.all([
      getListCustomerBookingMyCar(TYPE_GET_LIST_CAR_WAIT_APPROVE, name),
      getListCustomerReturnMyCar(TYPE_GET_LIST_CAR_WAIT_PAYED, name, 'active'),
      getListCarBooking(TYPE_GET_LIST_TRIP, name)
    ]);

    let [ resultListCarWaitApprove, resultListCarWaitPay, resultCarBooking ] = resultGetAll;

    let { error: errorListWaitApprove, data: dataWaitApprove } = resultListCarWaitApprove.data;
    let { error: errorWaitPay, data: dataWaitPay }             = resultListCarWaitPay.data;
    let { error: errorCarBooking, data: dataCarBooking }       = resultCarBooking.data;

    if(!errorListWaitApprove) {
      setListCarWaitApprove(dataWaitApprove);
    }

    if(!errorWaitPay) {
      setListCarWaitPay(dataWaitPay);
    }
  
    if(!errorWaitPay) {
      setListCarBooking(dataCarBooking);
    }
  }

  useEffect(() => {
    fetchInfoNoti({  });
  }, [])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchInfoNoti({  });
    });
    return unsubscribe;
  }, [navigation]);

  const alert = () =>
    Alert.alert(
      "Thông Báo",
      "Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng không ?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Có", onPress: handleLogoutBtn }
      ]
    );

    useEffect(async () => {
      let TYPE_LIST_MY_CAR = '';
      let resultGetListMyCar = await getListMyCar({});
      const { error, data, message } = resultGetListMyCar.data;

      if(!error) {
        setTotalMyCar(data.length);
      } else {
        console.log({ message })
      }
    }, []);

  return (
    <SafeAreaView>
      <StatusBar style='dark' />
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.DEFAULT_BACKGROUND, height: 120, marginTop: -75 }}>
        <Text style={ styles.titleScreen }>Cá nhân</Text>
      </View>
      <View style={ styles.headerStyle }>
        {
          avatar ? 
          (<Image source={{ uri: avatar }} style={ styles.avatarStyle }/>) : 
          (<Image source={require('../../resources/images/user-300x300.png')} style={ styles.avatarStyle } />)
        }
        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
          <Text style={ styles.userName }>{ infoUser.lastName + ' ' + infoUser.firstName }</Text>
          <Text style={{ fontStyle: 'italic', color: '#e6b800' }}>
            Số xe đã đăng ký trên nền tảng: <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{ totalMyCar ? totalMyCar : '0' }</Text>
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Tài khoản */}
        <View style={ styles.accountStyle }>
          <Text style={{ fontSize: 18 }}>Tài khoản</Text>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate('DetaulInfoUserScreen') }}>
              <View style={ styles.tabStyle }>
                <FontAwesome5 name="user-alt" size={24} color="#77CBEB" />
                <Text style={{ marginTop: 16, fontSize: 15 }}>Thông tin cá nhân</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} >
              <View style={ styles.tabStyle }>
              <FontAwesome5 name="place-of-worship" size={24} color="#EB466E" />
                <Text style={{ marginTop: 16, fontSize: 15 }}>Địa chỉ đã lưu</Text>
              </View> 
            </TouchableOpacity>
          </View>
        </View>
        {/* Xe cá nhân */}
        <View style={ styles.accountStyle }>
          <Text style={{ fontSize: 18 }}>Xe cá nhân</Text>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate('ListCarUserScreen') }}>
              <View style={ styles.tabStyle }>
                <FontAwesome5 name="car" size={24} color="#37A604" />
                <Text style={{ marginTop: 16, fontSize: 15 }}>Xe của tôi</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ListCarLoanScreen')}>
              <View style={ styles.tabStyle }>
                <Ionicons name="calendar-outline" size={24} color="black" />
                <Text style={{ marginTop: 16, fontSize: 15 }}>Xe cho thuê</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ListCarWaitApproveScreen')}>
              <View style={ styles.tabStyle }>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',  }}>
                  <FontAwesome5 name="list-ul" size={24} color="#808000" />
                  {
                    listCarWaitApprove.length ?
                    <>
                      <View style={ styles.notiAlertStyle }>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{ listCarWaitApprove.length }</Text>
                      </View>
                    </> : <></>
                  }
                </View>
                <Text style={{ marginTop: 16, fontSize: 15 }}>Yêu cầu thuê xe</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ListCarWaitPayedScreen')}>
              <View style={ styles.tabStyle }>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',  }}>
                  <FontAwesome5 name="id-badge" size={24} color="#3E89A8" />
                  {
                    listCarWaitPay.length ?
                    <>
                      <View style={ styles.notiAlertStyle }>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{ listCarWaitPay.length }</Text>
                      </View>
                    </> : <></>
                  }
                </View>
                <Text style={{ marginTop: 16, fontSize: 15 }}>Yêu cầu trả xe</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Xe đã đặt */}
        <View style={ styles.accountStyle }>
          <Text style={{ fontSize: 18 }}>Xe đã đặt</Text>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ListTripUserScreen')}>
              <View style={ styles.tabStyle }>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',  }}>
                  <FontAwesome name="tripadvisor" size={24} color="#8B4513" />
                    {
                      listCarBooking.length ?
                      <>
                        <View style={ styles.notiAlertStyle }>
                          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{ listCarBooking.length }</Text>
                        </View>
                      </> : <></>
                    }
                </View>
                <Text style={{ marginTop: 16, fontSize: 15 }}>Xe đang thuê</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ListTripUserPayedScreen')}>
              <View style={ styles.tabStyle }>
                <FontAwesome5 name="hands-helping" size={24} color="#3E89A8" />
                <Text style={{ marginTop: 16, fontSize: 15 }}>Xe đã trả</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ListTripUserWaitApproveScreen')}>
              <View style={ styles.tabStyle }>
                <FontAwesome5 name="check-square" size={24} color="#2F4F4F" />
                <Text style={{ marginTop: 16, fontSize: 15 }}>Xe chờ chấp nhận thuê xe</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ListTripWaitPayedScreen')}>
              <View style={ styles.tabStyle }>
                <FontAwesome5 name="chalkboard-teacher" size={24} color="#FF4500" />
                <Text style={{ marginTop: 16, fontSize: 15 }}>Xe chờ chấp nhận trả xe</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Khách */}
        <View style={ styles.accountStyle }>
          <Text style={{ fontSize: 18 }}>Khác</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={alert}>
            <View style={ styles.btnAnotherStyle }>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome5 name="sign-out-alt" size={24} color="black" />
                  <Text style={{ fontSize: 16, marginLeft: 15, }}>Đăng xuất</Text>
                </View>
              <FontAwesome5 name="angle-right" size={24} color="black" style={{ marginLeft : 220 }} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },

  avatarStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },

  userName: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  headerStyle: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: COLORS.WHITE,
  },

  accountStyle: {
    width: contentWidth, 
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 25,
  },

  tabStyle: {
    marginTop: 11,
    height: 100,
    backgroundColor: COLORS.WHITE,
    width: contentWidth / 2 - 5,
    marginRight: 10,
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  btnAnotherStyle: {
    flexDirection: 'row', 
    marginTop: 20, 
    alignContent: 'space-between', 
    backgroundColor: COLORS.WHITE,
    height: 65,
    alignItems: 'center',
    padding: 20,
    borderRadius: 6,
  },

  titleScreen: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold',
    marginTop: 65 
  },

  notiAlertStyle: {
    backgroundColor: 'red', 
    height: 30, 
    width: 30, 
    borderRadius: 15, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
});

export default InfoUser;
