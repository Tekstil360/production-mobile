import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {SIZES} from '../../constant/theme';

type Props = {
  index: number;
  x: SharedValue<number>;
  colors: string[];
};

const Dot = ({index, x, colors}: Props) => {
  const SCREEN_WIDTH = SIZES.width;
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [10, 20, 10, 20],
      Extrapolation.CLAMP,
    );

    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH, 3 * SCREEN_WIDTH],
      colors,
    );
    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.dots, animatedDotStyle, animatedColor]} />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dots: {
    height: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
