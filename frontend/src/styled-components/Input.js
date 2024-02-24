import styled from 'styled-components';
import theme from 'styled-theming';
import { baseTheme } from '../theme';

const { colors } = baseTheme;

const textColor = theme('mode', {
  light: colors.darkCharcoal,
  dark: colors.white,
});

const borderColor = theme('mode', {
  light: colors.darkGrey,
  dark: colors.inputDark,
});

const backgroundColor = theme('mode', {
  light: colors.sunray,
  dark: colors.inputDark,
});

const backgroundColorFocus = theme('mode', {
  light: colors.white,
  dark: colors.inputDark,
});

const placeholderColor = theme('mode', {
  light: colors.darkGrey,
  dark: colors.white7,
});

export const Input = styled.input`
  padding: 12px 24px;
  font-size: 16px;
	color: ${textColor};
	background-color: ${backgroundColor};
	border-radius: 20px;
	transition: .2s;
	margin-bottom: 18px;
	width: 100%;
  border: 1.5px solid ${({ error }) => error ? colors.errorRed : borderColor};

  &::placeholder {
    color: ${placeholderColor};
  }

  &:focus {
    background-color: ${backgroundColorFocus};
	  color: ${textColor};
  }

`;