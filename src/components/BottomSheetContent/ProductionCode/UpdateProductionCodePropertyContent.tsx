import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../CBottomSheet/CustomBottomSheet';
import Title from '../../Title/Title';
import Container from '../../Container/Container';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import {
  useDeleteProductionPropertyMutation,
  useUpdateProductionPropertyMutation,
} from '../../../services/productionCodePropertyService';
import {
  BottomSheetScrollView,
  BottomSheetScrollViewMethods,
} from '@gorhom/bottom-sheet';
import IconButton from '../../Button/IconButton';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Center, Flex, Row} from '../../../constant/GlobalStyled';
import Icon from '../../Icon/Icon';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {ProductionCodePropertyActions} from '../../../store/features/productionCodePropertyReducer';
import AlertDialog from '../../AlertDialog/AlertDialog';

interface UpdateProductionCodePropertyProps {
  sheetRef: React.RefObject<BottomSheetRef>;
  canDelete?: boolean;
}

export default function UpdateProductionCodeProperty(
  props: UpdateProductionCodePropertyProps,
) {
  const {sheetRef, canDelete} = props;
  const dispatch = useDispatch();
  const [useUpdateProductionProperty] = useUpdateProductionPropertyMutation();
  const [useDeleteProductionProperty] = useDeleteProductionPropertyMutation();
  const scrollViewRef = React.useRef<BottomSheetScrollViewMethods>(null);
  const {updateProductionCodeProperty} = useSelector(
    (state: RootState) => state.productionCodeProperty,
  );
  if (updateProductionCodeProperty === null) {
    return null;
  }
  const handleSave = async () => {
    await useUpdateProductionProperty(updateProductionCodeProperty);
  };
  const handleDelete = async () => {
    AlertDialog.showModal({
      title: 'Özellik Silme',
      message: 'Bu özelliği silmek istediğinize emin misiniz?',
      onCancel() {},
      onConfirm: async () => {
        await useDeleteProductionProperty({
          id: updateProductionCodeProperty.id,
          onClose: () => {
            sheetRef.current?.close();
          },
        });
      },
    });
  };
  return (
    <CustomBottomSheet ref={sheetRef} snapPoints={['85%']}>
      <Container gap={20} p={10} type="container" bgColor="white">
        <Title
          title="Ürün Özelliklerini Ekleyin"
          subTitle="Ürünün renk, beden gibi özelliklerini eklemek için aşağıdaki alanları doldurun."
        />
        <Input
          value={updateProductionCodeProperty.name}
          onChangeText={text => {
            dispatch(
              ProductionCodePropertyActions.handleChangeProductionCodePropertyName(
                text,
              ),
            );
          }}
          testID="productCodePropertyInput"
          placeholder="Özellik Adı"
        />
        <Title title="Özellik Değerleri" />
        <BottomSheetScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
          }}>
          {updateProductionCodeProperty?.productionPropertyItems.map(
            (item, index) => (
              <ProductionCodeContainer key={index}>
                <Flex>
                  <Input
                    value={item.name}
                    onChangeText={text => {
                      dispatch(
                        ProductionCodePropertyActions.handleChangeProductionCodePropertyItem(
                          {
                            key: 'name',
                            value: text,
                            index,
                          },
                        ),
                      );
                    }}
                    testID="productCodePropertyItemInput"
                    placeholder="Özellik Değeri"
                  />
                </Flex>
                <DeleteButton
                  activeOpacity={0.7}
                  onPress={() => {
                    dispatch(
                      ProductionCodePropertyActions.removeProductionCodePropertyItem(
                        {index},
                      ),
                    );
                  }}>
                  <Icon icon={faTrash} />
                </DeleteButton>
              </ProductionCodeContainer>
            ),
          )}
          <Center>
            <IconButton
              onPress={() => {
                dispatch(
                  ProductionCodePropertyActions.addUpdateProductionCodePropertyItem(),
                );
              }}
              icon={faPlus}></IconButton>
          </Center>
        </BottomSheetScrollView>
      </Container>
      <Container flex={0.2} p={10} type="container" bgColor="white">
        <Row gap={10}>
          {canDelete && (
            <Flex flex={0.5}>
              <Button
                outline
                onPress={() => {
                  handleDelete();
                }}
                testID="DeleteProductCodePropertyButton"
                text="Sil"
              />
            </Flex>
          )}
          <Flex>
            <Button
              onPress={handleSave}
              testID="updateeProductCodePropertyButton"
              text="Kaydet"
            />
          </Flex>
        </Row>
      </Container>
    </CustomBottomSheet>
  );
}
const ProductionCodeContainer = styled(View)`
  flex-direction: row;
  gap: 10px;
`;
const DeleteButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
`;
