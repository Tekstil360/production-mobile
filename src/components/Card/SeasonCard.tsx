import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import SeasonResponse from '../../dto/Response/Season/SeasonResponse';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import Icon from '../Icon/Icon';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

interface SeasonCardProps extends TouchableOpacityProps {
  item: SeasonResponse;
}

export default function SeasonCard(props: SeasonCardProps) {
  const {item} = props;
  return (
    <SeasonCardContainer {...props} activeOpacity={0.7}>
      <SeasonInfo>
        {item.isActivated && (
          <CustomText fontSizes="caption" color="green" fontWeight="bold">
            Aktif Sezon
          </CustomText>
        )}
        <CustomText fontWeight="bold">{item.seasonName}</CustomText>
      </SeasonInfo>
      <SeasonRightIcon>
        <Icon icon={faAngleRight} />
      </SeasonRightIcon>
    </SeasonCardContainer>
  );
}
const SeasonCardContainer = styled(TouchableOpacity)`
  background-color: white;
  padding: 10px;
  margin: 5px;
  flex-direction: row;
  border-radius: 5px;
`;
const SeasonInfo = styled(View)`
  flex: 1;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  justify-content: center;
`;
const SeasonRightIcon = styled(View)`
  flex: 1;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: flex-end;
`;
