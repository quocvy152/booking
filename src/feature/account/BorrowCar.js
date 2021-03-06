import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, SafeAreaView, Text, 
  View, TouchableOpacity, Image, 
  ScrollView, FlatList, Dimensions, 
  TextInput, Keyboard, Button,
  ActivityIndicator, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import MultiSelect from 'react-native-multiple-select';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

//nestedScrollEnabled
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
const { width } = Dimensions.get('screen');
const contentWidth = width - 42;
// import * as ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-date-picker';

import ToastCustom from '../../components/ToastCustom';
import { COLORS } from '../../constant/colors';
import { PARAMS_CONSTANT } from '../../constant/param';
import { bookingCar } from '../../api/general';
import { checkValidDataCar, returnDetailIDS, convertDateTimeToString } from '../../utils/utils';

const BorrowCar = ({ navigation, route }) => {
  const car = route.params;
  const [Img, setImg] = useState(car.images.length ? car.images[0].url : null);
  const [startDate, setStartDate] = useState(new Date());
  const [modeStart, setModeStart] = useState('date');
  const [showTimeStart, setShowTimeStart] = useState(false);
  const [textTimeStart, setTextTimeStart] = useState(convertDateTimeToString(new Date()));

  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + (24 * 60 * 60 * 1000)));
  const [modeEnd, setModeEnd] = useState('date');
  const [showTimeEnd, setShowTimeEnd] = useState(false);
  const [textTimeEnd, setTextTimeEnd] = useState(convertDateTimeToString(new Date(new Date().getTime() + (24 * 60 * 60 * 1000))));

  const [infoSeats, setInfoSeats] = useState(car.details.find(detail => detail.detailType.code === 'SOGHE'));
  const [infoTranmission, setInfoTranmission] = useState(car.details.find(detail => detail.detailType.code === 'TRUYENDONG'));
  const [infoFuel, setInfoFuel] = useState(car.details.find(detail => detail.detailType.code === 'NHIENLIEU'));
  const [infoFuelConsumption, setInfoFuelConsumption] = useState(car.details.find(detail => detail.detailType.code === 'MUCTIEUTHUNHIENLIEU'));
  const [listFeature, setListFeature] = useState(car.details.filter(detail => detail.detailType.code == 'TINHNANG'))
  const [listLicense, setListLicense] = useState(car.details.filter(detail => detail.detailType.code == 'GIAYTOTHUEXE'))

  // START TOASTCUSTOM MESSAGE
  const [isShowToast, setIsShowToast] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState();
  // END TOASTCUSTOM MESSAGE

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  // }, []);

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

  const onChangeTimeStart = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);

    let dateTimeString = convertDateTimeToString(currentDate);
    setTextTimeStart(dateTimeString);
    setShowTimeStart(false);
  }

  const onChangeTimeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);

    let dateTimeString = convertDateTimeToString(currentDate);
    setTextTimeEnd(dateTimeString);
    setShowTimeEnd(false);
  }

  const showModeStart = (currentMode) => {
    setShowTimeStart(true),
    setModeStart(currentMode);
  }

  const showModeEnd = (currentMode) => {
    setShowTimeEnd(true),
    setModeEnd(currentMode);
  }

  const validateInfoBorrorwCar = (body) => {
    let { car_id, startBooking, endBooking } = body;

    if(!car_id) 
      return {
        error: true,
        message: 'Kh??ng th??? l???y th??ng tin xe',
      }

    if(!startBooking)
      return {
        error: true,
        message: 'Vui l??ng ch???n ng??y b???t ?????u thu?? xe',
      }

    if(!endBooking) 
      return {
        error: true,
        message: 'Vui l??ng ch???n ng??y tr??? xe',
      }

    return {
      error: false,
      message: 'validate_done',
    }
  }

  const handleBorrowCar = async () => {
    showLoading();

    let body = {
      car_id: car.id,
      startBooking: startDate,
      endBooking: endDate,
    }

    let { error, message } = validateInfoBorrorwCar(body);
    if(error) {
      showToast({ content: message, type: 'warning' });
      return;
    }

    let resultCallBookingCar = await bookingCar(body);
    let { success, message: messageBookingCar, data } = resultCallBookingCar.data;

    if(success) {
      showToast({ content: data, type: 'success' });
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
      <SafeAreaView style={{ flex: 1, }}>
        <ToastCustom 
          isShowToast={isShowToast}
          contentToast={content}
          typeToast={type}
        />
        <View style={ styles.header }>
          <FontAwesome5 name="chevron-left" size={28} color="black" onPress={() => navigation.goBack()} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Chi ti???t xe</Text>
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.infoUserStyle}>
            {
              Img ?
              (<Image source={{ uri: Img }} style={ styles.avatarStyle } />) :
              (<Image source={require('../../resources/images/mazda-6-2020-26469.png')} style={ styles.avatarStyle } />)
            }

          </View>

          <View style={styles.infoOwnerCar}>
              <Text style={ styles.titleInfoStyle }>Th??ng tin ch??? xe</Text>
              <View style={{ alignItems: 'center', }}>
                  {
                    car.ownerCar && car.ownerCar.avatar ?
                    (
                      <Image 
                        source={{ uri: car.ownerCar.avatar }}
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
                Ch??? xe: { car.ownerCar && car.ownerCar.name }
              </Text>
              <Text style={{ marginLeft: 10, }}>
                S??? ??i???n tho???i: { car.ownerCar && car.ownerCar.phoneNumber } 
              </Text>
          </View>

          <View style={styles.infoDetailCar}>
              <Text style={ styles.titleInfoStyle }>Gi???y t??? thu?? xe (B???t bu???c)</Text>
              
              <View style={{ margin: 25, flex: 1, }}>
                { 
                  listLicense.map(license => (
                    <View style={{ marginBottom: 10, borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 20, }}>
                      <Text style={{ fontSize: 18, color: 'black', fontStyle: 'italic' }}>
                        {
                          license.val
                        }
                      </Text>
                    </View> 
                  ))
                }
              </View>
          </View>

          <View style={styles.infoDetailCar}>
              <Text style={ styles.titleInfoStyle }>T??i s???n th??? ch???p</Text>
          </View>

          <View style={styles.infoDetailCar}>
            <Text style={ styles.titleInfoStyle }>??i???u kho???n</Text>
            <Text>
              {
                car.rules
              }
            </Text>
          </View>

          <View style={styles.infoInputTimeBorrow}>
            <Text style={ styles.titleInfoStyle }>Ng??y b???t ?????u thu?? xe</Text>
            <View style={{ flexDirection: 'row', }}>
              <View  style={{ width: '50%', }}>
                <Button title="Ch???n ng??y b???t ?????u" onPress={() => showModeStart('date')} />
              </View>
              <View  style={{ width: '50%', }} >
                <Button title="Ch???n gi??? b???t ?????u" onPress={() => showModeStart('time')}/>
              </View>
            </View>
            {
              textTimeStart &&
              (
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#00FF00', padding: 10 }}>
                  <FontAwesome5 name="clock" size={16} color="black" style={{ marginRight: 10, }} />
                  <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ textTimeStart }</Text>
                </View>
              )
            }
            
            {
              showTimeStart && (
                <DateTimePicker 
                  testID='dateTimeStartPicker'
                  value={startDate}
                  mode={modeStart}
                  is24Hour={true}
                  display='default'
                  onChange={onChangeTimeStart}
                />
              )
            }
          </View>

          <View style={[ styles.infoInputTimeBorrow, { marginTop: 30 }, ]}>
            <Text style={ styles.titleInfoStyle }>Ng??y tr??? xe</Text>
            <View style={{ flexDirection: 'row', }}>
              <View  style={{ width: '50%', }}>
                <Button title="Ch???n ng??y tr??? xe" color={'#FFD700'} onPress={() => showModeEnd('date')} />
              </View>
              <View  style={{ width: '50%', }} >
                <Button title="Ch???n gi??? tr??? xe" color={'#FFD700'} onPress={() => showModeEnd('time')}/>
              </View>
            </View>
            {
              textTimeEnd &&
              (
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#00FF00', padding: 10 }}>
                  <FontAwesome5 name="clock" size={16} color="black" style={{ marginRight: 10, }} />
                  <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{ textTimeEnd }</Text>
                </View>
              )
            }
            
            {
              showTimeEnd && (
                <DateTimePicker 
                  testID='dateTimeEndPicker'
                  value={endDate}
                  mode={modeEnd}
                  is24Hour={true}
                  display='default'
                  onChange={onChangeTimeEnd}
                />
              )
            }
          </View>

          <View style={styles.infoPriceCar}>
              <Text style={ styles.titleInfoStyle }>?????a ch??? giao nh???n xe</Text>
              <Text style={{ marginLeft: 10, }}>
                ?????a ch???: { car.address } 
              </Text>
              <Text style={{ marginLeft: 10, }}>
                ?????a ch??? c??? th???: { car.address } 
              </Text>
          </View>

          <View style={styles.infoPriceCar}>
              <Text style={ styles.titleInfoStyle }>Chi ti???t gi??</Text>
              <Text style={{ marginLeft: 10, }}>
                ????n gi?? thu??: <NumberFormat
                  value={ car.price }
                  displayType="text"
                  thousandSeparator
                  prefix="??"
                  renderText={(value) => <Text style={{ fontWeight: 'bold' }}>{value}/ng??y</Text>}
                /> 
              </Text>
              <Text style={{ marginLeft: 10, }}>
                T???ng c???ng: <NumberFormat
                  value={ car.price }
                  displayType="text"
                  thousandSeparator
                  prefix="??"
                  renderText={(value) => <Text style={{ fontWeight: 'bold' }}>{value}/ng??y</Text>}
                /> 
              </Text>
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
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', }}>Thu?? xe</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    marginLeft: 20, 
    alignItems: 'center',
    marginTop: 15,
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
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFF0',
    elevation: 1,
    paddingVertical: 10,
  },

  infoDetailCar: {
    width: contentWidth,
    marginLeft: 21,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFF0',
    elevation: 1,
  },

  infoPriceCar: {
    width: contentWidth,
    height: 150,
    marginLeft: 21,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFF0',
    elevation: 1,
  },

  infoInputTimeBorrow: {
    width: contentWidth,
    height: 150,
    marginLeft: 21,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFF0',
    elevation: 1,
  },

  avatarStyle: {
    marginTop: 15,
    height: 180,
    width: contentWidth - 50,
    marginBottom: 30,
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
    margin: 30,
  },

  btnStyleUploadPhoto: {
    height: 38,
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },

  titleInfoStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
  },
});

export default BorrowCar;
