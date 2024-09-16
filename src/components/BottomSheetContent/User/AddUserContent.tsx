import {View, Text} from 'react-native';
import React from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../CBottomSheet/CustomBottomSheet';
import Container from '../../Container/Container';
import Title from '../../Title/Title';

interface AddUserContentProps {
  sheetRef: React.RefObject<BottomSheetRef>;
}
export default function AddUserContent(props: AddUserContentProps) {
  return (
    <CustomBottomSheet snapPoints={['70%']} ref={props.sheetRef}>
      <Container bgColor="white" type="container" p={10}>
        <Title
          title="Kullanıcı Ekle"
          subTitle="Kullanıcı bilgilerini girerek ekleyebilirsiniz."
        />
      </Container>
    </CustomBottomSheet>
  );
}
