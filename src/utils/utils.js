
import _ from 'lodash';
import { Alert, ToastAndroid, Platform, Linking } from 'react-native';
// import atob from 'atob';
import moment from 'moment';

export {
  compareOjWhithKeys,
  checkEmail,
  checkPhone,
  changeAlias,
  convertImagePropertiesImageView,
  chunkList,
  mapStringImageToArray,
  currencyFormat,
  mapProductVariationsValues,
  mapProductVariantsValue,
  mapProductVariations,
  mapImageSize,
  getNumberString,
  formatPhoneNumber,
  getNavigationRouteName,
  showAlert,
  parseServerTimeFromUnix,
  numberFormat,
  remove_marks,
  formartMoneyVN,
  uuidv4,
  isTimeBetween,
  getTimeMoment,
  uploadDataS3,
  validatePhone,
  dateDiff,
  secondDateDiff,
  dayDateDiff,
  hoursDateDiff,
  getDateTime,
  callNumber,
  convertObjectToFormData,
  checkValidDataCar,
  returnDetailIDS,
  convertDateTimeToString,
  returnCharacteristicID,
  convertDateToStringFormat,
  validateInfoBorrorwCar
}

function callNumber(phone) {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  }
  else  {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
  .then(supported => {
    if (!supported) {
      Alert.alert('Số điện thoại không hợp lệ');
    } else {
      return Linking.openURL(phoneNumber);
    }
  })
  .catch(err => console.log(err));
};

function compareOjWhithKeys([...keyCompare], { ...object1 }, { ...object2 }) {
  const newOj1WithWhitKeyCompare = _.pick(object1, keyCompare)
  const newOj2WithWhitKeyCompare = _.pick(object2, keyCompare)
  return _.isEqual(newOj1WithWhitKeyCompare, newOj2WithWhitKeyCompare)
}
function getTimeMoment(date) {

  let dateTemp = new Date(date)
  
  var d = moment(dateTemp).format('LT')
  
  return d;
}
function getDateTime(date) {

  let dateTemp = new Date(date)
  
  var d = moment(dateTemp).format('L')
  
  return d;
}
function checkEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

function secondDateDiff({ dateStart, dateEnd }) {

  let start = moment(new Date(dateStart));
  let end   = moment(new Date(dateEnd));
  let duration = moment.duration(end.diff(start));
  let seccond = duration.asSeconds();

  return Math.round(seccond);
}

function dayDateDiff({ dateStart, dateEnd }) {

  let end = new Date(dateEnd);
  var diff = new Date(end.getTime() - dateStart.getTime());
  return diff.getUTCDate() - 1; // difference days
}


function hoursDateDiff({ dateStart, dateEnd }) {
  let end = new Date(dateEnd);

  var hours = (end - dateStart) / 36e5;
  return Math.round(hours); // difference days
}

function checkPhone(phone) {
  let min = 10
  let max = 11

  if (parseInt(phone.substr(0, 1)) !== 0) {
    min = 9
    max = 10
  }

  if (phone.length < min || phone.length > max) {
    return false
  }

  if (isNaN(phone)) return false

  return true
}

function formartMoneyVN(money) {
  let moneyFormat = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return moneyFormat;
}

function changeAlias(alias) {
  let str = alias
  str = str.toLowerCase()
  str = str.replace(/[^a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi, '')
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/\s+/g, ' ')
  str = str.trim()
  return str
}

function remove_marks(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}

function uuidv4() {
  let uuid = '';
  let i;
  let random;
  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
};

function isTimeBetween(startTime, endTime, serverTime) {
  let start = moment(startTime, "H:mm")
  let end = moment(endTime, "H:mm")
  let server = moment(serverTime, "H:mm")
  if (end < start) {
      return server >= start && server<= moment('23:59:59', "h:mm:ss") || server>= moment('0:00:00', "h:mm:ss") && server < end;
  }
  return server>= start && server< end
}

function validatePhone(phone) {
  let phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return phone_regex.test(phone);
}

function dateDiff(startStr, endStr) {
  var startDate = moment(startStr);
  var endDate = moment(endStr);
  var diff = endDate.diff(startDate, 'days');
  for (var year = startDate.year(); year <= endDate.year(); year++) {
      var date = moment(year + '-02-29');
      if (date.isBetween(startDate,endDate) && date.isLeapYear()) {
          diff -= 1;
      }
  }
  return diff/365;
}

