import React from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import CustomerResponse from '../../dto/Response/Customer/CustomerResponse';
import {Row} from '../../constant/GlobalStyled';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
interface CustomerCardProps extends TouchableOpacityProps {
  item: CustomerResponse;
}
export default function CustomerCard(props: CustomerCardProps) {
  const {item} = props;
  return (
    <CustomerContainer {...props} activeOpacity={0.7}>
      <Row between>
        <CustomText>Ünvan</CustomText>
        <CustomText fontWeight="bold">{item.title}</CustomText>
      </Row>
      <Row between>
        <CustomText>Toplam Sipariş</CustomText>
        <CustomText fontWeight="bold">0</CustomText>
      </Row>
      <Row between>
        <CustomText>Bekleyen Sipariş</CustomText>
        <CustomText fontWeight="bold">0</CustomText>
      </Row>
    </CustomerContainer>
  );
}
const CustomerContainer = styled(TouchableOpacity)`
  background-color: white;
  padding: 15px 10px;
  border-radius: 10px;
  elevation: 5;
  gap: 10px;
  border-width: 1px;
  border-color: #f0f0f0;
`;
