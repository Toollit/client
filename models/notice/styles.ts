import styled from '@emotion/styled';
import { Search } from '@mui/icons-material';

const Container = styled.div`
  /* flex: 1 1 auto; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const SubTitle = styled.div`
  p {
    font-size: 1.6rem;
    font-weight: 500;
  }

  span {
    color: ${(props) => props.theme.colors.theme};
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: row-reverse;
`;

const InputBox = styled.div`
  position: relative;
  width: 25rem;
  height: 3rem;
  border: 1px solid #d7d7d7;
  border-radius: 2.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-left: 2rem;
  padding-right: 6rem;

  input {
    border-style: none;
    font-size: 1.4rem;
    height: 1.55rem;
    outline: none;
    color: #222;
  }

  input::placeholder {
    color: #d7d7d7;
  }

  button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 3rem;
    height: 3rem;
    background-color: transparent;
    border: none;
  }
`;

const SearchIcon = styled(Search)`
  font-size: 2rem;
  color: #888888;
`;

export { Container, SubTitle, SearchForm, InputBox, SearchIcon };
