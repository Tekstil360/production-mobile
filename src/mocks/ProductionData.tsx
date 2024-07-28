import BabyPijamaSvg from '../assets/productions/BabyPijamaSvg';
import JacketSvg from '../assets/productions/JacketSvg';
import JeansPantsSvg from '../assets/productions/JeansPantsSvg';
import ScarfSvg from '../assets/productions/ScarfSvg';
import ShirtSvg from '../assets/productions/ShirtSvg';
import ShortPantsSvg from '../assets/productions/ShortPantsSvg';
import SkirtSvg from '../assets/productions/SkirtSvg';
import TshirtSvg from '../assets/productions/TshirtSvg';
import {SvgType} from '../types/type';
interface ProductionProps {
  title: string;
  ImageSvg: React.ComponentType<SvgType>;
}
export const ProductionData: ProductionProps[] = [
  {
    title: 'Bebek Pijama',
    ImageSvg: props => <BabyPijamaSvg {...props} />,
  },
  {
    title: 'Ceket',
    ImageSvg: props => <JacketSvg {...props} />,
  },
  {
    title: 'Kot Pantolon',
    ImageSvg: props => <JeansPantsSvg {...props} />,
  },
  {
    title: 'Atkı',
    ImageSvg: props => <ScarfSvg {...props} />,
  },
  {
    title: 'Gömlek',
    ImageSvg: props => <ShirtSvg {...props} />,
  },
  {
    title: 'Şort',
    ImageSvg: props => <ShortPantsSvg {...props} />,
  },
  {
    title: 'Etek',
    ImageSvg: props => <SkirtSvg {...props} />,
  },
  {
    title: 'T-shirt',
    ImageSvg: props => <TshirtSvg {...props} />,
  },
];
