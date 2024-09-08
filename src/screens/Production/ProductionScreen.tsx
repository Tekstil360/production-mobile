import React from 'react';
import Container from '../../components/Container/Container';
import ProductionCard from '../../components/Card/ProductionCard';
import CreateProduction from '../../sections/Production/CreateProduction';

import {useFocusEffect} from '@react-navigation/native';
import {useGetProductionsMutation} from '../../services/productionService';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/Navigator';

export default function ProductionScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const [getProductions] = useGetProductionsMutation();
  const {productions} = useSelector((state: RootState) => state.production);

  useFocusEffect(
    React.useCallback(() => {
      getProductions();
    }, []),
  );

  return (
    <Container header title="Üretimlerim" goBackShow>
      <Container type="container" p={10}>
        <CustomFlatList
          handleRefresh={getProductions}
          data={productions}
          renderItem={({item}: any) => (
            <ProductionCard
              onPress={() => {
                navigation.navigate('ProductionDetail', {
                  productionId: item.id,
                });
              }}
              production={item}
            />
          )}
        />
      </Container>
      <CreateProduction />
    </Container>
  );
}
