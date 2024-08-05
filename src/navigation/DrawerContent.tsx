import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleRight,
  faRightFromBracket,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import {AuthActions} from '../store/features/authReducer';
import {AppActions} from '../store/features/appReducer';
import CustomText from '../components/Text/Text';
import useThemeColors from '../constant/useColor';
import Icon from '../components/Icon/Icon';

const menus = ['Kullanıcılar', 'Üretimlerim', 'Ürünlerim', 'Ayarlar'];
interface DrawerContentProps extends DrawerContentComponentProps {
  drawerSeasonOpen: boolean;
}
export default function DrawerContent(props: DrawerContentProps) {
  const dispatch: AppDispatch = useDispatch();
  const colors = useThemeColors();
  const seasons = useSelector((x: RootState) => x.season.seasons);
  const userInfo = useSelector((x: RootState) => x.auth.userInfo);
  const activeSeason = seasons.find(x => x.isActivated);
  const drawerSeasonOpen = useSelector(
    (x: RootState) => x.app.drawerSeasonOpen,
  );

  return (
    <Container>
      <InfoContainer>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 5,
              borderRadius: 10,
            }}>
            <TitleText adjustsFontSizeToFit numberOfLines={1}>
              {userInfo.companyName}
            </TitleText>
            <SubTitleContainer
              onPress={() => {
                dispatch(AppActions.setDrawerSeasonOpen(!drawerSeasonOpen));
              }}>
              <SubTitleText adjustsFontSizeToFit>
                {activeSeason?.seasonName || 'Sezon Seç'}
              </SubTitleText>
              <FontAwesomeIcon
                icon={faAngleRight}
                color={colors.white}
                size={20}
              />
            </SubTitleContainer>
          </View>
        </View>
      </InfoContainer>
      {!drawerSeasonOpen ? (
        <>
          <MenuContainer>
            {menus.map((menu, index) => (
              <MenuItemContainer
                onPress={() => {
                  props.navigation.navigate('Productions');
                }}
                key={index}>
                <Icon icon={faUsers} color={colors.white} size={20} />
                <MenuItemText>{menu}</MenuItemText>
              </MenuItemContainer>
            ))}
          </MenuContainer>
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
                    props.navigation.closeDrawer();
                    dispatch(AuthActions.clearUser());
                  },
                  onCancel() {
                    AlertDialog.dismiss();
                  },
                });
              }}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                color={'#fff'}
                size={20}
              />
              <MenuItemText>Çıkış Yap</MenuItemText>
            </MenuItemContainer>
          </View>
        </>
      ) : (
        <MenuContainer>
          {seasons.map((season, index) => (
            <MenuItemContainer key={index}>
              <MenuItemText>{season.seasonName}</MenuItemText>
            </MenuItemContainer>
          ))}
        </MenuContainer>
      )}
    </Container>
  );
}
const Container = styled(SafeAreaView)`
  background-color: #d7c9bc;
  flex: 1;
`;
const InfoContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #d7c9bc;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
`;
const TitleText = styled(CustomText)`
  font-size: 20px;
  color: ${props => props.theme.textColor || '#fff'};
  font-weight: bold;
  margin-bottom: 5px;
`;
const SubTitleContainer = styled(TouchableOpacity)`
  padding: 5px;
  background-color: #cbc1b7;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const SubTitleText = styled(CustomText)`
  font-size: 12px;
  color: ${props => props.theme.textColor || '#fff'};
  font-weight: bold;
`;
const MenuContainer = styled(DrawerContentScrollView)`
  flex: 1;
  padding: 10px;
`;
const MenuItemContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: ${props => props.theme.bgColor || '#9c6644'};
  border-radius: 5px;
  margin-bottom: 5px;
`;
const SeasonText = styled(CustomText)`
  font-size: 16px;
  color: ${props => props.theme.textColor || '#fff'};
  font-weight: bold;
  margin-left: 10px;
`;
const MenuItemText = styled(CustomText)`
  color: ${props => props.theme.textColor || '#fff'};
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;
