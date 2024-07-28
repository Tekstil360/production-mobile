import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import CustomText from '../../components/Text/Text';
import styled from 'styled-components';
import {SvgType} from '../../types/type';

import {ProductionData} from '../../mocks/ProductionData';
import Button from '../../components/Button/Button';
import {SIZES} from '../../constant/theme';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../components/CBottomSheet/CustomBottomSheet';
import Input from '../../components/Input/Input';
import Container from '../../components/Container/Container';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import NonImageSvg from '../../assets/productions/NonImageSvg';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/Navigator';
import {CommonActions} from '@react-navigation/native';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {useCreateProductionMutation} from '../../services/productionService';
import CreateProductionRequest from '../../dto/Request/CreateProductionRequest';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import AlertDialog from '../../components/AlertDialog/AlertDialog';

export default function ProductionSplash(
  props: NativeStackScreenProps<RootStackParamList, 'ProductionSplash'>,
) {
  const [selected, setSelected] = useState<Array<CreateProductionRequest>>([]);
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const formContainerRef = useRef<FormContainerRef>(null);
  const [productionList, setProductionList] =
    useState<Array<ProductionProps>>(ProductionData);
  const [productionName, setProductionName] = useState('');
  const [loading, setLoading] = useState(false);
  const [createProductions] = useCreateProductionMutation();
  const handleAddProduction = () => {
    let result = formContainerRef.current?.validate({
      productionName: 'Üretim Adı Boş Bırakılamaz.',
    });
    if (result) {
      let temp = [...productionList];
      temp.push({
        title: productionName,
      });
      setProductionList(temp);
      console.log('Ürün Eklendi.');
      bottomSheetRef.current?.close();
    }
  };
  const nextStep = () => {
    setLoading(true);
    createProductions(selected)
      .unwrap()
      .then(e => {
        if (e.isSuccess) {
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
            {productionList.map((item, index) => (
              <ProductionCard
                selected={selected.some(x => x.name === item.title)}
                onPress={() => {
                  if (selected.some(x => x.name === item.title)) {
                    setSelected(selected.filter(x => x.name !== item.title));
                  } else {
                    setSelected([
                      ...selected,
                      {
                        name: item.title,
                      },
                    ]);
                  }
                }}
                key={index}
                {...item}
              />
            ))}
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
          {selected.length > 0 && (
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
        <Container bgColor="white" px={10} gap={10}>
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
    </ProductionPage>
  );
}
interface ProductionProps extends TouchableOpacityProps {
  title: string;
  ImageSvg?: React.ComponentType<SvgType>;
  selected?: boolean;
}
const ProductionCard = (props: ProductionProps) => {
  const {title, selected, ImageSvg} = props;

  return (
    <ProductionContent
      theme={{color: selected ? '#FFC107' : '#f2f2f2'}}
      {...props}
      activeOpacity={0.7}>
      <ProductionImage>
        {ImageSvg ? (
          <ImageSvg height={40} width={40} />
        ) : (
          <NonImageSvg height={40} width={40} />
        )}
      </ProductionImage>
      <ProductionTitle>{title}</ProductionTitle>
    </ProductionContent>
  );
};
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
