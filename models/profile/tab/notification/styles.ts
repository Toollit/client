import styled from '@emotion/styled';
import { NotificationsNone, MoreVert } from '@mui/icons-material';

const BoxContent = styled.ul`
  li {
    :nth-last-of-type(1) {
      ::after {
        border-bottom: none;
      }
    }
  }
`;

const Content = styled.li`
  position: relative;
  padding: 2rem 1.5rem 0 1.5rem;

  ::after {
    content: '';
    display: block;
    padding-top: 3rem;
    width: calc(100% - 1rem);
    border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
    margin: 0 auto;
  }
`;

const Source = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
`;

const NotificationIcon = styled(NotificationsNone)`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
`;

const User = styled.a`
  color: #000;
  text-decoration: underline;
  margin-right: 0.5rem;
  font-weight: 700;
`;

const Time = styled.div`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.gray};
`;

const NotificationType = styled.div`
  font-size: 1.4rem;
  margin-top: 0.5rem;
  font-weight: 600;
`;

const ProjectTitle = styled.p`
  color: #000;
  font-size: 1.4rem;
  padding-top: 0.8rem;
  /* font-weight: 500; */
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  isolation: isolate; // this attribute for overflow: hidden not working in safari Bug

  strong {
    word-break: keep-all;
    margin-right: 0.5rem;
    color: ${(props) => props.theme.colors.theme};
  }
`;

const NotificationController = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;

  button {
    width: 48%;
    height: 5rem;
  }
`;

const NotificationDeleteButton = styled.div`
  position: absolute;
  right: 0;
  top: 1.5rem;
`;

const MoreVertIcon = styled(MoreVert)`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.gray};
`;

const MoreButton = styled.button`
  border: transparent;
  background-color: transparent;
  cursor: pointer;
`;

const Notice = styled.p`
  font-size: 1.4rem;
  padding: 4rem 2rem;
`;

export {
  BoxContent,
  Content,
  Source,
  NotificationIcon,
  User,
  Time,
  NotificationType,
  ProjectTitle,
  NotificationController,
  NotificationDeleteButton,
  MoreVertIcon,
  MoreButton,
  Notice,
};
