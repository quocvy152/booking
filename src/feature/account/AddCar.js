import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions, TextInput, Keyboard, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import MultiSelect from 'react-native-multiple-select';
import { useSelector } from 'react-redux';
//nestedScrollEnabled
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
const { width } = Dimensions.get('screen');
const contentWidth = width - 42;
// import * as ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

import ToastCustom from '../../components/ToastCustom';
import { COLORS } from '../../constant/colors';
import { PARAMS_CONSTANT } from '../../../src/constant/param';
import { getInfoAboutCar, getListBrand, getListProvince, getListDistrict, getListWard, createCar } from '../../api/general';
import { checkValidDataCar, returnDetailIDS, } from '../../utils/utils';

const AddCar = ({ navigation }) => {
  const [Img, setImg] = useState(null);
  const [InfoImg, setInfoImg] = useState({});
  const [Name, setName] = useState();
  const [brand, setBrand] = useState({});
  const [listBrand, setListBrand] = useState([]);
  const [Description, setDescription] = useState();
  const [mortgage, setMortgage] = useState();
  const [rules, setRules] = useState();
  const [Address_booking, setAddress_booking] = useState();
  const [ward, setWard] = useState({});
  const [listWard, setListWard] = useState([]);
  const [district, setDistrict] = useState({});
  const [listDistrict, setListDistrict] = useState([]);
  const [province, setProvince] = useState({});
  const [listProvince, setListProvince] = useState([]);
  const [Price, setPrice] = useState();
  const [seats, setSeats] = useState({});
  const [listSeat, setListSeat] = useState([]);
  const [fuel, setFuel] = useState({});
  const [listFuel, setListFuel] = useState([]);
  const [fuelConsumption, setFuelConsumption] = useState({});
  const [listFuelConsumption, setListFuelConsumption] = useState([]);
  const [tranmission, setTranmission] = useState({});
  const [listTranmission, setListTranmission] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState([]);
  const [listFeature, setListFeature] = useState([]);
  const [selectedLicense, setSelectedLicense] = useState([]);
  const [listLicense, setListLicense] = useState([]);

  // START TOASTCUSTOM MESSAGE
  const [isShowToast, setIsShowToast] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState();
  // END TOASTCUSTOM MESSAGE

  // fetch list brand
  useEffect(async () => {
    let fetchDataListBrand = await getListBrand();

    const { success, data } = fetchDataListBrand.data;
    if(success) setListBrand(data);
  }, []);

  // fetch list province
  useEffect(async () => {
    let fetchDataListProvince = await getListProvince();

    const { success, data } = fetchDataListProvince.data;
    if(success) {
      // change format list province to match with select box
      let LIST_PROVINCE = data.map(province => ({
        id: province.province_id,
        item: province.province_name
      }));

      setListProvince(LIST_PROVINCE);
    }
  }, []);

  // fetch list district
  useEffect(async () => {
    let fetchDataListDistrict = await getListDistrict(province.id);

    const { success, data } = fetchDataListDistrict.data;
    if(success) {
      // change format list district to match with select box
      let LIST_DISTRICT = data.map(district => ({
        id: district.district_id,
        item: district.district_name
      }));

      setListDistrict(LIST_DISTRICT);
    } 
  }, [province]);

  // fetch list ward
  useEffect(async () => {
    let fetchDataListWard = await getListWard(district.id);

    const { success, data } = fetchDataListWard.data;
    if(success) {
      // change format list ward to match with select box
      let LIST_WARD = data.map(ward => ({
        id: ward.ward_id,
        item: ward.ward_name
      }));

      setListWard(LIST_WARD);
    } 
  }, [district]);

  // fetch list seat
  useEffect(async () => {
    let SOGHE = PARAMS_CONSTANT.SOGHE;
    let fetchDataListSeat = await getInfoAboutCar(SOGHE);

    const { success, data } = fetchDataListSeat.data;
    if(success) setListSeat(data);
  }, []);
  
  // fetch list tranmission
  useEffect(async () => {
    let TRUYENDONG = PARAMS_CONSTANT.TRUYENDONG;
    let fetchDataListTranmission = await getInfoAboutCar(TRUYENDONG);

    const { success, data } = fetchDataListTranmission.data;
    if(success) setListTranmission(data);
  }, []);

  // fetch list fuel
  useEffect(async () => {
    let NHIENLIEU = PARAMS_CONSTANT.NHIENLIEU;
    let fetchDataListFuel = await getInfoAboutCar(NHIENLIEU);

    const { success, data } = fetchDataListFuel.data;
    if(success) setListFuel(data);
  }, []);

  // fetch list fuel consumption
  useEffect(async () => {
    let MUCTIEUTHUNHIENLIEU = PARAMS_CONSTANT.MUCTIEUTHUNHIENLIEU;
    let fetchDataListFuelConsumtion = await getInfoAboutCar(MUCTIEUTHUNHIENLIEU);

    const { success, data } = fetchDataListFuelConsumtion.data;
    if(success) setListFuelConsumption(data);
  }, []);

  // fetch list feature
  useEffect(async () => {
    let TINHNANG = PARAMS_CONSTANT.TINHNANG;
    let fetchDataListFuelConsumtion = await getInfoAboutCar(TINHNANG);

    const { success, data } = fetchDataListFuelConsumtion.data;
    if(success) setListFeature(data);
  }, []);

  // fetch list license
  useEffect(async () => {
    let GIAYTOTHUEXE = PARAMS_CONSTANT.GIAYTOTHUEXE;
    let fetchDataListFuelConsumtion = await getInfoAboutCar(GIAYTOTHUEXE);

    const { success, data } = fetchDataListFuelConsumtion.data;
    if(success) setListLicense(data);
  }, []);

  // change format list seat to match with select box
  const LIST_BRAND = listBrand.map(brand => ({
    id: brand.id,
    item: brand.name
  }));

  // change format list seat to match with select box
  const LIST_SEAT = listSeat.map(seat => ({
    id: seat.id,
    item: seat.val
  }));

  // change format list tranmission to match with select box
  const LIST_TRANMISSION = listTranmission.map(tranmission => ({
    id: tranmission.id,
    item: tranmission.val
  }));

  // change format list fuel to match with select box
  const LIST_FUEL = listFuel.map(fuel => ({
    id: fuel.id,
    item: fuel.val
  }));

  // change format list fuel consumption to match with select box
  const LIST_FUEL_CONSUMPTION = listFuelConsumption.map(fuelConsumption => ({
    id: fuelConsumption.id,
    item: fuelConsumption.val
  }));

  // change format list fuel feature to match with select box
  const LIST_FEATURE = listFeature.map(feature => ({
    id: feature.id,
    item: feature.val
  }));

  // change format list fuel license to match with select box
  const LIST_LICENSE = listLicense.map(license => ({
    id: license.id,
    item: license.val
  }));

  function onChangeProvince() {
    return (item) => setProvince(item);
  }

  function onChangeDistrict() {
    return (item) => setDistrict(item);
  }

  function onChangeWard() {
    return (item) => setWard(item);
  }

  function onChangeBrand() {
    return (item) => setBrand(item);
  }
  
  function onChangeSeats() {
    return (item) => setSeats(item);
  }

  function onChangeTransmission() {
    return (item) => setTranmission(item);
  }

  function onChangeFuel() {
    return (item) => setFuel(item);
  }

  function onChangeFuelConsumption() {
    return (item) => setFuelConsumption(item);
  }

  function onMultiChangeFeature() {
    return (item) => setSelectedFeature(xorBy(selectedFeature, [item], 'id'));
  }

  function onMultiChangeLicens() {
    return (item) => setSelectedLicense(xorBy(selectedLicense, [item], 'id'));
  }

  const showToast = ({ content, type }) => {
    setIsShowToast(true);
    setContent(content);
    setType(type);
    setTimeout(() => {
      setIsShowToast(false);
    }, 1500)
  }

  const handleRegisterCar = async () => {
    Keyboard.dismiss();

    let bodyData = {
      Name, BrandId: brand.id, Description, Price, 
      Mortage: mortgage, Rules: rules, Address_booking, 
      WardId: ward.id, DistrictId: district.id, ProvinceId: province.id, 
      Seats: seats.id, Fuel: fuel.id, FuelConsumption: fuelConsumption.id, 
      Tranmission: tranmission.id, SelectedFeature: selectedFeature, 
      SelectedLicense: selectedLicense, Img
    };

    let { error, message } = checkValidDataCar(bodyData);
    if(error) {
      showToast({ content: message, type: 'warning' });
      return;
    }

    try {
      let body = {
        Name, BrandId: brand.id, Description, Price, 
        Address_booking, WardId: ward.id, DistrictId: district.id, ProvinceId: province.id, 
        Img: {
          uri: Img,
          type: 'image/jpeg',
          name: Img,
        }
      };

      // nối các đặc điểm tính năng thành chuỗi server cần
      let Detail_ids = returnDetailIDS(bodyData);
      body.Detail_ids = Detail_ids;

      let resultCreateCar = await createCar(body);
      let { success, data } = resultCreateCar.data;
      if(success) {
        showToast({ content: 'Đăng ký xe thành công', type: 'success' });
        setTimeout(() => {
          navigation.navigate('ListCarUserScreen');
        }, 1500);
      }
    } catch (error) {
      console.log({ error })
    } 
  }

  const handleChoosePhoto = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let { cancelled, height, type, width, uri } = result;
    if(!cancelled) {
      setImg(uri);
      setInfoImg({
        uri: Img,
        type,
        name: Img,
      });
    }
  };
    
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
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Xe Của Bạn</Text>
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.infoUserStyle}>
            {
              Img ?
              (<Image source={{ uri: Img }} style={ styles.avatarStyle } />) :
              (<Image source={require('../../resources/images/mazda-6-2020-26469.png')} style={ styles.avatarStyle } />)
            }

            <View style={{ width: '100%', marginBottom: 30 }}>
                <TouchableOpacity 
                  activeOpacity={0.8} 
                  style={[ 
                    styles.btnStyleUploadPhoto, 
                    { backgroundColor: COLORS.WHITE, borderWidth: 1, borderColor: COLORS.DEFAULT_BACKGROUND }
                  ]}
                  onPress={handleChoosePhoto}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <FontAwesome5 name="upload" size={18} color={ COLORS.DEFAULT_BACKGROUND } style={{ marginRight: 5, }} /> 
                    <Text style={{ color: COLORS.DEFAULT_BACKGROUND, fontSize: 15, fontWeight: 'bold', }}>
                      Tải ảnh xe của bạn
                    </Text>
                  </View>
              </TouchableOpacity>
            </View>

            <View style={{ width: '100%', }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="car" size={18} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Tên xe</Text>
              </View>
              <TextInput 
                style={ styles.inputStyle }
                placeholder='Nhập tên xe'
                onChangeText={(val) => setName(val)}
              />
            </View>

            <View style={{ width: '100%', margin: 25, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="battle-net" size={18} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Thương hiệu</Text>
              </View>
              <SelectBox
                label="Chọn thương hiệu"
                options={LIST_BRAND}
                value={brand}
                onChange={onChangeBrand()}
                hideInputFilter={false}
              />
            </View>

            <View style={{ width: '100%', margin: 25, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="chair" size={18} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Số ghế</Text>
              </View>
              <SelectBox
                label="Chọn số ghế"
                options={LIST_SEAT}
                value={seats}
                onChange={onChangeSeats()}
                hideInputFilter={false}
              />
            </View>

            <View style={{ width: '100%', margin: 25, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="cogs" size={18} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Truyền động</Text>
              </View>
              <SelectBox
                label="Chọn truyền động"
                options={LIST_TRANMISSION}
                value={tranmission}
                onChange={onChangeTransmission()}
                hideInputFilter={false}
              />
            </View>

            <View style={{ width: '100%', margin: 25, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="charging-station" size={24} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Nhiên liệu</Text>
              </View>
              <SelectBox
                label="Chọn nhiên liệu"
                options={LIST_FUEL}
                value={fuel}
                onChange={onChangeFuel()}
                hideInputFilter={false}
              />
            </View>

            <View style={{ width: '100%', margin: 25, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="battery-half" size={18} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Mức tiêu thụ nhiên liệu</Text>
              </View>
              <SelectBox
                label="Chọn mức tiêu thụ nhiên liệu"
                options={LIST_FUEL_CONSUMPTION}
                value={fuelConsumption}
                onChange={onChangeFuelConsumption()}
                hideInputFilter={false}
              />
            </View>

            <View style={{ width: '100%', }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="list-alt" size={18} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Mô tả</Text>
              </View>
              <TextInput
                style={ styles.inputStyle }
                multiline={true}
                numberOfLines={10}
                placeholder='Nhập mô tả'
                onChangeText={(val) => setDescription(val)}/>
            </View>

            <View style={{ width: '100%', margin: 25, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="squarespace" size={18} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Tính năng</Text>
              </View>
              <SelectBox
                label="Chọn những tính năng xe của bạn"
                options={LIST_FEATURE}
                selectedValues={selectedFeature}
                onMultiSelect={onMultiChangeFeature()}
                onTapClose={onMultiChangeFeature()}
                isMulti
              />
            </View>

            <View style={{ width: '100%', margin: 25, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="address-card" size={24} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Giấy tờ thuê xe</Text>
              </View>
              <SelectBox
                label="Chọn giấy tờ để thuê xe của bạn"
                options={LIST_LICENSE}
                selectedValues={selectedLicense}
                onMultiSelect={onMultiChangeLicens()}
                onTapClose={onMultiChangeLicens()}
                isMulti
              />
            </View>

            <View style={{ width: '100%', margin: 15, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="money-bill-alt" size={18} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Giá cho thuê (Tính theo ngày)</Text>
              </View>
              <TextInput
                style={ styles.inputStyle }
                multiline={true}
                numberOfLines={10}
                placeholder='Nhập giá cho thuê xe'
                onChangeText={(val) => setPrice(val)}/>
            </View>

            {
              listProvince.length ?
              (
                <View style={{ width: '100%', margin: 25, }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <FontAwesome5 name="hotel" size={18} color="black" />
                    <Text style={{ fontSize: 18, marginLeft: 10, }}>Chọn tỉnh</Text>
                  </View>
                  <SelectBox
                    label="Chọn tỉnh"
                    options={listProvince}
                    value={province}
                    onChange={onChangeProvince()}
                    hideInputFilter={false}
                  />
                </View>
              ) : (
                <></>
              )
            }
            
            {
              listDistrict.length ? 
              (
                <View style={{ width: '100%', margin: 25, }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <FontAwesome5 name="warehouse" size={18} color="black" />
                    <Text style={{ fontSize: 18, marginLeft: 10, }}>Chọn quận/huyện</Text>
                  </View>
                  <SelectBox
                    label="Chọn quận/huyện"
                    options={listDistrict}
                    value={district}
                    onChange={onChangeDistrict()}
                    hideInputFilter={false}
                  />
                </View>
              ) : 
              (
                <></>
              )
            }
            
            {
              listWard.length ?
              (
                <View style={{ width: '100%', margin: 25, }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <FontAwesome5 name="house-user" size={18} color="black" />
                    <Text style={{ fontSize: 18, marginLeft: 10, }}>Chọn xã/phường</Text>
                  </View>
                  <SelectBox
                    label="Chọn xã/phường"
                    options={listWard}
                    value={ward}
                    onChange={onChangeWard()}
                    hideInputFilter={false}
                  />
                </View>
              ) : 
              (
                <></>
              )
            }

            <View style={{ width: '100%', margin: 15, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="map-marked-alt" size={18} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Địa chỉ lấy xe</Text>
              </View>
              <TextInput
                style={ styles.inputStyle }
                multiline={true}
                numberOfLines={10}
                placeholder='Nhập địa chỉ lấy xe'
                onChangeText={(val) => setAddress_booking(val)}/>
            </View>

            <View style={{ width: '100%', margin: 15, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="money-check-alt" size={18} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Tài sản thế chấp</Text>
              </View>
              <TextInput
                style={ styles.inputStyle }
                multiline={true}
                numberOfLines={10}
                placeholder='Nhập tài sản thế chấp'
                onChangeText={(val) => setMortgage(val)}/>
            </View>

            <View style={{ width: '100%', margin: 15, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome5 name="digital-tachograph" size={18} color="black" />
                <Text style={{ fontSize: 18, marginLeft: 10, }}>Điều khoản</Text>
              </View>
              <TextInput
                style={ styles.inputStyle }
                multiline={true}
                numberOfLines={10}
                placeholder='Nhập điều khoản'
                onChangeText={(val) => setRules(val)}/>
            </View>
          </View>
        </ScrollView>
        <View style={styles.infoUserStyle}>
          <TouchableOpacity activeOpacity={0.8} style={ styles.btnStyle } onPress={handleRegisterCar}>
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', }}>Đăng ký xe</Text>
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
});

export default AddCar;
