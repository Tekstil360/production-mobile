import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import ProductionCodeResponse from '../../dto/Response/ProductionCode/ProductionCodeResponse';
import CustomText from '../Text/Text';
import {faAngleRight, faClose} from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon/Icon';
import ProductionCodeApi from '../../services/productionCodeService';
import ImageViewer from 'react-native-image-zoom-viewer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import FastImage from 'react-native-fast-image';
import {BaseUrl} from '../../store/api';
import CImage from '../CImage/CImage';
interface ProductionCodeCardProps extends TouchableOpacityProps {
  item: ProductionCodeResponse;
}
export default function ProductionCodeCard(props: ProductionCodeCardProps) {
  const {item} = props;
  const [useGetImage] = ProductionCodeApi.useGetProductionImageMutation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMore, setIsMore] = useState(false);
  let handleIsMoreRef = React.useRef(isMore);
  let isOverageRef = React.useRef(false);
  useEffect(() => {
    const fetchImage = async () => {
      if (item.imageSrc) {
        setIsLoading(true);
        try {
          const {data} = await useGetImage({endpoint: item.imageSrc});
          if (!data) {
            return;
          }
          const url = URL.createObjectURL(data);
          setImageUrl(url);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchImage();
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [item.imageSrc]);

  return (
    <>
      <Card {...props}>
        {isLoading ? (
          <CardImage />
        ) : (
          imageUrl && (
            <CardImage
              onPress={() => {
                setVisible(true);
              }}>
              <CImage imageUrl={imageUrl} />
            </CardImage>
          )
        )}
        <CardContent>
          <ProductionCodeInfo>
            <CustomText fontSizes="normal" color="primary" fontWeight="normal">
              {item.code}
            </CustomText>
            <Icon icon={faAngleRight} color="#D8B267" />
          </ProductionCodeInfo>
          <ProductionVariantContainer
            onLayout={e => {
              const {height} = e.nativeEvent.layout;
              if (height > 45 && !handleIsMoreRef.current) {
                isOverageRef.current = true;
                setIsMore(true);
              }
            }}>
            {item.variants
              ?.filter((x, i) => {
                if (i > 5 && isMore) return false;
                return true;
              })
              ?.map((variant, index) => (
                <ProductionVariant
                  onPress={e => {
                    Alert.alert('Production Variant', JSON.stringify(variant));
                  }}
                  hitSlop={10}
                  key={index}>
                  <CustomText
                    fontSizes="description2"
                    color="primary"
                    fontWeight="normal">
                    {variant.fullVariantName}
                  </CustomText>
                </ProductionVariant>
              ))}
          </ProductionVariantContainer>
          {isMore ? (
            <MoreButton
              hitSlop={5}
              onPress={() => {
                handleIsMoreRef.current = true;
                setIsMore(!isMore);
              }}>
              <CustomText
                fontSizes="description2"
                color="primary"
                fontWeight="normal">
                Daha fazla göster
              </CustomText>
            </MoreButton>
          ) : (
            isOverageRef.current && (
              <MoreButton
                hitSlop={5}
                onPress={() => {
                  handleIsMoreRef.current = false;
                  setIsMore(!isMore);
                }}>
                <CustomText
                  fontSizes="description2"
                  color="primary"
                  fontWeight="normal">
                  Daha az göster
                </CustomText>
              </MoreButton>
            )
          )}
        </CardContent>
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
    </>
  );
}
const Card = styled(TouchableOpacity)`
  padding: 5px;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  flex-direction: row;
  gap: 10px;
`;
const CardImage = styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
`;
const CardContent = styled(View)`
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 10px;
`;
const ProductionCodeInfo = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const ProductionVariantContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
`;
const ProductionVariant = styled(TouchableOpacity)`
  padding: 5px;
  border-radius: 5px;
  background-color: #f2f2f2;
`;
const MoreButton = styled(TouchableOpacity)`
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
`;
