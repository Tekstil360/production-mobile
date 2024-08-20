import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import CustomText from '../../components/Text/Text';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../../store/features/authReducer';
import Icon from '../../components/Icon/Icon';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

export default function DrawerFooter() {
  const dispatch = useDispatch();

  return (
    <View style={{marginHorizontal: 10}}>
      <MenuItemContainer
        activeOpacity={0.7}
        onPress={() => {
          AlertDialog.showModal({
            title: 'Çıkış Yap',
            message: 'Çıkış yapmak istediğinize emin misiniz?',
            onConfirmText: 'Çıkış Yap',
            onCancelText: 'İptal',
            onConfirm: () => {
              dispatch(AuthActions.clearUser());
            },
            onCancel() {
              AlertDialog.dismiss();
            },
          });
        }}>
        <Icon icon={faRightFromBracket} color={'#564839'} size={20} />
        <MenuItemText>Çıkış Yap</MenuItemText>
      </MenuItemContainer>
    </View>
  );
}

const MenuContainer = styled(ScrollView)`
  flex: 1;
  padding: 10px;
`;
const MenuItemContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
  background-color: ${props => props.theme.bgColor || 'transparent'};
  border-radius: 5px;
  margin-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
`;

const MenuItemText = styled(CustomText)`
  color: ${props => props.theme.textColor || '#564839'};
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;
