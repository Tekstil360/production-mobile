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
import {useTranslation} from 'react-i18next';

export default function ForgotPassword(props: any) {
  const {t} = useTranslation();
  const colors = useThemeColors();
  const formContainerRef = React.useRef<FormContainerRef>(null);
  const [email, setEmail] = useState('');
  return (
    <Container>
      <TitleContainer>
        <Title>{t('forgot_password_title')}</Title>
        <SubTitle>{t('forgot_password_subTitle')}</SubTitle>
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
            placeholder={t('email')}
            icon={faEnvelope}
          />
        </FormContainer>
        <ForgotButtonContainer>
          <Button
            text={t('send_button')}
            onPress={() => {
              let result = formContainerRef.current?.validate({
                email: 'E-posta adresi geçerli değil!',
              });
              console.log(result, 'sonuc');
            }}
          />
        </ForgotButtonContainer>
        <AlternativeTextContainer>
          <AlternativeText theme={{colors}}>{t('or')}</AlternativeText>
        </AlternativeTextContainer>
        <LoginContainer>
          <Button
            outline
            onPress={() => {
              props.navigation.navigate('LoginScreen');
            }}
            text={t('cancel_button')}
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
  align-items: center;
  margin-top: 20px;
  gap: 15px;
  padding-horizontal: 20px;
`;
const Title = styled(CustomText)`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;
const SubTitle = styled(CustomText)`
  font-size: 14px;
  color: #666;
  text-align: center;
`;
