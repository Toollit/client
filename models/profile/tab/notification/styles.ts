import styled from '@emotion/styled';
import Link from 'next/link';

const BoxContent = styled.ul`
  li {
    &:nth-last-of-type(1) {
      &::after {
        border-bottom: none;
      }

      border-bottom-left-radius: ${(props) => props.theme.borderRadius.base};
      border-bottom-right-radius: ${(props) => props.theme.borderRadius.base};
    }
  }
`;

const Content = styled.li`
  position: relative;
  padding: 2rem 1.5rem 0 1.5rem;

  &::after {
    content: '';
    display: block;
    padding-top: 3rem;
    width: calc(100% - 1rem);
    border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
    margin: 0 auto;
  }
`;

const NotificationTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
`;

const NotificationsIconContainer = styled.div`
  margin-right: 0.5rem;
  line-height: 0;
`;

const UserProfileLink = styled(Link)`
  color: #000;
  text-decoration: underline;
  margin-right: 0.5rem;
  font-weight: 700;
`;

const Time = styled.div`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.gray};
`;

const NotificationMessage = styled.div`
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

const EmptyNoticeText = styled.p`
  font-size: 1.4rem;
  padding: 4rem 2rem;
`;

const NoticeHideContainer = styled.div`
  position: relative;
`;

const LockPersonIconContainer = styled.div`
  text-align: center;
  margin-top: 4rem;
`;

const HideNoticeText = styled.div`
  /* backdrop-filter: blur(0.6rem); */
  /* background-color: rgba(255, 255, 255, 0.6); */
  font-size: 1.4rem;
  text-align: center;
  margin: 4rem 1rem;
  height: 25rem;
`;

export {
  BoxContent,
  Content,
  NotificationTitle,
  NotificationsIconContainer,
  UserProfileLink,
  Time,
  NotificationMessage,
  ProjectTitle,
  NotificationController,
  NotificationDeleteButton,
  EmptyNoticeText,
  NoticeHideContainer,
  LockPersonIconContainer,
  HideNoticeText,
};
