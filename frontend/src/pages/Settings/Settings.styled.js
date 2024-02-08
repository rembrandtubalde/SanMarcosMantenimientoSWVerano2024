import styled from 'styled-components';
import Flag from 'react-world-flags';
import theme from 'styled-theming';
import { baseTheme } from '../../theme';

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

const removeButtonHover = theme('mode', {
  light: colors.white,
  dark: colors.darkSide,
});

const removeButtonBorderHover = theme('mode', {
  light: colors.errorRed,
  dark: colors.white,
});

export const Container = styled.form`
  margin: 0 auto;
  width: 600px;
  max-width: 700px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0 auto;
  gap: 48px;
  margin-bottom: 48px;

  & img {
    width: 200px;
    height: auto;
    border-radius: 50%;
  }
`;

export const Image = styled.div`
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

export const RemoveButton = styled.button`
  text-align: center;
  margin-bottom: 20px;
  padding: 12px 34px;
  border-radius: 30px;
  background-color: ${colors.errorRed};
  border: 2px solid ${colors.errorRed};
  font-family: inherit;
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  box-shadow: 0px 14px 23px rgba(28, 37, 44, 0.08);

  &:hover {
    background-color: ${removeButtonHover};
    color: ${removeButtonBorderHover};
    border: 2px solid ${removeButtonBorderHover};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;

  & label {
    text-align: center;
    margin-bottom: 20px;
    padding: 12px 34px;
    border-radius: 30px;
    background-color: ${colors.primaryColor};
    border: 2px solid ${borderColorHover};
    font-family: inherit;
    color: ${colors.white};
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
  }
`;

export const Dates = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoInput = styled.div`
  display: flex;
  align-items: baseline;
  gap: 20px;
`;

export const FlagStyled = styled(Flag)`
  display: flex;
  align-items: flex-start;
  margin-left: 36px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 48px;
  justify-content: center;

  & button {
    width: 60%;
  }
`;