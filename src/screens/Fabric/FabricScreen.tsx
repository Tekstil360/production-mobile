import {View, Text, ScrollView} from 'react-native';
import React, {useRef} from 'react';
import Container from '../../components/Container/Container';
import Button from '../../components/Button/Button';
import FabricCard from '../../components/Card/FabricCard';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../components/CBottomSheet/CustomBottomSheet';
import AddFabricContent from '../../components/BottomSheetContent/AddFabricContent';
import Input from '../../components/Input/Input';
import {faFilter, faSearch} from '@fortawesome/free-solid-svg-icons';
import IconButton from '../../components/Button/IconButton';
import styled from 'styled-components';

export default function FabricScreen() {
  const addFabricBottomSheetRef = useRef<BottomSheetRef>(null);
  const filterFabricBottomSheetRef = useRef<BottomSheetRef>(null);
  return (
    <Container p={10} header title="Kumaşlar" showNotification>
      <Container p={10}>
        <Container gap={10}>
          <HeaderContainer>
            <SearchContainer>
              <Input icon={faSearch} placeholder="Kumaş Ara" />
            </SearchContainer>
            <FilterContainer>
              <IconButton
                onPress={() => filterFabricBottomSheetRef.current?.open()}
                borderRadius={5}
                icon={faFilter}
              />
            </FilterContainer>
          </HeaderContainer>
          <ScrollView contentContainerStyle={{gap: 10}}>
            <FabricCard />
            <FabricCard />
            <FabricCard />
          </ScrollView>
        </Container>
        <Button
          onPress={() => addFabricBottomSheetRef.current?.open()}
          borderRadius={10}
          text="Kumaş Ekle"
        />
      </Container>

      <CustomBottomSheet ref={addFabricBottomSheetRef}>
        <AddFabricContent />
      </CustomBottomSheet>
      <CustomBottomSheet ref={filterFabricBottomSheetRef}>
        <AddFabricContent />
      </CustomBottomSheet>
    </Container>
  );
}
const FilterContainer = styled(View)`
  flex: 0.15;
  align-items: center;
  justify-content: center;
`;

const SearchContainer = styled(View)`
  flex: 0.85;
`;
const HeaderContainer = styled(View)`
  flex-direction: row;
  gap: 10;
`;
