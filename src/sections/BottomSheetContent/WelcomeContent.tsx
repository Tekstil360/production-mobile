import {View, Text} from 'react-native';
import React from 'react';

import styled from 'styled-components';

import {BottomSheetView} from '@gorhom/bottom-sheet';
import Container from '../../components/Container/Container';
import CustomText from '../../components/Text/Text';
import Button from '../../components/Button/Button';
export default function WelcomeContent({close}: {close: () => void}) {
  return (
    <Container type="container" p={10} bgColor="white">
      <BottomSheetView style={{minHeight: 100}}>
        <TitleContainer>
          <Title>Hoşgeldiniz</Title>

          <InfoContainer>
            <CustomText
              fontSizes="body4"
              sx={{
                marginBottom: 10,
              }}>
              Üretim süreçlerini takibi ve yönetimi için:
            </CustomText>
            <InfoItem>• Üretimleri sezonlara böldük.</InfoItem>
            <InfoItem>
              • Her sezonda ne kadar kumaş harcadığınızı ve ne kadar gelir elde
              ettiğinizi görebileceksiniz.
            </InfoItem>
            <InfoItem>
              • Üretimlerinizi detaylı bir şekilde takip edebileceksiniz.
            </InfoItem>
            <CustomText sx={{marginTop: 10}}>
              Biz sizin için bir sezon oluşturduk. Şimdi üretimlerinizi ve
              gelirlerinizi takip edebilirsiniz.
            </CustomText>
          </InfoContainer>
        </TitleContainer>
        <View style={{marginBottom: 40}}>
          <Button onPress={close} borderRadius={10} text="Başla" />
        </View>
      </BottomSheetView>
    </Container>
  );
}
const TitleContainer = styled(View)`
  align-items: center;
  gap: 10px;
`;
const Title = styled(CustomText)`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;
const InfoContainer = styled(View)`
  align-items: flex-start;
  margin-bottom: 16px;
`;

const InfoItem = styled(CustomText)`
  font-size: 14px;
  margin-bottom: 2px;
  padding-left: 10px;
  color: #444;
`;
