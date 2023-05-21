import {Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const actualDimensions = {
  height: screenHeight > screenWidth ? screenHeight : screenWidth,
  width: screenWidth > screenHeight ? screenWidth : screenHeight,
};
