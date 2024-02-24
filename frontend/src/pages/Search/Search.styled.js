import styled from 'styled-components';
import theme from 'styled-theming';
import { baseTheme } from '../../theme';
import { Autocomplete } from '@react-google-maps/api';

const { colors } = baseTheme;

const backgroundColor = theme('mode', {
  light: colors.darkGrey,
  dark: colors.white,
});

export const Container = styled.div`
  flex: 1;
`;

export const SearchAutocomplete = styled(Autocomplete)`
  align-self: flex-start;
  width: 40%;
`;

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin: 14px 0 16px 0;
`;

export const SearchMap = styled.div`
  width: 100%;
  height: calc(100% - 150px);
  border-radius: 16px;
  flex: 1;
`;

export const List = styled.div`
  width: 480px;
  height: 100%;
  padding-left: 48px;
`;

export const ListResults = styled.div`
  height: calc(100vh - 200px);
  overflow-y: scroll;
  padding: 0 8px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${backgroundColor} ;
    border-radius: 4px;

    &:active {
      background-color: ${backgroundColor} ;
    }
  }
`;