import {ProductionIcons, TransactionIcons} from '../data/IconData';
import {getResourceByKey} from '../lang/i18n';

export const getProductionIconByKey = (name: string): string => {
  let icons = ProductionIcons;
  let find = icons.find(x => x.key === name)?.icon;

  return find ? find : icons[0].icon;
};
export const getTransactionIconByKey = (name: string): string => {
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
