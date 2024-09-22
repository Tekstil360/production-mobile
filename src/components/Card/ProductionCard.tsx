import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../Text/Text';
import styled from 'styled-components';
import CustomSvgXml from '../Icon/CustomSvgXml';
import {getProductionIconByKey} from '../../helper/IconHelper';
import Icon from '../Icon/Icon';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import ProductionResponse from '../../dto/Response/Production/ProductionResponse';

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
      <ProductionInfo>
        <CustomSvgXml width={25} height={25} xml={icon} />
        <CustomText fontWeight="bold">{production.name}</CustomText>
      </ProductionInfo>
      <ProductionRightIcon>
        <Icon icon={faAngleRight} color="#D8B267" />
      </ProductionRightIcon>
    </ProductionCardContainer>
  );
}
const ProductionCardContainer = styled(TouchableOpacity)`
  background-color: white;
  padding: 10px;
  margin: 5px;
  flex-direction: row;
  border-radius: 5px;
`;
const ProductionInfo = styled(View)`
  flex: 1;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;
const ProductionRightIcon = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;
