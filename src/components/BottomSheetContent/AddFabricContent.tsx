import {View, Text} from 'react-native';
import React from 'react';
import Container from '../Container/Container';
import Input from '../Input/Input';
import {BottomSheetScrollView, BottomSheetView} from '@gorhom/bottom-sheet';
import styled from 'styled-components';

import Button from '../Button/Button';
import Title from '../Title/Title';
import FormatHelper from '../../helper/FormatHelper';

interface AddFabricContentProps {
  onClose: () => void;
}
export default function AddFabricContent(props: AddFabricContentProps) {
  const [price, setPrice] = React.useState('');
  return (
    <Container type="container" bgColor="white" m={10}>
      <Title
        title="Kumaş Ekle"
        subTitle="Kumaş eklemek için aşağıdaki bilgileri doldurunuz."
      />
      <BottomSheetScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 10}}>
        <Input placeholder="Kumaş Kodu" />
        <Input placeholder="Kumaş Marka" />
        <Input placeholder="Kumaş Model" />
        <PriceContainer>
          <PriceInputContainer>
            <Input
              keyboardType="numeric"
              value={price}
              onChangeText={text => setPrice(FormatHelper.formatPrice(text))}
              placeholder="Kumaş Alış Fiyatı"
            />
          </PriceInputContainer>
          <PriceInputContainer>
            <Input keyboardType="numeric" placeholder="Kumaş Satış Fiyatı" />
          </PriceInputContainer>
        </PriceContainer>
        <Input keyboardType="numeric" placeholder="Kdv" />
        <Title
          title="Kumaş Özellikleri"
          subTitle="Kumaş özelliklerini ekleyin."
        />
        <Input placeholder="Kumaş Rengi" />
      </BottomSheetScrollView>
      <View style={{marginBottom: 25}}>
        <Button onPress={props.onClose} text="Kumaş Ekle" borderRadius={10} />
      </View>
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
