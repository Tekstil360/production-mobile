import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components';

import {faTrash} from '@fortawesome/free-solid-svg-icons';

import Input from '../../components/Input/Input';
import Icon from '../../components/Icon/Icon';

interface ProductionErrorCardProps {
  name: string;
  removeError: () => void;
  handleChangeName: (text: string) => void;
}

export default function ProductionErrorCard({
  name,
  removeError,
  handleChangeName,
}: ProductionErrorCardProps) {
  return (
    <InputContainer>
      <InputItem>
        <Input
          placeholder="Üretim Hatası"
          value={name}
          onChangeText={text => {
            handleChangeName(text);
          }}
        />
      </InputItem>
      <InputItem flex={0.1}>
        <TouchableOpacity
          onPress={() => {
            removeError();
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
