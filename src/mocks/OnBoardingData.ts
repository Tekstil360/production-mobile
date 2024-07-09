import {AnimationObject} from 'lottie-react-native';
import {
  OnboardingAnimation1,
  OnboardingAnimation2,
  OnboardingAnimation3,
} from './LottieData';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  description?: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: OnboardingAnimation1,
    text: 'Üretim Süreç Yönetimi',
    description:
      'Üretim süreçlerini takip etmek, karmaşık ve zaman alan bir süreç olabilir. Birçok farklı aşamayı ve faktörü takip etmeniz gerekir. Neyse ki, imalat süreçlerini kolayca takip etmenize yardımcı olabilecek araçlar var.',
    textColor: '#70664C',
    backgroundColor: '#F8E9B0',
  },
  {
    id: 2,
    animation: OnboardingAnimation2,
    text: 'Kolay Sipariş Yönetimi',
    description:
      'Sipariş yönetimi, karmaşık ve zaman alan bir süreç olabilir. Siparişler ekranımız, siparişlerinizi kolayca yönetmenize ve üretim sürecinizi optimize etmenize yardımcı olmak için tasarlanmıştır.',
    textColor: '#00914C',
    backgroundColor: '#FFF',
  },
  {
    id: 3,
    animation: OnboardingAnimation3,
    text: 'Stok Takip Ekranı',
    description:
      'Stok takibi, karmaşık ve zaman alan bir süreç olabilir. Stok takip ekranımız, stok takibinizi kolaylaştırmak ve daha verimli hale getirmek için tasarlanmıştır.',
    textColor: '#F15937',
    backgroundColor: '#FCFCFC',
  },
];

export default data;
