import styled from 'styled-components';
import theme from 'styled-theming';
import { baseTheme } from '../theme';

const { colors } = baseTheme;

const backgroundColorHover = theme('mode', {
  light: colors.white,
  dark: colors.darkSide,
});

const textColorHover = theme('mode', {
  light: colors.primaryColor,
  dark: colors.white,
});

const borderColorHover = theme('mode', {
  light: colors.primaryColor,
  dark: colors.darkSide,
});

export const StyledButton = styled.button`
	padding: 12px 34px;
	border-radius: 30px;
	background-color: var(--primary-color);
	border: 2px solid ${borderColorHover};
	font-family: inherit;
	color: var(--white);
	font-weight: bold;
	font-size: 16px;
	cursor: pointer;
	width: 100%;
	box-shadow: 0px 14px 23px rgba(28, 37, 44, 0.08);

  &:hover {
    background-color: ${backgroundColorHover};
	  color: ${textColorHover};
    border: 2px solid ${textColorHover};
  }

  &:disabled {
    background-color: var(--grey);
    border: 2px solid var(--grey);
    cursor: none;
    box-shadow: 0px 14px 23px rgba(28, 37, 44, 0.08);
  }
`;