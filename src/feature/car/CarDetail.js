import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Alert, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import NumberFormat from 'react-number-format';
import { 
  removeCar, 
  cancelBookingCar, 
  acceptBookingCar, 
  payedBookingCar, 
  acceptPayedBookingCar,
  favouriteCar,
  unFavouriteCar
} from '../../api/general';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('screen');
const contentWidth = width - 42;

import { COLORS } from '../../constant/colors';
import ButtonCustom from '../../components/ButtonCustom';
import { StatusBar } from 'expo-status-bar';
import ToastCustom from '../../components/ToastCustom';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import 'moment/locale/vi';
import { SliderBox } from "react-native-image-slider-box";

const CarDetail = ({ navigation, route }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const car = route.params;
  const infoOwner = car.infoCar && car.infoCar.userID; 
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
    let bookingID = car?.booking?._id;

    const bodyAcceptBooking = {
      bookingID
    }

    let resultAcceptPayedBooking = await acceptPayedBookingCar(bodyAcceptBooking);
    let { error, data, message } = resultAcceptPayedBooking.data;

    if(!error) {
      showToast({ content: 'Bạn đã chấp nhận yêu cầu trả xe', type: 'success' });
      setTimeout(() => {
        navigation.navigate('ListCarWaitApproveScreen');
      }, 1500)
    } else {
      showToast({ content: message, type: 'error' });
      return;
    }
  }

  const handlePayedBooking = async () => {
    let bookingID = car?.booking?._id;

    const bodyPayedBooking = {
      bookingID
    }

    let resultPayedBooking = await payedBookingCar(bodyPayedBooking);
    let { error, data, message } = resultPayedBooking.data;

    if(!error) {
      showToast({ content: 'Yêu cầu trả xe của bạn đã được ghi lại. Hãy đợi chủ xe chấp nhận nhé', type: 'success' });
      setTimeout(() => {
        navigation.navigate('ListTripWaitPayedScreen');
      }, 1500)
    } else {
      showToast({ content: message, type: 'error' });
      return;
    }
  }

  const handleAcceptBooking = async () => {
    let bookingID = car?.booking?._id;

    const bodyAcceptBooking = {
      bookingID
    }

    let resultAcceptBooking = await acceptBookingCar(bodyAcceptBooking);
    let { error, data, message } = resultAcceptBooking.data;

    if(!error) {
      showToast({ content: 'Duyệt yêu cầu thuê xe thành công. Bạn đã chấp nhận cho thuê xe', type: 'success' });
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

  const handleUnFavouriteCar = async () => {
    let resultUnFavouriteCar = await unFavouriteCar({ favouriteID: car?.favouriteID });
    let { error, data } = resultUnFavouriteCar.data;

    if(!error) {
      showToast({ content: `Bạn đã loại bỏ ${car?.infoCar?.name} ra khỏi danh sách yêu thích`, type: 'success' });
      setTimeout(() => {
        navigation.goBack();
      }, 1500)
    }
  }

  const handleFavouriteCar = async () => {
    let bodyFavouriteCar = {
      userID: infoUser?._id,
      carID: car?.infoCar?._id
    }

    let resultFavouriteCar = await favouriteCar(bodyFavouriteCar);
    let { error, data } = resultFavouriteCar.data;

    if(!error)
      showToast({ content: `Bạn đã thêm ${car?.infoCar?.name} vào danh sách yêu thích`, type: 'success' });
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
        <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '3%' }}>
          <FontAwesome5 name="chevron-left" size={20} color="white" onPress={() => navigation.goBack()} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '97%' }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>Thông tin chi tiết xe</Text>
        </View>
      </View>

      <View style={{ height: 220, justifyContent: 'center', alignItems: 'center' }} >
        {/* {
          car.infoCar.avatar ?
          (
            <Image style={{ width: 220, height: 220, resizeMode: 'contain' }} source={{ uri: car.infoCar.avatar.path }} />
          ) : (
            <Image style={{ width: 220, height: 220, resizeMode: 'contain' }} source={require('../../resources/images/mazda-6-2020-26469.png')} />
          )
        } */}
        <SliderBox ImageComponentStyle={{ height: 250, marginBottom: 100, }} images={[ car?.infoCar?.avatar?.path, ...car?.infoCar?.gallery.map(image => image.path)  ]} />
      </View>

      <ScrollView>
        <View style={ styles.styleParagraph }>
          <View style={[ styles.headerParagraph, { marginBottom: 30, }]}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 20, color: COLORS.WHITE, width: '75%' }} >{ car.infoCar.name }</Text>
            <View style={{ width: 50, height: 50, marginRight: 20, }}>
              {
                car?.favouriteID ? 
                <>
                  <ButtonCustom
                    color={ COLORS.WHITE }
                    btnIcon='heart-broken'
                    iconColor={'#FF1493'}
                    btnAction={handleUnFavouriteCar}
                  />
                </> : <>
                  <ButtonCustom
                    color={ COLORS.WHITE }
                    btnIcon='heart'
                    iconColor={'red'}
                    btnAction={handleFavouriteCar}
                  />
                </>
              }
              
            </View>
          </View>
          <View style={{ height: 5, backgroundColor: '#DCDCDC' }}></View>
          <View style={[ styles.infoOwnerCar, { marginBottom: 20, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View>
              <View>
                <Text style={[ styles.titleInfoStyle, { marginBottom: 20, }]}>THÔNG TIN CHỦ XE</Text>
              </View>
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white', }}>CHỦ XE:</Text>
                  <Text style={{ marginLeft: 5, color: 'white', }}>
                    { infoOwner.lastName + ' ' + infoOwner.firstName }
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white', }}>SĐT:</Text>
                  <Text style={{ marginLeft: 5, color: 'white', }}>
                    { infoOwner.phone } 
                  </Text>
                </View>
              </View>
            </View>
            <View>
            {
              infoOwner.avatar ?
              (
                <Image 
                  source={{ uri: infoOwner.avatar.path }}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    resizeMode: 'cover',
                    borderWidth: 1, 
                    borderColor: '#D3D3D3',
                  }}
                />
              ) : (
                <Image 
                  source={require('../../resources/images/man-300x300.png')}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    resizeMode: 'cover',
                    borderWidth: 1, 
                    borderColor: '#D3D3D3',
                  }}
                />
              )
            }
            </View>
          </View>
          <View style={{ height: 5, backgroundColor: '#DCDCDC' }}></View>
          <View>
          <View style={[ styles.infoOwnerCar, { marginBottom: 20, }]}>
            <Text style={[ styles.titleInfoStyle, { marginBottom: 15, }]}>ĐẶC ĐIỂM</Text>
            <View style={{ flexDirection: 'row', marginTop: 18, }}>
              {
                infoSeats && (
                  <>
                    <FontAwesome5 name="chair" size={18} color='white' style={{ marginRight: 5, }}/>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    </View>
                  </>
                )
              }
            </View>
            <View style={{ flexDirection: 'row', marginTop: 18, }}>
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
            <View style={{ flexDirection: 'row', marginTop: 18, }}>
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
            <View style={{ flexDirection: 'row', marginTop: 18, }}>
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
          <View style={{ height: 5, backgroundColor: '#DCDCDC' }}></View>

          <View style={[ styles.infoOwnerCar, { marginBottom: 20 }]}>
            <Text style={[ styles.titleInfoStyle, { marginBottom: 15, }]}>TÍNH NĂNG</Text>
            <View style={{ flex: 1, }}>
              { 
                listFeature.map(feature => (
                  <View style={ styles.itemCharacteristic }>
                    <FontAwesome5 name={feature.characteristicID.icon} size={22} color="black" style={{ marginRight: 10, }} />
                    <Text style={ styles.textInItemCharacteristic }>
                      {
                        feature.characteristicID.value
                      }
                    </Text>
                  </View> 
                ))
              }
            </View>
          </View>
          <View style={{ height: 5, backgroundColor: '#DCDCDC' }}></View>
          <View style={[ styles.infoOwnerCar, { marginBottom: 20 }]}>
            <Text style={[ styles.titleInfoStyle, { marginBottom: 15, }]}>GIẤY TỜ THUÊ XE (BẮT BUỘC)</Text>
            <View style={{ flex: 1, }}>
              { 
                listLicense.map(license => (
                  <View style={ styles.itemCharacteristic }>
                    <FontAwesome5 name={license.characteristicID.icon} size={22} color="black" style={{ marginRight: 10, }} />
                    <Text style={ styles.textInItemCharacteristic }>
                      {
                        license.characteristicID.value
                      }
                    </Text>
                  </View> 
                ))
              }
            </View>
          </View>

          <View style={{ height: 5, backgroundColor: '#DCDCDC' }}></View>
          <View style={[ styles.infoOwnerCar, { marginBottom: 20 }]}>
            <Text style={[ styles.titleInfoStyle, { marginBottom: 15, }]}>ĐIỀU KHOẢN</Text>
            <Text style={{ color: COLORS.WHITE, textAlign: 'justify', lineHeight: 22, fontSize: 16, }}>{ car.infoCar.rules }</Text>
          </View>
          <View style={{ height: 5, backgroundColor: '#DCDCDC' }}></View>

          <View style={[ styles.infoOwnerCar, { marginBottom: 20 }]}>
          <Text style={[ styles.titleInfoStyle, { marginBottom: 15, }]}>THÔNG TIN THUÊ</Text>
            {
              ROUTE_NAME == 'ListCarWaitPayedScreen' ?
              <>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginTop: 18, lineHeight: 22, fontSize: 16, }}>
                  Số tiền thực trả: 
                  <NumberFormat
                    value={ car?.booking?.realMoney }
                    displayType="text"
                    thousandSeparator
                    prefix="đ"
                    renderText={(value) => <Text style={{ fontWeight: 'bold' }}> {value}</Text>}
                  />
                </Text>
              </> : <></>
            }
            {
              ROUTE_NAME && ROUTE_NAME != 'ListCarUserScreen' ?
              <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginTop: 18, lineHeight: 22, fontSize: 16, }}>Thời gian thuê: { 
                moment(car?.booking?.startTime).format('L') + ' ' + moment(car?.booking?.startTime).format('LT') + ' - ' + moment(car?.booking?.endTime).format('L') + ' ' + moment(car?.booking?.endTime).format('LT')
              }</Text> : <></>
            }

            {
              ROUTE_NAME == 'ListCarWaitPayedScreen' ?
              <>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginTop: 18, lineHeight: 22, fontSize: 16, }}>Thời gian trả xe: { 
                  moment(car?.booking?.timeGiveCarBack).format('L') + ' ' + moment(car?.booking?.timeGiveCarBack).format('LT')
                }</Text>
              </> : <></>
            }
            <View style={ styles.itemAddress }>
              {/* <FontAwesome5 name="map-marker-alt" size={20} color="black" /> */}
              <Text style={{ color: 'black', textAlign: 'justify', lineHeight: 22, fontSize: 16, }}>Địa chỉ nhận xe: { ROUTE_NAME && ROUTE_NAME != 'ListCarUserScreen' ? car?.booking?.pickUpPlace : car?.infoCar?.address + ', ' + car?.infoCar?.wardText + ', ' + car?.infoCar?.districtText + ', ' + car?.infoCar?.provinceText }</Text> 
            </View>
            <View style={ styles.itemAddress }>
              {/* <FontAwesome5 name="map-signs" size={20} color="black" /> */}
              <Text style={{ color: 'black', textAlign: 'justify', lineHeight: 22, fontSize: 16, }}>Địa chỉ trả xe: { ROUTE_NAME && ROUTE_NAME != 'ListCarUserScreen' ? car?.booking?.dropOffPlace : car?.infoCar?.address + ', ' + car?.infoCar?.wardText + ', ' + car?.infoCar?.districtText + ', ' + car?.infoCar?.provinceText }</Text>
            </View>
            <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginTop: 10, lineHeight: 22, fontSize: 16, }}>
              Đơn giá thuê:
              <NumberFormat
                value={ car?.infoCar?.price }
                displayType="text"
                thousandSeparator
                prefix="đ"
                renderText={(value) => <Text style={{ fontWeight: 'bold' }}> {value}/ngày</Text>}
              />
            </Text>
            <View style={{ width: contentWidth, borderWidth: 0.5, borderColor: '#DCDCDC', marginBottom: 15, marginTop: 20, }}></View>
            <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginTop: 10, lineHeight: 22, fontSize: 16, }}>
              Tổng số tiền thuê: 
              <NumberFormat
                value={ ROUTE_NAME && ROUTE_NAME != 'ListCarUserScreen' ? car?.booking?.totalPrice : car?.infoCar?.price }
                displayType="text"
                thousandSeparator
                prefix="đ"
                renderText={(value) => <Text style={{ fontWeight: 'bold' }}> {value}</Text>}
              />
            </Text>
          </View>
          <View style={{ height: 5, backgroundColor: '#DCDCDC' }}></View>

            {
              typeof(ROUTE_NAME) != 'undefined' && ROUTE_NAME != 'ListCarUserScreen' ?
              <View style={{ borderWidth: 1, borderColor: 'white', marginTop: 20, paddingBottom: 20, }}>
                <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 18, lineHeight: 22, fontSize: 21, fontWeight: 'bold' }}>Thông tin khách hàng</Text>
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                  {
                    car?.booking?.user?.avatar ?
                    (
                      <Image 
                        source={{ uri: car?.booking?.user?.avatar.path }}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                          resizeMode: 'cover',
                          borderWidth: 1, 
                          borderColor: '#D3D3D3',
                        }}
                      />
                    ) : (
                      <Image 
                        source={require('../../resources/images/man-300x300.png')}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                          resizeMode: 'cover',
                          borderWidth: 1, 
                          borderColor: '#D3D3D3',
                        }}
                      />
                    )
                  }
                
                </View>
                  <Text style={{ marginLeft: 10, }}>
                  </Text>
                  <Text style={{ marginLeft: 10, color: 'white', fontWeight: 'bold' }}>
                    Tên khách hàng: { car?.booking?.user?.lastName + ' ' + car?.booking?.user?.firstName }
                  </Text>
                  <Text style={{ marginLeft: 10, color: 'white', fontWeight: 'bold' }}>
                    Số điện thoại: { car?.booking?.user?.phone } 
                  </Text>
              </View> : <></>
            }

            <View style={[ styles.infoOwnerCar, { marginBottom: 20 }]}>
              <Text style={[ styles.titleInfoStyle, { marginBottom: 15, }]}>MÔ TẢ</Text>
              <Text style={{ color: COLORS.WHITE, textAlign: 'justify', lineHeight: 22, fontSize: 16, }}>{ car.infoCar.description }</Text>
            </View>
          <View style={{ height: 5, backgroundColor: '#DCDCDC' }}></View>
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
                  titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}
                  // btnHeight={60}
                  btnWidth={contentWidth / 2}
                  btnAction={() => navigation.navigate('UpdateCarScreen', car)}
                />
                {/* <View style={{ marginBottom: 20, }}></View> */}

                <ButtonCustom 
                  title='Hủy đăng ký xe'
                  color='red'
                  btnIcon='luggage-cart'
                  titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 20, }}
                  // btnHeight={60}
                  btnWidth={contentWidth / 2}
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
                      width: contentWidth, 
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
                          'Ngày bắt đầu: ' + moment(car?.booking?.startTime).format('L') + ' ' + moment(car?.booking?.startTime).format('LT')
                        }
                        </Text>

                        <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                        {
                          'Ngày kết thúc: ' + moment(car?.booking?.endTime).format('L') + ' ' + moment(car?.booking?.endTime).format('LT')
                        }
                        </Text>
                        <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                        {
                          'Địa chỉ nhận xe: ' + car?.booking?.pickUpPlace
                        }
                        </Text>
                        <Text style={{ fontSize: 18, color: 'white', fontStyle: 'italic' }}>
                        {
                          'Địa chỉ trả xe: ' + car?.booking?.dropOffPlace
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
    marginTop: -25,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
  }, 

  body: {
  },

  headerParagraph: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
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
    marginBottom: -20,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnGroupParagraph: {
    height: 150,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  
  groupBtnParagraph: {
    flexDirection: 'row',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -60,
  },  

  titleButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },

  titleInfoStyle: { 
    color: COLORS.WHITE, 
    textAlign: 'justify', 
    // marginHorizontal: 20, 
    marginTop: 18, 
    lineHeight: 22, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },

  infoOwnerCar: {
    width: contentWidth,
    marginLeft: 21,
  },

  itemCharacteristic: { 
    backgroundColor: '#E0FFFF', 
    flexDirection: 'row', 
    borderWidth: 1, 
    borderColor: 'white', 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10, 
  },

  itemAddress: { 
    backgroundColor: '#90EE90', 
    flexDirection: 'row', 
    borderWidth: 1, 
    borderColor: 'white', 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10, 
    justifyContent: 'space-between'
  },

  textInItemCharacteristic: { 
    fontSize: 18, 
    color: 'black', 
    fontStyle: 'italic' 
  },
});

export default CarDetail;
