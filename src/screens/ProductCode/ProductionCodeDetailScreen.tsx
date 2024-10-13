import React, {useEffect, useState} from 'react';
import Container from '../../components/Container/Container';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/Navigator';
import ProductionCodeApi from '../../services/productionCodeService';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {ActivityIndicator, Modal, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import CustomText from '../../components/Text/Text';
import ImageViewer from 'react-native-image-zoom-viewer';
import CImage from '../../components/CImage/CImage';
import {useFocusEffect} from '@react-navigation/native';
import {ProductionCodeActions} from '../../store/features/productionCodeReducer';
import Icon from '../../components/Icon/Icon';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {Center} from '../../constant/GlobalStyled';
import AlertDialog from '../../components/AlertDialog/AlertDialog';

export default function ProductionCodeDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ProductioncodeDetail'>) {
  const dispatch = useDispatch();
  const {id} = route.params;
  const [useGetImage] = ProductionCodeApi.useGetProductionImageMutation();
  const [useProductionCode] =
    ProductionCodeApi.useGetProductionCodeByIdMutation();
  const {productionCode} = useSelector(
    (state: RootState) => state.productionCode,
  );
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      loadData();
      return () => {
        setImageUrl(null);
        setVisible(false);
        setIsLoading(false);
        dispatch(ProductionCodeActions.setProductionCode(null));
      };
    }, [id]),
  );
  useEffect(() => {
    const fetchImage = async () => {
      if (!productionCode?.imageSrc) {
        setImageUrl(null);
        return;
      }
      setIsLoading(true);
      try {
        const {data} = await useGetImage({endpoint: productionCode.imageSrc});
        if (!data) {
          return;
        }
        const url = URL.createObjectURL(data);
        setImageUrl(url);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchImage();
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [productionCode?.imageSrc]);
  const loadData = async () => {
    setImageUrl(null);
    setVisible(false);
    setIsLoading(false);
    await useProductionCode(id);
  };
  return (
    <Container header title="Ürün Kod Detayı" goBackShow>
      <Card>
        {isLoading ? (
          <CardImage />
        ) : (
          imageUrl && (
            <View style={{flexDirection: 'column'}}>
              <Center>
                <CardImage
                  onPress={() => {
                    setVisible(true);
                  }}>
                  <CImage imageUrl={imageUrl} />
                </CardImage>
                <ImageRemove
                  hitSlop={5}
                  onPress={() => {
                    AlertDialog.showModal({
                      title: 'Uyarı',
                      message: 'Resmi silmek istediğinize emin misiniz?',
                      onCancel() {},
                      onConfirm() {},
                    });
                  }}>
                  <Icon icon={faTrash} />
                </ImageRemove>
              </Center>
            </View>
          )
        )}
      </Card>
      <Modal visible={visible} transparent={true}>
        <ImageViewer
          useNativeDriver
          loadingRender={() => <ActivityIndicator />}
          onCancel={() => setVisible(false)}
          imageUrls={[{url: imageUrl || ''}]}
          onSwipeDown={() => setVisible(false)}
          enableSwipeDown
        />
      </Modal>
    </Container>
  );
}
const Card = styled(View)`
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  flex-direction: row;
  gap: 10px;
`;
const CardImage = styled(TouchableOpacity)`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
`;
const ImageRemove = styled(TouchableOpacity)`
  margin-top: 5px;
`;
