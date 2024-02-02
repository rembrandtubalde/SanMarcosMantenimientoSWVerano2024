import styled from 'styled-components';
import theme from 'styled-theming';
import { baseTheme } from '../../theme';

const { colors } = baseTheme;

const backgroundColor = theme('mode', {
  light: colors.white,
  dark: colors.darkSide,
});

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${props => props.backgroundImage});
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
  background-color: ${backgroundColor};
  padding: 64px 48px;
  border-radius: 20px;
`;

export const Title = styled.div`
  text-align: center;
  font-size: 18px;
  color: #A766E3;
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
    color: ${colors.primaryColor}
  }
`;