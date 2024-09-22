import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const SIZES = {
  fontLg: 16,
  font: 14,
  fontSm: 13,
  fontXs: 12,

  //radius
  radius_sm: 8,
  radius: 12,
  radius_md: 18,
  radius_lg: 30,

  //space
  padding: 15,
  margin: 15,

  //Font Sizes
  h1: 40,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,

  //App dimensions
  width,
  height,
};
export const FONTSIZES = {
  default: 14,
  normal: 16,
  hGiant: 60,
  h1: 40,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body1: 30,
  body2: 24,
  body3: 20,
  body4: 16,
  body5: 14,
  body6: 12,
  caption: 10,
  caption2: 8,
  description: 12,
  description2: 10,
  description3: 8,
};
export const FONTWEIGHT = {
  bold: 'bold',
  normal: 'normal',
  light: 'light',
  thin: '100',
};
export const COLORS = {
  primary: '#564839',
  secondary: '#34495e',
  textBlack: '#000',
  textLink: '#2141A6',
  grey: '#808A99',
  error: '#ff0000',
  white: '#fff',
  green: '#01A101',
  iconColor: '#D8B267',
  lightBlack: '#333333',
};
