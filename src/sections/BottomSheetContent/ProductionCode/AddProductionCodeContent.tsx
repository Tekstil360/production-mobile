import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';

import {faCamera, faImage} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {Center, Flex, Row} from '../../../constant/GlobalStyled';
import usePhoto from '../../../hooks/usePhoto';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {ProductionCodeActions} from '../../../store/features/productionCodeReducer';

import ProductionCodeAttributeResponse from '../../../dto/Response/ProductionCode/ProductionCodeAttributeResponse';

import ProductionCodeApi from '../../../services/productionCodeService';
import {ProductionCodeAttributeApi} from '../../../services/productionCodeAttributeService';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../../components/CBottomSheet/CustomBottomSheet';
import Container from '../../../components/Container/Container';
import Title from '../../../components/Title/Title';
import Icon from '../../../components/Icon/Icon';
import CustomText from '../../../components/Text/Text';
import Input from '../../../components/Input/Input';
import CustomFlatList from '../../../components/Flatlist/CustomFlatList';
import ProductionCodeAttributeCard from '../../../components/Card/ProductionCodeAttributeCard';
import Button from '../../../components/Button/Button';

interface AddProductionCodeContentProps {
  sheetRef: React.RefObject<BottomSheetRef>;
}
export default function AddProductionCodeContent(
  props: AddProductionCodeContentProps,
) {
  const dispatch = useDispatch();
  const [useCreateProduction] =
    ProductionCodeApi.useCreateProductionCodeMutation();
  const [useGetAttributes] =
    ProductionCodeAttributeApi.useGetAttributesMutation();
  const {attributes} = useSelector((x: RootState) => x.productionCodeAttribute);
  const {step, createProductionCodeForm} = useSelector(
    (x: RootState) => x.productionCode,
  );
  const {initLaunchCamera, initLaunchImage, photos, clearPhotos} = usePhoto();
  const {sheetRef} = props;

  useEffect(() => {
    clearPhotos();
    getAttributes();
  }, []);
  useEffect(() => {
    dispatch(
      ProductionCodeActions.setCreateProductionCodeForm({
        key: 'imageFile',
        value: photos[0],
      }),
    );
  }, [photos]);
  const getAttributeNames = () => {
    return attributes
      .filter((x, i) => {
        if (i < 2) {
          return x.attributeName?.toLowerCase;
        }
      })
      .map(x => x.attributeName?.toLowerCase())
      .join(', ');
  };
  const getAttributes = async () => {
    await useGetAttributes();
  };
  const createProductionCode = async () => {
    const formData = new FormData();
    formData.append('code', createProductionCodeForm.code);
    formData.append('description', createProductionCodeForm.description);
    if (createProductionCodeForm?.imageFile) {
      formData.append('imageFile', {
        uri: createProductionCodeForm.imageFile,
        name: 'image.jpg',
        type: `image/${createProductionCodeForm.imageFile.split('.').pop()}`,
      });
    }
    createProductionCodeForm.variantAttributes.forEach((x, i) => {
      formData.append(`variantAttributes[${i}].attributeId`, x.attributeId);
      formData.append(
        `variantAttributes[${i}].attributeValueId`,
        x.attributeValueId,
      );
    });

    await useCreateProduction({
      formData,
      onClose: () => {
        clearPhotos();
        sheetRef.current?.close();
      },
    });
  };
  return (
    <CustomBottomSheet
      close={() => {
        clearPhotos();
        dispatch(ProductionCodeActions.resetCreateProductionCodeForm());
      }}
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
            <Input
              value={createProductionCodeForm.code}
              onChangeText={text => {
                dispatch(
                  ProductionCodeActions.setCreateProductionCodeForm({
                    key: 'code',
                    value: text,
                  }),
                );
              }}
              placeholder="Ürün Kodu"
            />
          </Container>
        </Container>
      )}
      {step === 'ProductionCodeProperties' && (
        <Container bgColor="white" type="container" p={10}>
          <Title
            title="Ürün Özelliklerini Ekleyin"
            subTitle={`Eklemek istediğiniz varyantların (${getAttributeNames()}) özelliklerini girin ve stok bilgilerini yönetin.`}
          />
          <CustomFlatList
            data={attributes}
            renderItem={({
              item,
              index,
            }: {
              item: ProductionCodeAttributeResponse;
              index: number;
            }) => (
              <ProductionCodeAttributeCard
                value={(attributeValueId: number) => {
                  return createProductionCodeForm.variantAttributes.some(
                    x =>
                      x.attributeValueId === attributeValueId &&
                      x.attributeId === item.id,
                  );
                }}
                onChange={(e, selectedAttributeValueId) => {
                  if (e) {
                    dispatch(
                      ProductionCodeActions.setCreateProductionCodeVariantAttribute(
                        {
                          entity: {
                            attributeId: item.id,
                            attributeValueId: selectedAttributeValueId,
                          },
                        },
                      ),
                    );
                  }
                }}
                item={item}
              />
            )}
          />
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
              disabled={
                step === 'ProductionCodeInfo'
                  ? createProductionCodeForm.code === ''
                  : createProductionCodeForm.variantAttributes.length === 0
              }
              text={
                step === 'ProductionCodeInfo' ? 'Devam Et' : 'Ürün Kodu Ekle'
              }
              onPress={() => {
                if (step === 'ProductionCodeInfo') {
                  dispatch(
                    ProductionCodeActions.setStep('ProductionCodeProperties'),
                  );
                } else {
                  createProductionCode();
                }
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
