import {View} from 'react-native';
import React from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../CBottomSheet/CustomBottomSheet';
import Title from '../../Title/Title';
import Container from '../../Container/Container';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

import {
  BottomSheetScrollView,
  BottomSheetScrollViewMethods,
} from '@gorhom/bottom-sheet';
import IconButton from '../../Button/IconButton';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Center, Flex, Row} from '../../../constant/GlobalStyled';

import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {ProductionCodeAttributeActions} from '../../../store/features/productionCodeAttributeReducer';
import {ProductionCodeAttributeApi} from '../../../services/productionCodeAttributeService';
import AlertDialog from '../../AlertDialog/AlertDialog';

interface UpdateProductionCodeAttributeContentProps {
  sheetRef: React.RefObject<BottomSheetRef>;
  canDelete?: boolean;
}

export default function UpdateProductionCodeAttributeContent(
  props: UpdateProductionCodeAttributeContentProps,
) {
  const {sheetRef, canDelete} = props;
  const dispatch = useDispatch();
  const {updateAttributeForm} = useSelector(
    (x: RootState) => x.productionCodeAttribute,
  );
  const [useUpdateProduction] =
    ProductionCodeAttributeApi.useUpdateAttributeMutation();
  const [useDeleteVariant] =
    ProductionCodeAttributeApi.useDeleteAttributeMutation();
  const scrollViewRef = React.useRef<BottomSheetScrollViewMethods>(null);

  const handleUpdateAttribute = async () => {
    let entity = {
      ...updateAttributeForm,
      onClose: () => {
        sheetRef.current?.close();
      },
    };
    await useUpdateProduction(entity);
  };
  const handleDeleteAttribute = async () => {
    AlertDialog.showModal({
      title: 'Ürün Özelliğini Sil',
      message: 'Ürün özelliğini silmek istediğinize emin misiniz?',
      onConfirm: async () => {
        let entity = {
          id: updateAttributeForm.id,
          onClose: () => {
            sheetRef.current?.close();
          },
        };
        await useDeleteVariant(entity);
      },
      onCancel() {},
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
          value={updateAttributeForm.attributeName}
          onChangeText={text => {
            dispatch(
              ProductionCodeAttributeActions.setUpdateAttributeNames(text),
            );
          }}
          testID="productCodeAttributeInput"
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
          {updateAttributeForm?.attributeValues?.map((value, index) => {
            return (
              <ProductionCodeContainer key={index}>
                <Flex>
                  <Input
                    value={value.value}
                    onChangeText={text => {
                      dispatch(
                        ProductionCodeAttributeActions.updateAttributeValueInUpdateForm(
                          {
                            index,
                            key: 'value',
                            value: text,
                          },
                        ),
                      );
                    }}
                    testID="productCodeAttributeValueInput"
                    placeholder="Özellik Değeri"
                  />
                </Flex>
                <Center>
                  <IconButton
                    onPress={() => {
                      dispatch(
                        ProductionCodeAttributeActions.removeAttributeValueFromUpdateForm(
                          index,
                        ),
                      );
                    }}
                    icon={faTrash}></IconButton>
                </Center>
              </ProductionCodeContainer>
            );
          })}
          <Center>
            <IconButton
              onPress={() => {
                dispatch(
                  ProductionCodeAttributeActions.addAttributeValueToUpdateForm(),
                );
                let timeout = setTimeout(() => {
                  scrollViewRef.current?.scrollToEnd();
                  clearTimeout(timeout);
                });
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
                  handleDeleteAttribute();
                }}
                testID="DeleteProductCodeAttributeButton"
                text="Sil"
              />
            </Flex>
          )}
          <Flex>
            <Button
              onPress={handleUpdateAttribute}
              testID="updateeProductCodeAttributeButton"
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
