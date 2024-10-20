import React from 'react';

import {useCreateSeasonMutation} from '../../../services/seasonService';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../../components/CBottomSheet/CustomBottomSheet';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import Title from '../../../components/Title/Title';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';

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
