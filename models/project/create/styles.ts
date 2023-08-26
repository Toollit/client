import styled from '@emotion/styled';

const RecruitNumberInput = styled.input`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  width: 20rem;
  height: 4rem;
  padding: 0rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.border.base};
  border-radius: ${(props) => props.theme.borderRadius.sharp};

  /* always show up / down arrow. but mobile view not working*/
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    opacity: 1;
  }

  :focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`;

export { RecruitNumberInput, ButtonContainer };
