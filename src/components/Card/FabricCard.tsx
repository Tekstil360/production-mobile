import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';

interface FabricCardProps extends TouchableOpacityProps {}

export default function FabricCard(props: FabricCardProps) {
  return (
    <FabricCardContainer activeOpacity={0.8} {...props}>
      <FabricTitleContainer>
        <CustomText fontSizes="body4" fontWeight="bold">
          Kumaş Adı
        </CustomText>
      </FabricTitleContainer>
      <FabricInfoContainer>
        <CustomText fontSizes="default" color="grey">
          Burbang Blue
        </CustomText>
        <CustomText fontSizes="default" fontWeight="bold" color="textLink">
          5m
        </CustomText>
      </FabricInfoContainer>
    </FabricCardContainer>
  );
}
const FabricCardContainer = styled(TouchableOpacity)`
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 2px;
  elevation: 5;
`;
const FabricTitleContainer = styled(View)`
  margin-bottom: 10px;
`;
const FabricInfoContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
