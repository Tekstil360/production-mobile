import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useSharedValue} from 'react-native-reanimated';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash, faUser} from '@fortawesome/free-regular-svg-icons';
import useThemeColors from '../../constant/useColor';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FormInputProps} from 'react-native-form-container';
import CustomText from '../Text/Text';

export default function Input({
  iconPosition = 'left',
  icon = undefined,
  ...props
}: FormInputProps) {
  const colors = useThemeColors();
  const [passwordShow, setPasswordShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <View>
      {iconPosition === 'left' && icon && (
        <IconLeft icon={icon} size={20} color={colors.iconColor} />
      )}
      <CustomInput
        autoFocus={false}
        {...props}
        secureTextEntry={props.secureTextEntry && !passwordShow}
        onFocus={handleFocus}
        onBlur={handleBlur}
        theme={{
          left: iconPosition === 'left' && icon !== undefined ? '40px' : '15px',
          right:
            iconPosition === 'right' && icon !== undefined ? '40px' : '15px',
          borderColor: isFocused ? colors.activeBorder : colors.inputBorder,
        }}
      />
      {props.secureTextEntry && (
        <PasswordIconButton onPress={() => setPasswordShow(!passwordShow)}>
          <FontAwesomeIcon
            icon={passwordShow ? faEye : faEyeSlash}
            size={20}
            color={colors.iconColor}
          />
        </PasswordIconButton>
      )}

      {iconPosition === 'right' && icon !== undefined && (
        <IconRight icon={icon} size={20} color={colors.iconColor} />
      )}
      {props.errorMessage && (
        <CustomText
          style={{
            color: colors.errorColor,
            fontSize: 12,
            top: 7,
            left: 1,
          }}>
          {props.errorMessage}
        </CustomText>
      )}
    </View>
  );
}
const CustomInput = styled(TextInput)`
  padding: 15px ${props => props.theme.right || '15px'} 15px
    ${props => props.theme.left || '15px'};
  width: 100%;
  border-radius: 10px;
  background-color: #ebeff3;
  border: 1px solid ${props => props.theme.borderColor};
`;
const IconLeft = styled(FontAwesomeIcon)`
  position: absolute;
  top: ${Platform.OS === 'ios' ? '15px' : '20px'};
  left: 10px;
  z-index: 1;
`;
const IconRight = styled(FontAwesomeIcon)`
  position: absolute;
  top: ${Platform.OS === 'ios' ? '15px' : '20px'};
  right: 10px;
  z-index: 1;
`;
const PasswordIconButton = styled(TouchableOpacity)`
  position: absolute;
  top: ${Platform.OS === 'ios' ? '15px' : '20px'};
  right: 10px;
  z-index: 1;
`;
