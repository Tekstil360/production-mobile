import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components';

import {faTrash} from '@fortawesome/free-solid-svg-icons';
import CreateProductionErrorRequest from '../../dto/Request/CreateProductionErrorRequest';
import {useDispatch} from 'react-redux';
import {ProductionActions} from '../../store/features/productionReducer';
import Input from '../../components/Input/Input';
import Icon from '../../components/Icon/Icon';

interface CreateProductionErrorCardProps {
  item: CreateProductionErrorRequest;
  indexNumber: number;
}

export default function CreateProductionErrorCard({
  item,
  indexNumber,
}: CreateProductionErrorCardProps) {
  const dispatch = useDispatch();

  return (
    <InputContainer>
      <InputItem>
        <Input
          placeholder="Üretim Hatası"
          value={item.name}
          onChangeText={text => {
            dispatch(
              ProductionActions.handleCreateProductionErrorRequest({
                key: 'name',
                value: text,
                indexNumber: indexNumber,
              }),
            );
          }}
        />
      </InputItem>
      <InputItem flex={0.1}>
        <TouchableOpacity
          onPress={() => {
            dispatch(ProductionActions.removeError(indexNumber));
          }}>
          <Icon icon={faTrash} size={20} />
        </TouchableOpacity>
      </InputItem>
    </InputContainer>
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
