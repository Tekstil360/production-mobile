import {TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../Text/Text';
import ProductionResponse from '../../dto/Response/ProductionResponse';
import styled from 'styled-components';
import CustomSvgXml from '../Icon/CustomSvgXml';
import {getProductionIconByKey} from '../../helper/IconHelper';

interface ProductionCardProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  production: ProductionResponse;
}

export default function ProductionCard({
  production,
  ...props
}: ProductionCardProps) {
  let icon = getProductionIconByKey(production.icon);
  return (
    <ProductionCardContainer {...props} activeOpacity={0.7}>
      <CustomSvgXml width={25} height={25} xml={icon} />
      <CustomText fontWeight="bold">{production.name}</CustomText>
    </ProductionCardContainer>
  );
}
const ProductionCardContainer = styled(TouchableOpacity)`
  background-color: white;
  padding: 10px;
  margin: 5px;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  gap: 5px;
`;
