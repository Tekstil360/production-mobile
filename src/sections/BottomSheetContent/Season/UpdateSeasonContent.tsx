import React from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../../components/CBottomSheet/CustomBottomSheet';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import Title from '../../../components/Title/Title';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {SeasonActions} from '../../../store/features/seasonReducer';
import {
  useDeleteSeasonByIdMutation,
  useUpdateSeasonMutation,
} from '../../../services/seasonService';

import UpdateSeasonRequest from '../../../dto/Request/Season/UpdateSeasonRequest';
import {Flex} from '../../../constant/GlobalStyled';
interface UpdateSeasonContentProps {
  sheetRef: React.RefObject<BottomSheetRef>;
  canDelete?: boolean;
}
export default function UpdateSeasonContent(props: UpdateSeasonContentProps) {
  const dispatch = useDispatch();
  const [useDeleteSeasonById] = useDeleteSeasonByIdMutation();
  const [useUpdateSeason] = useUpdateSeasonMutation();
  const {selectedSeason} = useSelector((state: RootState) => state.season);
  const {sheetRef, canDelete} = props;

  const handleSeasonNameChange = (text: string) => {
    let season = {...selectedSeason};
    season.seasonName = text;
    dispatch(SeasonActions.setSelectedSeason(season));
  };

  const handleUpdateSeason = async () => {
    if (selectedSeason) {
      AlertDialog.showLoading();
      let updatedSeason: UpdateSeasonRequest = {...selectedSeason};
      const {data} = await useUpdateSeason(updatedSeason);
      AlertDialog.hideLoading();
      if (data?.isSuccess) {
        AlertDialog.success('Sezon başarıyla güncellendi.');
        sheetRef.current?.close();
      } else {
        AlertDialog.error('Sezon güncellenirken bir hata oluştu.');
      }
    }
  };
  const handleDeleteSeason = async () => {
    if (selectedSeason) {
      AlertDialog.showModal({
        title: 'Sezonu Sil',
        message: 'Sezonu silmek istediğinize emin misiniz?',
        onCancel() {},
        async onConfirm() {
          AlertDialog.showLoading();
          const {data} = await useDeleteSeasonById(selectedSeason.id);
          AlertDialog.hideLoading();
          if (data?.isSuccess) {
            dispatch(SeasonActions.deleteSeason(selectedSeason.id));
            AlertDialog.success('Sezon başarıyla silindi.');
            sheetRef.current?.close();
          } else {
            AlertDialog.error('Sezon silinirken bir hata oluştu.');
          }
        },
      });
    }
  };
  return (
    <CustomBottomSheet ref={sheetRef} snapPoints={['30%']}>
      <Title
        title="Sezon Düzenle"
        subTitle="Sezon adını girerek sezon düzenleyebilirsiniz."
      />
      <Container gap={20} p={10} type="container" bgColor="white">
        <Input
          value={selectedSeason?.seasonName}
          onChangeText={handleSeasonNameChange}
          testID="seasonNameInput"
          placeholder="Sezon Adı"
        />
        <View
          style={{marginBottom: 25, flexDirection: 'row', gap: 10, flex: 1}}>
          {canDelete && (
            <Flex flex={0.5}>
              <Button
                onPress={handleDeleteSeason}
                outline
                testID="cancelUpdateSeasonButton"
                text="Sil"
              />
            </Flex>
          )}
          <Flex flex={1}>
            <Button
              onPress={handleUpdateSeason}
              testID="updateSeasonButton"
              text="Kaydet"
            />
          </Flex>
        </View>
      </Container>
    </CustomBottomSheet>
  );
}
