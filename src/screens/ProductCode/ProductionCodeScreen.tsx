import React from 'react';
import Container from '../../components/Container/Container';
import ActionPermissionHelper from '../../types/ActionPermissionHelper';
import Button from '../../components/Button/Button';

import {RootStackParamList} from '../../types/Navigator';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import AddProductionCodeContent from '../../components/BottomSheetContent/ProductionCode/AddProductionCodeContent';
import {BottomSheetRef} from '../../components/CBottomSheet/CustomBottomSheet';

export default function ProductionCodeScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Productioncodes'>) {
  const canProductionCode = ActionPermissionHelper.canPermission(
    route.params.actionPermissions || [],
    'Productioncodes',
  );
  const addProductionCodeSheetRef = React.useRef<BottomSheetRef>(null);
  return (
    <Container header title="Ürün Kodları" goBackShow>
      <Container type="container" p={10}></Container>
      {canProductionCode.canCreate && (
        <Container flex={0.1} type="container" p={10}>
          <Button
            testID="createProductionCodeButton"
            text="Ürün Kodu Ekle"
            onPress={() => {
              addProductionCodeSheetRef.current?.open();
            }}
          />
        </Container>
      )}
      <AddProductionCodeContent sheetRef={addProductionCodeSheetRef} />
    </Container>
  );
}
