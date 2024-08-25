import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SvgType} from '../../types/type';
import styled from 'styled-components';
import {SIZES} from '../../constant/theme';
import CustomText from '../Text/Text';
import NonImageSvg from '../../assets/productions/NonImageSvg';
import {SvgXml} from 'react-native-svg';
import useThemeColors from '../../constant/useColor';

export interface ProductionIconProps extends TouchableOpacityProps {
  title?: string;
  ImageSvg?: React.ComponentType<SvgType | any>;
  xmlSvg?: string;
  selected?: boolean;
  size?: 'small' | 'medium';
  numColumn?: number;
}
const ProductionIconCard = (props: ProductionIconProps) => {
  const {title, selected, ImageSvg, size, xmlSvg, numColumn} = props;
  const colors = useThemeColors();
  return (
    <ProductionContent
      numColumn={numColumn}
      height={size === 'small' ? '75px' : '150px'}
      theme={{color: selected ? '#FFC107' : '#f2f2f2'}}
      {...props}
      activeOpacity={0.7}>
      <ProductionImage height={size === 'small' ? '25px' : '100px'}>
        {ImageSvg || xmlSvg ? (
          ImageSvg ? (
            <ImageSvg height={40} width={40} />
          ) : (
            xmlSvg && (
              <SvgXml
                color={colors.iconColor}
                xml={xmlSvg}
                height={30}
                width={30}
              />
            )
          )
        ) : (
          <NonImageSvg height={40} width={40} />
        )}
      </ProductionImage>
      {title && <ProductionTitle>{title}</ProductionTitle>}
    </ProductionContent>
  );
};
export default ProductionIconCard;
const ProductionContent = styled(TouchableOpacity)<{
  height: string;
  numColumn?: number;
}>`
  width: ${props => SIZES.width / (props.numColumn || 2) - 20}px;
  height: ${props => props.height};
  background-color: #f2f2f2;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.color};
`;
const ProductionImage = styled(View)<{height: string}>`
  width: 100px;
  height: ${props => props.height};
  justify-content: center;
  align-items: center;
`;
const ProductionTitle = styled(CustomText)`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;
