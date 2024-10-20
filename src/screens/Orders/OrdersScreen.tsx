import React from 'react';
import Container from '../../components/Container/Container';
import styled from 'styled-components';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import FabricCard from '../../components/Card/FabricCard';
import OrderFilterContent from '../../sections/BottomSheetContent/Order/OrderFilterContent';
import AddOrderContent from '../../sections/BottomSheetContent/Order/AddOrderContent';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import {View} from 'react-native';
import {BottomSheetRef} from '../../components/CBottomSheet/CustomBottomSheet';
import {faFilter, faSearch} from '@fortawesome/free-solid-svg-icons';
import {useFocusEffect} from '@react-navigation/native';

export default function OrdersScreen() {
  const filterOrderBottomSheetRef = React.useRef<BottomSheetRef>(null);
  const addOrderBottomSheetRef = React.useRef<BottomSheetRef>(null);
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        filterOrderBottomSheetRef.current?.close();
        addOrderBottomSheetRef.current?.close();
      };
    }, []),
  );
  return (
    <Container
      header
      title="Siparişler"
      extraIcon={faFilter}
      extraIconPress={() => {
        filterOrderBottomSheetRef.current?.open();
      }}>
      <Container mb={25} type="container" p={10} gap={10}>
        <Container gap={10} type="container">
          <HeaderContainer>
            <SearchContainer>
              <Input icon={faSearch} placeholder="Sipariş Ara" />
            </SearchContainer>
          </HeaderContainer>
          <CustomFlatList
            contentContainerStyle={{gap: 10}}
            data={Array(10).fill(0)}
            renderItem={({item, index}: {item: any; index: number}) => {
              return <FabricCard key={index} />;
            }}
          />
        </Container>
        <Button
          onPress={() => {
            addOrderBottomSheetRef.current?.open();
          }}
          backgroundColor="#9c6644"
          borderRadius={10}
          text="Sipariş Ekle"
        />
      </Container>
      <AddOrderContent sheetRef={addOrderBottomSheetRef} />
      <OrderFilterContent sheetRef={filterOrderBottomSheetRef} />
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
