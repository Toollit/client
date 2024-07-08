import styled from '@emotion/styled';

const Content = styled.div`
  padding: 1.5rem 1.5rem 20rem 1.5rem;
`;

const Header = styled.div`
  padding: 2rem 1.5rem;
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
  padding: 1.5rem;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

const TableHeader = styled.thead`
  th {
    font-size: 1.4rem;
    border-top: 2px solid #42495b;
    border-bottom: 1px solid #e5e5e5;
  }
`;
const TableHeaderLeft = styled.th`
  width: 10%;
  border-right: 1px solid #e5e5e5;
  padding: 1rem 1rem;
  word-break: keep-all;
`;
const TableHeaderRight = styled.th`
  width: 90%;
  text-align: left;
  padding: 1rem 1rem;
`;

const TableBody = styled.tbody`
  td {
    padding: 2rem 1.5rem 5rem 1.5rem;
    border-bottom: 1px solid #e5e5e5;
    font-size: 1.4rem;
    height: 20rem; // td height works like min height
    vertical-align: top;
  }
`;

export {
  Content,
  Header,
  SubTitle,
  SearchForm,
  InputBox,
  Table,
  TableHeader,
  TableHeaderLeft,
  TableHeaderRight,
  TableBody,
};
