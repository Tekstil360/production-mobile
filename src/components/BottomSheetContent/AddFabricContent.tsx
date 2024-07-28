import {View, Text} from 'react-native';
import React from 'react';
import Container from '../Container/Container';
import Input from '../Input/Input';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import Button from '../Button/Button';
import styled from 'styled-components';

export default function AddFabricContent() {
  return (
    <Container bgColor="white" p={10}>
      <BottomSheetView style={{minHeight: 100, gap: 10}}>
        <Input placeholder="Kumaş Adı" />
        <PriceContainer>
          <PriceInputContainer>
            <Input keyboardType="numeric" placeholder="Kumaş Alış Fiyatı" />
          </PriceInputContainer>
          <PriceInputContainer>
            <Input keyboardType="numeric" placeholder="Kumaş Satış Fiyatı" />
          </PriceInputContainer>
          <PriceInputContainer theme={{flex: 0.5}}>
            <Input keyboardType="numeric" placeholder="Kdv" />
          </PriceInputContainer>
        </PriceContainer>
        <View style={{marginBottom: 20}}>
          <Button text="Ekle" borderRadius={10} />
        </View>
      </BottomSheetView>
    </Container>
  );
}
const PriceContainer = styled(View)`
  flex-direction: row;
  gap: 10px;
`;
const PriceInputContainer = styled(View)`
  flex: ${props => props.theme.flex || 1};
`;
