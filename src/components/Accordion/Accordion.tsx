import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import Icon from '../Icon/Icon';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

interface AccordionProps {
  title: string;
  children?: React.ReactNode;
  m?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
}
export default function Accordion(props: AccordionProps) {
  const [open, setOpen] = useState(false);
  const {title} = props;
  return (
    <AccordionWrapper
      m={props.m}
      mt={props.mt}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}>
      <Container
        activeOpacity={0.7}
        borderRadius={open ? '5px 5px 0 0' : '5px'}
        onPress={() => {
          setOpen(!open);
        }}>
        <CustomText>{title}</CustomText>
        <Icon icon={open ? faAngleUp : faAngleDown} size={20} />
      </Container>
      {open && <BodyContainer>{props.children}</BodyContainer>}
    </AccordionWrapper>
  );
}
const Container = styled(TouchableOpacity)<{
  borderRadius?: string;
}>`
  background-color: #d7c9bc;
  padding: 10px;
  height: 40px;
  border-radius: ${props => props.borderRadius};
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const BodyContainer = styled(View)`
  padding: 10px;
  background-color: #fff;
`;
const AccordionWrapper = styled(View)<{
  m?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
}>`
  margin: ${props => props.m || 0}px;
  margin-top: ${props => props.mt || 0}px;
  margin-bottom: ${props => props.mb || 0}px;
  margin-left: ${props => props.ml || 0}px;
  margin-right: ${props => props.mr || 0}px;
`;
