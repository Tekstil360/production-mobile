import React, {useEffect} from 'react';
import Container from '../../components/Container/Container';

import ButtonGroup from '../../components/Button/ButtonGroup';
import {useGetPlansMutation} from '../../services/planService';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {PlanActions} from '../../store/features/planReducer';
import styled from 'styled-components';
import {TouchableOpacity, View} from 'react-native';
import CustomText from '../../components/Text/Text';
import Button from '../../components/Button/Button';

import {faCheck} from '@fortawesome/free-solid-svg-icons';
import useThemeColors from '../../constant/useColor';
import Icon from '../../components/Icon/Icon';
import TextLink from '../../components/TextLink/TextLink';
import {AuthActions} from '../../store/features/authReducer';
import {useCancelSubscriptionMutation} from '../../services/subscriptionService';
import AlertDialog from '../../components/AlertDialog/AlertDialog';

export default function PaymentScreen() {
  const dispatch = useDispatch();
  const [useCancelSubscription] = useCancelSubscriptionMutation();
  const [useGetPlans] = useGetPlansMutation();
  const {plans, selectedPlan} = useSelector((x: RootState) => x.plan);
  useEffect(() => {
    useGetPlans();
  }, []);

  const cancelSubscription = () => {
    AlertDialog.showModal({
      title: 'Aboneliği İptal Et',
      message:
        'Aboneliğinizi iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz. Tüm bilgileriniz 7 gün içinde silinecektir.',

      onConfirm() {
        useCancelSubscription().then(res => {
          const {data} = res;
          if (data?.entity) {
            dispatch(AuthActions.logout());
          }
        });
      },
    });
  };
  return (
    <Container>
      {plans && (
        <ButtonGroup
          buttons={plans}
          datafield="planName"
          onPress={(index, selectedValue) => {
            dispatch(PlanActions.setSelectedPlan(selectedValue));
          }}
        />
      )}
      {selectedPlan && (
        <View style={{alignItems: 'center'}}>
          <PlanContainer
            activeOpacity={1}
            theme={{
              color: '#fff',
            }}>
            <PlanHeaderContainer
              theme={{
                color: '#fff',
              }}>
              <PlanTitleContainer>
                <PlanSubTitle>{selectedPlan.description}</PlanSubTitle>
              </PlanTitleContainer>
            </PlanHeaderContainer>
            <PlanContent>
              {selectedPlan.planDescriptions.map((x, i) => (
                <PlanListItem key={i}>
                  <Icon icon={faCheck} color="#9c6644" size={15} />
                  <PlanListItemText>{x.description}</PlanListItemText>
                </PlanListItem>
              ))}
            </PlanContent>
            <PlanPrice>
              <PlanPriceText>
                {selectedPlan?.currency &&
                  new Intl.NumberFormat(selectedPlan?.currency, {
                    style: 'currency',
                    currency: selectedPlan?.currency,
                  }).format(selectedPlan.price)}
              </PlanPriceText>
              <PlanDescription>aylık</PlanDescription>
            </PlanPrice>
            <PlanFooter>
              <Button
                backgroundColor="#9c6644"
                textColor="#fff"
                text="Satın Al"
              />
            </PlanFooter>
          </PlanContainer>
        </View>
      )}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15,
          marginHorizontal: 10,
        }}>
        <TextLink
          fontSize="description"
          splitText="vazgeçmek istiyorum."
          onClick={cancelSubscription}
          text="Aboneliğimi iptal etmek, tüm bilgilerimin silinmesini talep etmek ve
               satın almaktan vazgeçmek istiyorum."
        />
      </View>
    </Container>
  );
}

const PlanContainer = styled(TouchableOpacity)`
  margin-horizontal: 10px;
  margin-top: 4px;
  width: 80%;
  background-color: ${props => props.theme.color};
  border-radius: 25px;
  border-width: 1px;
  border-color: #f4f4f4;
`;
const PlanHeaderContainer = styled(View)`
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: ${props => props.theme.color};
`;
const PlanTitleContainer = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  min-height: 100px;
  border-bottom-width: 1px;
  border-bottom-color: #f4f4f4;
`;

const PlanSubTitle = styled(CustomText)`
  font-size: 11px;
  color: #808080;
  text-align: center;
`;

const PlanContent = styled(View)`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f4f4f4;
`;
const PlanPrice = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const PlanPriceText = styled(CustomText)`
  font-size: 20px;
  color: #444;
  font-weight: bold;
`;
const PlanDescription = styled(CustomText)`
  font-size: 12px;
  color: #797979;
`;
const PlanListItem = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 10px;
  padding-right: 15px;
`;
const PlanListItemText = styled(CustomText)`
  font-size: 12px;
  color: #797979;
`;
const PlanFooter = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
