import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Container from '../../components/Container/Container';
import Button from '../../components/Button/Button';
import FabricCard from '../../components/Card/FabricCard';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../components/CBottomSheet/CustomBottomSheet';
import AddFabricContent from '../../components/BottomSheetContent/AddFabricContent';
import Input from '../../components/Input/Input';
import {faFilter, faSearch} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {useGetProduciontsMutation} from '../../services/productionService';

export default function FabricScreen() {
  const addFabricBottomSheetRef = useRef<BottomSheetRef>(null);
  const filterFabricBottomSheetRef = useRef<BottomSheetRef>(null);

  return (
    <Container
      p={10}
      header
      title="Kumaşlar"
      extraIcon={faFilter}
      extraIconPress={() => filterFabricBottomSheetRef.current?.open()}>
      <Container mb={25} type="container" p={10}>
        <Container gap={10}>
          <HeaderContainer>
            <SearchContainer>
              <Input icon={faSearch} placeholder="Kumaş Ara" />
            </SearchContainer>
          </HeaderContainer>
          <ScrollView contentContainerStyle={{gap: 10}}>
            <FabricCard />
            <FabricCard />
            <FabricCard />
          </ScrollView>
        </Container>
        <Button
          backgroundColor="#9c6644"
          onPress={() => addFabricBottomSheetRef.current?.open()}
          borderRadius={10}
          text="Kumaş Ekle"
        />
      </Container>

      <CustomBottomSheet snapPoints={['90%']} ref={addFabricBottomSheetRef}>
        <AddFabricContent
          onClose={() => addFabricBottomSheetRef.current?.close()}
        />
      </CustomBottomSheet>
      <CustomBottomSheet snapPoints={['50%']} ref={filterFabricBottomSheetRef}>
        <View>
          <Text>Filter</Text>
        </View>
      </CustomBottomSheet>
    </Container>
  );
}

const SearchContainer = styled(View)`
  flex: 1;
`;
const HeaderContainer = styled(View)`
  flex-direction: row;
  margin-bottom: 10px;
  gap: 10px;
`;
