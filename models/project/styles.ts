import styled from '@emotion/styled';
import Image from 'next/image';
import { mediaQueryLaptop, mediaQueryTablet } from '@/styles/mediaQuery';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 10rem 1rem;

  ${mediaQueryLaptop} {
    flex-direction: row;
  }
`;

const ColumnLeftContainer = styled.div`
  ${mediaQueryLaptop} {
    width: 70%;
  }
`;

const ColumnRightContainer = styled.div`
  ${mediaQueryLaptop} {
    width: 30%;
    margin-left: 2rem;
  }
`;

const StickyContainer = styled.div`
  ${mediaQueryLaptop} {
    position: sticky;
    top: 7rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.container};

  ${mediaQueryLaptop} {
    padding: 0rem 1rem;
    border: 1px solid ${(props) => props.theme.colors.border.container};
    box-shadow: ${(props) => props.theme.boxShadow.base};
    border-radius: ${(props) => props.theme.borderRadius.sharp};
  }
`;

const ContentHeader = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
  padding-bottom: 1rem;
  background-color: #ffffff;
`;

const RecruitMemberType = styled.div`
  display: flex;
  margin-top: 1.5rem;
`;

const MemberType = styled.div<{
  type: 'Developer' | 'Designer' | 'PM' | 'Anyone';
}>`
  width: fit-content;
  margin-right: 0.4rem;
  padding: 0.4rem 1rem;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #fff;
  text-align: center;
  background-color: ${(props) => {
    const recruitmentType = props.type;

    switch (recruitmentType) {
      case 'Developer':
        return props.theme.colors.developer;

      case 'Designer':
        return props.theme.colors.designer;

      case 'PM':
        return props.theme.colors.pm;

      case 'Anyone':
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
`;

const ModifyButton = styled.button`
  border-style: none;
  background-color: transparent;
  padding: 0rem 0.5rem;
`;

const WriterInfoContainer = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.border.container};
  box-shadow: ${(props) => props.theme.boxShadow.base};
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  align-items: center;
  padding: 1rem 1.5rem;
  color: #000;
  cursor: pointer;

  ${mediaQueryTablet} {
    flex-direction: column;
    padding: 2rem 2rem;
  }
`;

const WriterProfileImage = styled.div`
  position: relative;
  height: fit-content;
  margin-right: 1rem;
  padding: 1rem 0rem;

  ${mediaQueryTablet} {
    margin: 0 auto;
  }
`;

const WriterInfo = styled.div`
  /* flex: 1 1 auto; */
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
  border: 2px solid #0d1117 !important;
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
    width: fit-content;
    margin: 0 auto;
  }
`;

const ProjectMembersContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.border.container};
  box-shadow: ${(props) => props.theme.boxShadow.base};
  margin-top: 1rem;

  h2 {
    font-size: 1.6rem;
  }
`;

const MembersContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Members = styled.ul`
  display: flex;
  /* overflow: auto; */
  align-items: center;
  padding: 1.5rem 0;
  min-width: 18rem;
`;

const Avatar = styled.li<{ index: number }>`
  min-width: 0;
  max-width: 2.8rem;
  /* transform: translateX(${(props) => `${props.index * -30}`}%); */
`;

const RestMemberCount = styled.span`
  width: 100%;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.theme};
  padding: 0 0.8rem;
`;

const JoinButtonContainer = styled.div`
  margin-top: 1rem;
`;

const MemberSkeletonContainer = styled.div`
  display: flex;
  padding: 1.5rem 0;
`;

export {
  Container,
  ColumnLeftContainer,
  ColumnRightContainer,
  StickyContainer,
  ContentContainer,
  ContentHeader,
  RecruitMemberType,
  MemberType,
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
  ModifyButton,
  WriterProfileImage,
  WriterInfo,
  WriterInfoContainer,
  Writer,
  LastLoginAt,
  StyledImage,
  ProjectMembersContainer,
  MembersContainer,
  Members,
  Avatar,
  RestMemberCount,
  JoinButtonContainer,
  MemberSkeletonContainer,
};
