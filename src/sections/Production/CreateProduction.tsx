import React from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../components/CBottomSheet/CustomBottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import {ProductionActions} from '../../store/features/productionReducer';
import {RootState} from '../../store';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import TransactionIconListContent from '../BottomSheetContent/TransactionIconListContent';
import ProductionIconListContent from '../BottomSheetContent/Production/ProductionIconListContent';
import AddProductionContent from '../BottomSheetContent/Production/AddProductionContent';

export default function CreateProduction() {
  const dispatch = useDispatch();
  const {step, selectedIndex} = useSelector(
    (state: RootState) => state.production,
  );
  const addFabricBottomSheetRef = React.useRef<BottomSheetRef>(null);
  const transctionIconsBottomSheetRef = React.useRef<BottomSheetRef>(null);
  const productionIconsBottomSheetRef = React.useRef<BottomSheetRef>(null);
  const getSnapPoints = () => {
    if (step === 'production') {
      return ['32%'];
    }
    if (step === 'productionError' || step === 'transaction') {
      return ['80%'];
    }
  };
  return (
    <>
      <Container flex={0.1} type="container" p={10}>
        <Button
          testID="createProductionButton"
          borderRadius={10}
          text="Üretim Ekle"
          onPress={() => {
            addFabricBottomSheetRef.current?.open();
          }}
        />
      </Container>
      <CustomBottomSheet
        close={() => {
          dispatch(ProductionActions.resetCreateProductionRequest());
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
    </>
  );
}
