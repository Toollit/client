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
  padding: 0rem 1rem;
  border: 1px solid #e9ecef;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 15px -5px rgba(0, 0, 0, 0.05), 0 7px 7px -5px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
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
    div {
      padding-right: 0.5rem;
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
};
