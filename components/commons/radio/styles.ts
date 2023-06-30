import styled from '@emotion/styled';

const BpIcon = styled.span`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2),
    inset 0 -1px 0 rgba(16, 22, 26, 0.1);
  background-color: #f5f8fa;
  background-image: linear-gradient(
    180deg,
    hsla(0, 0%, 100%, 0.8),
    hsla(0, 0%, 100%, 0)
  );

  .Mui-focusVisible & {
    outline: 2px auto #4dd290;
    outline-offset: 2;
  }
  input:disabled ~ & {
    box-shadow: none;
    background-color: rgba(206, 217, 224, 0.5);
  }
`;

const BpCheckedIcon = styled(BpIcon)`
  background-color: #4dd290;
  background-image: linear-gradient(
    180deg,
    hsla(0, 0%, 100%, 0.1),
    hsla(0, 0%, 100%, 0)
  );
  ::before {
    display: block;
    width: 2rem;
    height: 2rem;
    background-image: radial-gradient(#fff, #fff 28%, transparent 32%);
    content: '';
  }
`;

export { BpIcon, BpCheckedIcon };
