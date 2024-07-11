import useColorScheme from './useColorScheme';

const Colors = {
  light: {
    background: '#f9f9f9',
    primary: '#D7C9BC',
    textColor: '#70664C',
    secondary: '#a55eea',
    inputBorder: '#ebeff3',
    activeBorder: '#D7C9BC',
    iconColor: '#70664C',
    success: '#488E48',
    errorColor: '#ff0000',
    descriptionColor: '#797979',
  },
  dark: {
    background: '#f9f9f9',
    primary: '#D7C9BC',
    textColor: '#70664C',
    secondary: '#a55eea',
    inputBorder: '#ebeff3',
    activeBorder: '#D7C9BC',
    iconColor: '#70664C',
    success: '#488E48',
    errorColor: '#ff0000',
    descriptionColor: '#797979',
  },
};

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  return colors;
};

export default useThemeColors;
