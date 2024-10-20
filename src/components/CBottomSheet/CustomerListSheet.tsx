import React from 'react';
import CustomBottomSheet, {BottomSheetRef} from './CustomBottomSheet';
import CustomFlatList from '../Flatlist/CustomFlatList';
import CustomText from '../Text/Text';
import Container from '../Container/Container';
import CustomerResponse from '../../dto/Response/Customer/CustomerResponse';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {TouchableOpacity, View} from 'react-native';
import {useGetCustomersMutation} from '../../services/customerService';

interface CustomerListSheetProps {
  sheetRef: React.RefObject<BottomSheetRef>;
  children?: React.ReactNode;
}
export default function CustomerListSheet(props: CustomerListSheetProps) {
  const {sheetRef, children} = props;
  const [useCustomers] = useGetCustomersMutation();
  const {customers} = useSelector((state: RootState) => state.customer);
  const loadCustomers = async () => {
    await useCustomers();
  };
  return (
    <CustomBottomSheet
      snapPoints={['80%']}
      ref={sheetRef}
      onLoad={loadCustomers}>
      {children}
      <Container bgColor="white" type="container" p={10}>
        <CustomFlatList
          filter={(item, search) => item.toString().includes(search)}
          isSearchable
          data={customers}
          renderItem={({
            item,
            index,
          }: {
            item: CustomerResponse;
            index: number;
          }) => (
            <Card
              onPress={() => {
                sheetRef.current?.close();
              }}
              activeOpacity={0.7}>
              <CustomText>{item.title}</CustomText>
            </Card>
          )}
        />
      </Container>
    </CustomBottomSheet>
  );
}
const Card = styled(TouchableOpacity)`
  padding: 10px;
  height: 50px;
  border-radius: 5px;
  background-color: #f5f5f5;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
