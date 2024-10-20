import React from 'react';

import UpdateCustomerRequest from '../../../dto/Request/Customer/UpdateCustomerRequest';
import CustomerResponse from '../../../dto/Response/Customer/CustomerResponse';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Flex, InputContainer, Row} from '../../../constant/GlobalStyled';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {CustomerActions} from '../../../store/features/customerReducer';

import {
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} from '../../../services/customerService';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../../components/CBottomSheet/CustomBottomSheet';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import Container from '../../../components/Container/Container';
import Title from '../../../components/Title/Title';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

interface UpdateCustomerContentProps {
  sheetRef: React.RefObject<BottomSheetRef>;
  canDelete?: boolean;
}
export default function UpdateCustomerContent(
  props: UpdateCustomerContentProps,
) {
  const {sheetRef, canDelete} = props;
  const dispatch = useDispatch();
  const [useUpdateCustomer] = useUpdateCustomerMutation();
  const [useDeleteCustomer] = useDeleteCustomerMutation();
  const {customer} = useSelector((state: RootState) => state.customer);

  const handleChange = (key: keyof CustomerResponse, value: string) => {
    dispatch(CustomerActions.handleChangeCustomer({key, value}));
  };

  const handleUpdateCustomer = async () => {
    if (customer) {
      let updateCustomer: UpdateCustomerRequest = customer;
      await useUpdateCustomer({
        ...updateCustomer,
        onClose: () => sheetRef.current?.close(),
      });
    }
  };
  const handleDeleteCustomer = async () => {
    AlertDialog.showModal({
      title: 'Müşteri Sil',
      message: 'Müşteriyi silmek istediğinize emin misiniz?',
      async onConfirm() {
        let request = {
          id: customer?.id || 0,
          onClose: () => sheetRef.current?.close(),
        };
        await useDeleteCustomer(request);
      },
      onCancel() {},
    });
  };
  return (
    <CustomBottomSheet
      close={() => {
        dispatch(CustomerActions.clearCustomer());
      }}
      ref={sheetRef}
      snapPoints={['87%']}>
      <Container gap={10} bgColor="white" p={10} type="container">
        <Title
          title="Müşteri Düzenle"
          subTitle="Müşteri bilgilerini düzenleyebilirsiniz"
        />
        <BottomSheetScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 10}}>
          <InputContainer>
            <Flex>
              <Input
                value={customer?.firstName}
                onChangeText={text => handleChange('firstName', text)}
                placeholder="Ad"
              />
            </Flex>
            <Flex>
              <Input
                value={customer?.lastName}
                onChangeText={text => handleChange('lastName', text)}
                placeholder="Soyad"
              />
            </Flex>
          </InputContainer>
          <Input
            value={customer?.title}
            onChangeText={text => handleChange('title', text)}
            placeholder="Ünvan"
          />
          <Row gap={10}>
            <Flex>
              <Input
                value={customer?.taxNumber}
                onChangeText={text => handleChange('taxNumber', text)}
                placeholder="Vergi No"
              />
            </Flex>
            <Flex>
              <Input
                value={customer?.taxOffice}
                onChangeText={text => handleChange('taxOffice', text)}
                placeholder="Vergi Dairesi"
              />
            </Flex>
          </Row>
          <Input
            value={customer?.phone}
            onChangeText={text => handleChange('phone', text)}
            placeholder="Telefon"
          />
          <Input
            value={customer?.email}
            onChangeText={text => handleChange('email', text)}
            placeholder="Adres"
          />
          <Row gap={10}>
            <Flex>
              <Input
                value={customer?.city}
                onChangeText={text => handleChange('city', text)}
                placeholder="Şehir"
              />
            </Flex>
            <Flex>
              <Input
                value={customer?.country}
                onChangeText={text => handleChange('country', text)}
                placeholder="Ülke"
              />
            </Flex>
          </Row>
          <Input
            value={customer?.address}
            onChangeText={text => handleChange('address', text)}
            placeholder="E-posta"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            value={customer?.notes}
            onChangeText={text => handleChange('notes', text)}
            placeholder="Not"
          />
        </BottomSheetScrollView>
      </Container>

      <Container bgColor="white" flex={0.2} type="container" p={10}>
        <Row gap={10}>
          {canDelete && (
            <Flex flex={0.5}>
              <Button onPress={handleDeleteCustomer} text="Sil" outline />
            </Flex>
          )}
          <Flex>
            <Button onPress={handleUpdateCustomer} text="Kaydet" />
          </Flex>
        </Row>
      </Container>
    </CustomBottomSheet>
  );
}
