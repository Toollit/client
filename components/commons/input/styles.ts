import styled from '@emotion/styled';
import { Theme, css } from '@emotion/react';

const CommonStyles = (theme: Theme) => css`
  border: 1px solid ${theme.colors.border.base};
  width: 100%;
  height: 5rem;
  border-radius: ${theme.borderRadius.sharp};
  padding: 0 1rem;
  font-size: 1.6rem;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  z-index: 10;
`;

const FocusInput = styled.input`
  ${(props) => CommonStyles(props.theme)}

  &:focus {
    border-style: solid;
    border-color: ${(props) => props.theme.colors.theme};
    outline-style: none;
  }
`;

const NormalInput = styled.input`
  ${(props) => CommonStyles(props.theme)}

  &:focus {
    outline-style: none;
  }
`;

export { FocusInput, NormalInput };
