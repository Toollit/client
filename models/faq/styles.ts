import { mediaQueryLaptop } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Link from 'next/link';

const Content = styled.div`
  padding: 1.5rem;
`;

const Header = styled.div`
  padding: 2rem 1.5rem;
`;

const SubTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 500;

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
    padding: 1rem 0;
    font-size: 1.4rem;
    border-top: 2px solid #42495b;
    border-bottom: 1px solid #e5e5e5;
  }
`;
const TableTitle = styled.th`
  span {
    color: ${(props) => props.theme.colors.theme};
  }
`;

const TableBody = styled.tbody`
  td {
    border-bottom: 1px solid #e5e5e5;
    font-size: 1.4rem;

    a {
      color: #000;
    }
  }
`;

const FAQFooter = styled.p`
  text-align: center;
  font-weight: 500;

  padding: 1.5rem 1.5rem 10rem 1.5rem;
  font-size: 1.2rem;

  ${mediaQueryLaptop} {
    padding: 5rem 5rem 20rem 5rem;
    font-size: 1.6rem;
  }
`;

const MUIAccordion = styled(Accordion)`
  box-shadow: none;
`;

const MUIAccordionSummary = styled(AccordionSummary)``;

const MUIAccordionDetails = styled(AccordionDetails)`
  padding-bottom: 4rem;
`;

const InquiryLink = styled(Link)`
  font-weight: 600;
  color: ${(props) => props.theme.colors.theme};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// background-color: #e7f9e4;

export {
  Content,
  Header,
  SubTitle,
  SearchForm,
  InputBox,
  Table,
  TableHeader,
  TableTitle,
  TableBody,
  FAQFooter,
  MUIAccordion,
  MUIAccordionSummary,
  MUIAccordionDetails,
  InquiryLink,
};
