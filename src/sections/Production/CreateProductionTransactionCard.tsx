import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components';

import {faImage, faTrash} from '@fortawesome/free-solid-svg-icons';

import CreateProductionTransactionRequest from '../../dto/Request/CreateProductionTransactionRequest';
import {useDispatch} from 'react-redux';
import {ProductionActions} from '../../store/features/productionReducer';
import {SvgFromXml} from 'react-native-svg';
import {TransactionIcons} from '../../constant/theme';
import useThemeColors from '../../constant/useColor';
import Input from '../../components/Input/Input';
import Icon from '../../components/Icon/Icon';

interface CreateProductionTransactionCardProps {
  onOpenImageSheet: () => void;
  indexNumber: number;
  item: CreateProductionTransactionRequest;
}
export default function CreateProductionTransactionCard({
  onOpenImageSheet,
  item,
  indexNumber,
}: CreateProductionTransactionCardProps) {
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
                  dispatch(ProductionActions.setSelectedIndex(indexNumber));
                  onOpenImageSheet();
                }}
                hitSlop={15}>
                {item.icon ? (
                  <SvgFromXml
                    color={colors.iconColor}
                    xml={TransactionIcons[item.icon]}
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
                dispatch(
                  ProductionActions.handleCreateProductionTransactionRequest({
                    key: 'name',
                    value: text,
                    indexNumber: indexNumber,
                  }),
                );
              }}
            />
          </InputItem>
        </InputContainer>
      </InputItem>
      <InputItem alignItem="center" flex={0.1}>
        <TouchableOpacity
          onPress={() => {
            dispatch(ProductionActions.removeTransaction(indexNumber));
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
