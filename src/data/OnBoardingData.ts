import {AnimationObject} from 'lottie-react-native';
import {
  ProductionManagement,
  ProductionReport,
  ProductionSales,
  ProductionStock,
} from '../assets/animations';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  description?: string;
  descriptionTextColor?: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: ProductionManagement,
    text: 'Üretim Süreç Yönetimi',
    description:
      'Üretim süreçlerini takip etmek, karmaşık ve zaman alan bir süreç olabilir. Birçok farklı aşamayı ve faktörü takip etmeniz gerekir. Neyse ki, imalat süreçlerini kolayca takip etmenize yardımcı olabilecek araçlar var.',
    textColor: '#FFA500',
    descriptionTextColor: '#70664C',
    backgroundColor: '#FFF',
  },
  {
    id: 2,
    animation: ProductionSales,
    text: 'Kolay Sipariş Yönetimi',
    description:
      'Sipariş yönetimi, karmaşık ve zaman alan bir süreç olabilir. Siparişler ekranımız, siparişlerinizi kolayca yönetmenize ve üretim sürecinizi optimize etmenize yardımcı olmak için tasarlanmıştır.',
    textColor: '#008022',
    descriptionTextColor: '#70664C',
    backgroundColor: '#f2f2f2',
  },
  {
    id: 3,
    animation: ProductionStock,
    text: 'Stok Takip Ekranı',
    description:
      'Stok takibi, karmaşık ve zaman alan bir süreç olabilir. Stok takip ekranımız, stok takibinizi kolaylaştırmak ve daha verimli hale getirmek için tasarlanmıştır.',
    textColor: '#F15937',
    descriptionTextColor: '#70664C',
    backgroundColor: '#fff',
  },
  {
    id: 4,
    animation: ProductionReport,
    text: 'Raporlama Ekranı',
    description:
      'Raporlama ekranımız, üretim süreçlerinizi daha iyi anlamanıza ve daha iyi kararlar almanıza yardımcı olmak için tasarlanmıştır.',
    textColor: '#7DA3FB',
    descriptionTextColor: '#70664C',
    backgroundColor: '#f2f2f2',
  },
];

export default data;
