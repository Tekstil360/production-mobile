import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Input/Input';
import {useDispatch, useSelector} from 'react-redux';
import {ProductionActions} from '../../store/features/productionReducer';
import {RootState} from '../../store';
import {SvgXml} from 'react-native-svg';
import useThemeColors from '../../constant/useColor';
import Icon from '../../components/Icon/Icon';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {ProductionIcons, TransactionIcons} from '../../constant/theme';

interface CreateProductionNameCardProps {
  onOpenProductionIconsSheet: () => void;
}

export default function CreateProductionNameCard({
  onOpenProductionIconsSheet,
}: CreateProductionNameCardProps) {
  const {name, icon} = useSelector(
    (state: RootState) => state.production.createProductionRequest,
  );
  const colors = useThemeColors();
  const dispatch = useDispatch();
  return (
    <InputContainer>
      <InputItem alignItem="center" flex={0.1}>
        <TouchableOpacity
          onPress={() => {
            onOpenProductionIconsSheet();
          }}
          hitSlop={15}>
          {icon ? (
            <SvgXml
              color={colors.iconColor}
              xml={ProductionIcons[icon]}
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
          placeholder="Üretim Adı"
          value={name}
          onChangeText={text =>
            dispatch(
              ProductionActions.handleCreateProductionRequest({
                key: 'name',
                value: text,
              }),
            )
          }
        />
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
