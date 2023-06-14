import styled from '@emotion/styled';
import { mediaQueryMobile, mediaQueryTablet } from '@/styles/mediaQuery';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 102.4rem;
  margin: 0 auto;
  height: 100%;
  padding: 0rem 0.5rem;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${mediaQueryTablet} {
    flex-direction: row;
  }
`;

const ColumnLeftContainer = styled.div`
  width: 100%;
  padding: 0.5rem 0.5rem;

  ${mediaQueryTablet} {
    width: 70%;
    padding: 2rem 0.5rem;
  }
`;

const ColumnRightContainer = styled.div`
  width: 100%;
  padding: 1.5rem 0.5rem 0.5rem 0.5rem;

  ${mediaQueryTablet} {
    width: 30%;
    padding: 2rem 0.5rem;
  }
`;

const ProjectContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.border.container};
  box-shadow: ${(props) => props.theme.boxShadow.base};
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  min-height: 50rem;
`;

const ProjectContentTopContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
  padding-bottom: 1rem;
`;

const RecruitmentTypeContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
`;

const RecruitmentType = styled.div<{
  type: 'developer' | 'designer' | 'pm' | 'anyone';
}>`
  width: fit-content;
  margin: 0 0.4rem 0 0;
  padding: 0.4rem 1rem;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  font-size: 0.8rem;
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
`;

const DateAndViewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text.gray};

  ${mediaQueryMobile} {
    font-size: 1.4rem;
  }
`;

const Date = styled.div`
  position: relative;
`;

const Views = styled.div``;

const CreatedAt = styled.div`
  z-index: 1;
`;

const UpdatedAt = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  background-color: #fff;

  /* 모바일 버전에서 수정시간 정보는 hover event가 고정되어도 되는곳이므로 do not add mediaQuery */
  :hover {
    opacity: 0;
  }
`;

const ProjectContentBottomContainer = styled.div`
  margin-top: auto;
`;

const HashtagsContainer = styled.div`
  display: flex;
  padding: 0.8rem;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  border-top: 1px solid #cfd9de;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 0.6rem 0.2rem;
`;

const BookmarkButton = styled.button`
  display: flex;
  margin-right: 0.4rem;
  padding: 0.4rem 1rem;
  align-items: center;
  border: none;
  background-color: transparent;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  color: #536471;
  font-size: 1.2rem;
  font-weight: 500;

  ${mediaQueryMobile} {
    font-size: 1.4rem;
  }
`;

const ShareButton = styled.button`
  display: flex;
  margin-right: 0.4rem;
  padding: 0.4rem 1rem;
  align-items: center;
  border: none;
  background-color: transparent;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  color: #536471;
  font-size: 1.2rem;
  font-weight: 500;

  ${mediaQueryMobile} {
    font-size: 1.4rem;
  }
`;

const WriterInfoContainer = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.border.container};
  box-shadow: ${(props) => props.theme.boxShadow.base};
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  align-items: center;
  padding: 0.5rem 1.2rem;
  cursor: pointer;

  ${mediaQueryTablet} {
    flex-direction: column;
    padding: 2rem 2rem;
  }
`;

const ProfileImageContainer = styled.div`
  height: 6rem;
  margin-right: 0.5rem;

  ${mediaQueryTablet} {
    margin: 0 auto;
  }
`;

const WriterLastLoginAtContainer = styled.div`
  width: 100%;

  ${mediaQueryMobile} {
    display: flex;
    align-items: center;
  }

  ${mediaQueryTablet} {
    display: flex;
    flex-direction: column;
  }
`;

const Writer = styled.div`
  display: flex;
  font-size: 1.4rem;
  margin-right: 1rem;

  div {
    margin-right: 0.5rem;
  }

  ${mediaQueryTablet} {
    flex-direction: column;
    align-items: center;
    margin-right: initial;

    div {
      margin-right: initial;
    }
  }
`;

const LastLoginAt = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: #868e96;

  div {
    padding-right: 0.5rem;
  }

  ${mediaQueryTablet} {
    padding-right: initial;
  }
`;

const TrendingPostsContainer = styled.div`
  display: none;

  ${mediaQueryTablet} {
    display: initial;
  }
`;

export {
  Container,
  ColumnContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  ProjectContentContainer,
  ProjectContentTopContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  DateAndViewContainer,
  Date,
  Views,
  CreatedAt,
  UpdatedAt,
  ProjectContentBottomContainer,
  HashtagsContainer,
  ButtonContainer,
  BookmarkButton,
  ShareButton,
  // MoreButton,
  WriterLastLoginAtContainer,
  ProfileImageContainer,
  WriterInfoContainer,
  Writer,
  LastLoginAt,
  TrendingPostsContainer,
};
