import styled from 'styled-components';
import theme from 'styled-theming';
import { baseTheme } from '../../theme';
import { Link } from 'react-router-dom';

const { colors } = baseTheme;

const favButtonBackgroundColor = theme('mode', {
  light: colors.sunrise,
  dark: colors.primaryColor,
});

const selectButtonBackgroundColor = theme('mode', {
  light: colors.sunrise,
  dark: colors.darkSide,
});

const selectButtonColor = theme('mode', {
  light: colors.darkCharcoal,
  dark: colors.white,
});

const selectButtonHoverBackgroundColor = theme('mode', {
  light: colors.white,
  dark: colors.veryDark,
});

const selectButtonHoverColor = theme('mode', {
  light: colors.primaryColor,
  dark: colors.white,
});

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;

  margin-bottom: 25px;
`;

export const Container = styled.div`
  width: ${(props) => (props.fixed ? '300px' : '100%')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FavButton = styled.button`
  all: unset;
  position: absolute;
  font-size: 32px;
  right: 0;
  padding: 10px;
  cursor: pointer;

  &:disabled {
    cursor: initial;
  }

  & i {
    background-color: ${favButtonBackgroundColor};
    padding: 8px;
    border-radius: 50%;
  }
`;

export const Image = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 200px;
  border-radius: 16px;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;

  & > span {
    font-size: 22px;
  }
`;

export const Score = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 6px;
  background-color: ${colors.lightYellow};
  margin-right: 8px;

  & i {
    height: 100%;
    width: 100%;
    padding: 4px;
    font-size: 22px;
    color: ${colors.yellow};
  }
`;

export const SelectButton = styled(Link)`
  all: unset;
  background-color: ${selectButtonBackgroundColor};
  border-radius: 16px;
  border: 3px solid ${selectButtonBackgroundColor};
  padding: 14px 0;
  color: ${selectButtonColor};
  text-align: center;
  font-size: 24px;
  cursor: pointer;
  self-align: flex-end;

  &:hover {
    background-color: ${selectButtonHoverBackgroundColor};
    color: ${selectButtonHoverColor};
  }
`;
