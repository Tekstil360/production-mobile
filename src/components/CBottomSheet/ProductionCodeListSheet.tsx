import React from 'react';
import CustomBottomSheet, {BottomSheetRef} from './CustomBottomSheet';
import CustomFlatList from '../Flatlist/CustomFlatList';
import CustomText from '../Text/Text';
import Container from '../Container/Container';
import CustomerResponse from '../../dto/Response/Customer/CustomerResponse';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {TouchableOpacity, View} from 'react-native';

import ProductionCodeResponse from '../../dto/Response/ProductionCode/ProductionCodeResponse';
import ProductionCodeApi from '../../services/productionCodeService';
import Icon from '../Icon/Icon';
import {
  faAngleDown,
  faAngleRight,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../constant/theme';
import ProductionCodeVariantResponse from '../../dto/Response/ProductionCode/ProductionCodeVariantResponse';

interface ProductionCodeListSheetProps {
  sheetRef: React.RefObject<BottomSheetRef>;
  children?: React.ReactNode;
  showVariants?: boolean;
}
export default function ProductionCodeListSheet(
  props: ProductionCodeListSheetProps,
) {
  const {sheetRef, children, showVariants = false} = props;

  const [useProductionCodes] =
    ProductionCodeApi.useGetProductionCodesMutation();
  const {productionCodes} = useSelector(
    (state: RootState) => state.productionCode,
  );
  const loadProductionCodes = async () => {
    await useProductionCodes();
  };
  return (
    <CustomBottomSheet
      snapPoints={['80%']}
      ref={sheetRef}
      onLoad={loadProductionCodes}>
      {children}
      <Container bgColor="white" type="container" p={10}>
        <CustomFlatList
          filter={(item, search) => item.code.includes(search)}
          isSearchable
          contentContainerStyle={{gap: 10}}
          data={productionCodes}
          renderItem={({
            item,
            index,
          }: {
            item: ProductionCodeResponse;
            index: number;
          }) => (
            <ProductionCodeListItem
              item={item}
              showVariants={showVariants}
              onClose={() => sheetRef.current?.close()}
            />
          )}
        />
      </Container>
    </CustomBottomSheet>
  );
}

const ProductionCodeListItem = ({
  item,
  showVariants,
  onClose,
}: {
  item: ProductionCodeResponse;
  showVariants: boolean;
  onClose: () => void;
}) => {
  const [showVariant, setShowVariant] = React.useState(false);
  return (
    <>
      <Card
        onPress={() => {
          if (!showVariants) {
            onClose();
          } else {
            setShowVariant(!showVariant);
          }
        }}
        activeOpacity={0.7}>
        <CardInfo>
          <CustomText>{item.code}</CustomText>
          {showVariants && (
            <Icon
              color={COLORS.secondaryIconColor}
              icon={!showVariant ? faAngleDown : faAngleUp}
            />
          )}
        </CardInfo>
        {showVariant && (
          <VariantContainer>
            {item.variants.map(
              (item: ProductionCodeVariantResponse, index: number) => {
                return <VariantItemCard key={index} item={item} />;
              },
            )}
          </VariantContainer>
        )}
      </Card>
    </>
  );
};
const VariantItemCard = ({item}: {item: ProductionCodeVariantResponse}) => {
  const [selected, setSelected] = React.useState(false);
  return (
    <VariantItem
      activeOpacity={0.7}
      onPress={() => setSelected(!selected)}
      borderColor={selected}
      hitSlop={10}>
      <CustomText fontSizes="description2">
        {item.fullVariantName} ({item.stockQuantity})
      </CustomText>
    </VariantItem>
  );
};

const Card = styled(TouchableOpacity)`
  border-radius: 5px;
  min-height: 50px;
  justify-content: center;
  background-color: #f5f5f5;
`;
const CardInfo = styled(View)`
  flex-direction: row;
  height: 50px;
  padding-horizontal: 10px;
  justify-content: space-between;
  align-items: center;
`;
const VariantContainer = styled(View)`
  padding: 10px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;
const VariantItem = styled(TouchableOpacity)<{borderColor?: boolean}>`
  flex-direction: row;
  padding: 5px;
  background-color: #e0e0e0;
  gap: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.borderColor ? COLORS.secondaryIconColor : '#e0e0e0'};
  border-radius: 5px;
`;
