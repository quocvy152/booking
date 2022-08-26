import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Alert, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import NumberFormat from 'react-number-format';
import { removeCar, cancelBookingCar, acceptBookingCar, payedBookingCar, acceptPayedBookingCar } from '../../api/general';

const { width } = Dimensions.get('screen');
const contentWidth = width - 20;

import { COLORS } from '../../constant/colors';
import ButtonCustom from '../../components/ButtonCustom';
import { StatusBar } from 'expo-status-bar';
import ToastCustom from '../../components/ToastCustom';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const CarDetail = ({ navigation, route }) => {
  const car = route.params;
  const PREVIOUS_SCREEN_NAME = route.params.PREVIOUS_SCREEN_NAME;
  const ROUTE_NAME = route.params.ROUTE_NAME;
  const [infoSeats, setInfoSeats] = useState(car.details.find(detail => detail.characteristicID.characteristicTypeID.code === 'SOGHE'));
  const [infoTranmission, setInfoTranmission] = useState(car.details.find(detail => detail.characteristicID.characteristicTypeID.code === 'TRUYENDONG'));
  const [infoFuel, setInfoFuel] = useState(car.details.find(detail => detail.characteristicID.characteristicTypeID.code === 'NHIENLIEU'));
  const [infoFuelConsumption, setInfoFuelConsumption] = useState(car.details.find(detail => detail.characteristicID.characteristicTypeID.code === 'MUCTIEUTHUNHIENLIEU'));
  const [listFeature, setListFeature] = useState(car.details.filter(detail => detail.characteristicID.characteristicTypeID.code == 'TINHNANG'));
  const [listLicense, setListLicense] = useState(car.details.filter(detail => detail.characteristicID.characteristicTypeID.code == 'GIAYTOTHUEXE'));

   // START TOASTCUSTOM MESSAGE
   const [isShowToast, setIsShowToast] = useState(false);
   const [content, setContent] = useState();
   const [type, setType] = useState();
   // END TOASTCUSTOM MESSAGE

  const showToast = ({ content, type }) => {
    setIsShowToast(true);
    setContent(content);
    setType(type);
    setTimeout(() => {
      setIsShowToast(false);
    }, 1500)
  }

  const handleCancelRegisterCar = async () => {
    let carID = car.infoCar._id;
    let resultRemoveCar = await removeCar(carID);
    let { error, data, message } = resultRemoveCar.data;

    if(!error) {
      showToast({ content: 'Hủy đăng ký xe thành công', type: 'success' });
      setTimeout(() => {
        navigation.navigate('ListCarUserScreen');
      }, 1500)
    } else {
      showToast({ content: message, type: 'error' });
      return;
    }
  }

  const alert = () =>
    Alert.alert(
      "Thông Báo",
      "Bạn có chắc chắn muốn hủy đăng ký xe không ?",
      [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Có", onPress: handleCancelRegisterCar }
      ]
    );

    const alertBooking = () =>
    Alert.alert(
      "Thông Báo",
      "Bạn có chắc chắn muốn hủy xe đã đặt không ?",
      [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Có", onPress: handleCancelBooking }
      ]
    );

    const alertAcceptBooking = () =>
    Alert.alert(
      "Thông Báo",
      "Bạn có chắc chắn chấp nhận yêu cầu thuê xe này không ?",
      [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Có", onPress: handleAcceptBooking }
      ]
    );

    const alertAcceptPayedBooking = () =>
    Alert.alert(
      "Thông Báo",
      "Bạn có chắc chắn chấp nhận yêu cầu trả xe này không ?",
      [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Có", onPress: handleAcceptPayedBooking }
      ]
    );

    const alertPayedBooking = () =>
    Alert.alert(
      "Thông Báo",
      "Bạn có chắc chắn trả xe (thanh toán) xe này không ?",
      [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Có", onPress: handlePayedBooking }
      ]
    );

  const handleAcceptPayedBooking = async () => {
    let carID = car.id;

    const bodyAcceptBooking = {
      appUserId: car.bookings.bookedByUserId,
      carID: carID,
      startBooking: car.bookings.startBooking,
      endBooking: car.bookings.endBooking,
    }

    let resultAcceptPayedBooking = await acceptPayedBookingCar(bodyAcceptBooking);
    let { success, data, message } = resultAcceptPayedBooking.data;
    if(success) {
      showToast({ content: data, type: 'success' });
      setTimeout(() => {
        navigation.navigate('ListCarWaitApproveScreen');
      }, 1500)
    } else {
      showToast({ content: message, type: 'error' });
      return;
    }
  }

  const handlePayedBooking = async () => {
    let carID = car.id;

    const bodyPayedBooking = {
      car_id: carID,
      startBooking: car.bookings.startBooking,
      endBooking: car.bookings.endBooking,
    }

    let resultPayedBooking = await payedBookingCar(bodyPayedBooking);
    let { success, data, message } = resultPayedBooking.data;
    if(success) {
      showToast({ content: data, type: 'success' });
      setTimeout(() => {
        navigation.navigate('ListTripWaitPayedScreen');
      }, 1500)
    } else {
      showToast({ content: message, type: 'error' });
      return;
    }
  }

  const handleAcceptBooking = async () => {
    let carID = car.id;

    const bodyCancelBooking = {
      appUserId: car.bookings.bookedByUserId,
      carID: carID,
      startBooking: car.bookings.startBooking,
      endBooking: car.bookings.endBooking,
    }

    let resultAcceptBooking = await acceptBookingCar(bodyCancelBooking);
    let { success, data, message } = resultAcceptBooking.data;
    if(success) {
      showToast({ content: data, type: 'success' });
      setTimeout(() => {
        navigation.navigate('ListCarWaitApproveScreen');
      }, 1500)
    } else {
      showToast({ content: message, type: 'error' });
      return;
    }
  }

  const handleCancelBooking = async () => {
    // let carID = car?._id;
    let bookingID = car?.booking?._id;

    const bodyCancelBooking = {
      bookingID,
      // startBooking: car.bookings.startBooking,
      // endBooking: car.bookings.endBooking,
    }

    let resultCancelBooking = await cancelBookingCar(bodyCancelBooking);
    let { error, data, message } = resultCancelBooking.data;
    
    if(!error) {
      showToast({ content: 'Hủy thuê xe thành công', type: 'success' });
      setTimeout(() => {
        navigation.navigate('ListTripUserWaitApproveScreen');
      }, 1500)
    } else {
      showToast({ content: message, type: 'error' });
      return;
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1, flexDirection: 'column', }}>
      <StatusBar style='dark' />
      <ToastCustom 
          isShowToast={isShowToast}
          contentToast={content}
          typeToast={type}
        />
      <View style={ styles.header }>
        <FontAwesome5 name="chevron-left" size={28} color="black" onPress={navigation.goBack} />
        {
          PREVIOUS_SCREEN_NAME ?  
          (
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{ PREVIOUS_SCREEN_NAME }</Text>
          ) : (
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Trang chủ</Text>
          )
        }
      </View>

      <View style={ styles.body }>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ height: 280, justifyContent: 'center', alignItems: 'center' }} >
            {
              car.infoCar.avatar ?
              (
                <Image style={{ width: 220, height: 220, resizeMode: 'contain' }} source={{ uri: car.infoCar.avatar.path }} />
              ) : (
                <Image style={{ width: 220, height: 220, resizeMode: 'contain' }} source={require('../../resources/images/mazda-6-2020-26469.png')} />
              )
            }
            
          </View>
          <View style={ styles.styleParagraph }>
            <View style={ styles.headerParagraph }>
              <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 20, color: COLORS.WHITE, width: '75%' }} >{ car.infoCar.name }</Text>
              <View style={{ width: 50, height: 50, marginRight: 20, }}>
                <ButtonCustom
                  color={ COLORS.WHITE }
                  btnIcon='heart'
                  btnAction={() => console.log('You clicked favourite')}
                />
              </View>
            </View>
            <View style={ styles.contentParagraph }>
              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Đặc điểm</Text>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 18, }}>
                  {
                    infoSeats && (
                      <>
                        <FontAwesome5 name="chair" size={18} color='white' style={{ marginRight: 5, }}/>
                        <Text 
                          style={{ 
                            color: COLORS.WHITE, 
                            textAlign: 'justify', 
                            marginRight: 15,
                            lineHeight: 22, 
                            fontSize: 18, 
                            fontWeight: 'bold',
                          }}>
                            { infoSeats.characteristicID.characteristicTypeID.name }:
                        </Text>
                        <Text style={{ color: COLORS.WHITE, textAlign: 'justify', lineHeight: 22, fontSize: 16, }}>{ infoSeats.characteristicID.value }</Text>
                      </>
                    )
                  }
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 18, }}>
                  {
                      infoTranmission && (
                        <>
                          <FontAwesome5 name="cogs" size={18} color="white" style={{ marginRight: 5, }} />
                          <Text 
                            style={{ 
                              color: COLORS.WHITE, 
                              textAlign: 'justify', 
                              lineHeight: 22, 
                              marginRight: 15,
                              fontSize: 18, 
                              fontWeight: 'bold',
                            }}>{ infoTranmission.characteristicID.characteristicTypeID.name }:
                          </Text>
                          <Text style={{ color: COLORS.WHITE, textAlign: 'justify',lineHeight: 22, fontSize: 16, }}>{ infoTranmission.characteristicID.value }</Text>
                        </>
                      )
                    }
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 18, }}>
                  {
                    infoFuel && (
                      <>
                        <FontAwesome5 name="charging-station" size={18} color="white" style={{ marginRight: 5, }} />
                        <Text 
                          style={{ 
                            color: COLORS.WHITE, 
                            textAlign: 'justify', 
                            lineHeight: 22, 
                            marginRight: 15,
                            fontSize: 18, 
                            fontWeight: 'bold',
                          }}>{ infoFuel.characteristicID.characteristicTypeID.name }:
                        </Text>
                        <Text style={{ color: COLORS.WHITE, textAlign: 'justify', lineHeight: 22, fontSize: 16, }}>{ infoFuel.characteristicID.value }</Text>
                      </>
                    )
                  }
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 18, }}>
                  {
                    infoFuelConsumption && (
                      <>
                        <FontAwesome5 name="battery-half" size={18} color="white" style={{ marginRight: 5, }} />
                        <Text 
                          style={{ 
                            color: COLORS.WHITE, 
                            textAlign: 'justify', 
                            marginRight: 15, 
                            lineHeight: 22, 
                            fontSize: 18, 
                            fontWeight: 'bold',
                          }}>Mức tiêu thụ nhiên liệu:
                        </Text>
                        <Text style={{ color: COLORS.WHITE, textAlign: 'justify', lineHeight: 22, fontSize: 16, }}>{ infoFuelConsumption.characteristicID.value }</Text>
                      </>
                    )
                  }
                </View>
              </View>

              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Tính năng</Text>
                <View style={{ margin: 25, flex: 1, }}>
                  { 
                    listFeature.map(feature => (
                      <View style={{ borderWidth: 1, borderColor: 'white', padding: 10, borderRadius: 20, marginBottom: 10, }}>
                        <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                          {
                            feature.characteristicID.value
                          }
                        </Text>
                      </View> 
                    ))
                  }
                </View>
              </View>

              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Giấy tờ thuê xe</Text>
                <View style={{ margin: 25, flex: 1, }}>
                  { 
                    listLicense.map(license => (
                      <View style={{ marginBottom: 10, borderWidth: 1, borderColor: 'white', padding: 10, borderRadius: 20, }}>
                        <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                          {
                            license.characteristicID.value
                          }
                        </Text>
                      </View> 
                    ))
                  }
                </View>
              </View>

              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Điều khoản</Text>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 16, }}>{ car.infoCar.rules }</Text>
              </View>

              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Thông tin thuê</Text>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 16, }}>
                  Đơn giá thuê:
                  <NumberFormat
                    value={ car?.infoCar?.price }
                    displayType="text"
                    thousandSeparator
                    prefix="đ"
                    renderText={(value) => <Text style={{ fontWeight: 'bold' }}> {value}/ngày</Text>}
                  />
                </Text>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 16, }}>
                  Tổng số tiền thuê: 
                  <NumberFormat
                    value={ car?.booking?.totalPrice }
                    displayType="text"
                    thousandSeparator
                    prefix="đ"
                    renderText={(value) => <Text style={{ fontWeight: 'bold' }}> {value}</Text>}
                  />
                </Text>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 16, }}>Thời gian thuê: { 
                  moment(car?.booking?.startTime).format('L') + ' ' + moment(car?.booking?.startTime).format('LT') + ' - ' + moment(car?.booking?.endTime).format('L') + ' ' + moment(car?.booking?.endTime).format('LT')
                }</Text>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 16, }}>Địa chỉ nhận xe: { car?.booking?.pickUpPlace }</Text> 
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 16, }}>Địa chỉ trả xe: { car?.booking?.dropOffPlace }</Text>
              </View>

              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Mô tả</Text>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 16, }}>{ car.infoCar.description }</Text>
              </View>

            </View>
            {
              !ROUTE_NAME ?
              (
                <View style={ styles.btnParagraph }>
                  <ButtonCustom 
                    title='Thuê xe'
                    color={ COLORS.WHITE }
                    titleStyle={{ color: COLORS.DEFAULT_BACKGROUND, fontWeight: 'bold', fontSize: 20, marginLeft: 10, }}
                    btnHeight={60}
                    btnIcon='exchange-alt'
                    btnWidth={contentWidth}
                    btnAction={() => navigation.navigate('BorrowCarScreen', car)}
                  />
                </View>
              ) : (
                <></>
              )
            }

            {
              ROUTE_NAME == 'ListCarUserScreen' ?
              (
                <View style={ styles.groupBtnParagraph }>
                  <ButtonCustom 
                    title='Cập nhật xe'
                    color='#FFD700'
                    btnIcon='edit'
                    titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10, }}
                    btnHeight={60}
                    btnWidth={contentWidth}
                    btnAction={() => navigation.navigate('UpdateCarScreen', car)}
                  />
                  <View style={{ marginBottom: 20, }}></View>

                  <ButtonCustom 
                    title='Hủy đăng ký xe'
                    color='red'
                    btnIcon='luggage-cart'
                    titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10, }}
                    btnHeight={60}
                    btnWidth={contentWidth}
                    btnAction={alert}
                  />
                </View>
              ) : (
                <></>
              ) 
            }

            {
              ROUTE_NAME == 'ListTripUserWaitApproveScreen' ?
              (
                <View style={ styles.btnParagraph }>
                  <ButtonCustom 
                    title='Hủy đặt xe'
                    color='yellow'
                    titleStyle={{ color: COLORS.DEFAULT_BACKGROUND, fontWeight: 'bold', fontSize: 20, marginLeft: 10, }}
                    btnHeight={60}
                    btnIcon='holly-berry'
                    btnWidth={contentWidth}
                    btnAction={alertBooking}
                  />
                </View>
              ) : (
                <></>
              )
            }

            {
              ROUTE_NAME == 'ListTripUserScreen' ? 
              (
                <>
                  <View style={[styles.btnGroupParagraph, { flexDirection: 'row', }]}>
                    <TouchableOpacity 
                      onPress={alertPayedBooking}
                      style={{ 
                        backgroundColor: '#FF8C00', 
                        height: 50, 
                        width: contentWidth / 2 - 5, 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        marginRight: 10,  
                        borderRadius: 5,
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <FontAwesome5 name="history" size={20} color="white" />
                        <Text style={styles.titleButton}>Trả xe</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={alertBooking}
                      style={{ 
                        backgroundColor: '#2F4F4F', 
                        height: 50, 
                        width: contentWidth / 2 - 5, 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        borderRadius: 5,
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <FontAwesome5 name="unlink" size={20} color="white" />
                        <Text style={styles.titleButton}>Hủy thuê xe</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <></>
              )
            }
            {
              ROUTE_NAME == 'ListCarWaitApproveScreen' ?
              (
                <>
                  <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                    <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Thời gian thuê xe</Text>
                    <View style={{ margin: 25, flex: 1, }}>
                      { 
                        <>
                          <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                          {
                            'Ngày bắt đầu: ' + moment(car?.bookings?.startBooking).format('L') + ' ' + moment(car?.bookings?.startBooking).format('LT')
                          }
                          </Text>

                          <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                          {
                            'Ngày kết thúc: ' + moment(car?.bookings?.endBooking).format('L') + ' ' + moment(car?.bookings?.endBooking).format('LT')
                          }
                          </Text>
                        </>
                      }
                    </View>
                  </View>
                  <View style={ styles.btnParagraph }>
                    <ButtonCustom 
                      title='Chấp nhận cho thuê xe'
                      color='#2F4F4F'
                      titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10, }}
                      btnHeight={60}
                      btnIcon='check-double'
                      btnWidth={contentWidth}
                      btnAction={alertAcceptBooking}
                    />
                  </View>
                </>
              ) : (
                <></>
              )
            }
            {
              ROUTE_NAME == 'ListCarWaitPayedScreen' ?
              (
                <>
                  <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                    <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Thời gian thuê xe</Text>
                    <View style={{ margin: 25, flex: 1, }}>
                      { 
                        <>
                          <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                          {
                            'Ngày bắt đầu: ' + moment(car?.bookings?.startBooking).format('L') + ' ' + moment(car?.bookings?.startBooking).format('LT')
                          }
                          </Text>

                          <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                          {
                            'Ngày kết thúc: ' + moment(car?.bookings?.endBooking).format('L') + ' ' + moment(car?.bookings?.endBooking).format('LT')
                          }
                          </Text>
                        </>
                      }
                    </View>
                  </View>
                  <View style={ styles.btnParagraph }>
                    <ButtonCustom 
                      title='Chấp nhận cho trả xe'
                      color='#CD5C5C'
                      titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10, }}
                      btnHeight={60}
                      btnIcon='flag-checkered'
                      btnWidth={contentWidth}
                      btnAction={alertAcceptPayedBooking}
                    />
                  </View>
                </>
              ) : (
                <></>
              )
            }
            {
              ROUTE_NAME == 'ListTripUserPayedScreen' ?
              (
                <>
                  <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                    <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Thời gian thuê xe</Text>
                    <View style={{ margin: 25, flex: 1, }}>
                      { 
                        <>
                          <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                          {
                            'Ngày bắt đầu: ' + moment(car?.bookings?.startBooking).format('L') + ' ' + moment(car?.bookings?.startBooking).format('LT')
                          }
                          </Text>

                          <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                          {
                            'Ngày kết thúc: ' + moment(car?.bookings?.endBooking).format('L') + ' ' + moment(car?.bookings?.endBooking).format('LT')
                          }
                          </Text>
                        </>
                      }
                    </View>
                  </View>
                  <View style={ styles.btnParagraph }>
                    <ButtonCustom 
                      title='Tiếp tục thuê xe'
                      color='#000080'
                      titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10, }}
                      btnHeight={60}
                      btnIcon='car'
                      btnWidth={contentWidth}
                      btnAction={() => navigation.navigate('BorrowCarScreen', car)}
                    />
                  </View>
                </>
              ) : (
                <></>
              )
            }
            {
              ROUTE_NAME == 'ListTripWaitPayedScreen' ?
              (
                <>
                  <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                    <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Thời gian thuê xe</Text>
                    <View style={{ margin: 25, flex: 1, }}>
                      { 
                        <>
                          <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                          {
                            'Ngày bắt đầu: ' + moment(car?.bookings?.startBooking).format('L') + ' ' + moment(car?.bookings?.startBooking).format('LT')
                          }
                          </Text>

                          <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                          {
                            'Ngày kết thúc: ' + moment(car?.bookings?.endBooking).format('L') + ' ' + moment(car?.bookings?.endBooking).format('LT')
                          }
                          </Text>
                        </>
                      }
                    </View>
                  </View>
                  <View style={{paddingBottom: 90}}>
                    
                  </View>
                </>
              ) : (
                <></>
              )
            }
            
          </View>
        </ScrollView>
      </View>
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

  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    marginLeft: 20, 
    alignItems: 'center',
  },

  body: {
  },

  headerParagraph: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },  
  
  contentParagraph: {
  },  

  frameImage: {
  },  

  styleParagraph: {
    flexDirection: 'column', 
    backgroundColor: COLORS.DEFAULT_BACKGROUND, 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40,
  },  

  btnParagraph: {
    height: 150,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },

  btnGroupParagraph: {
    height: 150,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  
  groupBtnParagraph: {
    height: 250,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },  

  titleButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default CarDetail;