function convertImagePropertiesImageView(inputImages) {
  const outputImages = []
  if (inputImages.length > 0) {
    inputImages.map(image => {
      outputImages.push({
        source: {
          uri: image.uri
        }
      })
    })
  }

  return outputImages
}

function chunkList(data = [], rows) {
  return _.chunk(data, rows)
}

function mapStringImageToArray(stringImage) {
  if (!stringImage || stringImage.length == 0) {
    return []
  }
  let output = []
  stringImage.split("|").map(url => output.push({ url }))
  return output
}

function mapProductVariationsValues(variations = {}) {
  let output = {}
  variations.map(variation => {
    Object.keys(variation.variant).map(key => {
      let variant = {}
      variant.theme = variation.variant[key].theme
      variant.label = variation.variant[key].label
      variant.value = variation.variant[key].value

      if (output[key]) {
        const findIndex = output[key].findIndex(i => i.value === variant.value)
        if (findIndex === -1) {
          output[key].push(variant)
        }
      } else {
        output[key] = [variant]
      }
    })
  })
  return output
}

function mapProductVariations(inputArr) {
  return (inputArr || []).map(item => {
    let variation = {}
    variation.id = item.id
    variation.price = item.price
    variation.quantityInStock = item.quantityInStock
    variation.maxOrderQuantity = item.maxOrderQuantity
    variation.itemCode = item.itemCode || null
    variation.image = mapStringImageToArray(item.image)
    variation.variant = mapProductVariantsValue(item.variations)
    variation.otherVendorProducts = item.otherVendorProducts || []
    return variation
  })
}

function mapProductVariantsValue(variants) {
  let output = {}
  Object.keys(variants || {}).map(key => {
    output[key] = {}
    output[key].theme = variants[key].customThemeName || null
    output[key].label = variants[key].customValue
    output[key].value = variants[key].code || variants[key].customValue
  })
  return output
}

function currencyFormat(value, fixedNumber = 0, currency = '₫') {
  if (_.isNumber(value)) {
    return value.toFixed(fixedNumber).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + currency
  }
  return ''
}

function mapImageSize(images, width = 150) {
  let imgURL = (images || '').split('|').find(_, idx => idx == 0);
  let indexOfDot = imgURL.lastIndexOf('.');
  let resizeImgURL = '';
  if (indexOfDot >= 0) {
    let imgName = imgURL.substr(0, indexOfDot);
    let imgExtension = imgURL.substr(indexOfDot + 1);
    resizeImgURL = `${Math.floor(width)}/${imgName}.${imgExtension}`;
  }
  return resizeImgURL;
}

function getNumberString(string) {
  let number = string.match(/\d+/g)
  if (number) {
    return number.join('')
  } else {
    return number
  }
}

function uploadDataS3(url, file) {
  return new Promise(async resolve => {
    const response = await fetch(file.uri)
    const blob = await response.blob();

    const headers = {
      'Content-Type': file.type,
    };
    fetch(url, {
      method: 'PUT',
      body: blob,
      headers,
    })
      .then(res => {
        resolve({error: false, data: res});
      })
      .catch(error => resolve({error: true, message: error}));
  });
};

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '')
    return [intlCode, '(', match[2], ') ', match[3], ' ', match[4]].join('')
  }
  return null
}

const numberFormat = (value, fixedNumber = 0, init = ',') => {
  if (_.isNumber(value)) {
    return value.toFixed(fixedNumber).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + init)
  }
  return ''
}

function getNavigationRouteName(navProps) {
  const routeName = navProps.state ? navProps.state.routes[navProps.state.index].routeName : 'Unknown'
  return routeName
}

function showAlert(title = 'alert', content = '') {
  if (Platform.OS === 'android') {
    ToastAndroid.show(
      content,
      ToastAndroid.SHORT
    )
  } else {
    Alert.alert(title, content)
  }
}

function parseServerTimeFromUnix(serverTime, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!serverTime) {
    return null
  } else {
    return moment.unix(serverTime).format(format)
  }
}

function convertObjectToFormData(object) {
  var formData = new FormData();

  for (var key in object) {
    formData.append(key, object[key]);
  }

  return formData;
}

