import React from 'react';
import styled from 'styled-components';
import CustomText from '../../components/Text/Text';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import Icon from '../../components/Icon/Icon';
import {View, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../../store/features/authReducer';
import {faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons';
import {RootStackParamList} from '../../types/Navigator';

export default function DrawerFooter() {
  const dispatch = useDispatch();
  const navigate = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={{marginHorizontal: 10}}>
      <MenuItemContainer
        onPress={() => {
          navigate.navigate('Profile');
        }}
        activeOpacity={0.7}>
        <Icon icon={faUser} color={'#564839'} size={20} />
        <MenuItemText>Profilim</MenuItemText>
      </MenuItemContainer>
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
