import styled from 'styled-components';
import theme from 'styled-theming';
import { baseTheme } from '../../theme';
import { motion } from 'framer-motion';

const { colors } = baseTheme;

const textColor = theme('mode', {
  light: colors.darkCharcoal,
  dark: colors.white,
});

const textColorEmail = theme('mode', {
  light: colors.darkGrey,
  dark: colors.white7,
});

export const Wrapper = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
`;

export const Image = styled.div`
  width: 65px;

  & img {
    border-radius: 50%;
    width: 100%;
    height: 65px;
  }
`;

export const Info = styled(motion.div)`
  flex: 1;
  padding-left: 24px;
  align-self: center;

  & .profile__name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
    color: ${textColor};
  }

  & .profile__email {
    font-size: 12px;
    color: ${textColorEmail};
  }
`;

// .side-menu-footer .user-info `
//   color: var(--charcoal);
//   opacity: 1;
//   transition: opacity 0.2s ease-in;
//   display: inline-block;
//   margin-top: 12px;
// `

export const Button = styled(motion.button)`
  all: unset;
  align-self: center;
  font-size: 24px;
  cursor: pointer;
`;
