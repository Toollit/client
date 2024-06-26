import styled from '@emotion/styled';

const DividerContainer = styled.div`
  display: flex;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
`;

const LineWithText = styled.div`
  background-color: ${(props) => props.theme.colors.border.divider};
  height: 0.1rem;
  width: 100%;
  margin: auto 1rem;
`;

const Text = styled.div`
  font-size: 1.5rem;
  white-space: nowrap;
`;

const ThinLine = styled.div`
  background-color: ${(props) => props.theme.colors.border.divider};
  height: 0.1rem;
  width: 100%;
`;

export { DividerContainer, LineWithText, Text, ThinLine };
