import React from 'react';
import Container from '../Container/Container';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import ProductionIconCard from '../Card/ProductionIconCard';
import {TransactionIcons} from '../../data/IconData';
interface TransactionIconListContentProps {
  onPress?: (e: string) => void;
}

export default function TransactionIconListContent(
  props: TransactionIconListContentProps,
) {
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
        {Object.keys(TransactionIcons).map((icon: string, index) => {
          let iconSvg = TransactionIcons[icon];
          return (
            <ProductionIconCard
              onPress={() => {
                props.onPress && props.onPress(icon);
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
