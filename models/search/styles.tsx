import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Header = styled.div`
  padding: 2rem 1.5rem;
`;

const SubTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 500;

  span {
    color: ${(props) => props.theme.colors.theme};
  }
`;

const ContentContainer = styled.div`
  padding: 0 1.5rem;
  margin-bottom: 15rem;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: #000;
`;

const SkeletonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export { Header, SubTitle, ContentContainer, StyledLink, SkeletonContainer };
