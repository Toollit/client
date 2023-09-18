import styled from '@emotion/styled';
import { Theme, css } from '@emotion/react';

const CommonStyles = (theme: Theme) => css`
  border: 1px solid ${theme.colors.border.base};
  width: 100%;
  height: 5rem;
  border-radius: ${theme.borderRadius.sharp};
  padding: 0 1rem;
  font-size: 1.6rem;
  margin-bottom: 2.2rem; // margin-bottom required because of showing error message
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

const NormalInput = styled.input<{ focus: boolean }>`
  ${(props) => CommonStyles(props.theme)}

  &:focus {
    border-color: ${(props) => props.theme.colors.theme};
    outline-style: none;
  }
`;

export { FocusInput, NormalInput };
