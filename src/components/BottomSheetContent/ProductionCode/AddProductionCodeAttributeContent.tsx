import {View} from 'react-native';
import React, {useEffect} from 'react';
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
import {Center, Flex} from '../../../constant/GlobalStyled';

import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {ProductionCodeAttributeActions} from '../../../store/features/productionCodeAttributeReducer';
import {ProductionCodeAttributeApi} from '../../../services/productionCodeAttributeService';

interface AddProductionCodeAttributeContentProps {
  sheetRef: React.RefObject<BottomSheetRef>;
}

export default function AddProductionCodeAttributeContent(
  props: AddProductionCodeAttributeContentProps,
) {
  const dispatch = useDispatch();
  const [useGetAttributes] =
    ProductionCodeAttributeApi.useGetAttributesMutation();
  const {createAttributeForm} = useSelector(
    (state: RootState) => state.productionCodeAttribute,
  );
  const [useCreateAttribute] =
    ProductionCodeAttributeApi.useCreateAttributeMutation();
  const {sheetRef} = props;
  const scrollViewRef = React.useRef<BottomSheetScrollViewMethods>(null);

  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    await useGetAttributes();
  };

  const createAttribute = async () => {
    let entity = {
      ...createAttributeForm,
      onClose: () => {
        sheetRef.current?.close();
      },
    };
    await useCreateAttribute(entity);
  };
  return (
    <CustomBottomSheet ref={sheetRef} snapPoints={['85%']}>
      <Container gap={20} p={10} type="container" bgColor="white">
        <Title
          title="Ürün Özelliklerini Ekleyin"
          subTitle="Ürünün renk, beden gibi özelliklerini eklemek için aşağıdaki alanları doldurun."
        />
        <Input
          value={createAttributeForm.attributeName}
          onChangeText={text =>
            dispatch(ProductionCodeAttributeActions.setAttributeNames(text))
          }
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
          {createAttributeForm.attributeValues.map((item, index) => (
            <ProductionCodeContainer key={index}>
              <Flex>
                <Input
                  value={item.value}
                  onChangeText={text => {
                    dispatch(
                      ProductionCodeAttributeActions.updateAttributeValueInCreateForm(
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
                      ProductionCodeAttributeActions.removeAttributeValueFromCreateForm(
                        index,
                      ),
                    );
                  }}
                  icon={faTrash}></IconButton>
              </Center>
            </ProductionCodeContainer>
          ))}
          <Center>
            <IconButton
              onPress={() => {
                dispatch(
                  ProductionCodeAttributeActions.addAttributeValueToCreateForm(),
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
        <Button
          onPress={async () => {
            await createAttribute();
          }}
          testID="createProductCodeButton"
          text="Oluştur"
        />
      </Container>
    </CustomBottomSheet>
  );
}
const ProductionCodeContainer = styled(View)`
  flex-direction: row;
  gap: 10px;
`;
