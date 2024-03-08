import { extendTheme } from 'native-base';
import { DefaultTheme } from '@react-navigation/native';

export const theme = extendTheme({
  fontConfig: {
    DMSans: {
      100: {
        normal: 'DMSans-Regular',
        italic: 'DMSans-Italic',
      },
      200: {
        normal: 'DMSans-Regular',
        italic: 'DMSans-Italic',
      },
      300: {
        normal: 'DMSans-Regular',
        italic: 'DMSans-Italic',
      },
      400: {
        normal: 'DMSans-Regular',
        italic: 'DMSans-Italic',
      },
      500: {
        normal: 'DMSans-Medium',
        italic: 'DMSans-MediumItalic',
      },
      600: {
        normal: 'DMSans-Medium',
        italic: 'DMSans-MediumItalic',
      },
      700: {
        normal: 'DMSans-Bold',
        italic: 'DMSans-BoldItalic',
      },
      800: {
        normal: 'DMSans-Bold',
        italic: 'DMSans-BoldItalic',
      },
      900: {
        normal: 'DMSans-Bold',
        italic: 'DMSans-BoldItalic',
      },
    },
  },
  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'DMSans',
    body: 'DMSans',
    mono: 'DMSans',
  },
  colors: {
    primary: {
      50: '#d9f7ff',
      100: '#ace1ff',
      200: '#7cccff',
      300: '#49b7ff',
      400: '#1aa2ff',
      500: '#0089e6',
      600: '#006ab4',
      700: '#004c82',
      800: '#002e51',
      900: '#001021',
      1000: '#DE5B57',
      1100: '#00b8e4',

    },
    skyblue: {
      100: '#6cd4e1',
      200: '#00b8e4',
    },
    black: {
      0: '#000000',
      50: '#E5E5E5',
      100: '#BABABA',
      200: '#e8e8e8',
      300: '#A4A4A4',
      400: '#959699',
      500: '#818488',
      600: '#25262A',
      800: '#ccc',
      700: '#333',
      900: '#2C2C2C',
      1000: '#231F20',
    },
    red: {
      900: '#EA452F',
      100: "#B0171F",
    },
    green: {
      400: '#019a4a',
    },
    yellow: {
      400: '#f5aa01',
    },
    gray: {
      100: '#EDEEEE',
      200: '#969596',
      300: '#a1a1a1',
      500: '#d3d3d3',
      600: '#5A6078',
      700: '#3f4545',
      800: '#b4b4b4',
      900: '#808080',
    },
    appWhite: {
      100: '#ffffff',
      700: '#f9f9f9',
      600: '#FFFFFF',
      800: '#f6f6f6',
      900: '#fffafa',

    },
    blue: {
      50: '#219ebc',
      100: '#40e0d0',
      500: '#2396f3',
      600: '#49658c',
      700: '#90B9FE',
      800: '#138eaf',
      900: '#369eba',
      1000: '#0f3e53'
    },
    purple: {
      400: '#6d217c',
      500: '#A9ACBA',
    },
    transparentGray: {
      100: 'rgba(90, 90, 90,0.8)',
    },
  },
  config: {
    initialColorMode: 'light',
  },
});

export const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#86b7fe',
  },
};

type CustomThemeType = typeof theme;

declare module 'native-base' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ICustomTheme extends CustomThemeType { }
}
