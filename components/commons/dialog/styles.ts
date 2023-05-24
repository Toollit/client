import styled from '@emotion/styled';
import { Dialog, DialogTitle, Button } from '@mui/material';

const CustomDialog = styled(Dialog)`
  & .MuiDialog-paper {
    min-height: 20rem;
    width: 50rem;
  }

  & .MuiInputBase-root {
    font-size: 1.4rem;
    ::after {
      border-bottom: 2px solid ${(props) => props.theme.colors.theme};
    }
  }
`;

const CustomDialogTitle = styled(DialogTitle)`
  font-size: 1.6rem;
`;

const CustomDialogCancelButton = styled(Button)`
  font-size: 1.4rem;
  color: #000;
`;

const CustomDialogCompleteButton = styled(Button)`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.theme};
`;

export {
  CustomDialog,
  CustomDialogTitle,
  CustomDialogCancelButton,
  CustomDialogCompleteButton,
};
