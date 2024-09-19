import {View} from 'react-native';
import React from 'react';
import Container from '../../../components/Container/Container';
import styled from 'styled-components';

import useThemeColors from '../../../constant/useColor';
import CustomText from '../../../components/Text/Text';
import Button from '../../../components/Button/Button';
import LottieView from 'lottie-react-native';
import {CheckAnimation} from '../../../assets/animations';
import {SIZES} from '../../../constant/theme';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../../../store/features/authReducer';

import {useFocusEffect} from '@react-navigation/native';

export default function Result(props: any) {
  const colors = useThemeColors();
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(AuthActions.clearRegister());
      };
    }, []),
  );
  return (
    <Container>
      <ResultContainer>
        <LottieView
          source={CheckAnimation}
          style={{
            width: SIZES.width * 0.4,
            height: SIZES.width * 0.4,
            marginBottom: 20,
          }}
          autoPlay
          loop={false}
        />
        <Title
          style={{
            color: colors.success,
          }}>
          Hesabınız başarıyla oluşturuldu
        </Title>
        <SubTitle
          style={{
            color: colors.descriptionColor,
          }}>
          Şimdi hesabınıza giriş yapabilir ve hizmetlerimizi kullanmaya
          başlayabilirsiniz
        </SubTitle>
        <StartButtonContainer>
          <Button
            width="200px"
            backgroundColor={colors.success}
            textColor={colors.success}
            text="Giriş Yap"
            outline
            onPress={() => {
              props.navigation.reset({
                index: 0,
                routes: [{name: 'LoginScreen'}],
              });
            }}
            style={{
              width: SIZES.width * 0.8,
              backgroundColor: colors.primary,
            }}
          />
        </StartButtonContainer>
      </ResultContainer>
    </Container>
  );
}
const ResultContainer = styled(View)`
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 10px;
  padding: 0 20px;
`;
const Title = styled(CustomText)`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: ${({theme}) => theme.textColor};
`;
const SubTitle = styled(CustomText)`
  font-size: 16px;
  text-align: center;
  color: ${({theme}) => theme.descriptionColor};
`;
const StartButtonContainer = styled(View)`
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;
