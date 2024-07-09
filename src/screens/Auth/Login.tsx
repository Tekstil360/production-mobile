import {Alert, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container/Container';
import Input from '../../components/Input/Input';
import {faEnvelope, faUser} from '@fortawesome/free-regular-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button/Button';
import styled from 'styled-components';
import {useLoginMutation} from '../../services/authService';
import LoginDto from '../../dto/Request/LoginDto';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {AuthActions} from '../../store/features/authReducer';
import CustomText from '../../components/Text/Text';
import dayjs from 'dayjs';
import useThemeColors from '../../constant/useColor';
import Footer from '../../components/Footer/Footer';

export default function Login(props: any) {
  const colors = useThemeColors();
  const dispatch: AppDispatch = useDispatch();
  const [useLogin, result] = useLoginMutation();
  const [loginDto, setLoginDto] = useState({
    email: 'ozkankocakaplan07@gmail.com',
    password: 'admin',
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
        console.log(res);
        if (res.isSuccess) {
          dispatch(AuthActions.setUser(res.entity));
        }
      })
      .catch(er => Alert.alert(JSON.stringify(er)));
  };
  return (
    <Container>
      <Content>
        <Input
          value={loginDto.email}
          onChangeText={value => handleChange('email', value)}
          placeholder="E-posta"
          icon={faEnvelope}
        />
        <Input
          value={loginDto.password}
          onChangeText={value => handleChange('password', value)}
          placeholder="Şifre"
          icon={faLock}
          secureTextEntry
        />
        <ForgotPasswordContainer
          onPress={() => props.navigation.navigate('ForgotPasswordScreen')}
          hitSlop={10}>
          <ForgotPasswordText theme={{colors}}>
            Şifremi Unuttum
          </ForgotPasswordText>
        </ForgotPasswordContainer>
        <LoginButtonContainer>
          <Button
            onPress={() => {
              handleLogin();
            }}
            loading={result.isLoading}
            text="Giriş Yap"
          />
        </LoginButtonContainer>
        <AlternativeTextContainer>
          <AlternativeText theme={{colors}}>veya</AlternativeText>
        </AlternativeTextContainer>
        <RegisterContainer>
          <Button
            outline
            onPress={() => {
              props.navigation.navigate('RegisterScreen');
            }}
            text="Kayıt Ol"
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
