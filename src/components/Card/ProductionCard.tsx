import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import CustomText from '../Text/Text';
import JeansPantsSvg from '../../assets/productions/JeansPantsSvg';
import ProductionResponse from '../../dto/Response/ProductionResponse';

interface ProductionCardProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  production: ProductionResponse;
}

export default function ProductionCard({
  production,
  ...props
}: ProductionCardProps) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={{
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
      }}>
      <JeansPantsSvg />
      <CustomText fontWeight="bold">{production.name}</CustomText>
    </TouchableOpacity>
  );
}
