import styled from '@emotion/styled';
import Image from 'next/image';
import { mediaQueryTablet, mediaQueryMobile } from '@/styles/mediaQuery';

const Container = styled.div`
  width: 100%;
  height: 32rem;
  margin: 1rem 0rem;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  box-shadow: ${(props) => props.theme.boxShadow.base};
  border: 1px solid ${(props) => props.theme.colors.border.base};
  background-color: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  isolation: isolate; // this attribute for overflow: hidden not working in safari Bug
  cursor: pointer;

  ${mediaQueryTablet} {
    :hover {
      img {
        transform: scale(1.1);
        transition: all 0.3s ease 0s;
      }
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 13rem;
`;

const ProjectImage = styled(Image)``;

const RecruitmentTypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.6rem 0.4rem;

  ${mediaQueryMobile} {
    padding: 0.6rem 0.6rem;
  }
`;

const RecruitmentType = styled.div<{
  type: 'developer' | 'designer' | 'pm' | 'anyone';
}>`
  width: fit-content;
  margin-right: 0.2rem;
  padding: 0.4rem 0.2rem;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  font-size: 0.8rem;
  /* zoom: 0.9; */
  /* TODO chrome 브라우저 default font size 10 문제 해결하기 */

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

  ${mediaQueryMobile} {
    margin-right: 0.3rem;
    padding: 0.4rem 0.3rem;
  }

  ${mediaQueryTablet} {
    margin-right: 0.4rem;
    padding: 0.4rem 1rem;
  }

  /* circle member type design ** do not remove!!! ** */
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

const Title = styled.h2`
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

const HashtagContainer = styled.div`
  margin: 0.8rem 0.5rem;
  display: flex;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ContentFooterContainer = styled.div`
  margin-top: auto;
`;

const MemberBookmarkViewContainer = styled.div`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-top: 1px solid ${(props) => props.theme.colors.border.divider};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-flow: column-reverse;

  ${mediaQueryMobile} {
    padding: 1rem 1rem;
    flex-direction: row;

    justify-content: space-between;
  }
`;

const BookmarkViewContainer = styled.div`
  display: flex;
`;

const FavoriteViewContainer = styled.div`
  display: flex;
`;

const RecruitCompleteContent = styled.div`
  padding: 0.2rem 0rem;
`;

const RecruitNumber = styled.span`
  color: #3da571;
`;

const BookmarkContainer = styled.div`
  display: flex;
`;

const BookmarkIconText = styled.span`
  vertical-align: middle;
  padding: 0 1rem 0 0.4rem;
  font-size: 1.2rem;
`;

const ViewIconContainer = styled.div`
  display: flex;
`;

const ViewIconText = styled.span`
  vertical-align: middle;
  padding: 0 0.4rem;
  font-size: 1.2rem;
`;

export {
  Container,
  ImageContainer,
  ProjectImage,
  RecruitmentTypeContainer,
  RecruitmentType,
  Title,
  HashtagContainer,
  ContentFooterContainer,
  MemberBookmarkViewContainer,
  BookmarkViewContainer,
  FavoriteViewContainer,
  RecruitCompleteContent,
  RecruitNumber,
  BookmarkContainer,
  BookmarkIconText,
  ViewIconContainer,
  ViewIconText,
};
