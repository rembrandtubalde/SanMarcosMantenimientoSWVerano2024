import { createGlobalStyle } from 'styled-components';
import theme from 'styled-theming';

export const baseTheme = {
  colors: {
    primaryColor: '#A06EE1',
    lightCharcoal: '#403845',
    charcoal: '#37313C',
    darkCharcoal: '#2F2A32',
    textGrey: '#605866',
    darkGrey: '#AEA8B2',
    grey: '#F0EFFF',
    white: '#FFFFFF',
    errorRed: '#EE661A',
    sunray: '#FEFBF9',
    sunrise: '#C5C1FF',
    firstLight: '#E7CFFF',
    yellow: '#FFC107',
    lightYellow: '#FFF1C8',
    darkSide: '#36393F',
    veryDark: '#292B2F',
    white7: 'rgba(255, 255, 255, 0.7)',
    white8: 'rgba(255, 255, 255, 0.8)',
    white9: 'rgba(255, 255, 255, 0.9)',
    inputDark: '#151515'
  }
};

export const backgroundColor = theme('mode', {
  light: baseTheme.colors.white,
  dark: baseTheme.colors.veryDark,
});

export const GlobalStyle = createGlobalStyle`
  * {
    transition: all 0.2s ease-in-out;
  }

  body {
    background-color: ${backgroundColor};
  }
`;
