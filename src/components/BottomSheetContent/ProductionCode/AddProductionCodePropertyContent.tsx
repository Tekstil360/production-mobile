import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../CBottomSheet/CustomBottomSheet';
import Title from '../../Title/Title';
import Container from '../../Container/Container';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import {useCreateProductionPropertyMutation} from '../../../services/productionCodePropertyService';
import CreateProductionCodePropertyRequest from '../../../dto/Request/ProductionCode/CreateProductionCodePropertyRequest';
import CreateProductionCodePropertyItemRequest from '../../../dto/Request/ProductionCode/CreateProductionCodePropertyItemRequest';
import {
  BottomSheetScrollView,
  BottomSheetScrollViewMethods,
} from '@gorhom/bottom-sheet';
import IconButton from '../../Button/IconButton';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Center, Flex} from '../../../constant/GlobalStyled';
import Icon from '../../Icon/Icon';
import styled from 'styled-components';
import AlertDialog from '../../AlertDialog/AlertDialog';

interface AddProductionCodePropertyProps {
  sheetRef: React.RefObject<BottomSheetRef>;
}

export default function AddProductionCodeProperty(
  props: AddProductionCodePropertyProps,
) {
  const {sheetRef} = props;
  const scrollViewRef = React.useRef<BottomSheetScrollViewMethods>(null);
  const [useCreateProductionProperty] = useCreateProductionPropertyMutation();
  const [productionCodeProperty, setProductionCodeProperty] =
    useState<CreateProductionCodePropertyRequest>({
      name: '',
      productionPropertyItems: [{name: ''}],
    });

  const handleCreateProductionCodeProperty = (value: string) => {
    setProductionCodeProperty({
      ...productionCodeProperty,
      name: value,
    });
  };
  const handleProductionCodePropertyItem = (
    key: keyof CreateProductionCodePropertyItemRequest,
    value: string,
    index: number,
  ) => {
    const newProductionPropertyItems = [
      ...productionCodeProperty.productionPropertyItems,
    ];
    newProductionPropertyItems[index] = {
      ...newProductionPropertyItems[index],
      [key]: value,
    };
    setProductionCodeProperty({
      ...productionCodeProperty,
      productionPropertyItems: newProductionPropertyItems,
    });
  };
  const handleAddProductionCodePropertyItem = () => {
    setProductionCodeProperty({
      ...productionCodeProperty,
      productionPropertyItems: [
        ...productionCodeProperty.productionPropertyItems,
        {name: ''},
      ],
    });
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd();
    }, 100);
  };
  const handleDeleteProductionCodePropertyItem = (index: number) => {
    const newProductionPropertyItems = [
      ...productionCodeProperty.productionPropertyItems,
    ];
    newProductionPropertyItems.splice(index, 1);
    setProductionCodeProperty({
      ...productionCodeProperty,
      productionPropertyItems: newProductionPropertyItems,
    });
  };

  const handleSave = async () => {
    if (productionCodeProperty.name === '') {
      AlertDialog.warning('Özellik Adı Boş Olamaz');
    }
    let productionPropertyItems =
      productionCodeProperty.productionPropertyItems.filter(
        item => item.name !== '',
      );
    if (productionPropertyItems.length === 0) {
      AlertDialog.warning('Özellik Değeri Boş Olamaz');
    }
    await useCreateProductionProperty({
      ...productionCodeProperty,
      onClose: () => {
        sheetRef.current?.close();
        setProductionCodeProperty({
          name: '',
          productionPropertyItems: [{name: ''}],
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
          onChangeText={handleCreateProductionCodeProperty}
          value={productionCodeProperty.name}
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
          {productionCodeProperty.productionPropertyItems.map((item, index) => (
            <ProductionCodeContainer key={index}>
              <Flex>
                <Input
                  onChangeText={value =>
                    handleProductionCodePropertyItem('name', value, index)
                  }
                  value={item.name}
                  testID="productCodePropertyItemInput"
                  placeholder="Özellik Değeri"
                />
              </Flex>
              <DeleteButton
                activeOpacity={0.7}
                onPress={() => handleDeleteProductionCodePropertyItem(index)}>
                <Icon icon={faTrash} />
              </DeleteButton>
            </ProductionCodeContainer>
          ))}
          <Center>
            <IconButton
              onPress={handleAddProductionCodePropertyItem}
              icon={faPlus}></IconButton>
          </Center>
        </BottomSheetScrollView>
      </Container>
      <Container flex={0.2} p={10} type="container" bgColor="white">
        <Button
          onPress={handleSave}
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
const DeleteButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
`;
