import {StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import LottieView from 'lottie-react-native';
import {OnboardingData} from '../../data/OnBoardingData';
import CustomText from '../../components/Text/Text';
import {SIZES} from '../../constant/theme';

type Props = {
  index: number;
  x: SharedValue<number>;
  item: OnboardingData;
};

const RenderItem = ({index, x, item}: Props) => {
  const SCREEN_WIDTH = SIZES.width;

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200, 0],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{translateY: translateYAnimation}],
    };
  });

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{scale: scale}],
    };
  });

  return (
    <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              borderRadius: SCREEN_WIDTH / 2,
              backgroundColor: item.backgroundColor,
            },
            circleAnimation,
          ]}
        />
      </View>
      <Animated.View style={lottieAnimationStyle}>
        <LottieView
          source={item.animation}
          style={{
            width: SCREEN_WIDTH * 1,
            height: SCREEN_WIDTH * 1,
          }}
          autoPlay
          loop
        />
      </Animated.View>
      <View>
        <CustomText style={[styles.itemText, {color: item.textColor}]}>
          {item.text}
        </CustomText>
        <CustomText
          style={[styles.itemDescription, {color: item.descriptionTextColor}]}>
          {item.description}
        </CustomText>
      </View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 120,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 15,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  itemDescription: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
