import styled from '@emotion/styled';

interface PaddingDivProps {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const PaddingDiv = styled.div<PaddingDivProps>`
  padding-top: ${(props) => `${props.top}rem`};
  padding-right: ${(props) => `${props.right}rem`};
  padding-bottom: ${(props) => `${props.bottom}rem`};
  padding-left: ${(props) => `${props.left}rem}`};
`;

export { PaddingDiv };