// Kiểm tra thông tin đầu vào của xe
const checkValidDataCar = (infoDataCar) => {
  const { 
    name, brandID, description, price, 
    mortage, rules, address, 
    wardID, districtID, provinceID, 
    Seats, Fuel, FuelConsumption, 
    Tranmission, SelectedFeature, 
    SelectedLicense, avatar, listGallery
  } = infoDataCar;

  if(!avatar) 
    return {
      error: true,
      message: 'Vui lòng đăng tải hình ảnh xe của bạn'
    }

  if(!listGallery.length)
    return {
      error: true,
      message: 'Vui lòng chọn thêm hình ảnh về xe của bạn'
    }

  if(!name) 
    return {
      error: true,
      message: 'Nhập tên xe của bạn'
    }

  if(!brandID)
    return {
      error: true,
      message: 'Nhập thương hiệu xe của bạn'
    }

  if(!price)
    return {
      error: true,
      message: 'Nhập giá thuê xe của bạn'
    }

  if(!address || !wardID || !districtID || !provinceID) 
    return {
      error: true,
      message: 'Nhập thông tin địa chỉ để thuê xe của bạn'
    }

  if(!Seats) 
    return {
      error: true,
      message: 'Nhập số ghế xe của bạn'
    }

  if(!Fuel) 
    return {
      error: true,
      message: 'Nhập nhiên liệu của xe bạn'
    }

  if(!FuelConsumption) 
    return {
      error: true,
      message: 'Nhập mức tiêu thụ nhiên liệu của xe bạn'
    }

  if(!Tranmission) 
    return {
      error: true,
      message: 'Nhập truyền động của xe bạn'
    }

  if(!description)
    return {
      error: true,
      message: 'Nhập mô tả xe của bạn'
    }

  if(!mortage) 
    return {
      error: true,
      message: 'Nhập tài sản thế chấp để thuê xe của bạn'
    }

  if(!rules) 
    return {
      error: true,
      message: 'Nhập điều khoản để thuê xe của bạn'
    }

  if(SelectedFeature.length <= 0)
    return {
      error: true,
      message: 'Nhập các tính năng của xe bạn'
    }

  if(SelectedLicense.length <= 0)
    return {
      error: true,
      message: 'Nhập các giấy tờ thuê xe bạn'
    }

  return {
    error: false,
    message: 'validate_done'
  }
}

// Kiểm tra thông tin đầu vào của xe
const returnDetailIDS = (infoDataCar) => {
  const { 
    Seats, Fuel, FuelConsumption, 
    Tranmission, SelectedFeature, 
    SelectedLicense,
  } = infoDataCar;

  let Detail_ids_GroupFeature = SelectedFeature.map(feature => feature.id).join(',');
  let Detail_ids_GroupLicense = SelectedLicense.map(license => license.id).join(',');

  let Detail_ids = `${Seats},${Fuel},${FuelConsumption},${Tranmission},${Detail_ids_GroupFeature},${Detail_ids_GroupLicense}`

  return Detail_ids;
}

const convertDateTimeToString = (dateTime) => {
  let tempDate = new Date(dateTime);
  let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
  let fTime = tempDate.getHours() + ' giờ ' + ' - ' + tempDate.getMinutes() + ' phút';
  return fDate + ' ' + fTime;
}

const returnCharacteristicID = (listCharacteristicID) => {
  let strCharacteristicID = listCharacteristicID.join(',');

  return strCharacteristicID;
}

// convert date to string format: 'YYYY-mm-dd'
const convertDateToStringFormat = (date) => {
  return date.getFullYear() + '-' + `${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}` + '-' + `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
}

const validateInfoBorrorwCar = (body) => {
  let { userID, carID, dropOffPlace, pickUpPlace, startTime, endTime } = body;

  if(!carID) 
    return {
      error: true,
      message: 'Không thể lấy thông tin xe',
    }

  if(!pickUpPlace) 
    return {
      error: true,
      message: 'Vui lòng nhập địa chỉ nhận xe',
    }

  if(!dropOffPlace) 
    return {
      error: true,
      message: 'Vui lòng nhập địa chỉ trả xe',
    }

  if(!startTime)
    return {
      error: true,
      message: 'Vui lòng chọn ngày bắt đầu thuê xe',
    }

  if(!endTime) 
    return {
      error: true,
      message: 'Vui lòng chọn ngày trả xe',
    }

  return {
    error: false,
    message: 'validate_done',
  }
}