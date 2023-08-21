import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
`;

const Content = styled.div<{ hasBottomButton?: boolean }>`
  max-width: 102.4rem;
  width: 100%;
  margin: 0 auto;
  min-height: ${(props) => `calc(100vh - ${props.theme.layout.navHeight})`};
  overflow-y: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: ${(props) =>
    props.hasBottomButton && props.theme.layout.bottomButtonHeight};
`;

export { Container, Content };
