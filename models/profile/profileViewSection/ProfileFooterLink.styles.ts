import styled from '@emotion/styled';

const LogInOut = styled.div`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray};

  cursor: pointer;
`;

const Container = styled.div`
  padding: 4rem 3.9rem;

  ul {
    display: flex;
    position: relative;
    padding-bottom: 1.6rem;
    justify-content: center;
  }

  li {
    position: relative;
    padding-left: 1.4rem;

    ::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0.6rem;
      width: 0.1rem;
      height: 1.1rem;
      margin-top: -0.55rem;
      background-color: rgba(146, 146, 148, 0.3);
    }
  }

  li:first-of-type {
    padding-left: 0;

    ::before {
      display: none;
    }
  }

  li a {
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.gray};
    text-decoration: none;
  }
`;

const Logo = styled.a`
  font-weight: 900;
  font-size: 2rem !important;
`;

export { LogInOut, Container, Logo };
