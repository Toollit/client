import { mediaQueryMobile } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 102.4rem;
  margin: 0 auto;
  height: calc(100%-4.4rem);
  margin-top: 4rem;
  padding: 0rem 2rem; //TODO 반응형으로 만들기???
  align-items: center;
`;

const RecruitNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.border.base};
  border-radius: ${(props) => props.theme.borderRadius.sharp};
`;

const RecruitNumberLabel = styled.label`
  font-size: 1.2rem;
  padding: 0.5rem 1rem 0rem 1rem;

  ${mediaQueryMobile} {
    font-size: 1.4rem;
  }
`;

const RecruitNumberInput = styled.input`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  width: 20rem;
  height: 4rem;
  margin: 1rem;
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
  width: 100%;
  padding: 2rem 0rem;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  height: 4rem;
  width: 10rem;
  margin-left: auto;
  text-align: center;
  border-radius: 25rem;
  border-style: none;
  background-color: #4dd290;
  color: #fff;
  font-weight: 600;
  font-size: 1.3rem;
  padding: 1rem 2rem;
`;

export {
  Form,
  RecruitNumberContainer,
  RecruitNumberLabel,
  RecruitNumberInput,
  ButtonContainer,
  Button,
};
