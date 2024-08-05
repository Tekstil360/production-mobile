import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Platform,
} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import useThemeColors from '../../constant/useColor';
import CustomText from '../Text/Text';
import Icon from '../Icon/Icon';

interface CheckInputProps extends TouchableOpacityProps {
  checked?: boolean;
  label?: string;
  clickLabel?: () => void;
  clickedLabel?: string;
}
export default function CheckInput(props: CheckInputProps) {
  const colors = useThemeColors();

  const RenderLabel = () => {
    let added = false;
    if (props.clickLabel && props.clickedLabel) {
      let findIndex = FindLabelByIndex();
      let words = props.label?.split(' ');
      return (
        <CustomText>
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
                    onPress={props.clickLabel}
                    key={index}
                    style={{backgroundColor: 'transparent'}}>
                    <CustomText
                      key={index}
                      style={{
                        color: colors.textColor,
                        fontWeight: 'bold',
                        textDecorationLine: 'underline',
                      }}>
                      {ConvertLabelByIndex() + ' '}
                    </CustomText>
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity activeOpacity={1} key={index}>
                  <CustomText>{item} </CustomText>
                </TouchableOpacity>
              );
            })}
        </CustomText>
      );
    }
    return <CustomText fontWeight="bold">{props.label}</CustomText>;
  };

  const FindLabelByIndex = () => {
    let wordIndexs: number[] = [];
    props.label?.split(' ').map((item, index) => {
      if (props.clickedLabel?.includes(item)) {
        wordIndexs.push(index);
      }
    });
    return wordIndexs;
  };
  const ConvertLabelByIndex = () => {
    let newWord = '';
    props.label?.split(' ').map((item, index) => {
      if (props.clickedLabel?.includes(item)) {
        if (index === 0) newWord += item;
        else newWord += ' ' + item;
      }
    });
    return newWord;
  };

  return (
    <Container>
      <InputContainer {...props} activeOpacity={0.7}>
        {!props.checked ? (
          <Icon color={colors.primary} size={20} icon={faCheck} />
        ) : null}
      </InputContainer>
      <View style={{marginTop: Platform.OS === 'ios' ? 4 : 0}}>
        <RenderLabel />
      </View>
    </Container>
  );
}
const InputContainer = styled(TouchableOpacity)`
  padding: 15px;
  max-width: 30px;
  max-height: 30px;
  border-radius: 5px;
  background-color: #ebeff3;
  align-items: center;
  justify-content: center;
`;
const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
