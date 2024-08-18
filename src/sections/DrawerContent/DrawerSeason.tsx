import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import styled from 'styled-components';
import CustomText from '../../components/Text/Text';

export default function DrawerSeason() {
  const seasons = useSelector((x: RootState) => x.season.seasons);
  return (
    <SeasonContainer>
      {seasons.map((season, index) => (
        <SeasonItemContainer key={index}>
          <SeasonItemText>{season.seasonName}</SeasonItemText>
        </SeasonItemContainer>
      ))}
    </SeasonContainer>
  );
}
const SeasonContainer = styled(ScrollView)`
  flex: 1;
  padding: 10px;
`;
const SeasonItemContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
  background-color: ${props => props.theme.bgColor || 'transparent'};
  border-radius: 5px;
  margin-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
`;
const SeasonItemText = styled(CustomText)`
  color: ${props => props.theme.textColor || '#564839'};
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;
