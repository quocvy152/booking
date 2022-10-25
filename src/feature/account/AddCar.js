import React, { useEffect, useState, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, SafeAreaView, Text, 
  View, TouchableOpacity, Image, 
  ScrollView, FlatList, Dimensions, 
  TextInput, Keyboard, Button, 
  ActivityIndicator, 
} from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
//nestedScrollEnabled to Flatlist
import SelectBox from 'react-native-multi-selectbox';
import { result, xorBy } from 'lodash';
const { width } = Dimensions.get('screen');
const contentWidth = width - 42;
// import * as ImagePicker from 'react-native-image-picker';
import * as ImagePickerSingle from 'expo-image-picker';
import { AssetsSelector } from 'expo-images-picker'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MediaType } from 'expo-media-library';

const ForceInset = {
  top: 'never',
  bottom: 'never',
};

import ToastCustom from '../../components/ToastCustom';
import { COLORS } from '../../constant/colors';
import { PARAMS_CONSTANT } from '../../../src/constant/param';
import { getInfoAboutCar, getListBrand, getListProvince, getListDistrict, getListWard, createCar, uploadImgBB } from '../../api/general';
import { checkValidDataCar, returnDetailIDS, returnCharacteristicID } from '../../utils/utils';

const AddCar = ({ navigation }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const [Img, setImg] = useState(null);
  const [listGallery, setListGallery] = useState([]);
  // To render images right away
  const [listGalleryClient, setListGalleryClient] = useState([]);
  const [avatar, setAvatar] = useState({});
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
  const [isShowUploadMultiple, setIsShowUploadMultiple] = useState(false);
  const [loadComponent, setLoadComponent] = useState(false);

  // START TOASTCUSTOM MESSAGE
  const [isShowToast, setIsShowToast] = useState(false);
  const [content, setContent] = useState();
  const [type, setType] = useState();
  // END TOASTCUSTOM MESSAGE

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // fetch list brand
  useEffect(async () => {
    let fetchDataListBrand = await getListBrand();

    const { error, data } = fetchDataListBrand.data;
    if(!error) setListBrand(data);
  }, []);

  // fetch list province
  useEffect(async () => {
    let fetchDataListProvince = await getListProvince();

    const { error, data } = fetchDataListProvince.data;

    if(!error) {
      // change format list province to match with select box
      let LIST_PROVINCE = data.map(province => ({
        id: province.code,
        item: province.name
      }));

      setListProvince(LIST_PROVINCE);
    }
  }, []);

  // fetch list district
  useEffect(async () => {
    let fetchDataListDistrict = await getListDistrict(province.id);

    const { error, data } = fetchDataListDistrict.data;

    if(!error) {
      // change format list district to match with select box
      let LIST_DISTRICT = data && data.listDistrict && data.listDistrict.map(district => ({
        id: district.code,
        item: district.name
      }));

      LIST_DISTRICT = !LIST_DISTRICT ? [] : LIST_DISTRICT;
      setListDistrict(LIST_DISTRICT);
    } 
  }, [province]);

  // fetch list ward
  useEffect(async () => {
    let fetchDataListWard = await getListWard(district.id);

    const { error, data } = fetchDataListWard.data;
    if(!error) {
      // change format list ward to match with select box
      let LIST_WARD = data && data.listWards[0] && data.listWards[0].wards.map(ward => ({
        id: ward.code,
        item: ward.name
      }));

      LIST_WARD = !LIST_WARD ? [] : LIST_WARD;
      setListWard(LIST_WARD);
    } 
  }, [district]);

  // fetch list seat
  useEffect(async () => {
    let SOGHE = PARAMS_CONSTANT.SOGHE;
    let fetchDataListSeat = await getInfoAboutCar(SOGHE);

    const { error, data } = fetchDataListSeat.data;

    if(!error) setListSeat(data);
  }, []);
  
  // fetch list tranmission
  useEffect(async () => {
    let TRUYENDONG = PARAMS_CONSTANT.TRUYENDONG;
    let fetchDataListTranmission = await getInfoAboutCar(TRUYENDONG);

    const { error, data } = fetchDataListTranmission.data;

    if(!error) setListTranmission(data);
  }, []);

  // fetch list fuel
  useEffect(async () => {
    let NHIENLIEU = PARAMS_CONSTANT.NHIENLIEU;
    let fetchDataListFuel = await getInfoAboutCar(NHIENLIEU);

    const { error, data } = fetchDataListFuel.data;
    if(!error) setListFuel(data);
  }, []);

  // fetch list fuel consumption
  useEffect(async () => {
    let MUCTIEUTHUNHIENLIEU = PARAMS_CONSTANT.MUCTIEUTHUNHIENLIEU;
    let fetchDataListFuelConsumtion = await getInfoAboutCar(MUCTIEUTHUNHIENLIEU);

    const { error, data } = fetchDataListFuelConsumtion.data;
    if(!error) setListFuelConsumption(data);
  }, []);

  // fetch list feature
  useEffect(async () => {
    let TINHNANG = PARAMS_CONSTANT.TINHNANG;
    let fetchDataListFuelConsumtion = await getInfoAboutCar(TINHNANG);

    const { error, data } = fetchDataListFuelConsumtion.data;
    if(!error) setListFeature(data);
  }, []);

  // fetch list license
  useEffect(async () => {
    let GIAYTOTHUEXE = PARAMS_CONSTANT.GIAYTOTHUEXE;
    let fetchDataListFuelConsumtion = await getInfoAboutCar(GIAYTOTHUEXE);

    const { error, data } = fetchDataListFuelConsumtion.data;
    if(!error) setListLicense(data);
  }, []);

  // change format list seat to match with select box
  const LIST_BRAND = listBrand.map(brand => ({
    id: brand._id,
    item: brand.name
  }));

  // change format list seat to match with select box
  const LIST_SEAT = listSeat.map(seat => ({
    id: seat._id,
    item: seat.value
  }));

  // change format list tranmission to match with select box
  const LIST_TRANMISSION = listTranmission.map(tranmission => ({
    id: tranmission._id,
    item: tranmission.value
  }));

  // change format list fuel to match with select box
  const LIST_FUEL = listFuel.map(fuel => ({
    id: fuel._id,
    item: fuel.value
  }));

  // change format list fuel consumption to match with select box
  const LIST_FUEL_CONSUMPTION = listFuelConsumption.map(fuelConsumption => ({
    id: fuelConsumption._id,
    item: fuelConsumption.value
  }));

  // change format list fuel feature to match with select box
  const LIST_FEATURE = listFeature.map(feature => ({
    id: feature._id,
    item: feature.value
  }));

  // change format list fuel license to match with select box
  const LIST_LICENSE = listLicense.map(license => ({
    id: license._id,
    item: license.value
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
    hideLoading();
    setTimeout(() => {
      setIsShowToast(false);
    }, 1500)
  }

  const handleUploadMultipleImg = async (listGallery) => {
    setIsShowUploadMultiple(false);
    let listGalleryFilter = listGallery.map(image => ({
      name: image.uri,
      uri: image.uri,
      type: 'image/*',
    }));
    
    let listGalleryPromise = listGalleryFilter.map(image => (
      uploadImgBB({ file: image })
    ));
    
    let listGalleryResultPromiseAll = await Promise.all(listGalleryPromise);

    let listGalleryImageResult = listGalleryResultPromiseAll.map(resultUploadImage => ({ result: resultUploadImage.data }));
    let listGalleryRes = listGalleryImageResult.map(image => {
      let { error, data } = image.result;
      return ({
        uri: data.name,
        name: data.name,
        path: data.name,
        size: data.size,
      })
    });

    setListGallery(listGalleryRes);

    let listGalleryClientRes = listGallery.map(image => image.uri);
    setListGalleryClient(listGalleryClientRes);
  }

  const handleRegisterCar = async () => {
    Keyboard.dismiss();
    showLoading();

    let bodyData = {
      name: Name, brandID: brand.id, description: Description, price: Number(Price), 
      mortage: mortgage, rules, address: Address_booking, userID: infoUser._id,
      wardID: ward.id, wardText: ward.item, districtID: district.id, districtText: district.item, 
      provinceText: province.item, provinceID: province.id, status: 1, // trạng thái xe hoạt động
      avatar, Seats: seats.id, Fuel: fuel.id, FuelConsumption: fuelConsumption.id, 
      Tranmission: tranmission.id, SelectedFeature: selectedFeature, 
      SelectedLicense: selectedLicense, listGallery
    };

    //  validate data of car register
    let { error: errorCar, message } = checkValidDataCar(bodyData);
    if(errorCar) {
      showToast({ content: message, type: 'warning' });
      return;
    }

    let listCharacteristicID = [
      seats.id,
      fuel.id,
      fuelConsumption.id,
      tranmission.id,
      ...selectedLicense.map(license => license.id),
      ...selectedFeature.map(feature => feature.id),
    ];

    try {
      let body = {
        name: Name, brandID: brand.id, description: Description, price: Number(Price), 
        mortage: mortgage, rules, address: Address_booking, userID: infoUser._id,
        wardID: ward.id, wardText: ward.item, districtID: district.id, districtText: district.item, 
        provinceText: province.item, provinceID: province.id, status: 1, // trạng thái xe hoạt động
        listCharacteristicID: returnCharacteristicID(listCharacteristicID), avatar, listGallery
      };

      let resultCreateCar = await createCar(body);
      let { error, data } = resultCreateCar.data;

      if(!error) {
        showToast({ content: 'Đăng ký xe thành công', type: 'success' });
        setTimeout(() => {
          navigation.navigate('ListCarUserScreen');
        }, 1500);
      }
    } catch (error) {
      console.log({ error })
      showToast({ content: 'Xảy ra lỗi', type: 'error' });
      hideLoading();
    } 
  }

  const handleChoosePhoto = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    let result = await ImagePickerSingle.launchImageLibraryAsync({
      mediaTypes: ImagePickerSingle.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let { cancelled, height, type, width, uri } = result;
    if(!cancelled) {
      setImg(uri);
      let resultUploadAvatar = await uploadImgBB({
        file: {
          uri: uri,
          type: 'image/*',
          name: uri,
        }
      })
      let { error, data } = resultUploadAvatar.data;
      setAvatar(data);
    }
  };

  const showLoading = () => {
    setIsLoading(true);
    setIsDisabled(true);
  }

  const hideLoading = () => {
    setIsLoading(false);
    setIsDisabled(false);
  }

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: 'black',
      errorMessages: {
        hasErrorWithPermissions: 'Please Allow media gallery permissions.',
        hasErrorWithLoading: 'There was an error while loading images.',
        hasErrorWithResizing: 'There was an error while loading images.',
        hasNoAssets: 'No images found.',
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results but gives meta data and absolute path for ios users
      initialLoad: 100,
      assetsType: [MediaType.photo, MediaType.video],
      minSelection: 1,
      maxSelection: 4,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  const _textStyle = {
    color: 'white',
  };

  const _buttonStyle = {
    backgroundColor: 'black',
    borderRadius: 5,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: 'Kết thúc',
        back: 'Quay lại',
        selected: 'Đã chọn',
      },
      midTextColor: 'green',
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => { setIsShowUploadMultiple(false) },
      onSuccess: async (listGallery) => { 
        // console.log({
        //   listGallery
        // })
        handleUploadMultipleImg(listGallery);
      },
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: 'white',
      spinnerColor: 'blue',
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: 'ios-videocam',
        color: 'tomato',
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: 'ios-checkmark-circle-outline',
        color: 'white',
        bg: '#0eb14970',
        size: 26,
      },
    }),
    []
  );

  const ListGalleryUpload = ({ listGalleryData }) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {
          listGalleryData.map((image, index) => (
            <View style={ styles.imageStyleUploadPhoto }>
              <TouchableOpacity
                style={{ marginLeft: 75, marginBottom: -20, zIndex: 9999, backgroundColor: 'white', height: 20, width: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                  listGallery.splice(index, 1);
                  listGalleryClient.splice(index, 1);
                  setListGallery(listGallery);
                  setListGalleryClient(listGalleryClient);
                  setLoadComponent(!loadComponent);
                }}
              >
                <FontAwesome name="remove" size={20} color="red" />
              </TouchableOpacity>
              <Image key={index} source={{ uri: image }} style={{ width: 90, height: 90, }} />
            </View>
          ))
        }
        {
          // số hình ảnh tối đa
          listGallery.length == 4 ?
          <></> :
          <>
            <TouchableOpacity
              style={ styles.btnUploadMultipleImage }
              onPress={() => { setIsShowUploadMultiple(true) }}
            >
              <FontAwesome5 name="plus-circle" size={35} color="grey"/>
            </TouchableOpacity>
          </>
        }
      </ScrollView>
    )
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
          <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '3%' }}>
            <FontAwesome5 name="chevron-left" size={20} color="white" onPress={() => navigation.goBack()} />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '97%' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: -20 }}>Đăng ký xe của bạn</Text>
          </View>
        </View>
        {
          isShowUploadMultiple ? 
          <SafeAreaProvider>
            <SafeAreaView forceInset={ForceInset} style={styles.container}>
              {/* <StatusBarPlaceHolder /> */}
              <View style={styles.container}>
                <AssetsSelector
                  Settings={widgetSettings}
                  Errors={widgetErrors}
                  Styles={widgetStyles}
                  Navigator={widgetNavigator}
                  // Resize={widgetResize} know how to use first , perform slower results.
                />
              </View>
            </SafeAreaView>
          </SafeAreaProvider> : 
          <>
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

              {/* Upload Gallery Image Car */}
              <View style={{ width: '100%', marginBottom: 20, }}>
                <Text style={{ fontSize: 18, marginBottom: 10, }}>Chọn bộ sưu tập hình ảnh</Text>
                {
                  listGalleryClient.length ?
                  <>
                    <ListGalleryUpload listGalleryData={listGalleryClient} />
                  </> :
                  <>
                    <TouchableOpacity
                      style={ styles.btnUploadMultipleImage }
                      onPress={() => { setIsShowUploadMultiple(true) }}
                    >
                      <FontAwesome5 name="plus-circle" size={35} color="grey"/>
                    </TouchableOpacity>
                  </>
                }
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
              <TouchableOpacity disabled={isDisabled} activeOpacity={0.8} style={ styles.btnStyle } onPress={handleRegisterCar}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  {
                    isLoading ?
                    (
                      <ActivityIndicator size="large" color="white" style={{ marginRight: 10, }} />
                    ) : (
                      <></>
                    )
                  }
                  <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', }}>Đăng ký xe</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        }
        
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 10,
  },

  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
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

  imageStyleUploadPhoto: {
    width: 100, 
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    marginRight: 10,
    borderRadius: 10,
  },

  btnUploadMultipleImage: {
    width: 100, 
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'grey'
  },
});

export default AddCar;
