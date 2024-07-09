import React, {useState} from 'react';
import Container from '../../components/Container/Container';
import Input from '../../components/Input/Input';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import Button from '../../components/Button/Button';
import styled from 'styled-components';
import CustomText from '../../components/Text/Text';
import {View} from 'react-native';
import useThemeColors from '../../constant/useColor';
import FormContainer, {FormContainerRef} from 'react-native-form-container';

export default function ForgotPassword(props: any) {
  const colors = useThemeColors();
  const formContainerRef = React.useRef<FormContainerRef>(null);
  const [email, setEmail] = useState('');
  return (
    <Container>
      <TitleContainer>
        <Title>Şifremi Unuttum</Title>
        <SubTitle>
          E-posta adresinizi girin, size şifre sıfırlama bağlantısı
          göndereceğiz.
        </SubTitle>
      </TitleContainer>
      <Content>
        <FormContainer formContainerRef={formContainerRef}>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            required
            id="email"
            value={email}
            onChangeText={setEmail}
            validation="email"
            placeholder="E-posta"
            icon={faEnvelope}
          />
        </FormContainer>
        <ForgotButtonContainer>
          <Button
            text="Gönder"
            onPress={() => {
              let result = formContainerRef.current?.validate({
                email: 'E-posta adresi geçerli değil!',
              });
              console.log(result, 'sonuc');
            }}
          />
        </ForgotButtonContainer>
        <AlternativeTextContainer>
          <AlternativeText theme={{colors}}>veya</AlternativeText>
        </AlternativeTextContainer>
        <LoginContainer>
          <Button
            outline
            onPress={() => {
              props.navigation.navigate('LoginScreen');
            }}
            text="Vazgeç"
          />
        </LoginContainer>
      </Content>
    </Container>
  );
}
const Content = styled(View)`
  margin: 20px;
  gap: 10px;
  flex: 1;
`;
const ForgotButtonContainer = styled(View)`
  display: flex;
  margin-top: 5px;
`;

const LoginContainer = styled(View)`
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
const TitleContainer = styled(View)`
  padding: 20px 0;
  align-items: center;
  gap: 15px;
`;
const Title = styled(CustomText)`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;
const SubTitle = styled(CustomText)`
  font-size: 14px;
  color: #666;
`;
