import { mediaQueryLaptop, mediaQueryTablet } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { NotificationsNone } from '@mui/icons-material';

const BoxContent = styled.ul`
  li {
    ::after {
      content: '';
      display: block;
      padding-top: 1rem;
      width: calc(100% - 1rem);
      border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
      margin: 0 auto;
    }

    :nth-last-of-type(1) {
      ::after {
        border-bottom: none;
      }
    }
  }
`;

const Content = styled.li`
  padding: 1rem 1rem 0rem 1rem;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const Label = styled.div`
  font-size: 1.3rem;
  padding: 0.8rem 0.8rem 0rem 0.8rem;
  font-weight: 600;
`;
const ProjectTitle = styled.a`
  color: #000;
  font-size: 1.4rem;
  padding: 0 0.8rem;
  font-weight: 500;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  isolation: isolate; // this attribute for overflow: hidden not working in safari Bug
`;

const Notice = styled.p`
  font-size: 1.4rem;
  padding: 4rem 2rem;
`;

const NotificationsNoneIcon = styled(NotificationsNone)`
  width: 4rem;
  height: 4rem;
`;

const LeftColumnContainer = styled.div`
  display: flex;
  align-items: center;
`;
const RightColumnContainer = styled.div`
  width: 100%;
`;

const AlarmTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0rem 0.8rem;

  a {
    color: ${(props) => props.theme.colors.theme};
    text-decoration: underline;
  }
`;

const RequestTime = styled.div`
  font-size: 1.3rem;
  padding: 1rem 0.8rem 0rem 0.8rem;
`;

const ButtonContainer = styled.div`
  padding: 3rem 4rem;
  display: flex;
  justify-content: space-between;
  button {
    width: 48%;
    height: 5rem;
  }
`;

export {
  Content,
  BoxContent,
  InfoContainer,
  LeftColumnContainer,
  RightColumnContainer,
  Label,
  ProjectTitle,
  Notice,
  NotificationsNoneIcon,
  AlarmTitle,
  RequestTime,
  ButtonContainer,
};
