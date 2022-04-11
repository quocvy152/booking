import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';

import { COLORS } from '../../constant/colors';
import CATEGORIES_CAR from '../../constant/categories';
import CARS from '../../constant/cars';

import TextInputCustom from '../../components/TextInputCustom';

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const Home = () => {
  const [selectedCategorIndex, setSelectedCategorIndex] = useState(0);

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
      >
        {CATEGORIES_CAR.map((categoryCar, index) => (
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
                <Image source={categoryCar.image} style={{ height: 35, width: 35, borderRadius: 30, resizeMode: 'contain' }} />
              </View>
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 20 }}>{ categoryCar.name }</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  const Card = ({ car }) => {
    return (
      <>
        <View style={ styles.card }>
          <View style={{ alignItems: 'center', top: -20 }}>
            <Image source={ car.image } style={{ height: 120, width: 120, borderRadius: 60, resizeMode: 'contain' }} />
          </View>
          <View style={{ marginHorizontal: 20, top: -30 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{ car.name }</Text>
            <Text style={{ fontSize: 15, color: COLORS.DEFAULT_TEXT }}>
              Loại: 
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                { '  ' + car.seat }
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
              value={ car.priceBorrow }
              displayType="text"
              thousandSeparator
              prefix="đ"
              renderText={(value) => <Text style={{ fontWeight: 'bold' }}>{value}</Text>}
            />
          </View>
        </View> 
      </>
    );
  }
    
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.DEFAULT_BACKGROUND }}>
        <View style={ styles.header }>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 25, color: COLORS.WHITE }}>Xin chào,</Text>
              <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, color: COLORS.WHITE }}>Quốc Vỹ</Text>
            </View>
            <Text style={{ marginTop: 5, fontSize: 20, color: COLORS.WHITE }}>
              Bạn muốn thuê xe gì ?
            </Text>
          </View>
          <Image source={require('../../resources/images/man-300x300.png')} style={{ height: 50, width: 50, borderRadius: 25 }} />
        </View>
        <View 
          style={{ 
            marginTop: 30,
            flexDirection: 'row'
          }}>
            <View style={ styles.inputContainer }>
              <TextInputCustom
                icon='search'
                textColor={ COLORS.DEFAULT_TEXT }
                placeholderText='Tìm kiếm xe'
                style={{ marginLeft: 10, borderRadius: 10, width: '95%' }}
              />
            </View>
            <View style={ styles.sortBtn }>
              <FontAwesome5 name='align-left' size={24} color={ COLORS.WHITE } />
            </View>
        </View>
        <View>
          <ListCategories />
        </View>
        <FlatList 
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={CARS}
          renderItem={({ item }) => <Card car={item} />}
        />
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
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18
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
    paddingVertical: 30,
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
    marginBottom: 20,
    marginTop: 40, 
    borderRadius: 15, 
    elevation: 13,
    backgroundColor: COLORS.WHITE
  },
});

export default Home;
