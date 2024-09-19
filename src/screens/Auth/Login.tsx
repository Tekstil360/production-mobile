import {Alert, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container/Container';
import Input from '../../components/Input/Input';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button/Button';
import styled from 'styled-components';
import {useLoginMutation} from '../../services/authService';
import LoginDto from '../../dto/Request/LoginDto';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {AuthActions} from '../../store/features/authReducer';
import CustomText from '../../components/Text/Text';
import useThemeColors from '../../constant/useColor';
import Footer from '../../components/Footer/Footer';
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import {useTranslation} from 'react-i18next';

export default function Login(props: any) {
  const {t} = useTranslation();
  const colors = useThemeColors();
  const dispatch: AppDispatch = useDispatch();
  const [useLogin, result] = useLoginMutation();
  const [loginDto, setLoginDto] = useState({
    email: 'ozkankocakaplan@gmail.com',
    password: '123456',
  });
  const handleChange = (name: keyof LoginDto, value: string) => {
    setLoginDto({
      ...loginDto,
      [name]: value,
    });
  };
  const handleLogin = () => {
    useLogin(loginDto)
      .unwrap()
      .then(res => {
        if (res.isSuccess) {
          dispatch(AuthActions.setUser(res.entity));
        } else {
          AlertDialog.showModal({
            hideCancelBtn: true,
            title: 'Hata',
            message: res.exceptionMessage,
          });
        }
      })
      .catch(er => Alert.alert(JSON.stringify(er)));
  };
  return (
    <Container>
      <Content>
        <Input
          testID="emailInput"
          autoCapitalize="none"
          autoCorrect={false}
          value={loginDto.email}
          onChangeText={value => handleChange('email', value)}
          placeholder={t('email')}
          icon={faEnvelope}
        />
        <Input
          testID="passwordInput"
          value={loginDto.password}
          onChangeText={value => handleChange('password', value)}
          placeholder={t('password')}
          icon={faLock}
          secureTextEntry
        />
        <ForgotPasswordContainer
          onPress={() => props.navigation.navigate('ForgotPasswordScreen')}
          hitSlop={10}>
          <ForgotPasswordText theme={{colors}}>
            {t('forgot_password')}
          </ForgotPasswordText>
        </ForgotPasswordContainer>
        <LoginButtonContainer>
          <Button
            testID="loginButton"
            onPress={() => {
              handleLogin();
            }}
            loading={result.isLoading}
            text={t('login_button')}
          />
        </LoginButtonContainer>
        <AlternativeTextContainer>
          <AlternativeText theme={{colors}}>{t('or')}</AlternativeText>
        </AlternativeTextContainer>
        <RegisterContainer>
          <Button
            width={'200px'}
            outline
            onPress={() => {
              props.navigation.navigate('RegisterScreen');
            }}
            text={t('register_button')}
          />
        </RegisterContainer>
      </Content>

      <Footer />
    </Container>
  );
}
const Content = styled(View)`
  margin: 20px;
  gap: 10px;
  flex: 1;
`;
const LoginButtonContainer = styled(View)`
  display: flex;
`;
const ForgotPasswordContainer = styled(TouchableOpacity)`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  align-self: flex-end;
`;
const ForgotPasswordText = styled(CustomText)`
  color: ${props => props.theme.colors.textColor};
`;
const RegisterContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AlternativeTextContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const AlternativeText = styled(CustomText)`
  color: ${props => props.theme.colors.textColor};
`;
