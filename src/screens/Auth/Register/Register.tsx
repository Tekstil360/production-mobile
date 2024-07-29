import React, {useRef, useState} from 'react';
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

import {useRegisterMutation} from '../../../services/authService';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import {RootStackParamList} from '../../../types/Navigator';
import {useTranslation} from 'react-i18next';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../../../components/CBottomSheet/CustomBottomSheet';
import {useGetContractsMutation} from '../../../services/appSettingService';
import WebView from 'react-native-webview';
import {SIZES} from '../../../constant/theme';

export default function Register(
  props: NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>,
) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [registerLoading, setRegisterLoading] = useState(false);
  const register = useSelector((state: RootState) => state.auth.register);
  const formContainerRef = useRef<FormContainerRef>(null);
  const contractBottomSheetRef = useRef<BottomSheetRef>(null);
  const [contract, setContract] = useState('');
  const [getContract] = useGetContractsMutation();
  const [useRegister] = useRegisterMutation();
  const handleRegister = () => {
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
      setRegisterLoading(true);
      useRegister(register)
        .unwrap()
        .then(res => {
          if (res.isSuccess) {
            props.navigation.navigate('ResultScreen');
          } else {
            AlertDialog.showModal({
              title: 'Hata',
              message: res.exceptionMessage,
            });
          }
        })
        .catch(er => console.log(er))
        .finally(() => setRegisterLoading(false));
    }
  };
  const htmlContent = `
  <html>
  <head>
    <style>
      body {
        font-size: 40px;
      }
    </style>
  </head>
  <body>
    ${contract}
  </body>
  </html>
`;
  return (
    <Container type="page">
      <Container>
        <TitleContainer>
          <Title>{t('register')}</Title>
          <SubTitle>{t('register_subTitle')}</SubTitle>
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
                    placeholder={t('firstName')}
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
                    placeholder={t('lastName')}
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
                    placeholder={t('companyName')}
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
                    placeholder={t('email')}
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
                    placeholder={t('phone')}
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
                    placeholder={t('password')}
                    icon={faLock}
                    secureTextEntry
                  />
                </FormContainer>
              </PreviousNextView>
            </KeyboardAvoidingView>
            <View style={{marginTop: 10}}>
              <CheckInput
                label={t('privacy_policy')}
                clickedLabel={t('privacy_policy_summary')}
                clickLabel={() => {
                  getContract()
                    .unwrap()
                    .then(res => {
                      if (res.isSuccess) {
                        setContract(res.entity.contractDescription);
                      }
                    })
                    .finally(() => {
                      contractBottomSheetRef.current?.open();
                    });
                }}
              />
            </View>
          </Content>
        </ScrollView>
      </Container>
      <BottomContainer>
        <Button
          outline
          text={t('cancel_button')}
          onPress={() => {
            dispatch(AuthActions.clearRegister());
            props.navigation.goBack();
          }}
        />
        <Button
          loading={registerLoading}
          text={t('register_button')}
          onPress={handleRegister}
        />
      </BottomContainer>
      <CustomBottomSheet snapPoints={['79%']} ref={contractBottomSheetRef}>
        <WebView source={{html: htmlContent}} style={{height: '100%'}} />
      </CustomBottomSheet>
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
