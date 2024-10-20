import {View, Text} from 'react-native';
import React from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../../components/CBottomSheet/CustomBottomSheet';
import CustomText from '../../../components/Text/Text';
interface OrderFilterContentProps {
  sheetRef: React.RefObject<BottomSheetRef>;
}
export default function OrderFilterContent(props: OrderFilterContentProps) {
  const {sheetRef} = props;
  return (
    <CustomBottomSheet snapPoints={['50%']} ref={sheetRef}>
      <View>
        <CustomText>Filter</CustomText>
      </View>
    </CustomBottomSheet>
  );
}
