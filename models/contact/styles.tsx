import styled from '@emotion/styled';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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

const Form = styled.form`
  padding: 0 1.5rem 20rem 1.5rem;
`;

const MUISelect = styled(Select)<{ width?: `${string}%` | `${string}rem` }>`
  border: 1px solid ${(props) => props.theme.colors.border.base} !important;
  width: ${(props) => (props.width ? props.width : '100%')};
  height: 5rem;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  padding: 0 1rem;
  font-size: 1.6rem;
  margin-bottom: 2.2rem; // margin-bottom required because of showing error message
  z-index: 10;

  & .MuiSelect-select {
    padding-left: 0rem !important;
  }

  fieldset {
    outline-style: none;
    border: none;
  }

  &.Mui-focused {
    border-color: ${(props) => props.theme.colors.theme} !important;
  }
`;

const MUIOption = styled(MenuItem)`
  font-size: 1.6rem;
  &.Mui-selected {
    background-color: #f2f2f2;
  }

  &.MuiMenuItem-root {
    :hover {
      background-color: #f2f2f2;
    }
  }
`;

const TextArea = styled.textarea<{ width?: `${string}%` | `${string}rem` }>`
  border: 1px solid ${(props) => props.theme.colors.border.base};
  width: ${(props) => (props.width ? props.width : '100%')};
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  padding: 1rem;
  font-size: 1.6rem;
  margin-bottom: 2.2rem; // margin-bottom required because of showing error message
  z-index: 10;

  &:focus {
    border-color: ${(props) => props.theme.colors.theme};
    outline-style: none;
  }
`;

const ContentContainer = styled.div`
  position: relative;
`;

const TextCount = styled.div`
  position: absolute;
  bottom: 0.4rem;
  right: 1rem;
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.text.gray};
`;

const ButtonContainer = styled.div`
  text-align: right;
  padding: 5rem 0;
`;

export {
  Header,
  SubTitle,
  Form,
  MUISelect,
  MUIOption,
  TextArea,
  ButtonContainer,
  ContentContainer,
  TextCount,
};
