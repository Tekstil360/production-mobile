import {View} from 'react-native';
import React from 'react';

import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {
  ProductionActions,
  StepType,
} from '../../../store/features/productionReducer';
import {RootState} from '../../../store';
import {
  useCreateProductionMutation,
  useGetProductionsMutation,
} from '../../../services/productionService';

import CreateProductionNameCard from '../../../sections/Production/ProductionNameCard';

import CreateProductionTransactionCard from '../../../sections/Production/ProductionTransactionCard';

import {Flex} from '../../../constant/GlobalStyled';
import CreateProductionErrorCard from '../../../sections/Production/ProductionErrorCard';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import Container from '../../../components/Container/Container';
import Title from '../../../components/Title/Title';
import IconButton from '../../../components/Button/IconButton';
import Button from '../../../components/Button/Button';

interface AddFabricContentProps {
  handleOnPress?: () => void;
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
  handleOnPress,
}: AddFabricContentProps) {
  const [getProductions] = useGetProductionsMutation();
  const [useCreateProduction] = useCreateProductionMutation();
  const dispatch = useDispatch();
  const {createProductionRequest} = useSelector(
    (state: RootState) => state.production,
  );
  const {name, icon} = useSelector(
    (state: RootState) => state.production.createProductionRequest,
  );

  const handleSave = () => {
    if (handleOnPress) {
      handleOnPress();
      return;
    }
    useCreateProduction(createProductionRequest)
      .unwrap()
      .then(async e => {
        if (!e.isSuccess) {
          AlertDialog.showModal({
            isAutoClose: true,
            title: 'Hata',
            message: e?.exceptionMessage,
          });
        }
        const {data} = await getProductions();
        if (data?.isSuccess) {
          onClose();
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
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
              name={name}
              icon={icon}
              handleChangeName={(text: string) => {
                dispatch(
                  ProductionActions.handleCreateProductionRequest({
                    key: 'name',
                    value: text,
                  }),
                );
              }}
              onOpenProductionIconsSheet={() => {
                onOpenProductionIconsSheet();
              }}
            />
          </BottomSheetScrollView>
        </>
      )}

      {step === 'transaction' && (
        <>
          <Title
            title="Üretim Süreçleri"
            subTitle="Bu süreçler üretimdeki adımlar olabilir."
          />
          <BottomSheetScrollView contentContainerStyle={{gap: 10}}>
            {createProductionRequest.transactions.map((el, index) => {
              return (
                <CreateProductionTransactionCard
                  icon={el.icon}
                  name={el.name}
                  handleChangeName={(text: string) => {
                    dispatch(
                      ProductionActions.handleCreateProductionTransactionRequest(
                        {
                          key: 'name',
                          value: text,
                          indexNumber: index,
                        },
                      ),
                    );
                  }}
                  deleteTransaction={() => {
                    dispatch(ProductionActions.removeTransaction(index));
                  }}
                  setSelectedTransaction={() => {
                    dispatch(ProductionActions.setSelectedIndex(index));
                  }}
                  key={index}
                  indexNumber={index}
                  item={el}
                  onOpenImageSheet={onOpenTransactionIconsSheet}
                />
              );
            })}
            <View style={{alignItems: 'center'}}>
              <IconButton
                testID="addTransactionButton"
                onPress={() => {
                  dispatch(ProductionActions.addTransaction());
                }}
                icon={faPlus}
              />
            </View>
          </BottomSheetScrollView>
        </>
      )}
      {step === 'productionError' && (
        <>
          <Title
            title="Üretim Hataları"
            subTitle="Bu hatalar üretim süreçlerindeki hatalar olabilir."
          />
          <BottomSheetScrollView>
            {createProductionRequest.errors.map((el, index) => {
              return (
                <CreateProductionErrorCard
                  removeError={() => {
                    dispatch(ProductionActions.removeError(index));
                  }}
                  name={el.name}
                  handleChangeName={(text: string) => {
                    dispatch(
                      ProductionActions.handleCreateProductionErrorRequest({
                        key: 'name',
                        value: text,
                        indexNumber: index,
                      }),
                    );
                  }}
                  key={index}
                />
              );
            })}
            <View style={{alignItems: 'center'}}>
              <IconButton
                onPress={() => {
                  dispatch(ProductionActions.addError());
                }}
                icon={faPlus}
              />
            </View>
          </BottomSheetScrollView>
        </>
      )}

      <View style={{marginBottom: 25, flexDirection: 'row', gap: 10}}>
        {step != 'production' && (
          <Flex>
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
          </Flex>
        )}
        <Flex flex={1.5}>
          <Button
            testID="nextButton"
            disabled={
              step === 'production'
                ? !createProductionRequest.name
                : step === 'transaction'
                ? createProductionRequest.transactions.filter(
                    x => x.name.length != 0,
                  ).length === 0
                : step === 'productionError'
                ? createProductionRequest.errors.length === 0
                : false
            }
            onPress={() => {
              step === 'production' &&
                dispatch(ProductionActions.setStep({step: 'transaction'}));
              step === 'transaction' &&
                dispatch(ProductionActions.setStep({step: 'productionError'}));
              createProductionRequest.errors.length === 0 &&
                createProductionRequest.transactions.length != 0 &&
                dispatch(
                  ProductionActions.setCreateProductionErrorRequest(
                    createProductionRequest.transactions
                      .filter(x => x.name.length != 0)
                      .map(x => ({
                        name: `${x.name} Hatası`,
                      })),
                  ),
                );
              step === 'productionError' && handleSave();
            }}
            text={step === 'productionError' ? 'Kaydet' : 'Devam Et'}
            borderRadius={10}
          />
        </Flex>
      </View>
    </Container>
  );
}
