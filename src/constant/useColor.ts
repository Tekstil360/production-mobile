import useColorScheme from './useColorScheme';

const Colors = {
  light: {
    background: '#f9f9f9',
    primary: '#D7C9BC',
    buttonColor: '#9c6644',
    textColor: '#70664C',
    secondary: '#a55eea',
    inputBorder: '#ebeff3',
    activeBorder: '#D7C9BC',
    unActiveBottomTab: '#9395A1',
    iconColor: '#564839',
    success: '#488E48',
    errorColor: '#ff0000',
    descriptionColor: '#797979',
    white: '#fff',
  },
  dark: {
    background: '#f9f9f9',
    primary: '#D7C9BC',
    buttonColor: '#9c6644',
    textColor: '#70664C',
    secondary: '#a55eea',
    inputBorder: '#ebeff3',
    activeBorder: '#D7C9BC',
    unActiveBottomTab: '#9395A1',
    iconColor: '#564839',
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
