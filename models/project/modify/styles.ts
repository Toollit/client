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

const ProjectTeamContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HashtagInputContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
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
  Container,
  ProjectTeamContainer,
  HashtagInputContainer,
  ButtonContainer,
  Button,
};
