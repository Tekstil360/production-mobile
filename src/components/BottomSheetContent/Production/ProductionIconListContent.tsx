import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../Container/Container';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import ProductionIconCard from '../../Card/ProductionIconCard';
import Button from '../../Button/Button';
import {ProductionIcons} from '../../../data/IconData';

interface ProductionIconListContentProps {
  onPress?: (icon: string) => void;
}

export default function ProductionIconListContent({
  onPress,
}: ProductionIconListContentProps) {
  return (
    <Container bgColor="white" type="container" p={10}>
      <BottomSheetScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: 30}}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 10,
        }}>
        {Object.keys(ProductionIcons).map((icon: string, index) => {
          let iconSvg = ProductionIcons[icon];
          return (
            <ProductionIconCard
              testID={`icon-${index}`}
              onPress={() => {
                onPress && onPress(icon);
              }}
              numColumn={3}
              key={index}
              size="small"
              xmlSvg={iconSvg}
            />
          );
        })}
      </BottomSheetScrollView>
    </Container>
  );
}
