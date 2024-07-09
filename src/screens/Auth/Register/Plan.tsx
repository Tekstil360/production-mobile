import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components';
import CustomText from '../../../components/Text/Text';
import Carousel from 'react-native-snap-carousel';
import Container from '../../../components/Container/Container';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store';
import {PlanActions} from '../../../store/features/planReducer';
import PlanResponse from '../../../dto/Response/PlanResponse';

export default function Plan() {
  const dispatch: AppDispatch = useDispatch();
  const {plans, selectedPlan} = useSelector((x: RootState) => x.plan);
  const [selectedIndex, setSelectedIndex] = useState(2);
  const carouselRef = React.useRef<any>(null);

  return (
    <Container>
      <TitleContainer>
        <Title>Choose a Plan</Title>
      </TitleContainer>
      <Carousel
        ref={r => (carouselRef.current = r)}
        vertical={false}
        data={plans || []}
        firstItem={1}
        inactiveSlideOpacity={0.5}
        sliderWidth={400}
        itemWidth={500 * 0.5}
        slideStyle={{display: 'flex', alignItems: 'center'}}
        renderItem={({item, index}) => (
          <PlanItem
            plan={item}
            index={index}
            key={index}
            onPress={() => {
              if (selectedPlan?.id !== item.id) {
                dispatch(PlanActions.setSelectedPlan(item));
              } else {
                dispatch(PlanActions.setSelectedPlan(null));
              }
            }}
            goToNext={() => {
              carouselRef.current.snapToNext();
            }}
            selected={item.id === selectedPlan?.id}
          />
        )}
      />
    </Container>
  );
}
interface PlanItemProps extends TouchableOpacityProps {
  plan: PlanResponse;
  index: number;
  selected: boolean;
  goToNext: () => void;
}

const PlanItem = (props: PlanItemProps) => {
  const {plan} = props;
  return (
    <PlanContainer
      onPress={props.goToNext}
      activeOpacity={1}
      theme={{
        color: '#fff',
      }}>
      <PlanHeaderContainer
        theme={{
          recommend: props.index === 1,
          color: '#009479',
        }}>
        {props.index === 1 && (
          <RecommenedContainer
            theme={{
              color: '#007C64',
            }}>
            <RecommenedText>Recommended</RecommenedText>
          </RecommenedContainer>
        )}
        <PlanTitleContainer>
          <PlanTitle>{plan.planName}</PlanTitle>
          <PlanSubTitle>{plan.description}</PlanSubTitle>
        </PlanTitleContainer>
      </PlanHeaderContainer>
      <PlanContent>
        {plan.planDescriptions.map((x, i) => (
          <PlanListItem key={i}>
            <FontAwesomeIcon icon={faCheck} color="#009479" size={15} />
            <PlanListItemText>{x.description}</PlanListItemText>
          </PlanListItem>
        ))}
      </PlanContent>
      <PlanPrice>
        <PlanPriceText>
          {plan?.currency &&
            new Intl.NumberFormat(plan?.currency, {
              style: 'currency',
              currency: plan?.currency,
            }).format(plan.price)}
        </PlanPriceText>
        <PlanDescription>per month</PlanDescription>
      </PlanPrice>
      <PlanFooter>
        <Button
          {...props}
          outline={!props.selected}
          backgroundColor="#009479"
          textColor={props.selected ? '#fff' : '#009479'}
          text="Purchase"
        />
      </PlanFooter>
    </PlanContainer>
  );
};

const TitleContainer = styled(View)`
  padding: 20px 0;
  align-items: center;
`;
const Title = styled(CustomText)`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;
const PlanContainer = styled(TouchableOpacity)`
  height: 450px;
  width: 250px;
  margin-top: 4px;
  background-color: ${props => props.theme.color};
  border-radius: 25px;
  shadow-color: #000;
  shadow-offset: 0.5px 0.5px;
  shadow-opacity: 0.25;
  shadow-radius: 1.34px;
`;
const PlanHeaderContainer = styled(View)`
  height: ${props => (props.theme.recommend ? '150px' : '100px')};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: ${props => props.theme.color};
`;
const PlanTitleContainer = styled(View)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const PlanTitle = styled(CustomText)`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;
const PlanSubTitle = styled(CustomText)`
  font-size: 11px;
  color: #fff;
  text-align: center;
`;
const RecommenedContainer = styled(View)`
  height: 50px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: ${props => props.theme.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RecommenedText = styled(CustomText)`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
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
  color: #009479;
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
