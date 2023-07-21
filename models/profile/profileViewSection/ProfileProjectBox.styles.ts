import {
  mediaQueryLaptop,
  mediaQueryMobile,
  mediaQueryTablet,
} from '@/styles/mediaQuery';
import styled from '@emotion/styled';

const BoxContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border.base};
  border-radius: ${(props) => props.theme.borderRadius.base};
  border-top: none;
  box-shadow: ${(props) => props.theme.boxShadow.base};
  margin-top: 3rem;
`;

const BoxTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: ${(props) => props.theme.borderRadius.base}
    ${(props) => props.theme.borderRadius.base} 0 0;
  color: #fff;
  background-image: linear-gradient(
    98deg,
    ${(props) => props.theme.colors.theme},
    #49c6dd
  );
`;

const BoxContent = styled.ul`
  li:nth-last-of-type(1) {
    border-bottom: none;
  }
`;

const ContentBlock = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
`;

const HashtagContainer = styled.ul`
  margin: 0.8rem 0.5rem;
  display: flex;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ColumnLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  isolation: isolate; // this attribute for overflow: hidden not working in safari Bug
`;

const ColumnRightContainer = styled.div`
  margin: auto 0;
  min-width: fit-content;
`;

const RecruitmentTypeContainer = styled.div`
  margin: 0.6rem 0.4rem;
  display: flex;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const RecruitmentType = styled.div<{
  type: 'developer' | 'designer' | 'pm' | 'anyone';
}>`
  width: fit-content;
  margin-right: 0.2rem;
  padding: 0.4rem 0.4rem;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #fff;
  text-align: center;
  background-color: ${(props) => {
    const recruitmentType = props.type;

    switch (recruitmentType) {
      case 'developer':
        return props.theme.colors.developer;

      case 'designer':
        return props.theme.colors.designer;

      case 'pm':
        return props.theme.colors.pm;

      case 'anyone':
        return props.theme.colors.anyone;

      default:
        break;
    }
  }};

  ${mediaQueryTablet} {
    margin-right: 0.4rem;
    padding: 0.4rem 0.8rem;
  }

  ${mediaQueryLaptop} {
    padding: 0.4rem 1rem;
  }

  /* ***** do not remove!!! ***** */
  /* circle shape member type design  */
  /* padding: 0;
    height: fit-content;
    background-color: #fff;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;

    ::before {
      content: ' ';
      display: block;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 100%;
      margin-right: 0.2rem;
      background-color: ${(props) => {
    const recruitmentType = props.type;

    switch (recruitmentType) {
      case 'developer':
        return props.theme.colors.developer;

      case 'designer':
        return props.theme.colors.designer;

      case 'pm':
        return props.theme.colors.pm;

      case 'anyone':
        return props.theme.colors.anyone;

      default:
        break;
    }
  }};
    } */
`;

const ProjectTitle = styled.div`
  font-size: 1.3rem;
  padding: 0rem 0.8rem;
  word-wrap: break-word;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  ${mediaQueryMobile} {
    font-size: 1.4rem;
  }
`;

const MemberCount = styled.div`
  display: flex;
  justify-content: center;

  padding: 0.3rem 0;
`;

const MemberCountText = styled.div`
  padding: 0 0.4rem;
  text-align: center;
  color: #3da571;
  font-size: 1.2rem;

  ${mediaQueryLaptop} {
    font-size: 1.3rem;
  }
`;

const Views = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.3rem 0;
`;

const ViewText = styled.div`
  padding: 0 0.4rem;
  text-align: center;
  font-size: 1.2rem;

  ${mediaQueryLaptop} {
    font-size: 1.3rem;
  }
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0rem;
`;
const LoadMore = styled.button`
  font-size: 1.4rem;
  padding: 1rem 3rem;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.base};
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: #000;
`;

export {
  BoxContainer,
  BoxTitle,
  ContentBlock,
  BoxContent,
  HashtagContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  ProjectTitle,
  Views,
  MemberCount,
  ViewText,
  MemberCountText,
  LoadMore,
  LoadMoreContainer,
  StyledLink,
};
