import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SharedValue} from 'react-native-reanimated';

import Dot from './Dot';
import {OnboardingData} from '../../mocks/OnBoardingData';

type Props = {
  data: any[];
  x: SharedValue<number>;
  colors?: string[];
};
const Pagination = ({data, x, colors}: Props) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        return <Dot colors={colors} index={index} x={x} key={index} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
