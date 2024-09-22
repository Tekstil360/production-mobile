import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/Container/Container';
import Button from '../../components/Button/Button';
import {RootStackParamList} from '../../types/Navigator';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import ActionPermissionHelper from '../../types/ActionPermissionHelper';
import {BottomSheetRef} from '../../components/CBottomSheet/CustomBottomSheet';
import AddProductionCodeProperty from '../../components/BottomSheetContent/ProductionCode/AddProductionCodePropertyContent';
import {
  useGetProductionPropertiesMutation,
  useGetProductionPropertyByIdMutation,
} from '../../services/productionCodePropertyService';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import ProductionCodePropertyResponse from '../../dto/Response/ProductionCode/ProductionCodePropertyResponse';
import {ColBackground} from '../../constant/GlobalStyled';
import ColPlaceholder from '../../components/Placeholder/ColPlaceholder';
import UpdateProductionCodeProperty from '../../components/BottomSheetContent/ProductionCode/UpdateProductionCodePropertyContent';

export default function ProductionCodePropertyScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Productioncodepropertys'>) {
  const addProductionCodeRef = useRef<BottomSheetRef>(null);
  const updateProductionCodeRef = useRef<BottomSheetRef>(null);
  const canProductionCodeProperty = ActionPermissionHelper.canPermission(
    route.params.actionPermissions || [],
    'Productioncodepropertys',
  );
  const {productionCodeProperties} = useSelector(
    (state: RootState) => state.productionCodeProperty,
  );
  const [useGetProductionProperties] = useGetProductionPropertiesMutation();
  const [useGetProductionPropertyById] = useGetProductionPropertyByIdMutation();
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await useGetProductionProperties();
  };

  const handleOpenUpdateSheet = async (id: number) => {
    await useGetProductionPropertyById({
      id,
      openUpdateSheet: () => {
        updateProductionCodeRef.current?.open();
      },
    });
  };

  return (
    <Container header title="Ürün Özellikleri" goBackShow>
      <Container type="container" p={10}>
        <CustomFlatList
          data={productionCodeProperties}
          renderItem={({
            item,
            index,
          }: {
            item: ProductionCodePropertyResponse;
            index: number;
          }) => {
            return (
              <ColBackground key={index}>
                <ColPlaceholder
                  onPress={() => handleOpenUpdateSheet(item.id)}
                  name={item.name}
                />
              </ColBackground>
            );
          }}
        />
      </Container>
      {canProductionCodeProperty.canCreate && (
        <Container flex={0.1} type="container" p={10}>
          <Button
            testID="createProductionCodePropertyButton"
            text="Ürün Özellikleri Ekle"
            onPress={() => {
              addProductionCodeRef.current?.open();
            }}
          />
        </Container>
      )}
      {canProductionCodeProperty.canCreate && (
        <AddProductionCodeProperty sheetRef={addProductionCodeRef} />
      )}
      {canProductionCodeProperty.canUpdate && (
        <UpdateProductionCodeProperty
          canDelete={canProductionCodeProperty.canDelete}
          sheetRef={updateProductionCodeRef}
        />
      )}
    </Container>
  );
}
