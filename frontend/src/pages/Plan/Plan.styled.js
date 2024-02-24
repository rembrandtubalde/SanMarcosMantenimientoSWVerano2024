import styled from 'styled-components';

export const Container = styled.div `
  width: 700px;
  margin: 0 auto;
  max-width: 1400px;
  overflow-y: auto;
`;

export const TittlePlan = styled.div`
  display: flex;
  font-size: 40px;
  margin-bottom: 10px;
`;

export const SubtittlePlan = styled.div`
  display: flex;
  align-items: baseline;
  font-size: 30px;
  padding-bottom: 20px;
  padding-top: 20px;
  gap: 20px;
`;

export const DropdownPlan = styled.select`
  width: 23%;
  padding: 14px 20px;
  background: var(--sunray);
  border: 15px var(--dark-grey) solid;
  box-shadow: 0px 4px 8px rgba(28, 37, 44, 008);
  border-radius: 20px;
  cursor: pointer;
  color: var(--dark-grey);
  display: flex;
  justify-content: space-between;
`;

export const ButtonPlan = styled.button`
  padding: 12px 34px;
  margin: 12px;
  border-radius: 30px;
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  font-family: inherit;
  color: var(--white);
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  width: 10%;
  box-shadow: 0px 14px 23px rgba(28, 37, 44, 008);

  &:hover {
    background-color: var(--white);
    color: var(--primary-color);
  }
`;

export const ButtonPlanDelete = styled.button`
  padding: 12px 34px;
  margin: 12px;
  border-radius: 30px;
  background-color: var(--error-red);
  border: 2px solid var(--error-red);
  font-family: inherit;
  color: var(--white);
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  width: 10%;
  box-shadow: 0px 14px 23px rgba(28, 37, 44, 008);

  &:hover {
    background-color: var(--white);
    color: var(--error-red);
  }
`;

export const InputContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const InputPlan = styled.input`
  padding: 12px 24px;
  font-size: 16px;
  color: var(--dark-grey);
  background-color: var(--sunray);
  border-radius: 20px;
  transition: 2s;
  margin-right: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 23%;

  &::placeholder {
    color: var(--dark-grey);
  }

  &:focus {
    background-color: var(--white);
    color: var(--text-grey);
  }
`;