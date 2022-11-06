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
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { Skeleton } from "@rneui/themed";
import ToastCustom from '../../components/ToastCustom';
import { COLORS } from '../../constant/colors';
import { getListBookingOfCar, getListBookingFilter } from '../../api/general';
import { convertDateToStringFormat, } from '../../utils/utils';

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

  // START TOASTCUSTOM MESSAGE
  const [isShowToast, setIsShowToast] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState();
  // END TOASTCUSTOM MESSAGE

  const [isLoading, setIsLoading] = useState(false);

  const [markedDates, setMarkedDates] = useState({});

  const [visible, setVisible] = useState(false);

  const [statusBooking, setStatusBooking] = useState();
  const [selectedItem, setSelectedItem] = useState(0);
  const [listBooking, setListBooking] = useState([]);
  const [isCallGetListBooking, setIsCallGetListBooking] = useState(false);

  const status = ["Đang hoạt động", "Đã hoàn thành"]

  useEffect(async () => {
    let resultGetListBookingOfCar = await getListBookingOfCar({ carID: car?.infoCar?._id, type: 'all' });
    let { error, data: listBookedCar } = resultGetListBookingOfCar.data;

    // danh sách các chuyến xe đang được đặt
    let objListBookedCar = {};

    listBookedCar.forEach(booking => {
      let { startTime: start, endTime: end } = booking;
      
      objListBookedCar = {
        ...objListBookedCar,
        [convertDateToStringFormat(new Date(start))]: { 
          color: new Date(end).getTime() < new Date().getTime() ? '#607d8b' : '#8bc34a', 
          marked: true,
          dotColor: new Date(end).getTime() < new Date().getTime() ? '#8bc34a' : '#da0606',  
          textColor: 'white', 
          startingDay: true,
        },
        [convertDateToStringFormat(new Date(end))]  : { 
          color: new Date(end).getTime() < new Date().getTime() ? '#607d8b' : '#8bc34a', 
          marked: true,
          dotColor: new Date(end).getTime() < new Date().getTime() ? '#8bc34a' : '#da0606',  
          textColor: 'white', 
          endingDay: true, 
        }
      }
    })

    setMarkedDates(objListBookedCar)
  }, []);

  useEffect(async () => {
    let typeGetList = '';

    if(selectedItem == 0) 
      typeGetList = 'active';

    let resultGetListBooking = await getListBookingFilter({ carID: car?.infoCar?._id, type: typeGetList });
    let { error, data: listBooking } = resultGetListBooking.data;

    setListBooking(listBooking);
    setIsCallGetListBooking(true);
  }, [selectedItem])

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

  const ButtonDropdownText = ({ text }) => {
    return (
      <>
        <Text style={{ fontSize: 18, }}>{ text }</Text>
        {/* <AntDesign name="caretdown" size={18} color="black"/> */}
        {/* <Entypo name="chevron-down" size={18} color="black" /> */}
      </>
    )
  }

  const CardBooking = ({ booking }) => {
    return (
      <>
        <View style={ styles.card }>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{  }}>
              {
                booking?.user?.avatar ?
                (
                  <Image source={{ uri: (booking?.user?.avatar && booking?.user?.avatar?.path) || '../../resources/images/mazda-6-2020-26469.png' }} style={{ height: 120, width: 150, borderRadius: 5, resizeMode: 'contain' }} />
                ) : (
                  <Image source={require('../../resources/images/mazda-6-2020-26469.png')} style={{ height: 120, width: 150, borderRadius: 5, resizeMode: 'contain' }} />
                )
              }
            </View>
            <View style={{ marginLeft: 10, }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold' }}>Khách hàng: </Text> 
                <Text>{ booking?.user?.lastName + ' ' + booking?.user?.firstName }</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold' }}>Số ĐT: </Text> 
                <Text>{ booking?.user?.phone }</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={{ marginTop: 8, marginLeft: 5, }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Bắt đầu: </Text>
                <Text>{ moment(booking.startTime).format('LLLL') }</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Kết thúc: </Text>
                <Text>{ moment(booking.endTime).format('LLLL') }</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Địa chỉ nhận xe: </Text>
                <Text>{ booking.pickUpPlace }</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Địa chỉ giao xe: </Text>
                <Text>{ booking.dropOffPlace }</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Tiền tạm tính: </Text>
                <NumberFormat
                  value={ booking.totalPrice }
                  displayType="text"
                  thousandSeparator
                  prefix="đ"
                  renderText={(value) => <Text style={{ fontWeight: 'bold', fontSize: 15, }}>{value}</Text>}
                />
              </View>
              {
                selectedItem == 1 ?
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold' }}>Tiền nhận được: </Text>
                  <NumberFormat
                    value={ booking.realMoney ? booking.realMoney : booking.totalPrice }
                    displayType="text"
                    thousandSeparator
                    prefix="đ"
                    renderText={(value) => <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#008000' }}>{value}</Text>}
                  />
                </View> : <></>
              }
            </View>
          </View>
        </View> 
      </>
    );
  }
    
  return (
    <>
      {
        <View style={{ justifyContent: 'center',}}>
          <View style={ styles.header }>
            <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '3%' }}>
              <FontAwesome5 name="chevron-left" size={20} color="white" onPress={() => navigation.goBack()} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '97%' }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>Danh sách chuyến của xe</Text>
            </View>
          </View>
          <Calendar
            minDate={convertDateToStringFormat(new Date())}
            markingType={'period'}
            markedDates={markedDates}
            onDayPress={date => {
              console.log({ date })
            }}
          />

          <View style={{ paddingVertical: 10, backgroundColor: '#d4c4fb', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 15, }}>
            <View style={{ backgroundColor: '#607d8b', height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 25, }}>
                <Text style={{ color: '#607d8b', }}>OK</Text>
                <Text style={{ color: 'red', fontSize: 30 }}>.</Text>
              </View>
              <Text>Chuyến đã hoàn thành</Text>
              <View style={{ backgroundColor: '#8bc34a', height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 25, }}>
                <Text style={{ color: '#8bc34a', }}>OK</Text>
                <Text style={{ color: 'red', fontSize: 30 }}>.</Text>
              </View>
              <Text>Chuyến đang hoạt động</Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <SelectDropdown
              data={status}
              defaultButtonText={<ButtonDropdownText text={'Đang hoạt động'} />}
              buttonStyle={{ borderRadius: 5, backgroundColor: 'white', borderWidth: 1, borderColor: '#bbbbbb', width: width - 10  }}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                setSelectedItem(index);
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />
          </View>

          <View>
            {
              listBooking.length ?
              (
                <FlatList 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={listBooking}
                  renderItem={({ item }) => <CardBooking booking={item} />}
                />
              ) : (
                isCallGetListBooking ?
                <View style={[ styles.card, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Image source={require('./../../resources/images/bg_emptyPNG.png')} style={{ height: 180, width: width, resizeMode: 'contain' }} />
                  <Text style={{ fontStyle: 'italic', fontWeight: 'bold', }}>Không tìm thấy chuyến đi nào</Text>
                </View> : <>
                  <View style={[ styles.card, { marginLeft: 10, }]}>
                    <View style={{ flexDirection: 'row', }}>
                      <Skeleton animation="pulse" width={150} height={120} style={{ marginTop: 10, marginBottom: 5, marginLeft: 10, }} />
                      <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Skeleton animation="pulse" width={200} height={14} style={{ marginBottom: 5, marginLeft: 10, }} />
                        <Skeleton animation="pulse" width={200} height={14} style={{ marginBottom: 5, marginLeft: 10, }} />
                      </View>
                    </View>
                    <Skeleton animation="pulse" width={width - 60} height={14} style={{ marginBottom: 5, marginLeft: 10, }} />
                    <Skeleton animation="pulse" width={width - 30} height={14} style={{ marginBottom: 5, marginLeft: 10, }} />
                    <Skeleton animation="pulse" width={width - 100} height={14} style={{ marginBottom: 5, marginLeft: 10, }} />
                    <Skeleton animation="pulse" width={width - 35} height={14} style={{ marginBottom: 5, marginLeft: 10, }} />
                    <Skeleton animation="pulse" width={width - 60} height={14} style={{ marginBottom: 5, marginLeft: 10, }} />
                    <Skeleton animation="pulse" width={width - 50} height={14} style={{ marginBottom: 5, marginLeft: 10, }} />
                  </View>
                </>
              )
            }
          </View>
        </View>
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

  card: {
    height: 250,
    width: width - 10,
    marginLeft: 5,
    marginTop: 15, 
    borderRadius: 15, 
    elevation: 13,
    backgroundColor: COLORS.WHITE,
  },
});

export default BorrowCar;