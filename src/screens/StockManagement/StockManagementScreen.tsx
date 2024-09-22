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
  const canProductionCodeProperty = useHasPermission('Productioncodepropertys');
  const canMaterial = useHasPermission('Materials');
  const canMaterialProperty = useHasPermission('Materialpropertys');
  return (
    <Container header title="Stok Yönetimi" goBackShow>
      <Container type="container" p={10}>
        {(canProductionCode || canProductionCodeProperty) && (
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
              {canProductionCodeProperty && (
                <ColPlaceholder
                  onPress={() =>
                    navigation.navigate('Productioncodepropertys', {})
                  }
                  name="Ürün Özellikleri"
                />
              )}
            </ColBackground>
          </>
        )}
        {(canMaterial || canMaterialProperty) && (
          <>
            <ColTitle>
              <CustomText fontSizes="normal" color="primary" fontWeight="bold">
                Malzeme Stok Yönetimi
              </CustomText>
            </ColTitle>
            <ColBackground>
              {canMaterial && <ColPlaceholder name="Malzemeler" />}
              {canMaterialProperty && (
                <ColPlaceholder name="Malzeme Özellikleri" />
              )}
            </ColBackground>
          </>
        )}
      </Container>
    </Container>
  );
}
