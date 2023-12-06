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
  padding: 2.5rem 1.5rem 2.5rem 1.5rem;

  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 1.3rem;

    width: fit-content;
    width: 100%;
    margin: 0 auto;

    li {
      :not(:nth-of-type(1), :nth-last-of-type(1)) {
        ::before {
          content: '|';
          padding: 0 1rem;
          color: #d3d5d7;
        }
      }

      :nth-last-of-type(1) {
        padding-top: 3rem;
        padding-bottom: 3rem;

        width: 100%;
        text-align: center;
        font-weight: 600;
      }

      a {
        font-size: 1.3rem;
        color: #000;

        :hover {
          text-decoration-line: underline;
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
