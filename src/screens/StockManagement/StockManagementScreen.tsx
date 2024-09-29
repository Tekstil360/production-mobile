import React from 'react';
import Container from '../../components/Container/Container';
import CustomText from '../../components/Text/Text';
import ColPlaceholder from '../../components/Placeholder/ColPlaceholder';
import {RootStackParamList} from '../../types/Navigator';
import useHasPermission from '../../hooks/useHasPermission';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {ColBackground, ColTitle} from '../../constant/GlobalStyled';

export default function StockManagementScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Stockmanagements'>) {
  const canProductionCode = useHasPermission('Productioncodes');
  const canProductionCodeAttribute = useHasPermission(
    'Productioncodeattributes',
  );
  const canMaterial = useHasPermission('Materials');
  const canMaterialAttribute = useHasPermission('MaterialAttributes');
  return (
    <Container header title="Stok Yönetimi" goBackShow>
      <Container type="container" p={10}>
        {(canProductionCode || canProductionCodeAttribute) && (
          <>
            <ColTitle>
              <CustomText fontSizes="normal" color="primary" fontWeight="bold">
                Ürün Stok Yönetimi
              </CustomText>
            </ColTitle>
            <ColBackground>
              {canProductionCode && (
                <ColPlaceholder
                  onPress={() => navigation.navigate('Productioncodes', {})}
                  name="Ürün Kodları"
                />
              )}
              {canProductionCodeAttribute && (
                <ColPlaceholder
                  onPress={() =>
                    navigation.navigate('Productioncodeattributes', {})
                  }
                  name="Ürün Özellikleri"
                />
              )}
            </ColBackground>
          </>
        )}
        {(canMaterial || canMaterialAttribute) && (
          <>
            <ColTitle>
              <CustomText fontSizes="normal" color="primary" fontWeight="bold">
                Malzeme Stok Yönetimi
              </CustomText>
            </ColTitle>
            <ColBackground>
              {canMaterial && <ColPlaceholder name="Malzemeler" />}
              {canMaterialAttribute && (
                <ColPlaceholder name="Malzeme Özellikleri" />
              )}
            </ColBackground>
          </>
        )}
      </Container>
    </Container>
  );
}
