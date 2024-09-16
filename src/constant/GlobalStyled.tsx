import {View} from 'react-native';
import styled from 'styled-components';
export const Flex = styled(View)<{flex?: number}>`
  flex: ${({flex}) => flex || 1};
`;
export const InputContainer = styled(View)`
  flex-direction: row;
  gap: 10px;
`;
export const Row = styled(View)<{
  gap?: number;
  between?: boolean;
  flexEnd?: boolean;
  m?: number;
  mt?: number;
  mb?: number;
}>`
  flex-direction: row;
  gap: ${({gap}) => gap || 0}px;
  justify-content: ${({between, flexEnd}) =>
    between ? 'space-between' : flexEnd ? 'flex-end' : 'flex-start'};
  margin: ${({m}) => m || 0}px;
  margin-top: ${({mt}) => mt || 0}px;
  margin-bottom: ${({mb}) => mb || 0}px;
`;
