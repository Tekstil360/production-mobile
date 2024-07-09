import React, {useRef} from 'react';
import Container from '../../../components/Container/Container';
import Button from '../../../components/Button/Button';
import styled from 'styled-components';
import CustomText from '../../../components/Text/Text';
import Input from '../../../components/Input/Input';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import CheckInput from '../../../components/CheckInput/CheckInput';
import {PreviousNextView} from 'react-native-keyboard-manager';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {AuthActions} from '../../../store/features/authReducer';
import {
  faBuilding,
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../../navigation/RootNavigator';

export default function Register(
  props: NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>,
) {
  const dispatch = useDispatch();
  const register = useSelector((state: RootState) => state.auth.register);
  const formContainerRef = useRef<FormContainerRef>(null);
  return (
    <Container>
      <View style={{flex: 1}}>
        <TitleContainer>
          <Title>Kayıt Ol</Title>
          <SubTitle>Kayıt olmak için aşağıdaki bilgileri doldurun</SubTitle>
        </TitleContainer>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Content>
            <KeyboardAvoidingView
              behavior={undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
              <PreviousNextView>
                <FormContainer
                  style={{gap: 15}}
                  formContainerRef={formContainerRef}>
                  <Input
                    required
                    id="firstName"
                    value={register?.firstName}
                    onChangeText={e =>
                      dispatch(
                        AuthActions.setRegister({
                          key: 'firstName',
                          value: e,
                        }),
                      )
                    }
                    placeholder="Ad"
                    icon={faUser}
                  />
                  <Input
                    required
                    id="lastName"
                    value={register?.lastName}
                    onChangeText={e =>
                      dispatch(
                        AuthActions.setRegister({
                          key: 'lastName',
                          value: e,
                        }),
                      )
                    }
                    placeholder="Soyad"
                    icon={faUser}
                  />
                  <Input
                    required
                    id="companyName"
                    value={register?.companyName}
                    onChangeText={e =>
                      dispatch(
                        AuthActions.setRegister({
                          key: 'companyName',
                          value: e,
                        }),
                      )
                    }
                    placeholder="Şirket İsmi"
                    icon={faBuilding}
                  />
                  <Input
                    required
                    id="email"
                    autoCapitalize="none"
                    validation="email"
                    value={register?.email}
                    onChangeText={e =>
                      dispatch(
                        AuthActions.setRegister({
                          key: 'email',
                          value: e,
                        }),
                      )
                    }
                    placeholder="E-posta"
                    icon={faEnvelope}
                  />
                  <Input
                    required
                    id="phone"
                    validation="phone"
                    value={register?.phone}
                    onChangeText={e =>
                      dispatch(
                        AuthActions.setRegister({
                          key: 'phone',
                          value: e,
                        }),
                      )
                    }
                    placeholder="Telefon"
                    icon={faPhone}
                  />
                  <Input
                    required
                    passwordOptions={{
                      minLength: 6,
                    }}
                    id="password"
                    validation="password"
                    value={register?.password}
                    onChangeText={e =>
                      dispatch(
                        AuthActions.setRegister({
                          key: 'password',
                          value: e,
                        }),
                      )
                    }
                    placeholder="Şifre"
                    icon={faLock}
                    secureTextEntry
                  />
                </FormContainer>
              </PreviousNextView>
            </KeyboardAvoidingView>
            <View style={{marginTop: 10}}>
              <CheckInput
                label="Gizlilik sözleşmesini okudum ve kabul ediyorum."
                clickedLabel="Gizlilik sözleşmesini"
                clickLabel={() => console.log('clicked')}
              />
            </View>
          </Content>
        </ScrollView>
      </View>
      <BottomContainer>
        <Button
          outline
          text="Vazgeç"
          onPress={() => {
            dispatch(AuthActions.clearRegister());
            props.navigation.goBack();
          }}
        />
        <Button
          text="Kayıt Ol"
          onPress={() => {
            let result = formContainerRef.current?.validate({
              firstName: 'Ad alanı boş bırakılamaz!',
              lastName: 'Soyad alanı boş bırakılamaz!',
              companyName: 'Şirket ismi alanı boş bırakılamaz!',
              email: 'E-posta alanı boş bırakılamaz!',
              phone: 'Telefon alanı boş bırakılamaz!',
              password: 'Şifre alan boş bırakılamaz!',
              minLength: 'Şifre en az 6 karakter olmalıdır!',
            });
            if (result) {
              props.navigation.navigate('ResultScreen');
            }
          }}
        />
      </BottomContainer>
    </Container>
  );
}

const BottomContainer = styled(View)`
  margin: 0px 30px;
  padding: 15px 0px;
  flex-direction: row;
  justify-content: space-between;
`;
const Content = styled(View)`
  margin: 20px;
  gap: 10px;
  flex: 1;
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
