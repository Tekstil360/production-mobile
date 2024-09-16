import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components';

import {faImage, faTrash} from '@fortawesome/free-solid-svg-icons';

import CreateProductionTransactionRequest from '../../dto/Request/Production/CreateProductionTransactionRequest';
import {useDispatch} from 'react-redux';
import {SvgFromXml} from 'react-native-svg';

import useThemeColors from '../../constant/useColor';
import Input from '../../components/Input/Input';
import Icon from '../../components/Icon/Icon';
import {getTransactionIconByKey} from '../../helper/IconHelper';

interface ProductionTransactionCardProps {
  onOpenImageSheet: () => void;
  indexNumber: number;
  item: CreateProductionTransactionRequest;
  icon?: string;
  name: string;
  handleChangeName: (text: string) => void;
  deleteTransaction: () => void;
  setSelectedTransaction: () => void;
}
export default function ProductionTransactionCard({
  name,
  icon,
  deleteTransaction,
  setSelectedTransaction,
  handleChangeName,
  onOpenImageSheet,
  item,
  indexNumber,
}: ProductionTransactionCardProps) {
  const dispatch = useDispatch();
  const colors = useThemeColors();

  return (
    <InputContainer>
      <InputItem>
        <InputContainer>
          <InputItem alignItem="center" flex={0.1}>
            {
              <TouchableOpacity
                onPress={() => {
                  setSelectedTransaction();
                  onOpenImageSheet();
                }}
                hitSlop={15}>
                {item.icon ? (
                  <SvgFromXml
                    color={colors.iconColor}
                    xml={getTransactionIconByKey(item.icon)}
                    width={25}
                    height={25}
                  />
                ) : (
                  <Icon icon={faImage} size={20} />
                )}
              </TouchableOpacity>
            }
          </InputItem>
          <InputItem flex={0.9}>
            <Input
              placeholder="Üretim Süreci"
              value={item.name}
              onChangeText={text => {
                handleChangeName(text);
              }}
            />
          </InputItem>
        </InputContainer>
      </InputItem>
      <InputItem alignItem="center" flex={0.1}>
        <TouchableOpacity
          onPress={() => {
            deleteTransaction();
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
  align-items: center;
  justify-content: center;
`;
const InputItem = styled(View)<{
  flex?: number;
  alignItem?: 'center' | 'stretch';
}>`
  flex: ${({flex}) => flex || 1};
  justify-content: center;
  align-items: ${({alignItem}) => alignItem || 'stretch'};
`;
