import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import useThemeColors from '../../constant/useColor';
import dayjs from 'dayjs';
import {RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {BaseUrl} from '../../store/api';
import {AppActions} from '../../store/features/appReducer';
import {useTranslation} from 'react-i18next';

export default function Footer() {
  const colors = useThemeColors();
  const dispatch = useDispatch();
  const languages = useSelector((x: RootState) => x.appSettings.languages);
  const selectedLanguage = useSelector(
    (x: RootState) => x.app.selectedLanguage,
  );
  const activeLanguage = languages.find(
    x => x.languageCode === selectedLanguage,
  );
  const [showOtherLanguages, setShowOtherLanguages] = useState(false);
  const {t} = useTranslation();
  return (
    <FooterContainer>
      <FooterHelpContainer>
        {activeLanguage && !showOtherLanguages ? (
          <FlagsContainer
            activeOpacity={0.7}
            onPress={() => {
              setShowOtherLanguages(!showOtherLanguages);
            }}>
            <Image
              source={{uri: `${BaseUrl}${activeLanguage.languageIcon}`}}
              style={{width: 25, height: 25}}
            />
            <CustomText>{activeLanguage.languageName}</CustomText>
          </FlagsContainer>
        ) : (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              {languages.map((x, i) => {
                return (
                  <FlagsContainer
                    activeOpacity={0.7}
                    key={i}
                    onPress={() => {
                      setShowOtherLanguages(!showOtherLanguages);
                      dispatch(AppActions.setSelectedLanguage(x.languageCode));
                    }}>
                    <Image
                      source={{uri: `${BaseUrl}${x.languageIcon}`}}
                      style={{width: 25, height: 25}}
                    />
                    <CustomText>{x.languageName}</CustomText>
                  </FlagsContainer>
                );
              })}
            </ScrollView>
          </View>
        )}
      </FooterHelpContainer>
      <FooterText theme={{colors}}>
        © {dayjs().format('YYYY')} {t('copyright')}
      </FooterText>
    </FooterContainer>
  );
}
const FooterContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const FooterText = styled(CustomText)`
  color: ${props => props.theme.colors.descriptionColor};
`;
const FooterHelpContainer = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const FlagsContainer = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  background-color: #fff;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #f1f1f1;
`;
