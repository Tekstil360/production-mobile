import {View, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import React from 'react';
import styled from 'styled-components';

import CustomText from '../Text/Text';
import {FontSizeType} from '../../types/type';

interface TextLinkProps extends TouchableOpacityProps {
  text?: string;
  onClick?: (e: string) => void;
  splitText?: string;
  separator?: string;
  fontSize?: FontSizeType;
}
export default function TextLink(props: TextLinkProps) {
  const RenderLabel = () => {
    let added = false;
    if (props.onClick && props.splitText) {
      let findIndex = FindLabelByIndex();
      let words = props.text?.split(' ');
      return (
        <CustomText fontSizes={props.fontSize}>
          {words
            ?.filter((c, i) => {
              if (findIndex.length === 1 && i === findIndex[0]) {
                return c;
              } else if (
                findIndex.length > 1 &&
                findIndex.includes(i) &&
                i !== findIndex[0]
              ) {
                return false;
              }
              return c;
            })
            .map((item, index) => {
              if (findIndex.includes(index) && !added) {
                added = true;
                return (
                  <TouchableOpacity
                    hitSlop={20}
                    testID={props.testID}
                    onPress={() => {
                      console.log(props.testID);

                      props.onClick && props.onClick(props.splitText || '');
                    }}
                    key={index}
                    style={{backgroundColor: 'transparent'}}>
                    <CustomText
                      fontSizes={props.fontSize}
                      key={index}
                      sx={{textDecorationLine: 'underline'}}
                      fontWeight="bold">
                      {ConvertLabelByIndex()}
                    </CustomText>
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity activeOpacity={1} key={index}>
                  <CustomText fontSizes={props.fontSize}>{item} </CustomText>
                </TouchableOpacity>
              );
            })}
        </CustomText>
      );
    }
    return (
      <CustomText fontSizes={props.fontSize} fontWeight="bold">
        {props.text}
      </CustomText>
    );
  };

  const FindLabelByIndex = () => {
    let wordIndexs: number[] = [];
    props.text?.split(' ').map((item, index) => {
      if (props.splitText?.includes(item)) {
        wordIndexs.push(index);
      }
    });
    return wordIndexs;
  };
  const ConvertLabelByIndex = () => {
    let newWord = '';
    props.text?.split(' ').map((item, index) => {
      if (props.splitText?.includes(item)) {
        if (index === 0) newWord += item;
        else newWord += ' ' + item;
      }
    });
    return newWord;
  };

  return (
    <Container>
      <RenderLabel />
    </Container>
  );
}

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
