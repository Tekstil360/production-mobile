import React from 'react';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../CBottomSheet/CustomBottomSheet';
import Input from '../../Input/Input';
import Container from '../../Container/Container';
import Button from '../../Button/Button';
import Title from '../../Title/Title';
import {useCreateSeasonMutation} from '../../../services/seasonService';
import AlertDialog from '../../AlertDialog/AlertDialog';
interface AddSeasonContentProps {
  sheetRef: React.RefObject<BottomSheetRef>;
}
export default function AddSeasonContent(props: AddSeasonContentProps) {
  const {sheetRef} = props;
  const [useCreateSeason] = useCreateSeasonMutation();
  const [seasonName, setSeasonName] = React.useState('');

  const handleCreateSeason = async () => {
    AlertDialog.showLoading();
    const {data} = await useCreateSeason({seasonName, productionId: 8});
    AlertDialog.hideLoading();
    if (data?.isSuccess) {
      sheetRef.current?.close();
    } else {
    }
  };

  return (
    <CustomBottomSheet ref={sheetRef} snapPoints={['30%']}>
      <Title
        title="Sezon Ekle"
        subTitle="Sezon adını girerek sezon ekleyebilirsiniz."
      />
      <Container gap={20} p={10} type="container" bgColor="white">
        <Input
          testID="seasonNameInput"
          placeholder="Sezon Adı"
          value={seasonName}
          onChangeText={text => setSeasonName(text)}
        />
        <Button
          onPress={handleCreateSeason}
          disabled={!seasonName}
          testID="createSeasonButton"
          text="Sezon Ekle"
        />
      </Container>
    </CustomBottomSheet>
  );
}
