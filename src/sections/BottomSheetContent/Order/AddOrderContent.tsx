import React, {useRef} from 'react';

import Title from '../../../components/Title/Title';
import Container from '../../../components/Container/Container';
import InputPlaceholder from '../../../components/Placeholder/InputPlaceholder';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../../components/CBottomSheet/CustomBottomSheet';
import CustomerListSheet from '../../../components/CBottomSheet/CustomerListSheet';
import ProductionCodeListSheet from '../../../components/CBottomSheet/ProductionCodeListSheet';
import Button from '../../../components/Button/Button';

import CustomText from '../../../components/Text/Text';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {Flex, Row} from '../../../constant/GlobalStyled';
import Input from '../../../components/Input/Input';
interface AddOrderContentProps {
  sheetRef: React.RefObject<BottomSheetRef>;
}
export default function AddOrderContent(props: AddOrderContentProps) {
  const {sheetRef} = props;
  const selectedProductionlistRef = useRef<BottomSheetRef>(null);
  const selectedCustomerlistRef = useRef<BottomSheetRef>(null);
  const [addCustomerVisible, setAddCustomerVisible] = React.useState(false);
  return (
    <>
      <CustomBottomSheet snapPoints={['90%']} ref={sheetRef} close={() => {}}>
        <Title
          title="Sipariş Ekle"
          subTitle="Sipariş bilgilerini girerek sipariş ekleyebilirsiniz."
        />
        <Container bgColor="white" type="container" p={10}>
          {!addCustomerVisible ? (
            <InputPlaceholder
              onPress={() => {
                selectedCustomerlistRef.current?.open();
              }}
              placeholder="Müşteri Seç"
            />
          ) : (
            <Row gap={10}>
              <Flex>
                <Input placeholder="Ad" />
              </Flex>
              <Flex>
                <Input placeholder="Soyad" />
              </Flex>
            </Row>
          )}
          <AddCustomerButton
            onPress={() => {
              setAddCustomerVisible(!addCustomerVisible);
            }}>
            <CustomText sx={{textDecorationLine: 'underline'}}>
              {addCustomerVisible ? 'Müşteri Seç.' : 'Yeni Müşteri Oluştur.'}
            </CustomText>
          </AddCustomerButton>
          <InputPlaceholder placeholder="Sipariş Tarihi" />
          <Title
            title="Sipariş Detayları"
            subTitle="Ürün kodu, adet ve fiyat bilgilerini girerek sipariş detayı ekleyebilirsiniz."
          />
          <InputPlaceholder
            onPress={() => {
              selectedProductionlistRef.current?.open();
            }}
            placeholder="Ürün Seç"
          />
        </Container>
        <Container flex={0.2} type="container" p={10} bgColor="white">
          <Button borderRadius={10} text="Oluştur" />
        </Container>
      </CustomBottomSheet>
      <CustomerListSheet sheetRef={selectedCustomerlistRef}>
        <Title title="Müşteri Seç" />
      </CustomerListSheet>
      <ProductionCodeListSheet
        showVariants
        sheetRef={selectedProductionlistRef}>
        <Title title="Ürün Seç" />
      </ProductionCodeListSheet>
    </>
  );
}
const AddCustomerButton = styled(TouchableOpacity)`
  margin-top: 10px;
  margin-bottom: 10px;
`;
