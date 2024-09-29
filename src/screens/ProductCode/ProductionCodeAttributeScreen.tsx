import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/Container/Container';
import Button from '../../components/Button/Button';
import {RootStackParamList} from '../../types/Navigator';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import ActionPermissionHelper from '../../types/ActionPermissionHelper';
import {BottomSheetRef} from '../../components/CBottomSheet/CustomBottomSheet';
import AddProductionCodeAttribute from '../../components/BottomSheetContent/ProductionCode/AddProductionCodeAttributeContent';

import CustomFlatList from '../../components/Flatlist/CustomFlatList';

import ProductionCodeAttributeResponse from '../../dto/Response/ProductionCode/ProductionCodeAttributeResponse';
import {ColBackground} from '../../constant/GlobalStyled';
import ColPlaceholder from '../../components/Placeholder/ColPlaceholder';
import UpdateProductionCodeAttribute from '../../components/BottomSheetContent/ProductionCode/UpdateProductionCodeAttributeContent';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {ProductionCodeAttributeApi} from '../../services/productionCodeAttributeService';

export default function ProductionCodeAttributeScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Productioncodeattributes'>) {
  const {attributes} = useSelector(
    (state: RootState) => state.productionCodeAttribute,
  );
  const [useAttributeById] =
    ProductionCodeAttributeApi.useGetAttributeByIdMutation();
  const addProductionCodeRef = useRef<BottomSheetRef>(null);
  const updateProductionCodeRef = useRef<BottomSheetRef>(null);
  const canProductionCodeAttribute = ActionPermissionHelper.canPermission(
    route.params.actionPermissions || [],
    'Productioncodeattributes',
  );

  useEffect(() => {}, []);

  const handleOpenUpdateSheet = async (id: number) => {
    let entity = {
      id: id,
      onOpen: () => {
        updateProductionCodeRef.current?.open();
      },
    };
    await useAttributeById(entity);
  };

  return (
    <Container header title="Ürün Özellikleri" goBackShow>
      <Container type="container" p={10}>
        <CustomFlatList
          data={attributes}
          renderItem={({
            item,
            index,
          }: {
            item: ProductionCodeAttributeResponse;
            index: number;
          }) => {
            return (
              <ColBackground key={index}>
                <ColPlaceholder
                  onPress={() => handleOpenUpdateSheet(item.id)}
                  name={item.attributeName}
                />
              </ColBackground>
            );
          }}
        />
      </Container>
      {canProductionCodeAttribute.canCreate && (
        <Container flex={0.1} type="container" p={10}>
          <Button
            testID="createProductionCodeAttributeButton"
            text="Ürün Özellikleri Ekle"
            onPress={() => {
              addProductionCodeRef.current?.open();
            }}
          />
        </Container>
      )}
      {canProductionCodeAttribute.canCreate && (
        <AddProductionCodeAttribute sheetRef={addProductionCodeRef} />
      )}
      {canProductionCodeAttribute.canUpdate && (
        <UpdateProductionCodeAttribute
          canDelete={canProductionCodeAttribute.canDelete}
          sheetRef={updateProductionCodeRef}
        />
      )}
    </Container>
  );
}
