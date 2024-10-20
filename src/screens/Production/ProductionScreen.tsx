import React, {useEffect} from 'react';
import Container from '../../components/Container/Container';
import ProductionCard from '../../components/Card/ProductionCard';
import CreateProduction from '../../sections/Production/CreateProduction';

import {useFocusEffect} from '@react-navigation/native';
import {
  useGetProductionByIdMutation,
  useGetProductionsMutation,
} from '../../services/productionService';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/Navigator';
import UpdateProduction from '../../sections/Production/UpdateProduction';
import {BottomSheetRef} from '../../components/CBottomSheet/CustomBottomSheet';
import {ProductionActions} from '../../store/features/productionReducer';
import UpdateProductionRequest from '../../dto/Request/Production/UpdateProductionRequest';

export default function ProductionScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const dispatch = useDispatch();
  const [useProduction] = useGetProductionByIdMutation();
  const [getProductions] = useGetProductionsMutation();
  const sheetRef = React.useRef<BottomSheetRef>(null);
  const {productions} = useSelector((state: RootState) => state.production);

  useFocusEffect(
    React.useCallback(() => {
      getProductions();
    }, []),
  );

  const openUpdateProductionSheet = async (id: number) => {
    const {data} = await useProduction(id);
    if (data?.isSuccess) {
      let updateEntity: UpdateProductionRequest = data.entity;
      dispatch(
        ProductionActions.setUpdateProductionRequest({entity: updateEntity}),
      );
    }
    sheetRef.current?.open();
  };

  return (
    <Container header title="Üretimlerim" goBackShow>
      <Container type="container" p={10}>
        <CustomFlatList
          handleRefresh={getProductions}
          data={productions}
          renderItem={({item}: any) => (
            <ProductionCard
              onPress={() => openUpdateProductionSheet(item.id)}
              production={item}
            />
          )}
        />
      </Container>
      <CreateProduction />
      <UpdateProduction sheetRef={sheetRef} />
    </Container>
  );
}
