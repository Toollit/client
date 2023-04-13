import styled from '@emotion/styled';
import { mediaQueryMobile, mediaQueryTablet } from '@/styles/mediaQuery';

const ColumnContainer = styled.div`
  display: flex;

  ${mediaQueryTablet} {
    flex-direction: column-reverse;
  }
`;

const ColumnLeftContainer = styled.div`
  width: 70%;
  padding: 2rem 0.5rem;

  ${mediaQueryTablet} {
    width: 100%;
    padding: 0.5rem 0.5rem;
  }
`;

const ColumnRightContainer = styled.div`
  width: 30%;
  padding: 2rem 0.5rem;

  ${mediaQueryTablet} {
    width: 100%;
    padding: 1.5rem 0.5rem 0.5rem 0.5rem;
  }
`;

const ProjectContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.border.container};
  box-shadow: ${(props) => props.theme.boxShadow.base};
  border-radius: ${(props) => props.theme.borderRadius.base};
  min-height: 50rem;
`;

const ProjectContentTopContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
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
  margin: 0 0.8rem 0 0;
  padding: 0.4rem 1rem;
  border-radius: 0.7rem;
  z-index: 21;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.white};
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
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.text.gray};

  ${mediaQueryMobile} {
    font-size: 1.2rem;
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
  padding: 0.6rem 3rem;

  ${mediaQueryMobile} {
    padding: 0.4rem 3rem;
    justify-content: space-evenly;
  }
`;

const BookmarkButton = styled.button`
  display: flex;
  margin-right: 1rem;
  padding: 0.4rem 1rem;
  align-items: center;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  color: #536471;
  font-size: 1.4rem;
  font-weight: 500;

  :hover {
    background-color: rgba(15, 20, 25, 0.1);
  }
`;
const ShareButton = styled.button`
  display: flex;
  margin-right: 1rem;
  padding: 0.4rem 1rem;
  align-items: center;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  color: #536471;
  font-size: 1.4rem;
  font-weight: 500;
  :hover {
    background-color: rgba(15, 20, 25, 0.1);
  }
`;
const MoreButton = styled.button`
  display: flex;
  margin-left: 1rem;
  padding: 0.4rem 1rem;
  align-items: center;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  color: #536471;
  font-size: 1.4rem;
  font-weight: 500;
  :hover {
    background-color: rgba(15, 20, 25, 0.1);
  }
`;

const WriterInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem;
  border: 1px solid #e9ecef;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 15px -5px rgba(0, 0, 0, 0.05), 0 7px 7px -5px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  cursor: pointer;

  ${mediaQueryTablet} {
    flex-direction: row;
    align-items: center;
    padding: 0.5rem 1.2rem;
  }
`;

const ProfileImageContainer = styled.div`
  height: 6rem;
  margin: 0 auto;

  ${mediaQueryTablet} {
    margin: initial;
    padding-right: 2rem;
  }

  ${mediaQueryMobile} {
    padding-right: 0.5rem;
  }
`;

const WriterLastLoginAtContainer = styled.div`
  width: 100%;
  ${mediaQueryTablet} {
    display: flex;
    align-items: center;
  }

  ${mediaQueryMobile} {
    flex-direction: column;
  }
`;

const Writer = styled.div`
  font-size: 1.4rem;
  text-align: center;
  ${mediaQueryTablet} {
    padding-right: 2rem;
    display: flex;
    align-items: center;
    div {
      padding-right: 0.5rem;
    }
  }

  ${mediaQueryMobile} {
    width: 100%;
    text-align: left;
    padding-right: 0.5rem;
  }
`;

const LastLoginAt = styled.div`
  margin-top: 0.5rem;
  font-size: 1.2rem;
  color: #868e96;
  padding-bottom: 1rem;
  text-align: center;

  ${mediaQueryTablet} {
    display: flex;
    align-items: center;
    margin-top: 0rem;
    padding-bottom: 0rem;
    div {
      padding-right: 0.5rem;
    }
  }

  ${mediaQueryMobile} {
    width: 100%;
    div {
      padding-right: 0.5rem;

      text-align: left;
    }
  }
`;

const TrendingPostsContainer = styled.div`
  ${mediaQueryTablet} {
    display: none;
  }
`;

export {
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
  MoreButton,
  WriterLastLoginAtContainer,
  ProfileImageContainer,
  WriterInfoContainer,
  Writer,
  LastLoginAt,
  TrendingPostsContainer,
};
