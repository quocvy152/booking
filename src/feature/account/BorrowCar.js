import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions, TextInput, Keyboard, Button } from 'react-native';
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
import { getInfoAboutCar, getListBrand, getListProvince, getListDistrict, getListWard, createCar } from '../../api/general';
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

  // START TOASTCUSTOM MESSAGE
  const [isShowToast, setIsShowToast] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState();
  // END TOASTCUSTOM MESSAGE

  // useEffect(() => {
  // }, []);

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
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Chi tiết xe</Text>
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
            <ScrollView nestedScrollEnabled={true}>
              <Text style={ styles.titleInfoStyle }>Thông tin chủ xe</Text>
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
                Chủ xe: { car.ownerCar && car.ownerCar.name }
              </Text>
              <Text style={{ marginLeft: 10, }}>
                Số điện thoại: { car.ownerCar && car.ownerCar.phoneNumber } 
              </Text>
            </ScrollView>
          </View>

          <View style={styles.infoDetailCar}>
            <ScrollView nestedScrollEnabled={true}>
              <Text style={ styles.titleInfoStyle }>Giấy tờ thuê xe (Bắt buộc)</Text>
            </ScrollView>
          </View>

          <View style={styles.infoDetailCar}>
            <ScrollView nestedScrollEnabled={true}>
              <Text style={ styles.titleInfoStyle }>Tài sản thế chấp</Text>
            </ScrollView>
          </View>

          <View style={styles.infoInputTimeBorrow}>
            <Text style={ styles.titleInfoStyle }>Ngày bắt đầu thuê xe</Text>
            <View style={{ flexDirection: 'row', }}>
              <View  style={{ width: '50%', }}>
                <Button title="Chọn ngày bắt đầu" onPress={() => showModeStart('date')} />
              </View>
              <View  style={{ width: '50%', }} >
                <Button title="Chọn giờ bắt đầu" onPress={() => showModeStart('time')}/>
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
            <Text style={ styles.titleInfoStyle }>Ngày trả xe</Text>
            <View style={{ flexDirection: 'row', }}>
              <View  style={{ width: '50%', }}>
                <Button title="Chọn ngày trả xe" color={'#FFD700'} onPress={() => showModeEnd('date')} />
              </View>
              <View  style={{ width: '50%', }} >
                <Button title="Chọn giờ trả xe" color={'#FFD700'} onPress={() => showModeEnd('time')}/>
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
              <Text style={ styles.titleInfoStyle }>Địa chỉ giao nhận xe</Text>
              <Text style={{ marginLeft: 10, }}>
                Địa chỉ: phường Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh 
              </Text>
              <Text style={{ marginLeft: 10, }}>
                Địa chỉ cụ thể: số 221 đường Nguyễn Xiển 
              </Text>
          </View>

          <View style={styles.infoPriceCar}>
              <Text style={ styles.titleInfoStyle }>Chi tiết giá</Text>
              <Text style={{ marginLeft: 10, }}>
                Đơn giá thuê: 800,000đ/ngày 
              </Text>
              <Text style={{ marginLeft: 10, }}>
                Tổng cộng: 800,000đ 
              </Text>
          </View>
        </ScrollView>
        <View style={styles.infoUserStyle}>
          <TouchableOpacity activeOpacity={0.8} style={ styles.btnStyle } onPress={() => console.log('press')}>
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', }}>Thuê xe</Text>
            </View>
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
    height: 200,
    marginLeft: 21,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFF0',
    elevation: 1,
  },

  infoPriceCar: {
    width: contentWidth,
    height: 100,
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
