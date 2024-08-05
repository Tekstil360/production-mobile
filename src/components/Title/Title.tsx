import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';

interface TitleProps {
  title?: string;
  subTitle?: string;
  containerStyle?: any;
}

export default function Title(props: TitleProps) {
  return (
    <TitleContainer style={props.containerStyle}>
      {props.title && <TitleText>{props.title}</TitleText>}
      {props.subTitle && <SubTitle>{props.subTitle}</SubTitle>}
    </TitleContainer>
  );
}

const TitleText = styled(CustomText)`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;
const TitleContainer = styled(View)`
  padding: 10px 0;
  align-items: center;
  gap: 15px;
`;

const SubTitle = styled(CustomText)`
  font-size: 14px;
  color: #666;
`;
