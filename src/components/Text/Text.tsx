import {View, Text, TextProps} from 'react-native';
import React from 'react';
import styled from 'styled-components';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}
export default function CustomText(props: CustomTextProps) {
  return (
    <Text adjustsFontSizeToFit {...props}>
      {props.children}
    </Text>
  );
}
