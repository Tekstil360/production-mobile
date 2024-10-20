import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import Icon from '../Icon/Icon';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {COLORS} from '../../constant/theme';

interface InputPlaceholderProps extends TouchableOpacityProps {
  placeholder: string;
}

export default function InputPlaceholder(props: InputPlaceholderProps) {
  const {placeholder} = props;
  return (
    <CustomInput activeOpacity={0.7} {...props}>
      <CustomText>{placeholder}</CustomText>
      <Icon color={COLORS.secondaryIconColor} icon={faAngleRight} />
    </CustomInput>
  );
}
const CustomInput = styled(TouchableOpacity)`
  padding: 15px ${props => props.theme.right || '15px'} 15px
    ${props => props.theme.left || '15px'};
  width: 100%;
  border-radius: 10px;
  background-color: #ebeff3;
  border: 1px solid #ebeff3;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
