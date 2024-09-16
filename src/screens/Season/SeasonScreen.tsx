import React, {useEffect, useRef} from 'react';
import Container from '../../components/Container/Container';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import CustomFlatList from '../../components/Flatlist/CustomFlatList';
import SeasonCard from '../../components/Card/SeasonCard';
import Button from '../../components/Button/Button';
import AddSeasonContent from '../../components/BottomSheetContent/Season/AddSeasonContent';

import {
  useGetSeasonByIdMutation,
  useGetSeasonMutation,
} from '../../services/seasonService';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {BottomSheetRef} from '../../components/CBottomSheet/CustomBottomSheet';
import UpdateSeasonContent from '../../components/BottomSheetContent/Season/UpdateSeasonContent';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/Navigator';
import ActionPermissionHelper from '../../types/ActionPermissionHelper';

export default function SeasonScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Seasons'>) {
  const canSeasons = ActionPermissionHelper.canPermission(
    route.params.actionPermissions,
  );
  const {seasons} = useSelector((state: RootState) => state.season);
  const addSeasonRef = useRef<BottomSheetRef>(null);
  const editSeasonRef = useRef<BottomSheetRef>(null);
  const [useSeasons] = useGetSeasonMutation();
  const [useSeasonById] = useGetSeasonByIdMutation();
  useEffect(() => {
    loadSeasons();
  }, []);

  const loadSeasons = async () => {
    AlertDialog.showLoading();
    await useSeasons();
    AlertDialog.hideLoading();
  };
  const openUpdateSeasonSheet = async (id: number) => {
    AlertDialog.showLoading();
    const {error} = await useSeasonById(id);
    AlertDialog.hideLoading();
    if (error) {
      return;
    }
    editSeasonRef.current?.open();
  };

  return (
    <Container header title="Sezonlar" goBackShow>
      <Container type="container" p={10}>
        <CustomFlatList
          notFoundText="Sezon bulunamadı."
          handleRefresh={loadSeasons}
          data={seasons}
          renderItem={({item}: any) => (
            <SeasonCard
              onPress={() => {
                if (canSeasons.canUpdate) {
                  openUpdateSeasonSheet(item.id);
                }
              }}
              item={item}
            />
          )}
        />
      </Container>
      {canSeasons.canCreate && (
        <Container flex={0.1} type="container" p={10}>
          <Button
            testID="createSeasonButton"
            text="Sezon Ekle"
            onPress={() => {
              addSeasonRef.current?.open();
            }}
          />
        </Container>
      )}
      {canSeasons.canCreate && <AddSeasonContent sheetRef={addSeasonRef} />}
      {canSeasons.canUpdate && (
        <UpdateSeasonContent
          canDelete={canSeasons.canDelete}
          sheetRef={editSeasonRef}
        />
      )}
    </Container>
  );
}
