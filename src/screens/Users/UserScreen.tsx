import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../components/Container/Container';
import Button from '../../components/Button/Button';
import AddUserContent from '../../components/BottomSheetContent/User/AddUserContent';
import {BottomSheetRef} from '../../components/CBottomSheet/CustomBottomSheet';

export default function UserScreen() {
  const addUserRef = React.useRef<BottomSheetRef>(null);
  return (
    <Container header title="Kullanıcılar" goBackShow>
      <Container type="container" p={10}>
        <View>
          <Text>Users</Text>
        </View>
      </Container>
      <Container flex={0.1} type="container" p={10}>
        <Button
          testID="createSeasonButton"
          text="Kullanıcı Ekle"
          onPress={() => {
            addUserRef.current?.open();
          }}
        />
      </Container>
      <AddUserContent sheetRef={addUserRef} />
    </Container>
  );
}
