import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import SwitchButton from '../Button/SwitchButton';
import ProductionCodeAttributeResponse from '../../dto/Response/ProductionCode/ProductionCodeAttributeResponse';

interface ProductionCodeAttributeCardProps {
  item: ProductionCodeAttributeResponse;
  value?: (attributeValueId: number) => boolean;
  onChange?: (e: boolean, selectedAttributeValueId: number) => void;
}
export default function ProductionCodeAttributeCard(
  props: ProductionCodeAttributeCardProps,
) {
  const {item, onChange, value} = props;
  return (
    <CardWrapper>
      <CardHeader>
        <CustomText fontSizes="h6" fontWeight="bold" color="grey">
          {item?.attributeName} Özellikleri
        </CustomText>
      </CardHeader>
      <CardBody>
        {item?.attributeValues.map((x, i) => (
          <CardColumn key={x.id}>
            <CustomText>{x.value}</CustomText>
            <SwitchButton
              onChange={e => {
                onChange && onChange(e, x.id);
              }}
              value={value?.(x.id) || false}
            />
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
