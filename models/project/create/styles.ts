import styled from '@emotion/styled';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 102.4rem;
  margin: 0 auto;
  height: calc(100%-4.4rem);
  margin-top: 4rem;
  padding: 0rem 2rem; //TODO 반응형으로 만들기???
  align-items: center;
`;

const TitleInputContainer = styled.div`
  width: 100%;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 4rem;
  font-size: 1.4rem;
  padding: 0 1rem;
  border-radius: 3px;
  border: 1px solid #dadde6;

  :focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  margin-left: auto;
  margin-top: 1rem;
`;

const Button = styled.button`
  height: 4rem;
  text-align: center;
  border-radius: 25rem;
  border-style: none;
  background-color: #4dd290;
  color: #fff;
  font-weight: 600;
  font-size: 1.3rem;
  padding: 1rem 2rem;
`;

export { Container, TitleInput, TitleInputContainer, ButtonContainer, Button };
