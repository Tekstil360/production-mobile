import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../CBottomSheet/CustomBottomSheet';
import Container from '../../Container/Container';
import Title from '../../Title/Title';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import Icon from '../../Icon/Icon';
import {faCamera, faImage} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {Center, Flex, Row} from '../../../constant/GlobalStyled';
import usePhoto from '../../../hooks/usePhoto';
import CustomText from '../../Text/Text';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {ProductionCodeActions} from '../../../store/features/productionCodeReducer';
import {useGetProductionPropertiesMutation} from '../../../services/productionCodePropertyService';
import ProductionCodePropertyCard from '../../Card/ProductionCodePropertyCard';

interface AddProductionCodeContentProps {
  sheetRef: React.RefObject<BottomSheetRef>;
}
export default function AddProductionCodeContent(
  props: AddProductionCodeContentProps,
) {
  const dispatch = useDispatch();
  const {step} = useSelector((x: RootState) => x.productionCode);
  const {productionCodeProperties} = useSelector(
    (x: RootState) => x.productionCodeProperty,
  );
  const {initLaunchCamera, initLaunchImage, photos, clearPhotos} = usePhoto();
  const [useGetProductionCodeProperties] = useGetProductionPropertiesMutation();

  const {sheetRef} = props;

  useEffect(() => {
    if (step === 'ProductionCodeProperties') {
      getProductionCodeProperties();
    }
  }, [step]);

  const getProductionCodeProperties = async () => {
    await useGetProductionCodeProperties();
  };
  console.log(productionCodeProperties);
  return (
    <CustomBottomSheet
      ref={sheetRef}
      snapPoints={
        step === 'ProductionCodeInfo'
          ? photos.length === 0
            ? ['48%']
            : ['58%']
          : ['85%']
      }>
      {step === 'ProductionCodeInfo' && (
        <Container bgColor="white" type="container" p={10}>
          <Title
            title="Ürün Kodu Ekle"
            subTitle="Her üretim için benzersiz bir ürün kodu oluşturun. Ürün kodu, üretim tamamlandığında stok sistemine otomatik olarak eklenecektir. Lütfen gerekli bilgileri eksiksiz doldurun."
          />
          <Container bgColor="white" type="container" mt={15}>
            <Center>
              {photos.length === 0 ? (
                <Row gap={10}>
                  <PhotoContainer
                    onPress={() => {
                      initLaunchImage();
                    }}
                    activeOpacity={0.7}>
                    <Icon size={30} icon={faImage} />
                  </PhotoContainer>
                  <PhotoContainer
                    onPress={() => {
                      initLaunchCamera();
                    }}
                    activeOpacity={0.7}>
                    <Icon size={30} icon={faCamera} />
                  </PhotoContainer>
                </Row>
              ) : (
                <View style={{marginBottom: 15, gap: 10}}>
                  <Image
                    source={{uri: photos[0]}}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 5,
                    }}
                  />
                  <Center>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => clearPhotos()}>
                      <CustomText>Fotoğrafı sil</CustomText>
                    </TouchableOpacity>
                  </Center>
                </View>
              )}
            </Center>
            <Input placeholder="Ürün Kodu" />
          </Container>
        </Container>
      )}
      {step === 'ProductionCodeProperties' && (
        <Container bgColor="white" type="container" p={10}>
          {productionCodeProperties.map((x, i) => (
            <ProductionCodePropertyCard key={i} item={x} />
          ))}
        </Container>
      )}
      <Container
        type="container"
        px={10}
        flex={step === 'ProductionCodeInfo' ? 0.25 : 0.15}
        bgColor="white">
        <Row gap={10}>
          {step === 'ProductionCodeProperties' && (
            <Flex flex={0.5}>
              <Button
                textColor="#333"
                outline
                text="Geri Dön"
                onPress={() => {
                  dispatch(ProductionCodeActions.setStep('ProductionCodeInfo'));
                }}
              />
            </Flex>
          )}
          <Flex>
            <Button
              disabled={step === 'ProductionCodeInfo' && photos.length === 0}
              text={
                step === 'ProductionCodeInfo' ? 'Devam Et' : 'Ürün Kodu Ekle'
              }
              onPress={() => {
                dispatch(
                  ProductionCodeActions.setStep('ProductionCodeProperties'),
                );
              }}
            />
          </Flex>
        </Row>
      </Container>
    </CustomBottomSheet>
  );
}
const PhotoContainer = styled(TouchableOpacity)`
  width: 75px;
  height: 75px;
  border-radius: 10px;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;
