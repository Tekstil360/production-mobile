import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Input/Input';

import {SvgXml} from 'react-native-svg';
import useThemeColors from '../../constant/useColor';
import Icon from '../../components/Icon/Icon';
import {faImage} from '@fortawesome/free-solid-svg-icons';

import {
  getIconProductionRecommendation,
  getProductionIconByKey,
} from '../../helper/IconHelper';
import TextLink from '../../components/TextLink/TextLink';
import FormatHelper from '../../helper/FormatHelper';

interface ProductionNameCardProps {
  onOpenProductionIconsSheet: () => void;
  name: string;
  icon: string;
  handleChangeName: (text: string) => void;
}

export default function ProductionNameCard({
  name,
  icon,
  handleChangeName,
  onOpenProductionIconsSheet,
}: ProductionNameCardProps) {
  const colors = useThemeColors();
  let findRecommendation = getIconProductionRecommendation(icon);
  let replaceRecommendation = FormatHelper.replacePrefixedWord(
    getIconProductionRecommendation(icon),
  );
  let replaceSplitText = FormatHelper.extractWordWithPrefix(
    getIconProductionRecommendation(icon),
  );
  return (
    <>
      <InputContainer>
        <InputItem alignItem="center" flex={0.1}>
          <TouchableOpacity
            testID="productionIconButton"
            onPress={() => {
              onOpenProductionIconsSheet();
            }}
            hitSlop={15}>
            {icon ? (
              <SvgXml
                color={colors.iconColor}
                xml={getProductionIconByKey(icon)}
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
            value={name}
            onChangeText={text => handleChangeName(text)}
          />
        </InputItem>
      </InputContainer>
      {findRecommendation && replaceSplitText && replaceSplitText != name && (
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.12}}></View>
          <View style={{flex: 0.9}}>
            <TextLink
              text={replaceRecommendation}
              splitText={replaceSplitText}
              testID="recommendationText"
              onClick={e => {
                handleChangeName(e);
              }}
            />
          </View>
        </View>
      )}
    </>
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
