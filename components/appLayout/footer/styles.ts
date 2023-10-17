import { mediaQueryLaptop } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

const Container = styled.div`
  background-color: rgb(245, 246, 247);
  min-height: 30rem;
  width: 100%;
  margin-top: auto;
`;

const NoticeArea = styled.div`
  padding: 4rem 1.5rem 2rem 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
  font-size: 1.3rem;

  a {
    font-size: 1.3rem;
    color: #000;
    font-weight: 500;

    :hover {
      text-decoration-line: underline;
    }
  }
`;

const AsideArea = styled.div`
  padding: 2rem 1.5rem 2rem 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
`;

const PartnersContainer = styled.div`
  display: flex;

  h3 {
    min-width: 11rem;
    font-size: 1.3rem;
  }

  a {
    font-size: 1.3rem;
    color: #000;

    :not(:nth-of-type(1)) {
      ::before {
        content: '|';
        margin: 0 2rem;
        color: #d3d5d7;
      }
    }

    :hover {
      text-decoration-line: underline;
    }
  }
`;
const DeveloperContainer = styled.div`
  display: flex;
  margin-top: 1rem;

  h3 {
    min-width: 11rem;
    font-size: 1.3rem;
  }

  a {
    font-size: 1.3rem;
    color: #000;

    :not(:nth-of-type(1)) {
      ::before {
        content: '|';
        margin: 0 2rem;
        color: #d3d5d7;
      }
    }

    :hover {
      text-decoration-line: underline;
    }
  }
`;

const CorpArea = styled.div`
  width: fit-content;
  padding: 3rem 1.5rem 3rem 1.5rem;
  margin: 0 auto;

  ul {
    display: flex;
    flex-wrap: wrap;
    font-size: 1.3rem;

    li {
      min-width: 33.3%;
      text-align: center;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;

      :nth-last-of-type(1) {
        margin-top: 2rem;
        margin-bottom: 2rem;
        font-weight: 600;
        width: 100%;
      }
    }

    a {
      font-size: 1.3rem;
      color: #000;

      :hover {
        text-decoration-line: underline;
      }
    }

    ${mediaQueryLaptop} {
      li {
        min-width: initial;

        :not(:nth-of-type(1)) {
          ::before {
            content: '|';
            margin: 0 2rem;
            color: #d3d5d7;
          }
        }

        :nth-last-of-type(1) {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          width: initial;
          font-weight: 600;
        }
      }
    }
  }
`;

export {
  Container,
  NoticeArea,
  AsideArea,
  PartnersContainer,
  DeveloperContainer,
  CorpArea,
};
