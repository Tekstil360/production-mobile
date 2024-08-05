import useColorScheme from './useColorScheme';

const Colors = {
  light: {
    background: '#f9f9f9',
    primary: '#B08968',
    textColor: '#70664C',
    secondary: '#a55eea',
    inputBorder: '#ebeff3',
    activeBorder: '#D7C9BC',
    unActiveBottomTab: '#E6CCB3',
    iconColor: '#FFFFFF',
    success: '#488E48',
    errorColor: '#ff0000',
    descriptionColor: '#797979',
    white: '#fff',
  },
  dark: {
    background: '#f9f9f9',
    primary: '#B08968',
    textColor: '#70664C',
    secondary: '#a55eea',
    inputBorder: '#ebeff3',
    activeBorder: '#D7C9BC',
    unActiveBottomTab: '#E6CCB3',
    iconColor: '#FFFFFF',
    success: '#488E48',
    errorColor: '#ff0000',
    descriptionColor: '#797979',
    white: '#fff',
  },
};

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  return colors;
};

export default useThemeColors;
