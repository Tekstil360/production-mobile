import {ProductionIcons, TransactionIcons} from '../data/IconData';
import {getResourceByKey} from '../lang/i18n';
import {ProductionIconType, TransactionIconType} from '../types/type';

export const getProductionIconByKey = (name: ProductionIconType): string => {
  let icons = ProductionIcons;
  let find = icons[name];

  return find ? find : icons['default'];
};
export const getTransactionIconByKey = (name: TransactionIconType): string => {
  let icons = TransactionIcons;
  let find = icons[name];
  return find ? find : icons['default'];
};
export const getIconProductionRecommendation = (name: string): string => {
  if (!name) return '';

  let findRecommendation = getResourceByKey('iconProductionRecommendation');
  return findRecommendation[name];
};
export const getIconTransactionRecommendation = (name: string): string => {
  if (!name) return '';

  let findRecommendation = getResourceByKey('iconTransactionRecommendation');
  return findRecommendation[name];
};
