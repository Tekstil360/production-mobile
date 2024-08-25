import React from 'react';
import {SvgXml} from 'react-native-svg';
import useThemeColors from '../../constant/useColor';

interface CustomSvgXmlProps {
  xml: string;
  color: string;
  width: number;
  height: number;
}
export default function CustomSvgXml({
  xml,
  color,
  width,
  height,
}: CustomSvgXmlProps) {
  const colors = useThemeColors();
  return (
    <SvgXml
      xml={xml}
      color={color || colors.iconColor}
      width={width || 25}
      height={height || 25}
    />
  );
}
