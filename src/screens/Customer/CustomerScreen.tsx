import React from 'react';
import Container from '../../components/Container/Container';
import Button from '../../components/Button/Button';

import {BottomSheetRef} from '../../components/CBottomSheet/CustomBottomSheet';
import {
  useGetCustomerByIdMutation,
  useGetCustomersMutation,
} from '../../services/customerService';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import CustomerCard from '../../components/Card/CustomerCard';
import CustomerResponse from '../../dto/Response/Customer/CustomerResponse';

import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/Navigator';
import ActionPermissionHelper from '../../types/ActionPermissionHelper';
import AddCustomerContent from '../../sections/BottomSheetContent/Customer/AddCustomerContent';
import UpdateCustomerContent from '../../sections/BottomSheetContent/Customer/UpdateCustomerContent';

export default function CustomerScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Customers'>) {
  const canCustomer = ActionPermissionHelper.canPermission(
    route.params.actionPermissions,
  );
  const addCustomerRef = React.useRef<BottomSheetRef>(null);
  const updateCustomerRef = React.useRef<BottomSheetRef>(null);
  const customers = useSelector((state: RootState) => state.customer.customers);
  const [useGetCustomers] = useGetCustomersMutation();
  const [useGetCustomerById] = useGetCustomerByIdMutation();
  React.useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    await useGetCustomers();
  };

  const openUpdateCustomerSheet = async (id: number) => {
    const {error} = await useGetCustomerById(id);

    if (error) {
      console.error('Error', error);
      return;
    }
    updateCustomerRef.current?.open();
  };

  return (
    <Container goBackShow header title="Müşteriler">
      <Container type="container" p={10}>
        <CustomFlatList
          notFoundText="Müşteri bulunamadı."
          data={customers}
          renderItem={({
            item,
            index,
          }: {
            item: CustomerResponse;
            index: number;
          }) => (
            <CustomerCard
              onPress={() => {
                canCustomer.canUpdate && openUpdateCustomerSheet(item.id);
              }}
              key={index}
              item={item}
            />
          )}
        />
      </Container>
      {canCustomer.canCreate && (
        <Container flex={0.1} type="container" p={10}>
          <Button
            testID="createCustomerButton"
            text="Müşteri Ekle"
            onPress={() => {
              addCustomerRef.current?.open();
            }}
          />
        </Container>
      )}
      {canCustomer.canCreate && (
        <AddCustomerContent sheetRef={addCustomerRef} />
      )}
      {canCustomer.canUpdate && (
        <UpdateCustomerContent
          canDelete={canCustomer.canDelete}
          sheetRef={updateCustomerRef}
        />
      )}
    </Container>
  );
}
