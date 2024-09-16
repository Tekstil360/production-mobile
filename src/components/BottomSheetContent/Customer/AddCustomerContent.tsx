import React from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../CBottomSheet/CustomBottomSheet';
import Container from '../../Container/Container';
import Input from '../../Input/Input';
import Title from '../../Title/Title';
import Button from '../../Button/Button';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Flex, InputContainer, Row} from '../../../constant/GlobalStyled';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import CreateCustomerRequest from '../../../dto/Request/Customer/CreateCustomerRequest';
import {CustomerActions} from '../../../store/features/customerReducer';
import {useCreateCustomerMutation} from '../../../services/customerService';

interface AddCustomerContentProps {
  sheetRef: React.RefObject<BottomSheetRef>;
}
export default function AddCustomerContent(props: AddCustomerContentProps) {
  const {sheetRef} = props;
  const dispatch = useDispatch();
  const [useCreateCustomer] = useCreateCustomerMutation();
  const {createCustomer} = useSelector((state: RootState) => state.customer);

  const handleChange = (key: keyof CreateCustomerRequest, value: string) => {
    dispatch(CustomerActions.handleChangeCreateCustomer({key, value}));
  };

  const handleCreateCustomer = async () => {
    if (createCustomer) {
      await useCreateCustomer({
        ...createCustomer,
        onClose: () => sheetRef.current?.close(),
      });
    }
  };
  return (
    <CustomBottomSheet ref={sheetRef} snapPoints={['87%']}>
      <Container gap={10} bgColor="white" p={10} type="container">
        <Title
          title="Müşteri Ekle"
          subTitle="Müşteri bilgilerini girerek kaydedebilir ve sipariş oluştururken bu müşterileri seçebilirsiniz."
        />
        <BottomSheetScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 10}}>
          <InputContainer>
            <Flex>
              <Input
                value={createCustomer?.firstName}
                onChangeText={text => handleChange('firstName', text)}
                placeholder="Ad"
              />
            </Flex>
            <Flex>
              <Input
                value={createCustomer?.lastName}
                onChangeText={text => handleChange('lastName', text)}
                placeholder="Soyad"
              />
            </Flex>
          </InputContainer>
          <Input
            value={createCustomer?.title}
            onChangeText={text => handleChange('title', text)}
            placeholder="Ünvan"
          />
          <Row gap={10}>
            <Flex>
              <Input
                value={createCustomer?.taxNumber}
                onChangeText={text => handleChange('taxNumber', text)}
                placeholder="Vergi No"
              />
            </Flex>
            <Flex>
              <Input
                value={createCustomer?.taxOffice}
                onChangeText={text => handleChange('taxOffice', text)}
                placeholder="Vergi Dairesi"
              />
            </Flex>
          </Row>
          <Input
            value={createCustomer?.phone}
            onChangeText={text => handleChange('phone', text)}
            placeholder="Telefon"
          />
          <Input
            value={createCustomer?.email}
            onChangeText={text => handleChange('email', text)}
            placeholder="Adres"
          />
          <Row gap={10}>
            <Flex>
              <Input
                value={createCustomer?.city}
                onChangeText={text => handleChange('city', text)}
                placeholder="Şehir"
              />
            </Flex>
            <Flex>
              <Input
                value={createCustomer?.country}
                onChangeText={text => handleChange('country', text)}
                placeholder="Ülke"
              />
            </Flex>
          </Row>
          <Input
            value={createCustomer?.address}
            onChangeText={text => handleChange('address', text)}
            placeholder="E-posta"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            value={createCustomer?.notes}
            onChangeText={text => handleChange('notes', text)}
            placeholder="Not"
          />
        </BottomSheetScrollView>
      </Container>

      <Container bgColor="white" flex={0.2} type="container" p={10}>
        <Button onPress={handleCreateCustomer} text="Kaydet" />
      </Container>
    </CustomBottomSheet>
  );
}
