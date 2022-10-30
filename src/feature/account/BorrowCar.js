import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, SafeAreaView, Text, 
  View, TouchableOpacity, Image, 
  ScrollView, FlatList, Dimensions, 
  TextInput, Keyboard, Button,
  ActivityIndicator, 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import TimeRangePicker from 'react-native-range-timepicker';
import { SliderBox } from "react-native-image-slider-box";

import ToastCustom from '../../components/ToastCustom';
import { COLORS } from '../../constant/colors';
import { bookingCar, getListBookingOfCar } from '../../api/general';
import { convertDateTimeToString, convertDateToStringFormat, validateInfoBorrorwCar } from '../../utils/utils';

const { width } = Dimensions.get('screen');
const contentWidth = width - 42;
import moment from 'moment';
import 'moment/locale/vi';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'
  ],
  monthNamesShort: ['TH. 1', 'TH. 2', 'TH. 3', 'TH. 4', 'TH. 5', 'TH. 6', 'TH. 7.', 'TH. 8', 'TH. 9', 'TH. 10', 'TH. 11', 'TH. 12'],
  dayNames: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'],
  dayNamesShort: ['T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7', 'CN'],
};
LocaleConfig.defaultLocale = 'fr';

const BorrowCar = ({ navigation, route }) => {
  const car = route.params;
  const infoUser = useSelector(state => state.auth.infoUser);
  const infoOwner = car.infoCar && car.infoCar.userID; 
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [Img, setImg] = useState(car.infoCar.avatar ? car.infoCar.avatar.path : null);
  const [startDate, setStartDate] = useState(convertDateToStringFormat(new Date()));
  const [startTime, setStartTime] = useState(`${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}:00`);

  const [endDate, setEndDate] = useState(convertDateToStringFormat(new Date(new Date().getTime() + (24 * 60 * 60 * 1000))));
  const [endTime, setEndTime] = useState(`${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}:00`);

  const [infoSeats, setInfoSeats] = useState(car.details.find(detail => detail.characteristicID.characteristicTypeID.code === 'SOGHE'));
  const [infoTranmission, setInfoTranmission] = useState(car.details.find(detail => detail.characteristicID.characteristicTypeID.code === 'TRUYENDONG'));
  const [infoFuel, setInfoFuel] = useState(car.details.find(detail => detail.characteristicID.characteristicTypeID.code === 'NHIENLIEU'));
  const [infoFuelConsumption, setInfoFuelConsumption] = useState(car.details.find(detail => detail.characteristicID.characteristicTypeID.code === 'MUCTIEUTHUNHIENLIEU'));
  const [listFeature, setListFeature] = useState(car.details.filter(detail => detail.characteristicID.characteristicTypeID.code == 'TINHNANG'))
  const [listLicense, setListLicense] = useState(car.details.filter(detail => detail.characteristicID.characteristicTypeID.code == 'GIAYTOTHUEXE'))
  const [pickUpPlace, setPickUpPlace] = useState();
  const [dropOffPlace, setDropOffPlace] = useState();
  const [listBookingOfCar, setListBookingOfCar] = useState([]);

  // START TOASTCUSTOM MESSAGE
  const [isShowToast, setIsShowToast] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState();
  // END TOASTCUSTOM MESSAGE

  const [isLoading, setIsLoading] = useState(false);

  const [markedDates, setMarkedDates] = useState({});

  const [visible, setVisible] = useState(false);

  useEffect(async () => {
    let resultGetListBookingOfCar = await getListBookingOfCar({ carID: car?.infoCar?._id });
    let { error, data: listBookedCar } = resultGetListBookingOfCar.data;

    // danh sách các chuyến xe đang được đặt
    let objListBookedCar = {};

    listBookedCar.forEach(bookinng => {
      let { startTime: start, endTime: end } = bookinng;
      
      objListBookedCar = {
        ...objListBookedCar,
        [convertDateToStringFormat(new Date(start))]: { 
          color: new Date(end).getTime() < new Date().getTime() ? '#607d8b' : '#fcb900', 
          marked: true,
          dotColor: new Date(end).getTime() < new Date().getTime() ? '#fcb900' : '#da0606', 
          textColor: 'white', 
          startingDay: true,
          disabled: true,
          disableTouchEvent: true
        },
        [convertDateToStringFormat(new Date(end))]  : { 
          color: new Date(end).getTime() < new Date().getTime() ? '#607d8b' : '#fcb900', 
          marked: true,
          dotColor: new Date(end).getTime() < new Date().getTime() ? '#fcb900' : '#da0606', 
          textColor: 'white', 
          endingDay: true, 
          disabled: true,
          disableTouchEvent: true
        }
      }
    })

    setMarkedDates({
      ...objListBookedCar,
      [startDate]: { color: COLORS.DEFAULT_BACKGROUND, textColor: 'white', startingDay: true },
      [endDate]: { color: COLORS.DEFAULT_BACKGROUND, textColor: 'white', endingDay: true, }
    })
  }, [startDate, endDate]);

  const onSelect = ({ startTime, endTime }) => {
    setStartTime(startTime);
    setEndTime(endTime);
    setVisible(false);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showToast = ({ content, type }) => {
    setIsShowToast(true);
    setContent(content);
    setType(type);
    hideLoading();
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

  const handleBorrowCar = async () => {
    showLoading();
    let body = {
      carID: car?.infoCar?._id,
      userID: infoUser._id,
      pickUpPlace, 
      dropOffPlace,
      startTime: new Date(`${startDate}T${startTime}+07:00`),
      endTime: new Date(`${endDate}T${endTime}+07:00`),
      price: car?.infoCar?.price
    }

    let { error, message } = validateInfoBorrorwCar(body);
    if(error) {
      showToast({ content: message, type: 'warning' });
      return;
    }

    let resultCallBookingCar = await bookingCar(body);
    let { error: errorRes, message: messageBookingCar, data } = resultCallBookingCar.data;

    if(!errorRes) {
      showToast({ content: 'Bạn đã đặt thuê xe thành công. Hãy đợi chủ xe chấp nhận nhé', type: 'success' });
      setTimeout(() => {
        navigation.navigate('HomeScreen');
      }, 1500);
    } else {
      showToast({ content: messageBookingCar, type: 'warning' });
      return;
    }
  }
    
  return (
    <>
      {
        isShowCalendar ?
        <View style={{ justifyContent: 'center',}}>
          <View style={ styles.header }>
            <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '3%' }}>
              <FontAwesome5 name="chevron-left" size={20} color="white" onPress={() => setIsShowCalendar(false)} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '97%' }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>Chọn ngày thuê xe</Text>
            </View>
          </View>
          <Calendar
            minDate={convertDateToStringFormat(new Date())}
            markingType={'period'}
            markedDates={markedDates}
            onDayPress={date => {
              let { day, month, year } = date;

              const monthFormat = month < 10 ? '0' + month : month;
              const dayFormat = day < 10 ? '0' + day : day;

              if(startDate && !endDate) {
                
                // bước kiểm tra để đưa về format startDate thì nhỏ endDate thì lớn
                if(new Date(startDate).getTime() > new Date(`${year}-${monthFormat}-${dayFormat}`).getTime()) {
                  setEndDate(startDate);
                  setStartDate(`${year}-${monthFormat}-${dayFormat}`);
                } else {
                  setEndDate(`${year}-${monthFormat}-${dayFormat}`);
                }

              } else {
                setStartDate(`${year}-${monthFormat}-${dayFormat}`);
                setEndDate(undefined);
              }
            }}
          />

          <View style={ styles.styleShowTime }>
            <Text style={{ width: '45%', fontWeight: 'bold', fontSize: 16, }}>{ (startDate && startTime) ? moment(new Date(`${startDate}T${startTime}+07:00`)).format('LLLL') : 'Chọn ngày' }</Text>
            <Entypo name="arrow-right" size={24} style={{ width: '10%', }} color="black" />
            <Text style={{ width: '45%', fontWeight: 'bold', fontSize: 16, }}>{ (endDate && endTime) ? moment(new Date(`${endDate}T${endTime}+07:00`)).format('LLLL') : 'Chọn ngày' }</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 15, }}>
              <View style={{ backgroundColor: '#fcb900', height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 25, }}>
                <Text style={{ color: '#fcb900', }}>OK</Text>
                <Text style={{ color: 'red', fontSize: 30 }}>.</Text>
              </View>
              <Text>Ngày đã có chuyến</Text>
              <View style={{ backgroundColor: COLORS.DEFAULT_BACKGROUND, height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 25, }}>
                <Text style={{ color: COLORS.DEFAULT_BACKGROUND, }}>OK</Text>
              </View>
              <Text>Ngày bạn đang chọn</Text>
          </View>

          <TouchableOpacity 
            style={ styles.btnPickTime }
            onPress={() => { setVisible(true); 
          }}>
            <Text style={{ color: 'white', }}>CHỌN THỜI GIAN CỤ THỂ</Text>
          </TouchableOpacity>
          <TimeRangePicker
            title={'CHỌN THỜI GIAN'} 
            visible={visible}
            onClose={onClose}
            onSelect={onSelect}
          />
        </View> : 
        <SafeAreaView style={{ flex: 1, }}>
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
              <Text style={{ marginLeft: -30, color: 'white', fontSize: 20, fontWeight: 'bold', }}>Thuê xe</Text>
            </View>
          </View>
          <View style={{ height: 220, justifyContent: 'center', alignItems: 'center' }} >
            <SliderBox ImageComponentStyle={{ height: 250, marginBottom: 100, }} images={[ car?.infoCar?.avatar?.path, ...car?.infoCar?.gallery.map(image => image.path)  ]} />
          </View>
          <ScrollView nestedScrollEnabled={true}>
            <View style={{ height: 5, backgroundColor: '#DCDCDC' }}></View>
            <View style={[ styles.infoOwnerCar, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
              <View>
                <View>
                  <Text style={[ styles.titleInfoStyle, { marginBottom: 20, }]}>THÔNG TIN CHỦ XE</Text>
                </View>
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>CHỦ XE:</Text>
                    <Text style={{ marginLeft: 5, }}>
                      { infoOwner.lastName + ' ' + infoOwner.firstName }
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>SĐT:</Text>
                    <Text style={{ marginLeft: 5, }}>
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
            <View style={styles.infoDetailCar}>
                <Text style={[ styles.titleInfoStyle, { marginTop: 15, marginBottom: 25 }]}>GIẤY TỜ THUÊ XE (BẢN GỐC)</Text>
                
                <View>
                  { 
                    listLicense.map(license => (
                      <View style={{ flexDirection: 'row', marginBottom: 5, backgroundColor: '#DCDCDC', padding: 10, borderRadius: 4, }}>
                        <MaterialCommunityIcons name="card-account-details-star-outline" style={{ marginRight: 15, }} size={24} color="black" />
                        <Text style={{ fontSize: 16, color: 'black', fontStyle: 'italic' }}>
                          {
                            license.characteristicID.value
                          }
                        </Text>
                      </View> 
                    ))
                  }
                </View>
            </View>

            <View style={{ width: contentWidth, marginLeft: 21, borderWidth: 0.5, borderColor: '#808080' }}></View>

            <View style={[ styles.infoDetailCar, { marginTop: 15, }]}>
                <Text style={ styles.titleInfoStyle }>TÀI SẢN THẾ CHẤP</Text>
                <Text style={{ marginTop: 15, textAlign: 'justify', lineHeight: 20, }}>
                {
                  car?.infoCar?.mortage
                }
              </Text>
            </View>

            <View style={{ width: contentWidth, marginLeft: 21, borderWidth: 0.5, borderColor: '#808080' }}></View>

            <View style={[ styles.infoDetailCar, { marginTop: 10, }]}>
              <Text style={ styles.titleInfoStyle }>ĐIỀU KHOẢN</Text>
              <Text style={{ marginTop: 15, textAlign: 'justify', lineHeight: 20, }}>
                {
                  car?.infoCar?.rules
                }
              </Text>
            </View>
            <View style={{ height: 5, backgroundColor: '#DCDCDC' }}></View>

            <View style={[ styles.infoInputTimeBorrow, { marginTop: 15, }]}>
              <Text style={ styles.titleInfoStyle }>THỜI GIAN</Text>
              <Text style={[ styles.titleInfoStyle, { marginTop: 20, }]}>Ngày nhận xe</Text>
              {
                (
                  <View style={{ borderRadius: 3, marginTop: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#00FF00', padding: 10 }}>
                    <FontAwesome5 name="clock" size={16} color="black" style={{ marginRight: 10, }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ moment(new Date(`${startDate}T${startTime}+07:00`)).format('LLLL') }</Text>
                  </View>
                )
              }
            </View>

            <View style={styles.infoInputTimeBorrow}>
              <Text style={ styles.titleInfoStyle }>Ngày trả xe</Text>
              {
                (
                  <View style={{ borderRadius: 3, marginTop: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FF4500', padding: 10 }}>
                    <FontAwesome5 name="clock" size={16} color="black" style={{ marginRight: 10, }} />
                    <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ moment(new Date(`${endDate}T${endTime}+07:00`)).format('LLLL') }</Text>
                  </View>
                )
              }
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              </View>
              <View>
                <TouchableOpacity 
                  style={{ flexDirection: 'row', alignItems: 'center', padding: 15, }}
                  onPress={() => setIsShowCalendar(true)}
                >
                  <Text style={{ fontWeight: 'bold', color: COLORS.DEFAULT_BACKGROUND }}>THAY ĐỔI</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.DEFAULT_TEXT} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 5, backgroundColor: '#DCDCDC' }}></View>
            <View style={[ styles.styleInputFrame, { marginTop: 15 }]}>
                <Text style={ styles.titleInfoStyle }>ĐỊA CHỈ MUỐN NHẬN XE</Text>
                <TextInput 
                  style={[ styles.inputStyle, { marginTop: 10 }]}
                  placeholder='Nhập địa chỉ nhận xe'
                  onChangeText={(val) => setPickUpPlace(val)}
                />
            </View>

            <View style={{ width: contentWidth, marginLeft: 21, borderWidth: 0.5, borderColor: '#808080', marginBottom: 10, }}></View>

            <View style={styles.styleInputFrame}>
                <Text style={ styles.titleInfoStyle }>ĐỊA CHỈ TRẢ XE</Text>
                <TextInput 
                  style={[ styles.inputStyle, { marginTop: 10 }]}
                  placeholder='Nhập địa chỉ trả xe'
                  onChangeText={(val) => setDropOffPlace(val)}
                />
            </View>

            <View style={{ width: contentWidth, marginLeft: 21, borderWidth: 0.5, borderColor: '#808080', marginBottom: 10, }}></View>

            <View style={styles.infoPriceCar}>
                <Text style={ styles.titleInfoStyle }>ĐỊA ĐIỂM GIAO NHẬN XE</Text>
                <View style={{ marginTop: 20, }}>
                  <View style={{ flexDirection: 'row', }}>
                    <AntDesign name="checkcircleo" size={18} color="green" style={{ marginRight: 10, }} />
                    <Text style={{ marginBottom: 5, color: 'green' }}>
                      Địa chỉ: { car?.infoCar?.wardText + ' ' + car?.infoCar?.districtText + ' ' + car?.infoCar?.provinceText } 
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', }}>
                    <AntDesign name="checkcircleo" size={18} color="green" style={{ marginRight: 10, }} />
                    <Text style={{ color: 'green' }}>
                    Địa chỉ cụ thể: { car?.infoCar?.address } 
                  </Text>
                  </View>
                </View>
            </View>

            <View style={{ height: 5, backgroundColor: '#DCDCDC' }}></View>

            <View style={[ styles.infoPriceCar, { marginTop: 10, }]}>
                <Text style={ styles.titleInfoStyle }>CHI TIẾT GIÁ</Text>
                <View style={{ marginTop: 15, }}>
                  <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Đơn giá thuê:</Text>
                    <Text>
                      <NumberFormat
                        value={ car?.infoCar?.price }
                        displayType="text"
                        thousandSeparator
                        prefix="đ"
                        renderText={(value) => <Text style={{ fontWeight: 'bold' }}>{value}/ngày</Text>}
                      /> 
                    </Text>
                  </View>
                  <View style={{ width: contentWidth, borderWidth: 0.5, borderColor: '#808080', marginBottom: 15, marginTop: 20, }}></View>
                  <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>
                      Tổng cộng:
                    </Text>
                    <Text>
                      <NumberFormat
                        value={ car?.infoCar?.price }
                        displayType="text"
                        thousandSeparator
                        prefix="đ"
                        renderText={(value) => <Text style={{ fontWeight: 'bold' }}>{value}/ngày</Text>}
                      /> 
                    </Text>
                  </View>
                </View>
            </View>
          </ScrollView>
          <View style={styles.infoUserStyle}>
            <TouchableOpacity activeOpacity={0.8} style={ styles.btnStyle } onPress={handleBorrowCar}>
              {
                isLoading ?
                (
                  <ActivityIndicator size="large" color="white" style={{ marginRight: 10, }} />
                ) : (
                  <></>
                )
              }
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', }}>Thuê xe</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
  },

  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
  }, 

  styleShowTime: { 
    height: 100,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 30,
    backgroundColor: '#90EE90',
    padding: 15,
  },

  btnPickTime: { 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#2F4F4F',
    width: contentWidth,
    marginLeft: 21,
    padding: 10,
    borderRadius: 5,
  },

  infoUserStyle: {
    width: contentWidth,
    marginLeft: 21,
    alignItems: 'center',
  },

  infoOwnerCar: {
    width: contentWidth,
    height: 160,
    marginLeft: 21,
    paddingVertical: 10,
  },

  infoDetailCar: {
    width: contentWidth,
    marginLeft: 21,
    marginBottom: 20,
  },

  infoPriceCar: {
    width: contentWidth,
    marginLeft: 21,
    marginBottom: 20,
  },

  styleInputFrame: {
    width: contentWidth,
    height: 100,
    marginLeft: 21,
  },

  infoInputTimeBorrow: {
    width: contentWidth,
    marginLeft: 21,
    marginBottom: 20,
  },

  avatarStyle: {
    marginTop: 15,
    height: 150,
    width: contentWidth - 50,
    marginBottom: 15,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#FFFFF0',
  },

  inputStyle: {
    height: 50,
    width: '100%',
    borderRadius: 6,
    fontSize: 18,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  btnStyle: {
    flexDirection: 'row',
    height: 48,
    width: '100%',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    margin: 15,
  },

  btnStyleUploadPhoto: {
    height: 38,
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },

  titleInfoStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BorrowCar;