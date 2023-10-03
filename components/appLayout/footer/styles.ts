import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Container = styled.div`
  background-color: rgb(245, 246, 247);
  min-height: 20rem;

  width: 100%;
  margin-top: auto;
`;

const CenterContainer = styled.div`
  max-width: 102.4rem;
  width: 100%;
  margin: 0 auto;
`;

const NoticeArea = styled.div`
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
`;

const AsideArea = styled.div`
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
`;

const CorpArea = styled.div`
  padding-bottom: 2rem;

  ul {
    display: flex;
  }
`;

export { Container, CenterContainer, NoticeArea, AsideArea, CorpArea };
