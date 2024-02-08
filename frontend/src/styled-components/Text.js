import styled from 'styled-components';
import theme from 'styled-theming';
import { baseTheme } from '../theme';

const { colors } = baseTheme;

const textColor = theme('mode', {
  light: colors.darkCharcoal,
  dark: colors.white,
});

export const Title = styled.h2`
  color: ${textColor};
  font-size: 2.25rem;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  margin-bottom: ${({ marginBottom}) => marginBottom || '0'};
`;

export const Paragraph = styled.p`
  color: ${textColor};
  margin-bottom: ${({ marginBottom}) => marginBottom || '0'}
`;

export const SubTitle = styled.span`
  color: ${textColor};
  font-size: ${({ fontSize }) => fontSize || '1.5rem'};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  opacity: ${({ opacity }) => opacity || '1'};
`;