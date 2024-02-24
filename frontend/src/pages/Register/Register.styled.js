import styled from 'styled-components';
import theme from 'styled-theming';
import { baseTheme } from '../../theme';

const { colors } = baseTheme;

const wrapperBackgroundColor = theme('mode', {
  light: colors.white,
  dark: colors.darkSide,
});

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: url(${(props) => props.backgroundImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const FormWrapper = styled.div`
  margin: 64px;
  background-color: ${wrapperBackgroundColor};
  padding: 64px 48px;
  border-radius: 20px;
`;

export const TitleContainer = styled.div`
  text-align: center;
  font-size: 18px;
  color: #a766e3;
  margin: 12px 0 24px 0;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormPrompt = styled.div`
  font-size: 14px;
  color: var(--text-grey);
  margin-bottom: 16px;

  & > a {
    color: ${colors.primaryColor};
  }
`;

export const Separator = styled.div`
  color: var(--dark-grey);
  font-size: 14px;
  margin: 12px 0;
  text-align: center;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 30%;
    height: 1px;
    margin-left: 10px;
    background-color: var(--dark-grey);
  }

  &::before {
    left: -10px;
    bottom: 50%;
  }
  &::after {
    bottom: 50%;
  }
`;
