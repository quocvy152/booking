import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { COLORS } from '../../constant/colors';
import CATEGORIES_CAR from '../../constant/categories';
import CARS from '../../constant/cars';
import TextInputCustom from '../../components/TextInputCustom';
import { TouchableHighlight } from 'react-native-gesture-handler';
import images from '../../resources/images/index';
import { getListBrand, getListCarPrepare } from '../../api/general';

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const Home = ({ navigation }) => {
  const infoUser = useSelector(state => state.auth.infoUser);
  const name = infoUser?.lastName + infoUser?.firstName;
  const avatar = infoUser ? infoUser.avatar : '';
  const [listBrand, setListBrand] = useState([]);
  const [listCar, setListCar] = useState([]);
  const [selectedCategorIndex, setSelectedCategorIndex] = useState();
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState();

  const [nameSearch, setNameSearch] = useState('');
  const [checkReload, setCheckReload] = useState(false);

  const fetchListBrand = async () => {
    let listBrandAPI = await getListBrand();
    let { error, data: listBrand } = listBrandAPI.data;
    setListBrand(listBrand);
  }

  useEffect(() => { 
    fetchListBrand();
  }, [])

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
      >
        {listBrand.map((categoryCar, index) => (
          <TouchableOpacity 
            key={index} 
            activeOpacity={0.8} 
            onPress={() => setSelectedCategorIndex(index)}
          >
            <View style={{ 
              ...styles.styleCategoryCar, 
              backgroundColor: index == selectedCategorIndex ? '#FF7700' : '#ffc899'
            }}>
              <View style={ styles.styleCategoryCarChild }>
                {
                  categoryCar.image ?
                  (
                    <Image source={{ uri: categoryCar.image }} style={{ height: 35, width: 35, borderRadius: 30, resizeMode: 'contain' }} />
                  ) : (
                    <Image source={images.ic_default_logo_car} style={{ height: 35, width: 35, borderRadius: 30, resizeMode: 'contain' }} />
                  )  
                }
              </View>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 20, width: '60%' }}>{ categoryCar.name.length > 10 ? categoryCar.name.slice(0, 10).concat('...') : categoryCar.name }</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  const Card = ({ car }) => {
    return (
      <>
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('CarDetailScreen', car)}
        >
          <View style={ styles.card }>
            <View style={{ alignItems: 'center', top: -15, height: 120, }}>
              {
                car.infoCar.gallery && car.infoCar.gallery.length ?
                (
                  <Image source={{ uri: car.infoCar.gallery[0] && car.infoCar.gallery[0].url }} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                ) : (
                  <Image source={require('../../resources/images/mazda-6-2020-26469.png')} style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
                )
              }
              
            </View>
            <View style={{ marginHorizontal: 20, top: -30 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{ car.infoCar.name && car.infoCar.name.length > 16 ? car.infoCar.name.slice(0, 16) + '...' : car.infoCar.name }</Text>
              <Text style={{ fontSize: 15, color: COLORS.DEFAULT_TEXT }}>
                Hiệu: 
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                  { '  ' + car.infoCar.brandID.name }
                </Text> 
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <NumberFormat
                value={ car.infoCar.price }
                displayType="text"
                thousandSeparator
                prefix="đ"
                renderText={(value) => <Text style={{ fontWeight: 'bold' }}>{value}/ ngày</Text>}
              />
            </View>
          </View> 
        </TouchableOpacity>
      </>
    );
  }

  const fetchDataListCarPrepare = async () => {
    // const querys = `pageIndex=${pageIndex}&limit=${limit}`;
    const querys = ``;

    let resultListCarPrepare = await getListCarPrepare(querys);
    const { data: listCar, error } = resultListCarPrepare.data;
    if(!error) {
      setListCar(listCar);
      setTotalPage(data.totalPage);
    }
  }
  

  const previousPage = () => {
    if(pageIndex == 1) {
      setPageIndex(1);
    } else {
      setPageIndex(pageIndex - 1);
    }
  }

  const nextPage = () => {
    if(pageIndex == totalPage) {
      setPageIndex(totalPage);
    } else {
      setPageIndex(pageIndex + 1);
    }
  }

  useEffect(() => { 
    fetchDataListCarPrepare();
  }, [pageIndex])

  useEffect(() => {
    fetchDataListCarPrepare();
  }, [checkReload]);

  useEffect(() => {
    // let listCarFilter = listCar.filter(car => car.name.toLowerCase().includes(nameSearch.toLowerCase()) && car.brandID.id == listBrand[selectedCategorIndex].id);
    let listCarFilter = listCar.filter(car => car.name.toLowerCase().includes(nameSearch.toLowerCase()));
    setListCar(listCarFilter);

    if(!nameSearch) {
      setCheckReload(!checkReload);
    }
  }, [nameSearch, selectedCategorIndex]);

  return (
    <>
      <SafeAreaView style={{ flex: 1, }}>
        <View style={ styles.header }>
          <View style={{ width: '80%', marginTop: 10, }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 18, color: COLORS.WHITE }}>Xin chào,</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15, color: COLORS.WHITE }}>{ name }</Text>
            </View>
            <Text style={{ marginTop: 5, fontSize: 18, color: COLORS.WHITE, marginTop: 10, }}>
              Bạn muốn thuê xe gì ?
            </Text>
          </View>
          {
            avatar ? 
            (<Image source={{ uri: avatar }} style={ styles.iconUser }/>) : 
            (<Image source={require('../../resources/images/user-300x300.png')} style={ styles.iconUser } />)
          }
        </View>
        <View 
          style={{ 
            marginTop: 20,
            flexDirection: 'row'
          }}>
            <View style={ styles.inputContainer }>
              <TextInputCustom
                icon='search'
                textColor={ COLORS.DEFAULT_TEXT }
                placeholderText='Tìm kiếm xe'
                style={{ marginLeft: 10, borderRadius: 10, width: '95%' }}
                textInputAction={val => setNameSearch(val)}
              />
            </View>
            <View style={ styles.sortBtn }>
              <FontAwesome5 name='align-left' size={24} color={ COLORS.WHITE } />
            </View>
        </View>
        <View>
          <ListCategories />
        </View>

        {
          listCar.length ?
          (
            <FlatList 
              showsVerticalScrollIndicator={false}
              numColumns={2}
              //onEndReachedThreshold={0.5}
              //onEndReached={() => setPageIndex(pageIndex + 1)}
              data={listCar}
              renderItem={({ item }) => <Card car={item} />}
            />
          ) : (
            <>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '100%' }}>
                <Image 
                    source={require('../../resources/images/bg_emptyPNG.png')}
                    style={{ width: 300, height: 300, resizeMode: 'contain' }}
                />
                <Text style={{ textAlign: 'center', fontSize: 17, fontStyle: 'italic', }}>Không tìm thấy kết quả phù hợp</Text>
              </View>
            </>
          )
        }

        {
          listCar.length >= 10 ? 
          (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
              <Button 
                title='Trang trước'
                onPress={previousPage}
              />
              <View style={{ marginLeft: 65, marginRight: 65, }}>
                <Text>{ pageIndex } / { totalPage }</Text>
              </View>
              <Button 
                title='Trang kế tiếp'
                onPress={nextPage}
              />
            </View>
          ) : (
            <></>
          )
        }
        
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: COLORS.DEFAULT_BACKGROUND,
    paddingVertical: 15,
  },  

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },  

  sortBtn: {
    width: 50,
    height: 60,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  categoriesListContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    paddingHorizontal: 20
  },

  styleCategoryCar: {
    height: 40,
    width: 125,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row'
  },  

  styleCategoryCarChild: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.WHITE,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginTop: 15, 
    borderRadius: 15, 
    elevation: 13,
    backgroundColor: COLORS.WHITE
  },

  iconUser: {
    height: 50, 
    width: 50, 
    borderRadius: 25,
    marginTop: 10,
  },
});

export default Home;
