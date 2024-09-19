import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../components/Container/Container';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/Navigator';
import ActionPermissionHelper from '../../types/ActionPermissionHelper';
import useHasPermission from '../../hooks/useHasPermission';
import Button from '../../components/Button/Button';

export default function StockManagementScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'StockManagements'>) {
  let filteredProductionCodes = route.params.actionPermissions.filter(x =>
    x.action.includes('Productioncodes'),
  );
  let filteredStockManagement = route.params.actionPermissions.filter(x =>
    x.action.includes('StockManagement'),
  );
  const canProductionCode = ActionPermissionHelper.canPermission(
    filteredProductionCodes,
    'Productioncodes',
  );
  const canStockManagement = ActionPermissionHelper.canPermission(
    filteredStockManagement,
    'StockManagement',
  );
  return (
    <Container header title="Stok Yönetimi" goBackShow>
      <Container type="container" p={10}>
        {canProductionCode.canPage && (
          <Button
            text="Ürün Kodlarım"
            onPress={() => {
              navigation.navigate('Productioncodes');
            }}
          />
        )}
      </Container>
    </Container>
  );
}
