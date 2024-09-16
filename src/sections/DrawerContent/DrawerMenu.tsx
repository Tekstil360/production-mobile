import React from 'react';
import styled from 'styled-components';
import CustomText from '../../components/Text/Text';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Menus} from '../../data/MenuData';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

export default function DrawerMenu() {
  const navigation = useNavigation<any>();
  const {userPermission} = useSelector((state: RootState) => state.user);

  return (
    <MenuContainer>
      {Menus.filter(m => {
        return userPermission?.some(c =>
          c.permissionScreenList.some(d => d === m.route),
        );
      }).map((menu, index) => (
        <MenuItemContainer
          testID={`drawerMenuItem-${menu.route}`}
          onPress={() => {
            navigation.navigate(menu.route);
          }}
          key={index}>
          <View style={{width: 25}}>
            <SvgXml
              xml={menu.icon}
              width={menu.width}
              height={menu.height}
              color={'#564839'}
            />
          </View>

          <MenuItemText>{menu.name}</MenuItemText>
        </MenuItemContainer>
      ))}
    </MenuContainer>
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
