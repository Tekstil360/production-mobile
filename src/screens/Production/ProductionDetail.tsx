import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../components/Container/Container';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/Navigator';
import {useGetProductionByIdMutation} from '../../services/productionService';
import Input from '../../components/Input/Input';
import styled from 'styled-components';
import CustomSvgXml from '../../components/Icon/CustomSvgXml';
import {getProductionIconByKey} from '../../helper/IconHelper';
import Icon from '../../components/Icon/Icon';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

export default function ProductionDetail({
  route,
}: NativeStackScreenProps<RootStackParamList, 'ProductionDetail'>) {
  const {productionId} = route.params;
  const [useProductionDetail] = useGetProductionByIdMutation();
  const {production} = useSelector((state: RootState) => state.production);
  useEffect(() => {
    loadData();
  }, [productionId]);

  const loadData = () => {
    useProductionDetail(productionId)
      .unwrap()
      .then(data => {
        console.log(data);
      });
  };
  return (
    <Container header title="Üretim Detayı" goBackShow>
      <Container type="container" p={10} mt={15}>
        <InputContainer>
          <InputItem alignItem="center" flex={0.1}>
            <TouchableOpacity
              testID="productionIconButton"
              onPress={() => {}}
              hitSlop={15}>
              {production?.icon ? (
                <CustomSvgXml
                  xml={getProductionIconByKey('babyPijama')}
                  width={25}
                  height={25}
                />
              ) : (
                <Icon icon={faImage} size={20} />
              )}
            </TouchableOpacity>
          </InputItem>
          <InputItem>
            <Input
              testID="productionNameInput"
              placeholder="Üretim Adı"
              value={production?.name}
              onChangeText={text => {
                console.log(text);
              }}
            />
          </InputItem>
        </InputContainer>
      </Container>
    </Container>
  );
}
const InputContainer = styled(View)`
  flex-direction: row;
  gap: 10px;
  margin-bottom: 10px;
`;
const InputItem = styled(View)<{
  flex?: number;
  alignItem?: 'center' | 'stretch';
}>`
  flex: ${({flex}) => flex || 1};
  justify-content: center;
  align-items: ${({alignItem}) => alignItem || 'stretch'};
`;
