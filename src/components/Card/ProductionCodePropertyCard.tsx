import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import SwitchButton from '../Button/SwitchButton';
import ProductionCodePropertyResponse from '../../dto/Response/ProductionCode/ProductionCodePropertyResponse';

interface ProductionCodePropertyCardProps {
  item: ProductionCodePropertyResponse;
}
export default function ProductionCodePropertyCard(
  props: ProductionCodePropertyCardProps,
) {
  const {item} = props;
  return (
    <CardWrapper>
      <CardHeader>
        <CustomText fontSizes="h6" fontWeight="bold" color="grey">
          {item?.name} Özellikleri
        </CustomText>
      </CardHeader>
      <CardBody>
        {item?.productionPropertyItems.map((x, i) => (
          <CardColumn key={x.id}>
            <CustomText>{x.name}</CustomText>
            <SwitchButton value={false} />
          </CardColumn>
        ))}
      </CardBody>
    </CardWrapper>
  );
}
const CardWrapper = styled(View)`
  background-color: white;
  margin-bottom: 10px;
  border-radius: 10px;
  padding-vertical: 10px;
  border: 1px solid #f5f5f5;
`;
const CardHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 10px;
  border-bottom-width: 1px;
  border-color: #f5f5f5;
  padding-bottom: 10px;
`;
const CardBody = styled(View)`
  padding: 10px;
`;
const CardColumn = styled(View)`
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: #f5f5f5;
  padding-vertical: 7px;
`;
