import styled from 'styled-components';
import theme from 'styled-theming';
import { baseTheme } from '../../theme';

const { colors } = baseTheme;

const backgroundColor = theme('mode', {
  light: colors.sunray,
  dark: colors.inputDark,
});

const borderColor = theme('mode', {
  light: colors.darkGrey,
  dark: colors.inputDark,
});

const textColor = theme('mode', {
  light: colors.darkGrey,
  dark: colors.white,
});

const textColorItem = theme('mode', {
  light: colors.darkCharcoal,
  dark: colors.white,
});

const contentBackgroundColor = theme('mode', {
  light: colors.white,
  dark: colors.inputDark,
});

export const Container = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 18px;
  z-index: 999;
`;

export const Button = styled.div`
  padding: 12px 24px;
  background: ${backgroundColor};
  border: 1.5px ${borderColor} solid;
  box-shadow: 0px 4px 8px rgba(28, 37, 44, 0.08);
  border-radius: 20px;
  cursor: pointer;
  color: ${textColor};
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  height: 250px;
  background: ${contentBackgroundColor};
  border: 1.5px solid ${borderColor};
  box-shadow: 0px 4px 8px rgba(28, 37, 44, 0.08);
  border-radius: 20px;
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  padding: 12px 0;
`;

export const Item = styled.div`
  position: relative;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s;
  color: ${textColorItem};

  &:hover {
    position: relative;
    background: #ffd159;
    color: ${colors.darkCharcoal};
  }
`;