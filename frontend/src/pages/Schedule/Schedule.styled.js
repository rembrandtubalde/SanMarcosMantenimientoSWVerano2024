import styled from 'styled-components';

export const Container = styled.div `
  background-color: var(--grey);
  width: 350px;
  max-width: 400px;
  border-radius: 32px;
`;

export const Thumbnail = styled.div `
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 200px;
  border-radius: 32px 32px 32px 0;
  position: relative;
`;

export const Category = styled.div `
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  bottom: 0;
  right: 0;
  padding: 8px 12px;
  margin-right: 12px;
  margin-bottom: 12px;
  border-radius: 50px;
`;

export const Body = styled.div `
  padding: 22px 20px;
`;

export const Title = styled.div `
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 24px;
`;

export const Time = styled.div `
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
`;

export const TimeItem = styled.div `
  color: var(--text-grey);
  display: flex;
  align-items: center;

  & i {
    font-size: 24px;
    margin-right: 12px;
    color: var(--primary-color);
  }
`;

export const Balance = styled.div `
  color: var(--text-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  & i {
    font-size: 24px;
    margin-right: 12px;
    color: var(--primary-color);
  }
`;

export const Button = styled.div `
  display: flex;
  justify-content: center;
  width: 100%;

  & button {
    width: 60%;
  }
`;