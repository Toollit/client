import styled from '@emotion/styled';
import {
  Dialog as MUIDialog,
  DialogTitle as MUIDialogTitle,
  Button as MUIButton,
  FormControlLabel as MUIFormControlLabel,
} from '@mui/material';

const DialogBox = styled(MUIDialog)`
  & .MuiDialog-paper {
    min-height: 20rem;
    width: 50rem;
  }

  /* & .MuiInputBase-root {
    font-size: 1.4rem;
    ::after {
      border-bottom: 2px solid ${(props) => props.theme.colors.theme};
    }
    &:hover input {
      border-bottom: 1px solid ${(props) => props.theme.colors.theme};
    }
  } */

  /* & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border: 1px solid ${(props) => props.theme.colors.theme};
    }

    &:hover fieldset {
      border-color: ${(props) => props.theme.colors.theme};
      border: 1px solid;
    }
  } */
`;

const Title = styled(MUIDialogTitle)`
  font-size: 1.6rem;
`;

const CancelButton = styled(MUIButton)`
  font-size: 1.4rem;
  color: #000;
`;

const CompleteButton = styled(MUIButton)`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.theme};
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.4rem;
  border: none;
  padding: 1rem 0;
  border-bottom: 1px solid #000;
  outline: none;
`;

const Textarea = styled.textarea`
  width: 100%;
  font-size: 1.4rem;
  padding: 0.4rem;
  min-height: 10rem;
  outline: none;
  resize: none;
`;

const TextCount = styled.div`
  font-size: 1.4rem;
  text-align: right;
  padding-right: 0.5rem;
`;

const FormControlLabel = styled(MUIFormControlLabel)`
  .MuiFormControlLabel-label {
    font-size: 1.4rem;
  }
`;

export {
  DialogBox,
  Title,
  CancelButton,
  CompleteButton,
  Input,
  Textarea,
  TextCount,
  FormControlLabel,
};
