import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import CustomText from '../../components/Text/Text';
import {useDispatch, useSelector} from 'react-redux';
import {AppActions} from '../../store/features/appReducer';
import {RootState} from '../../store';
import Icon from '../../components/Icon/Icon';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

export default function DrawerHeader({showSeason}: {showSeason: boolean}) {
  const seasons = useSelector((x: RootState) => x.season.seasons);

  const userInfo = useSelector((x: RootState) => x.auth.userInfo);
  const activeSeason = seasons.find(x => x.isActivated);
  const drawerSeasonOpen = useSelector(
    (x: RootState) => x.app.drawerSeasonOpen,
  );
  const dispatch = useDispatch();

  return (
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
          {showSeason && (
            <SubTitleContainer
              onPress={() => {
                dispatch(AppActions.setDrawerSeasonOpen(!drawerSeasonOpen));
              }}>
              <SubTitleText adjustsFontSizeToFit>
                {activeSeason?.seasonName || 'Sezon Seç'}
              </SubTitleText>
              <Icon icon={faAngleRight} size={20} />
            </SubTitleContainer>
          )}
        </View>
      </View>
    </InfoContainer>
  );
}
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
  color: ${props => props.theme.textColor || '#564839'};
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
  color: ${props => props.theme.textColor || '#564839'};
  font-weight: bold;
`;
