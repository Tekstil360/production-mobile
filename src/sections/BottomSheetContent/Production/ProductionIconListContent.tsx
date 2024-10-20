import React from 'react';

import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import {ProductionIcons} from '../../../data/IconData';
import ProductionIconCard from '../../../components/Card/ProductionIconCard';
import Container from '../../../components/Container/Container';

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
        {ProductionIcons.map((icon, index) => {
          return (
            <ProductionIconCard
              testID={`icon-${index}`}
              onPress={() => {
                onPress && onPress(icon.key);
              }}
              numColumn={3}
              key={index}
              size="small"
              xmlSvg={icon.icon}
            />
          );
        })}
      </BottomSheetScrollView>
    </Container>
  );
}
