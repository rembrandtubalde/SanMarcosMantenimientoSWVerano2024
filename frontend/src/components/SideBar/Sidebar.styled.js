import styled from 'styled-components';
import theme from 'styled-theming';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

import { baseTheme } from '../../theme';

const { colors } = baseTheme;

export const wrapperBackgroundColor = theme('mode', {
  light: colors.grey,
  dark: colors.darkSide,
});

const linkBackgroundColor = theme('mode', {
  light: colors.firstLight,
  dark: colors.veryDark,
});

const linkTextColor = theme('mode', {
  light: colors.darkCharcoal,
  dark: colors.white7,
});

const linkTextColorHover = theme('mode', {
  light: colors.darkCharcoal,
  dark: colors.white,
});

const toggleButtonBackgroundColor = theme('mode', {
  light: colors.firstLight,
  dark: colors.primaryColor,
});

export const Wrapper = styled(motion.div)`
  height: 100vh;
  border-radius: 0 30px 30px 0;
  color: black;
  transition: all 0.3s ease-in-out;
  background-color: ${wrapperBackgroundColor};
}`;

export const Container = styled.div`
  display: flex;
	justify-content: space-between;
	flex-direction: column;
	height: 100%;
  padding: 64px 24px;
`;

export const Logo = styled.div`
  display: flex;
  height: 65px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
`;

export const ToggleButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: ${toggleButtonBackgroundColor};
  font-size: 25px;
  cursor: pointer;
  margin: ${(props) => props.active ? '' : '0 auto'}
`;

export const ThemeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Divider = styled.div`
  height: 2px;
  margin-bottom: 32px;
  background-color: ${linkTextColor};
`;

export const LinkContainer = styled(NavLink)`
  all: unset;
  padding: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
  border-radius: 16px;

  & i {
    font-size: 32px;
    margin-right: 24px;
    color: ${linkTextColor};
  }

  & span {
    color: ${linkTextColor};
    font-weight: bold;

    &:hover {
      color: ${linkTextColorHover};
    }
  }

  &:hover {
    background-color: ${linkBackgroundColor};

    & i {
      color: ${linkTextColorHover};
    }

    & span {
      color: ${linkTextColorHover};
    }
  }

  &.active {
    background-color: ${linkBackgroundColor};

    & span {
      color: ${linkTextColorHover};
    }

    & i {
      color: ${linkTextColorHover};
    }
  }
`;
