import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import CustomText from '../Text/Text';
import styled from 'styled-components';

interface ButtonGroupProps<T> {
  buttons?: T[];
  onPress?: (index: number, selectedValue: T) => void;
  datafield: keyof T;
}
export default function ButtonGroup<T>(props: ButtonGroupProps<T>) {
  const activeButtonIndex = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const {buttons, onPress, datafield} = props;
  const handlePress = (index: any) => {
    activeButtonIndex.value = index;
    setActiveIndex(index);
    if (buttons) {
      onPress && onPress(index, buttons[index]);
    }
  };
  const ButtonWidth =
    Dimensions.get('window').width / Number(buttons?.length || 1) - 10;
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(activeButtonIndex.value * ButtonWidth, {
            duration: 300,
          }),
        },
      ],
    };
  });
  if (!buttons) {
    return null;
  }
  return (
    <Container>
      <ButtonContainer width={ButtonWidth * buttons.length}>
        <AnimatedBackground
          width={ButtonWidth}
          style={[animatedBackgroundStyle]}
        />
        {buttons?.map((title, index) => (
          <Button key={index} onPress={() => handlePress(index)}>
            <CustomText
              fontSizes="description"
              color={activeIndex === index ? 'primary' : 'grey'}>
              {title[datafield] as string}
            </CustomText>
          </Button>
        ))}
      </ButtonContainer>
    </Container>
  );
}

const Container = styled(View)`
  justify-content: center;
  align-items: center;
  padding-vertical: 10px;
`;
const ButtonContainer = styled(View)<{width: number}>`
  flex-direction: row;
  position: relative;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
  border-width: 1px;
  border-color: #f0f0f0;
  background-color: #f0f0f0;
  width: ${({width}) => width}px;
`;
const AnimatedBackground = styled(Animated.View)<{width: number}>`
  position: absolute;
  height: 50px;
  background-color: #fff;
  border-radius: 25px;
  width: ${({width}) => width}px;
`;
const Button = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
