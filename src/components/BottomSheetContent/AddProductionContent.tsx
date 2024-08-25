import {View} from 'react-native';
import React from 'react';
import Container from '../Container/Container';

import Title from '../Title/Title';

import Button from '../Button/Button';

import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Input from '../Input/Input';
import styled from 'styled-components';

import {
  ProductionActions,
  StepType,
} from '../../store/features/productionReducer';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../store';

import {useCreateProductionMutation} from '../../services/productionService';
import CreateProductionErrorCard from '../../sections/Production/CreateProductionErrorCard';
import CreateProductionTransactionCard from '../../sections/Production/CreateProductionTransactionCard';
import CreateProductionNameCard from '../../sections/Production/CreateProductionNameCard';

interface AddFabricContentProps {
  onClose: () => void;
  onOpenProductionIconsSheet: () => void;
  onOpenTransactionIconsSheet: () => void;
  step: StepType;
}

export default function AddProductionContent({
  onClose,
  onOpenTransactionIconsSheet,
  onOpenProductionIconsSheet,
  step,
}: AddFabricContentProps) {
  const [useCreateProduction] = useCreateProductionMutation();
  const dispatch = useDispatch();
  const {createProductionRequest} = useSelector(
    (state: RootState) => state.production,
  );

  return (
    <Container type="container" bgColor="white" p={10}>
      {step === 'production' && (
        <>
          <Title
            title="Üretim Ekle"
            subTitle="Üretim eklemek için aşağıdaki bilgileri doldurunuz."
          />
          <BottomSheetScrollView>
            <CreateProductionNameCard
              onOpenProductionIconsSheet={() => {
                onOpenProductionIconsSheet();
              }}
            />
          </BottomSheetScrollView>
        </>
      )}
      {step === 'productionError' && (
        <>
          <Title
            title="Üretim Hataları"
            subTitle="Üretim sırasında oluşan hataları ekleyin."
          />
          <BottomSheetScrollView>
            {createProductionRequest.errors.map((el, index) => {
              return (
                <CreateProductionErrorCard
                  key={index}
                  indexNumber={index}
                  item={el}
                />
              );
            })}
          </BottomSheetScrollView>
        </>
      )}
      {step === 'transaction' && (
        <>
          <Title
            title="Üretim Süreçleri"
            subTitle="Üretim süreçlerini ekleyin."
          />
          <BottomSheetScrollView contentContainerStyle={{gap: 10}}>
            {createProductionRequest.transactions.map((el, index) => {
              return (
                <CreateProductionTransactionCard
                  key={index}
                  indexNumber={index}
                  item={el}
                  onOpenImageSheet={onOpenTransactionIconsSheet}
                />
              );
            })}
          </BottomSheetScrollView>
        </>
      )}

      <View style={{marginBottom: 25, flexDirection: 'row', gap: 10}}>
        {step != 'production' && (
          <ButtonItem>
            <Button
              outline
              onPress={() => {
                step === 'transaction' &&
                  dispatch(ProductionActions.setStep({step: 'production'}));
                step === 'productionError' &&
                  dispatch(ProductionActions.setStep({step: 'transaction'}));
              }}
              text={'Geri'}
              borderRadius={10}
            />
          </ButtonItem>
        )}
        <ButtonItem flex={1.5}>
          <Button
            onPress={() => {
              step === 'production' &&
                dispatch(ProductionActions.setStep({step: 'transaction'}));
              step === 'transaction' &&
                dispatch(ProductionActions.setStep({step: 'productionError'}));
              createProductionRequest.errors.length === 0 &&
                dispatch(
                  ProductionActions.setCreateProductionErrorRequest(
                    createProductionRequest.transactions.map(x => ({
                      name: `${x.name} Hatası`,
                    })),
                  ),
                );
              step === 'productionError' &&
                useCreateProduction(createProductionRequest)
                  .unwrap()
                  .then(e => {
                    console.log(e);
                    onClose();
                  })
                  .catch(e => {
                    console.log(e);
                  });
            }}
            text={step === 'productionError' ? 'Kaydet' : 'Devam Et'}
            borderRadius={10}
          />
        </ButtonItem>
      </View>
    </Container>
  );
}

const ButtonItem = styled(View)<{flex?: number}>`
  flex: ${({flex}) => flex || 1};
`;
