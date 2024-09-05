import {
  COLORS,
  FONTSIZES,
  FONTWEIGHT,
  ProductionIcons,
  TransactionIcons,
} from '../constant/theme';

export type SvgType = {
  height?: number;
  width?: number;
  fill?: string;
};
const colorKeys = Object.keys(COLORS) as (keyof typeof COLORS)[];
export type ColorType = (typeof colorKeys)[number];

const fontKeys = Object.keys(FONTSIZES) as (keyof typeof FONTSIZES)[];
export type FontSizeType = (typeof fontKeys)[number];

const fontWeightKeys = Object.keys(FONTWEIGHT) as (keyof typeof FONTWEIGHT)[];
export type FontWeightType = (typeof fontWeightKeys)[number];

const iconProductionKeys = Object.keys(
  ProductionIcons,
) as (keyof typeof ProductionIcons)[];
export type ProductionIconType = (typeof iconProductionKeys)[number];

const iconTransactionKeys = Object.keys(
  TransactionIcons,
) as (keyof typeof TransactionIcons)[];
export type TransactionIconType = (typeof iconTransactionKeys)[number];
