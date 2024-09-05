import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import useThemeColors from '../../constant/useColor';
import {OutlineButtonProps} from './Button';
import {SIZES} from '../../constant/theme';
import styled from 'styled-components';
import Icon from '../Icon/Icon';

export default function IconButton({
  icon,
  outline = false,
  loading,
  text,
  textColor,
  backgroundColor,
  borderRadius = SIZES.radius_lg,
  width,
  ...props
}: OutlineButtonProps) {
  const colors = useThemeColors();
  var lockPressed = false;
  return (
    <CustomButton
      testID={props.testID}
      onPress={event => {
        if (lockPressed) {
          return;
        }
        lockPressed = true;
        setTimeout(() => {
          lockPressed = false;
        }, 1000);
        props.onPress && props.onPress(event);
      }}
      activeOpacity={props.activeOpacity || 0.7}
      theme={{
        borderRadius: borderRadius,
        borderColor: backgroundColor || colors.primary,
        backgroundColor: outline
          ? 'transparent'
          : backgroundColor || colors.primary,
      }}>
      {icon && <Icon color={textColor} icon={icon} />}
    </CustomButton>
  );
}

const CustomButton = styled(TouchableOpacity)`
  background-color: ${props => props.theme.backgroundColor};
  padding: 10px;
  border-radius: ${props => props.theme.borderRadius}px;
  border-width: 1px;
  height: 45px;
  width: 45px;
  border-color: ${props => props.theme.borderColor};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
