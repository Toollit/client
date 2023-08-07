import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
`;

const Content = styled.div<{ nav: boolean }>`
  height: ${(props) => (props.nav ? `calc(100% - 4.4rem)` : '100%')};
  overflow-y: auto;
`;

export { Container, Content };
