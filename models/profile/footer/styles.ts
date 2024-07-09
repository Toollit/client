import styled from '@emotion/styled';
import Link from 'next/link';

const Container = styled.div`
  padding: 4rem 3.9rem;
  margin-top: auto; // Using marin-top is to place it at the bottom of the screen. Parent container must be a flex container to work

  ul {
    display: flex;
    position: relative;
    padding-bottom: 1.6rem;
    justify-content: center;

    li {
      position: relative;
      padding-left: 1.4rem;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0.6rem;
        width: 0.1rem;
        height: 1.1rem;
        margin-top: -0.55rem;
        background-color: rgba(146, 146, 148, 0.3);
      }

      &:first-of-type {
        padding-left: 0;

        &::before {
          display: none;
        }
      }

      a {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colors.gray};
        text-decoration: none;
      }
    }
  }
`;

const SigninLogout = styled.div`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray};
  cursor: pointer;
`;

const MyProfileLink = styled(Link)`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray};
  cursor: pointer;
`;

const LogoLink = styled(Link)`
  font-weight: 900;
  font-size: 2rem !important;
`;

export { SigninLogout, MyProfileLink, Container, LogoLink };
