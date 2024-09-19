import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';

import useThemeColors from '../../constant/useColor';
import {SIZES} from '../../constant/theme';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import CustomText from '../Text/Text';

type ButtonSize = 'small' | 'medium';
export interface OutlineButtonProps extends TouchableOpacityProps {
  icon?: IconProp;
  outline?: boolean;
  loading?: boolean;
  text?: string;
  textColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  width?: string;
  size?: ButtonSize;
}

export default function Button({
  icon,
  outline = false,
  loading,
  text,
  textColor,
  backgroundColor,
  borderRadius = SIZES.radius,
  width,
  size = 'medium',
  ...props
}: OutlineButtonProps) {
  const colors = useThemeColors();
  var lockPressed = false;
  return (
    <CustomButton
      width={width}
      size={size}
      testID={props.testID}
      onPress={event => {
        if (props.disabled) {
          return;
        }
        if (lockPressed) {
          return;
        }
        lockPressed = true;
        setTimeout(() => {
          lockPressed = false;
        }, 1000);
        props.onPress && props.onPress(event);
      }}
      activeOpacity={props.activeOpacity || props.disabled ? 1 : 0.7}
      theme={{
        borderRadius: borderRadius,
        borderColor: props.disabled
          ? '#EBEBE4'
          : backgroundColor || colors.buttonColor,
        backgroundColor: props.disabled
          ? '#EBEBE4'
          : outline
          ? 'transparent'
          : backgroundColor || colors.buttonColor,
      }}>
      {icon && <IconLeft icon={icon} color={colors.textColor} />}
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <ButtonText
          size={size}
          theme={{
            color: props.disabled
              ? '#ccc'
              : outline
              ? textColor || colors.primary
              : colors.white,
          }}>
          {text}
        </ButtonText>
      )}
    </CustomButton>
  );
}

const IconLeft = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;
const CustomButton = styled(TouchableOpacity)<{
  size: ButtonSize;
  width?: string;
}>`
  background-color: ${props => props.theme.backgroundColor};
  padding: 10px;
  border-radius: ${props => props.theme.borderRadius}px;
  border-width: 1px;
  height: ${props => (props.size === 'small' ? 35 : 45)}px;
  border-color: ${props => props.theme.borderColor};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${props => props.width || 'auto'};
`;
const ButtonText = styled(CustomText)<{size?: ButtonSize}>`
  color: ${props => props.theme.color};
  font-size: ${props => (props.size === 'small' ? 12 : 16)}px;
  font-weight: bold;
`;
