import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomText from '../Text/Text';
import Icon from '../Icon/Icon';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

interface ColProps extends TouchableOpacityProps {
  leftIcon?: any;
  name?: string;
  nameColor?: string;
  icon?: any;
  active?: boolean;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  flex?: number;
}
const ColPlaceholder = (props: ColProps) => {
  const opacityColor = props.active ? '#CCCCCC80' : '#fff';
  return (
    <TouchableOpacity
      {...props}
      style={{
        marginHorizontal: props.mx || 0,
        marginVertical: props.my || 0,
        marginTop: props.mt || 0,
        marginBottom: props.mb || 0,
        marginLeft: props.ml || 0,
        marginRight: props.mr || 0,
        borderRadius: 7,
        paddingHorizontal: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        paddingVertical: 10,
        backgroundColor: opacityColor,
        flex: props.flex || 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        {props.leftIcon}
        <CustomText fontSizes="normal" color="primary" fontWeight="normal">
          {props.name}
        </CustomText>
        <Icon icon={faAngleRight} color="#D8B267" />
      </View>
      {props.icon}
    </TouchableOpacity>
  );
};
export default ColPlaceholder;
