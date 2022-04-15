import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('screen');
const contentWidth = width - 20;


import { COLORS } from '../../constant/colors';
import ButtonCustom from '../../components/ButtonCustom';

const CarDetail = ({ navigation, route }) => {
  const car = route.params;

  return (
    <ScrollView>
      <SafeAreaView style={{ backgroundColor: COLORS.WHITE, flex: 1, flexDirection: 'column', }}>
        <View style={ styles.header }>
          <FontAwesome5 name="chevron-left" size={28} color="black" onPress={navigation.goBack} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Trang chủ</Text>
        </View>

        <View style={ styles.body }>
          <View>
            <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={ car.image } />
          </View>
          <View style={ styles.styleParagraph }>
            <View style={ styles.headerParagraph }>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20, color: COLORS.WHITE, width: '75%' }} >{ car.name }</Text>
              <View style={{ width: 50, height: 50, marginRight: 20, }}>
                <ButtonCustom
                  color={ COLORS.WHITE }
                  btnIcon='heart'
                  btnAction={() => console.log('You clicked favourite')}
                />
              </View>
            </View>
            <View style={ styles.contentParagraph }>
              <Text style={{ color: COLORS.WHITE, textAlign: 'justify', marginHorizontal: 20, marginTop: 20 }}>{ car.description }</Text>
            </View>
            <View style={ styles.btnParagraph }>
              <ButtonCustom 
                title='Thuê xe'
                color={ COLORS.WHITE }
                titleStyle={{ color: COLORS.DEFAULT_BACKGROUND, fontWeight: 'bold', fontSize: 20 }}
                btnHeight={60}
                btnWidth={contentWidth}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
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
    width: '100%', 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40
  },  

  btnParagraph: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },  
});

export default CarDetail;
