import React from 'react';
import Link from 'next/link';
import { Notification } from '@/apis/profileNotificationsFetcher';
import { Button } from '@/components/commons/button';
import Skeleton from '@/components/commons/skeleton';
import { BoxContainer, BoxTitle } from '@/styles/commons';
import OptionButton from '@/components/commons/drawer/option';
import {
  BoxContent,
  Content,
  Notice,
  NotificationIcon,
  ProjectTitle,
  Source,
  Time,
  NotificationController,
  User,
  NotificationType,
  NotificationDeleteButton,
  MoreIcon,
  OnlyShowMineNotice,
  OnlyShowMineNoticeContainer,
  FakeNoticeContainer,
  FakeNotice,
} from './styles';

interface CustomNotification extends Notification {
  notificationInfo?: string;
}

export interface NotificationViewProps {
  data?: CustomNotification[];
  each: (data: Notification) => {
    handleProjectJoinApprove: () => void;
    handleProjectJoinReject: () => void;
    handleDeleteNotification: () => void;
  };
  isMine: boolean;
}

const NotificationView = ({ data, each, isMine }: NotificationViewProps) => {
  return <>
    {data ? (
      <BoxContainer>
        <BoxTitle>알림</BoxTitle>
        <BoxContent>
          {isMine ? (
            <>
              {data.length > 0 ? (
                <>
                  {data.map((notification) => {
                    const {
                      handleProjectJoinApprove,
                      handleProjectJoinReject,
                      handleDeleteNotification,
                    } = each(notification);

                    if (notification.type === 'projectJoinRequest') {
                      return (
                        <Content key={notification.id}>
                          <Source>
                            <NotificationIcon color='action' />
                            <Link
                              href={`/profile/${notification.notificationCreator}`}
                              passHref
                              legacyBehavior>
                              <User>{notification.notificationCreator}</User>
                            </Link>
                            <Time> • {notification.createdAt}</Time>
                          </Source>

                          <NotificationType>
                            {notification.notificationInfo}
                          </NotificationType>
                          <Link href={`/project/${notification.projectId}`}>

                            <ProjectTitle>
                              <strong>[프로젝트]</strong>
                              {notification.projectTitle}
                            </ProjectTitle>

                          </Link>

                          <NotificationController>
                            <Button
                              type='submit'
                              text='수락'
                              onClick={handleProjectJoinApprove}
                            />
                            <Button
                              type='normal'
                              text='거절'
                              onClick={handleProjectJoinReject}
                            />
                          </NotificationController>
                        </Content>
                      );
                    } else {
                      return (
                        <Content key={notification.id}>
                          <Source>
                            <NotificationIcon color='action' />

                            <Link
                              href={`/profile/${notification.notificationCreator}`}
                              passHref
                              legacyBehavior>
                              <User>{notification.notificationCreator}</User>
                            </Link>
                            <Time> • {notification.createdAt}</Time>
                          </Source>
                          <NotificationType>
                            {notification.notificationInfo}
                          </NotificationType>

                          <Link href={`/project/${notification.projectId}`}>

                            <ProjectTitle>
                              <strong>[프로젝트]</strong>
                              {notification.projectTitle}
                            </ProjectTitle>

                          </Link>

                          <NotificationDeleteButton>
                            <OptionButton
                              icon={<MoreIcon />}
                              option={{ delete: true }}
                              handleDelete={handleDeleteNotification}
                            />
                          </NotificationDeleteButton>
                        </Content>
                      );
                    }
                  })}
                </>
              ) : (
                <>
                  <Notice>알림이 없습니다.</Notice>
                </>
              )}
            </>
          ) : (
            <OnlyShowMineNoticeContainer>
              <FakeNoticeContainer>
                <FakeNotice>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nostrum odit consequatur aperiam est dolorem in et dolor.
                  Iusto, doloribus temporibus?
                </FakeNotice>
                <FakeNotice>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magni, dolor!
                </FakeNotice>
                <FakeNotice>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Amet placeat, ea praesentium, veritatis enim quia
                  consequuntur aliquid harum
                </FakeNotice>
              </FakeNoticeContainer>
              <OnlyShowMineNotice>본인만 확인 가능합니다.</OnlyShowMineNotice>
            </OnlyShowMineNoticeContainer>
          )}
        </BoxContent>
      </BoxContainer>
    ) : (
      <>
        <Skeleton height={25} bottom={3} />
        <Skeleton height={25} bottom={3} />
        <Skeleton height={25} bottom={3} />
      </>
    )}
  </>;
};

export default NotificationView;
