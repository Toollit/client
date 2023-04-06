import styled from '@emotion/styled';
import { mediaQueryMobile, mediaQueryTablet } from '@/styles/mediaQuery';

const BlockContainer = styled.div`
  display: flex;

  ${mediaQueryTablet} {
    flex-direction: column-reverse;
  }
`;

const LeftBlockContainer = styled.div`
  width: 70%;
  padding: 2rem 0.5rem;

  ${mediaQueryTablet} {
    width: 100%;
    padding: 0.5rem 0.5rem;
  }
`;

const RightBlockContainer = styled.div`
  width: 30%;
  padding: 2rem 0.5rem;

  ${mediaQueryTablet} {
    width: 100%;
    padding: 1.5rem 0.5rem 0.5rem 0.5rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 1rem;
  border: 1px solid #e9ecef;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 15px -5px rgba(0, 0, 0, 0.05), 0 7px 7px -5px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  min-height: 50rem;
`;

const ProjectDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  font-size: 1.4rem;
  color: #868e96;

  ${mediaQueryMobile} {
    font-size: 1.2rem;
  }
`;

const DateAndViewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
`;

const UpdatedAt = styled.div`
  position: relative;
  background-color: #fff;
  z-index: 1;
  :hover {
    opacity: 0;
  }
`;
const HoverCreatedAt = styled.div`
  position: absolute;
`;

const UserInfoContainer = styled.div`
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

const TrendingPostsContainer = styled.div`
  ${mediaQueryTablet} {
    display: none;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContentFooter = styled.div`
  border-top: 1px solid #cfd9de;
  display: flex;
  width: 100%;
  margin-top: auto;
  justify-content: flex-end;
  padding: 1rem 3rem;
`;

const BookmarkButton = styled.button`
  display: flex;
  margin-right: 1rem;
  padding: 0.8rem 1rem;
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
  padding: 0.8rem 1rem;
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
  padding: 0.8rem 1rem;
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

export {
  BlockContainer,
  LeftBlockContainer,
  RightBlockContainer,
  ProjectDetailInfo,
  Writer,
  DateAndViewContainer,
  UpdatedAt,
  HoverCreatedAt,
  UserInfoContainer,
  LastLoginAt,
  ProfileImageContainer,
  WriterLastLoginAtContainer,
  ContentContainer,
  TrendingPostsContainer,
  ContentHeader,
  ContentFooter,
  BookmarkButton,
  ShareButton,
  MoreButton,
};
