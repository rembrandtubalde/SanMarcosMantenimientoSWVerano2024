import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const iconColor = theme('mode', {
  light: colors.darkCharcoal,
  dark: colors.white,
});

export const Container = styled.div`
  max-height: 100vh;
  overflow-y: scroll;
  width: 100%;
`;

export const LinkStyled = styled(Link) `
  all: unset;
  color: var(--primary-color);
  margin-bottom: 12px;
  cursor: pointer;
  text-decoration: underline;
  font-size: 18px;
`;

export const CollageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const WrapperPlace = styled.div`
  width: 900px;
  margin: 0 auto;
`;

export const InfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;

  & a {
    all: unset;
    color: ${colors.primaryColor};
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const InfoIcon = styled.div`
  padding: 0 1rem 0 0;
  background-color: ${colors.grey};
  border-radius: 100px;

  & i {
    background-color: ${colors.primaryColor};
    padding: 12px;
    border-radius: 50%;
    margin-right: 0.5rem;
    color: ${iconColor};
  }
`;

export const InfoPhone = styled.div`
  & i {
    margin-right: 1rem;
    color: ${iconColor};
  }
`;

export const InfoContact = styled.div `
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const InfoUrl = styled.div `
  margin-bottom: 24px;
  overflow: hidden;
  text-overflow: ellipsis;

  & a {
    all: unset;
    color: ${colors.primaryColor};
    text-decoration: underline;
    cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
  }
`;

export const ReviewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  margin-bottom: 36px;
`;

export const Review = styled.div`
  background-color: var(--grey);
  padding: 14px 16px;
  border-radius: 16px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const ReviewAuthor = styled.div `
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ReviewTime = styled.div`
  margin-top: 16px;
  color: ${colors.darkGrey};
`;

export const LinkContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  & a {
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

    width: 50%;
    text-decoration: none;
    text-align: center;
    font-size: 24px;
  }
  `;