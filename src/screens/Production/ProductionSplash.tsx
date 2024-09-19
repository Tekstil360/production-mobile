import {View, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomText from '../../components/Text/Text';
import styled from 'styled-components';

import Button from '../../components/Button/Button';
import {SIZES} from '../../constant/theme';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../components/CBottomSheet/CustomBottomSheet';
import Input from '../../components/Input/Input';
import Container from '../../components/Container/Container';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/Navigator';
import {CommonActions} from '@react-navigation/native';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {useCreateMultipleProductionMutation} from '../../services/productionService';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import ProductionIconCard from '../../components/Card/ProductionIconCard';
import {ProductionIcons} from '../../data/IconData';
import CreateMultipleProduction from '../../sections/Production/CreateMultipleProduction';
import {useDispatch, useSelector} from 'react-redux';
import {ProductionActions} from '../../store/features/productionReducer';
import ProductionIconListContent from '../../components/BottomSheetContent/Production/ProductionIconListContent';
import TransactionIconListContent from '../../components/BottomSheetContent/TransactionIconListContent';
import {RootState} from '../../store';
import {useGetUserPermissionMutation} from '../../services/userService';

export default function ProductionSplash(
  props: NativeStackScreenProps<RootStackParamList, 'ProductionSplash'>,
) {
  const dispatch = useDispatch();
  const {selectedIndex, createMultipleProductionRequest} = useSelector(
    (state: RootState) => state.production,
  );
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const formContainerRef = useRef<FormContainerRef>(null);

  const addMultipleProductionRef = useRef<BottomSheetRef>(null);
  const productionIconsBottomSheetRef = useRef<BottomSheetRef>(null);
  const transctionIconsBottomSheetRef = useRef<BottomSheetRef>(null);
  const [useUserPermission] = useGetUserPermissionMutation();
  const [productionList, setProductionList] =
    useState<Array<{icon: string; key: string; name: string}>>(ProductionIcons);
  const [productionName, setProductionName] = useState('');
  const [loading, setLoading] = useState(false);

  const [createProductions] = useCreateMultipleProductionMutation();
  const handleAddProduction = () => {
    let result = formContainerRef.current?.validate({
      productionName: 'Üretim Adı Boş Bırakılamaz.',
    });
    let checkName = productionList.some(x => x.name === productionName);
    if (checkName) {
      AlertDialog.showModal({
        title: 'Hata',
        message: 'Bu isimde bir ürün zaten var. Lütfen başka bir isim girin.',
      });
      return;
    }
    if (result) {
      let temp = [...productionList];
      let entity = {
        name: productionName,
        key: 'default',
        icon: '',
        deleteIcon: true,
        xmlSvg: '',
        selected: true,
      };
      temp.push(entity);
      setProductionName('');
      setProductionList(temp);
      bottomSheetRef.current?.close();
    }
  };
  const nextStep = () => {
    setLoading(true);
    createProductions(createMultipleProductionRequest)
      .unwrap()
      .then(async e => {
        if (e.isSuccess) {
          await useUserPermission();
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'DrawerNavigator',
                  params: {
                    welcome: true,
                  },
                },
              ],
            }),
          );
        } else {
          AlertDialog.showModal({
            title: 'Hata',
            message:
              e.exceptionMessage ||
              'Ürünler eklenirken bir hata oluştu. Lütfen tekrar deneyin veya destek alın.',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <ProductionPage>
      <Content>
        <TitleContainer>
          <Title>Üretim Ürünlerini Seçin</Title>
          <SubTitle>
            Üretmek istediğiniz ürünleri listemizden seçin veya kendi
            ürünlerinizi ekleyin.
          </SubTitle>
        </TitleContainer>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <ProductionContainer>
            {productionList.map((item: any, index) => {
              let icon = ProductionIcons.find(x => x.key === item.key);
              let findToSelected = createMultipleProductionRequest.find(
                x => x.name === item.name,
              );
              return (
                <ProductionIconCard
                  editIcon={findToSelected ? true : false}
                  editProduction={() => {
                    if (findToSelected) {
                      dispatch(
                        ProductionActions.setCreateProductionRequest({
                          entity: findToSelected,
                        }),
                      );
                      addMultipleProductionRef.current?.open();
                    }
                  }}
                  iconHeight={40}
                  iconWidth={40}
                  selected={findToSelected ? true : false}
                  onPress={() => {
                    if (findToSelected) {
                      let temp = [...createMultipleProductionRequest];
                      temp = temp.filter(x => x.name !== item.name);

                      dispatch(
                        ProductionActions.setCreateMultipleProductionRequest({
                          entity: temp,
                        }),
                      );
                    } else {
                      if (item.name) {
                        dispatch(
                          ProductionActions.handleCreateProductionRequest({
                            key: 'name',
                            value: item.name,
                          }),
                        );
                        dispatch(
                          ProductionActions.handleCreateProductionRequest({
                            key: 'icon',
                            value: icon?.key,
                          }),
                        );
                        addMultipleProductionRef.current?.open();
                      }
                    }
                  }}
                  deleteProduction={() => {
                    setProductionList(
                      productionList.filter((x, i) => i !== index),
                    );
                  }}
                  deleteIcon={item.deleteIcon || false}
                  title={item.name}
                  key={index}
                  xmlSvg={icon?.icon}
                />
              );
            })}
          </ProductionContainer>
        </ScrollView>
        <ButtonContainer>
          <View style={{flex: 1}}>
            <Button
              outline
              onPress={() => {
                bottomSheetRef.current?.open();
              }}
              borderRadius={5}
              text="Yeni Ürün Ekle"
            />
          </View>
          {createMultipleProductionRequest.length > 0 && (
            <View style={{flex: 1}}>
              <Button
                onPress={nextStep}
                loading={loading}
                borderRadius={5}
                text="Devam Et"
              />
            </View>
          )}
        </ButtonContainer>
      </Content>
      <CustomBottomSheet ref={bottomSheetRef}>
        <Container type="container" bgColor="white" px={10} gap={10}>
          <BottomSheetView style={{minHeight: 100}}>
            <TitleContainer>
              <Title>Yeni Ürün Ekle</Title>
              <SubTitle>
                Eklediğiniz ürünün resmini daha sonra düzenleyebilir veya
                ekleyebilirsiniz.
              </SubTitle>
            </TitleContainer>
            <FormContainer formContainerRef={formContainerRef}>
              <Input
                required
                id="productionName"
                value={productionName}
                onChangeText={value => setProductionName(value)}
                placeholder="Üretim Adı"
              />
            </FormContainer>

            <View style={{marginTop: 20, marginBottom: 40}}>
              <Button
                onPress={handleAddProduction}
                borderRadius={10}
                text="Ürün Ekle"
              />
            </View>
          </BottomSheetView>
        </Container>
      </CustomBottomSheet>
      <CreateMultipleProduction
        transactionIconsBottomSheetRef={transctionIconsBottomSheetRef}
        productionIconsBottomSheetRef={productionIconsBottomSheetRef}
        addFabricBottomSheetRef={addMultipleProductionRef}
      />
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
    </ProductionPage>
  );
}

const ProductionPage = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;
const Content = styled(View)`
  flex: 1;
  gap: 10px;
  padding-horizontal: 10px;
`;
const TitleContainer = styled(View)`
  padding: 20px 0;
  align-items: center;
  gap: 10px;
`;
const Title = styled(CustomText)`
  font-size: 22px;
  font-weight: bold;
  color: #444;
  text-align: center;
`;
const SubTitle = styled(CustomText)`
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 20px;
`;
const ProductionContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;
const ProductionContent = styled(TouchableOpacity)`
  width: ${SIZES.width / 2 - 20}px;
  height: 150px;
  background-color: #f2f2f2;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.color};
`;
const ProductionImage = styled(View)`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
`;
const ProductionTitle = styled(CustomText)`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;
const ButtonContainer = styled(View)`
  display: flex;
  padding-horizontal: 5px;
  flex-direction: row;
  gap: 10px;
`;
