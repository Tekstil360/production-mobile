import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../components/CBottomSheet/CustomBottomSheet';
import {ProductionActions} from '../../store/features/productionReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import AddProductionContent from '../BottomSheetContent/Production/AddProductionContent';

interface CreateMultipleProductionProps {
  addFabricBottomSheetRef: React.RefObject<BottomSheetRef>;
  transactionIconsBottomSheetRef: React.RefObject<BottomSheetRef>;
  productionIconsBottomSheetRef: React.RefObject<BottomSheetRef>;
}
export default function CreateMultipleProduction(
  props: CreateMultipleProductionProps,
) {
  const dispatch = useDispatch();
  const {
    addFabricBottomSheetRef,
    transactionIconsBottomSheetRef,
    productionIconsBottomSheetRef,
  } = props;
  const {step, createProductionRequest} = useSelector(
    (state: RootState) => state.production,
  );

  useEffect(() => {
    addFabricBottomSheetRef.current?.open();
  }, [addFabricBottomSheetRef]);
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
      <CustomBottomSheet
        close={() => {
          dispatch(ProductionActions.resetCreateProductionRequest());
        }}
        snapPoints={getSnapPoints()}
        ref={addFabricBottomSheetRef}>
        <AddProductionContent
          handleOnPress={() => {
            dispatch(ProductionActions.addCreateMultipleProductionRequest());
            addFabricBottomSheetRef.current?.close();
          }}
          step={step}
          onOpenProductionIconsSheet={() => {
            productionIconsBottomSheetRef.current?.open();
          }}
          onOpenTransactionIconsSheet={() => {
            transactionIconsBottomSheetRef.current?.open();
          }}
          onClose={() => {
            dispatch(ProductionActions.resetCreateProductionRequest());
            addFabricBottomSheetRef.current?.close();
          }}
        />
      </CustomBottomSheet>
    </>
  );
}
