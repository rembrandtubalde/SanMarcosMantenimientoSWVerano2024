import styled from 'styled-components';
import theme from 'styled-theming';
import { baseTheme } from '../../theme';

const { colors } = baseTheme;

const inputColor = theme('mode', {
  light: colors.textGrey,
  dark: colors.white,
});

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputPass = styled.div`
  position: relative;
  color: ${inputColor};
`;

export const ShowPassword = styled.span`
  position: absolute;
  display: inline;
  left: calc(317px - 45px);
  bottom: 48%;
  cursor: pointer;
  color: inherit;
`;