import React, {useState} from 'react';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import ProductionCard from '../../components/Card/ProductionCard';
import {useFocusEffect} from '@react-navigation/native';
import {useGetProductionsMutation} from '../../services/productionService';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../components/CBottomSheet/CustomBottomSheet';
import AddProductionContent from '../../components/BottomSheetContent/AddProductionContent';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {ProductionActions} from '../../store/features/productionReducer';
import Input from '../../components/Input/Input';
import {ProductionData} from '../../data/ProductionData';

import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import ProductionIconCard from '../../components/Card/ProductionIconCard';
import {TransactionIcons} from '../../constant/theme';
import {SvgXml} from 'react-native-svg';
import TransactionIconListContent from '../../components/BottomSheetContent/TransactionIconListContent';
import ProductionIconListContent from '../../components/BottomSheetContent/ProductionIconListContent';

export default function ProductionScreen() {
  const dispatch = useDispatch();
  const [getProductions] = useGetProductionsMutation();
  const {productions, step, selectedIndex} = useSelector(
    (state: RootState) => state.production,
  );
  const addFabricBottomSheetRef = React.useRef<BottomSheetRef>(null);
  const transctionIconsBottomSheetRef = React.useRef<BottomSheetRef>(null);
  const productionIconsBottomSheetRef = React.useRef<BottomSheetRef>(null);
  useFocusEffect(
    React.useCallback(() => {
      getProductions();
    }, []),
  );

  const getSnapPoints = () => {
    if (step === 'production') {
      return ['30%'];
    }
    if (step === 'productionError' || step === 'transaction') {
      return ['80%'];
    }
  };

  return (
    <Container header title="Üretimlerim" goBackShow>
      <Container type="container" p={10}>
        <Container>
          {productions.map((production, index) => (
            <ProductionCard key={index} production={production} />
          ))}
        </Container>
        <Button
          borderRadius={10}
          text="Üretim Ekle"
          onPress={() => {
            addFabricBottomSheetRef.current?.open();
          }}
        />
      </Container>

      <CustomBottomSheet
        close={() => {
          dispatch(ProductionActions.setStep({step: 'production'}));
        }}
        snapPoints={getSnapPoints()}
        ref={addFabricBottomSheetRef}>
        <AddProductionContent
          step={step}
          onOpenProductionIconsSheet={() => {
            productionIconsBottomSheetRef.current?.open();
          }}
          onOpenTransactionIconsSheet={() => {
            transctionIconsBottomSheetRef.current?.open();
          }}
          onClose={() => {
            dispatch(ProductionActions.resetCreateProductionRequest());
            addFabricBottomSheetRef.current?.close();
          }}
        />
      </CustomBottomSheet>
      <CustomBottomSheet
        snapPoints={['40%']}
        ref={productionIconsBottomSheetRef}>
        <ProductionIconListContent
          onPress={e => {
            dispatch(
              ProductionActions.handleCreateProductionRequest({
                key: 'icon',
                value: e,
              }),
            );
            productionIconsBottomSheetRef.current?.close();
          }}
        />
      </CustomBottomSheet>
      <CustomBottomSheet
        snapPoints={['55%']}
        ref={transctionIconsBottomSheetRef}>
        <TransactionIconListContent
          onPress={e => {
            dispatch(
              ProductionActions.handleCreateProductionTransactionRequest({
                key: 'icon',
                value: e,
                indexNumber: selectedIndex,
              }),
            );
            transctionIconsBottomSheetRef.current?.close();
          }}
        />
      </CustomBottomSheet>
    </Container>
  );
}
