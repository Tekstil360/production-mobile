import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import ProductionCodeResponse from '../../dto/Response/ProductionCode/ProductionCodeResponse';
import CustomText from '../Text/Text';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon/Icon';
interface ProductionCodeCardProps extends TouchableOpacityProps {
  item: ProductionCodeResponse;
}
export default function ProductionCodeCard(props: ProductionCodeCardProps) {
  const {item} = props;
  return (
    <Card {...props}>
      {!item.imageSrc && <CardImage></CardImage>}
      <CardContent>
        <CustomText fontSizes="normal" color="primary" fontWeight="normal">
          {item.code}
        </CustomText>
        <Icon icon={faAngleRight} color="#D8B267" />
      </CardContent>
    </Card>
  );
}
const Card = styled(TouchableOpacity)`
  padding: 5px;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  flex-direction: row;
  gap: 10px;
`;
const CardImage = styled(View)`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
`;
const CardContent = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;
