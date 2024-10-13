import React from 'react';
import Container from '../../components/Container/Container';
import ActionPermissionHelper from '../../types/ActionPermissionHelper';
import Button from '../../components/Button/Button';

import {RootStackParamList} from '../../types/Navigator';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import AddProductionCodeContent from '../../components/BottomSheetContent/ProductionCode/AddProductionCodeContent';
import {BottomSheetRef} from '../../components/CBottomSheet/CustomBottomSheet';
import ProductionCodeApi from '../../services/productionCodeService';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import ProductionCodeResponse from '../../dto/Response/ProductionCode/ProductionCodeResponse';

import ProductionCodeCard from '../../components/Card/ProductionCodeCard';

export default function ProductionCodeScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Productioncodes'>) {
  const [useGetProductionCodes] =
    ProductionCodeApi.useGetProductionCodesMutation();
  const canProductionCode = ActionPermissionHelper.canPermission(
    route.params.actionPermissions || [],
    'Productioncodes',
  );
  const {productionCodes} = useSelector((x: RootState) => x.productionCode);
  const addProductionCodeSheetRef = React.useRef<BottomSheetRef>(null);

  useFocusEffect(
    React.useCallback(() => {
      getProductionCodes();
    }, []),
  );

  const getProductionCodes = async () => {
    await useGetProductionCodes();
  };
  return (
    <Container header title="Ürün Kodları" goBackShow>
      <Container type="container" p={10}>
        <CustomFlatList
          data={productionCodes}
          renderItem={({
            item,
            index,
          }: {
            item: ProductionCodeResponse;
            index: number;
          }) => {
            return (
              <ProductionCodeCard
                key={index}
                item={item}
                onPress={() => {
                  navigation.navigate('ProductioncodeDetail', {id: item.id});
                }}
              />
            );
          }}
        />
      </Container>
      {canProductionCode.canCreate && (
        <Container flex={0.1} type="container" p={10}>
          <Button
            testID="createProductionCodeButton"
            text="Ürün Kodu Ekle"
            onPress={() => {
              addProductionCodeSheetRef.current?.open();
            }}
          />
        </Container>
      )}
      {canProductionCode.canCreate && (
        <AddProductionCodeContent sheetRef={addProductionCodeSheetRef} />
      )}
    </Container>
  );
}
