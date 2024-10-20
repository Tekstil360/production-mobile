import {View} from 'react-native';
import React from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../components/CBottomSheet/CustomBottomSheet';
import Container from '../../components/Container/Container';
import Title from '../../components/Title/Title';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import ProductionNameCard from './ProductionNameCard';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {
  useDeleteProductionMutation,
  useUpdateProductionMutation,
} from '../../services/productionService';
import {ProductionActions} from '../../store/features/productionReducer';
import {Flex} from '../../constant/GlobalStyled';
import Button from '../../components/Button/Button';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import IconButton from '../../components/Button/IconButton';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import UpdateProductionTransactionCard from './ProductionTransactionCard';
import UpdateProductionErrorCard from './ProductionErrorCard';
import {BottomSheetScrollViewMethods} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import TransactionIconListContent from '../BottomSheetContent/TransactionIconListContent';
import ProductionIconListContent from '../BottomSheetContent/Production/ProductionIconListContent';
interface UpdateProductionProps {
  sheetRef: React.RefObject<BottomSheetRef>;
}
export default function UpdateProduction(props: UpdateProductionProps) {
  const {sheetRef} = props;
  const dispatch = useDispatch();
  const transctionIconsBottomSheetRef = React.useRef<BottomSheetRef>(null);
  const productionIconsBottomSheetRef = React.useRef<BottomSheetRef>(null);

  const transactionScrollViewRef =
    React.useRef<BottomSheetScrollViewMethods>(null);
  const errorScrollViewRef = React.useRef<BottomSheetScrollViewMethods>(null);

  const [useUpdateProduction] = useUpdateProductionMutation();
  const [useDeleteProduction] = useDeleteProductionMutation();
  const {
    updateProductionRequest: updateProduction,
    step,
    selectedIndex,
  } = useSelector((x: RootState) => x.production);

  const getSnapPoints = () => {
    if (step === 'production') {
      return ['32%'];
    }
    if (step === 'productionError' || step === 'transaction') {
      return ['80%'];
    }
  };
  const handleUpdateProduction = async () => {
    if (updateProduction) {
      let withOnClose = {
        ...updateProduction,
        onClose: () => sheetRef.current?.close(),
      };
      await useUpdateProduction(withOnClose);
    }
  };
  const handleDeleteProduction = (id: number) => {
    AlertDialog.showModal({
      title: 'Üretimi Sil',
      message: 'Üretimi silmek istediğinize emin misiniz?',
      onCancel() {},
      async onConfirm() {
        AlertDialog.showLoading();
        const {data} = await useDeleteProduction(id);
        AlertDialog.hideLoading();
        if (data?.isSuccess) {
          dispatch(ProductionActions.deleteProductionById(id));
          sheetRef.current?.close();
          AlertDialog.showModal({
            type: 'success',
            message: 'Üretim başarıyla silindi.',
          });
        } else {
          AlertDialog.showModal({
            type: 'error',
            message: 'Üretim silinirken bir hata oluştu.',
          });
        }
      },
    });
  };
  return (
    <>
      <CustomBottomSheet
        snapPoints={getSnapPoints()}
        ref={sheetRef}
        close={() => {
          dispatch(ProductionActions.setStep({step: 'production'}));
        }}>
        <Container type="container" bgColor="white" p={10}>
          {step === 'production' && (
            <>
              <Title
                title="Üretim Düzenle"
                subTitle="Üretim bilgilerini düzenleyebilirsiniz."
              />
              <BottomSheetScrollView>
                <ProductionNameCard
                  name={updateProduction?.name || ''}
                  icon={updateProduction?.icon || ''}
                  handleChangeName={text => {
                    dispatch(
                      ProductionActions.handleUpdateProductionRequest({
                        key: 'name',
                        value: text,
                      }),
                    );
                  }}
                  onOpenProductionIconsSheet={() => {
                    productionIconsBottomSheetRef.current?.open();
                  }}
                />
              </BottomSheetScrollView>
            </>
          )}
          {step === 'transaction' && (
            <>
              <Title
                title="Üretim Süreçlerini Düzenle"
                subTitle="Üretim süreçlerini düzenleyebilirsiniz."
              />
              <BottomSheetScrollView
                ref={transactionScrollViewRef}
                contentContainerStyle={{gap: 10}}
                contentInset={{bottom: 40}}
                showsVerticalScrollIndicator={false}>
                {updateProduction?.transactions.map((el, index) => {
                  return (
                    <UpdateProductionTransactionCard
                      icon={el.icon}
                      name={el.name}
                      handleChangeName={(text: string) => {
                        dispatch(
                          ProductionActions.handleUpdateProductionTransactionRequest(
                            {
                              key: 'name',
                              value: text,
                              indexNumber: index,
                            },
                          ),
                        );
                      }}
                      deleteTransaction={() => {
                        dispatch(
                          ProductionActions.removeUpdateTransaction(index),
                        );
                      }}
                      setSelectedTransaction={() => {
                        dispatch(ProductionActions.setSelectedIndex(index));
                      }}
                      key={index}
                      indexNumber={index}
                      item={el}
                      onOpenImageSheet={() => {
                        transctionIconsBottomSheetRef.current?.open();
                      }}
                    />
                  );
                })}
                <View style={{alignItems: 'center'}}>
                  <IconButton
                    testID="addTransactionButton"
                    onPress={() => {
                      dispatch(ProductionActions.addUpdateTransaction());
                      transactionScrollViewRef.current?.scrollToEnd({
                        animated: true,
                      });
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
                title="Üretim Hatalarını Düzenle"
                subTitle="Üretim hatalarını düzenleyebilirsiniz."
              />
              <BottomSheetScrollView
                ref={errorScrollViewRef}
                contentInset={{bottom: 40}}
                showsVerticalScrollIndicator={false}>
                {updateProduction?.errors.map((el, index) => {
                  return (
                    <UpdateProductionErrorCard
                      removeError={() => {
                        dispatch(ProductionActions.removeUpdateError(index));
                      }}
                      name={el.name}
                      handleChangeName={(text: string) => {
                        dispatch(
                          ProductionActions.handleUpdateProductionErrorRequest({
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
                      dispatch(ProductionActions.addUpdateError());
                      errorScrollViewRef.current?.scrollToEnd({
                        animated: true,
                      });
                    }}
                    icon={faPlus}
                  />
                </View>
              </BottomSheetScrollView>
            </>
          )}
          <View style={{marginBottom: 25, flexDirection: 'row', gap: 10}}>
            {step == 'production' ? (
              <Flex>
                <Button
                  outline
                  onPress={() =>
                    handleDeleteProduction(Number(updateProduction?.id))
                  }
                  text={'Sil'}
                  borderRadius={10}
                />
              </Flex>
            ) : (
              <Flex>
                <Button
                  outline
                  onPress={() => {
                    step === 'transaction' &&
                      dispatch(ProductionActions.setStep({step: 'production'}));
                    step === 'productionError' &&
                      dispatch(
                        ProductionActions.setStep({step: 'transaction'}),
                      );
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
                  step === 'production' ? !updateProduction?.name : false
                }
                onPress={() => {
                  step === 'production' &&
                    dispatch(ProductionActions.setStep({step: 'transaction'}));
                  step === 'transaction' &&
                    dispatch(
                      ProductionActions.setStep({step: 'productionError'}),
                    );
                  step === 'productionError' && handleUpdateProduction();
                }}
                text={step === 'productionError' ? 'Kaydet' : 'Devam Et'}
                borderRadius={10}
              />
            </Flex>
          </View>
        </Container>
      </CustomBottomSheet>
      <CustomBottomSheet
        snapPoints={['40%']}
        ref={productionIconsBottomSheetRef}>
        <ProductionIconListContent
          onPress={e => {
            dispatch(
              ProductionActions.handleUpdateProductionRequest({
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
              ProductionActions.handleUpdateProductionTransactionRequest({
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
