import styled from '@emotion/styled';
import Image from 'next/image';
import { mediaQueryTablet, mediaQueryMobile } from '@/styles/mediaQuery';

const Container = styled.div`
  width: 100%;
  height: 34rem;
  margin: 1.2rem 0rem;
  border-radius: 1.5rem;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  :hover {
    box-shadow: 0px 0px #767678, 0px 0 0.4rem #767678;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 13rem;
`;

const ProjectImage = styled(Image)`
  border-radius: 1.5rem 1.5rem 0 0;
`;

const ContentContainer = styled.div`
  padding: 0.8rem;
  height: 5rem;
`;

const RecruitmentTypeContainer = styled.div`
  display: flex;
  padding: 0.8rem;

  ${mediaQueryTablet} {
    flex-wrap: wrap;
  }
`;

const RecruitmentType = styled.div<{
  type: 'developer' | 'designer' | 'pm' | 'anyone';
}>`
  width: fit-content;
  height: 2rem;

  margin: 0 0.8rem 0 0;
  padding: 0.2rem 1rem;
  border-radius: 0.7rem;
  z-index: 21;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  text-align: center;
  background-color: ${(props) => {
    const recruitmentType = props.type;

    switch (recruitmentType) {
      case 'developer':
        return '#4dd290';

      case 'designer':
        return '#ffb65a';

      case 'pm':
        return '#fc9557';

      case 'anyone':
        return '#868686';

      default:
        break;
    }
  }};

  ${mediaQueryTablet} {
    padding: 0;
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
            return '#4dd290';

          case 'designer':
            return '#ffb65a';

          case 'pm':
            return '#fc9557';

          case 'anyone':
            return '#868686';

          default:
            break;
        }
      }};
    }
  }
`;

const Title = styled.h2`
  font-size: 1.4rem;
  padding: 0rem 0.8rem;
  word-wrap: break-word;

  ${mediaQueryMobile} {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const Hashtags = styled.div`
  padding: 0.8rem;
  display: flex;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Hashtag = styled.div`
  font-size: 1.1rem;
  margin-right: 0.5rem;
  background-color: #eff3fa;
  color: #3e4042;
  padding: 0.4rem 0.8rem;
  border-radius: 0.7rem;
`;

const ContentFooterContainer = styled.div`
  margin-top: auto;
`;

const MemberBookmarkViewContainer = styled.div`
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border-top: 1px solid #d2d2d7;
  display: flex;
  justify-content: space-between;

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-flow: column-reverse;
  }
`;

const PostDetailInfoContainer = styled.div`
  display: flex;
`;

const FavoriteViewContainer = styled.div`
  display: flex;
`;

const RecruitCompleteContent = styled.div`
  text-align: right;
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
  ContentContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  Title,
  Hashtags,
  Hashtag,
  ContentFooterContainer,
  MemberBookmarkViewContainer,
  PostDetailInfoContainer,
  FavoriteViewContainer,
  RecruitCompleteContent,
  RecruitNumber,
  BookmarkContainer,
  BookmarkIconText,
  ViewIconContainer,
  ViewIconText,
};
