import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../components/Container/Container';
import Button from '../../components/Button/Button';
import {BottomSheetRef} from '../../components/CBottomSheet/CustomBottomSheet';
import AddUserContent from '../../sections/BottomSheetContent/User/AddUserContent';
import {useGetUserRoleProductionMutation} from '../../services/userService';
import {useFocusEffect} from '@react-navigation/native';
import UserRoleProduction from '../../dto/Response/User/UserRoleProduction';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import ColPlaceholder from '../../components/Placeholder/ColPlaceholder';
import {getTransactionIconByKey} from '../../helper/IconHelper';
import CustomSvgXml from '../../components/Icon/CustomSvgXml';

export default function UserScreen() {
  const addUserRef = React.useRef<BottomSheetRef>(null);
  const [useGetRoleProductions] = useGetUserRoleProductionMutation();
  const [roleProductions, setRoleProductions] = React.useState<
    UserRoleProduction[]
  >([]);
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    try {
      AlertDialog.showLoading();
      const data = await useGetRoleProductions().unwrap();
      setRoleProductions(data.list);
    } catch (error) {
    } finally {
      AlertDialog.hideLoading();
    }
  };

  return (
    <Container header title="Kullanıcılar" goBackShow>
      <Container type="container" p={10}>
        <CustomFlatList
          data={roleProductions}
          renderItem={({
            item,
            index,
          }: {
            item: UserRoleProduction;
            index: number;
          }) => (
            <ColPlaceholder
              leftIcon={
                <CustomSvgXml
                  height={25}
                  width={25}
                  xml={getTransactionIconByKey(item.icon)}
                />
              }
              key={index}
              name={item.roleName}
            />
          )}
        />
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
