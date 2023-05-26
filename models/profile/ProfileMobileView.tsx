import React from 'react';
import SwipeableTabView from '@/components/commons/swipeableView/swipeableTabViews';
import Divider from '@/components/commons/divider';
import Skeleton from '@/components/commons/skeleton';
import {
  SettingsContainer,
  DeleteUser,
  UserProfileContainer,
  SwipeableViewContainer,
} from './styles';

export interface ProfileMobileViewProps {
  tabs: { name: string; query: string }[];
  currentTab: 'viewProfile' | 'viewProjects' | 'viewBookmarks' | undefined;
  isLoadedData: {
    viewProfile: boolean;
    viewProjects: boolean;
    viewBookmarks: boolean;
  };
}

const ProfileMobileView = ({
  tabs,
  currentTab,
  isLoadedData,
}: ProfileMobileViewProps) => {
  return (
    <SwipeableTabView tabs={tabs}>
      <SwipeableViewContainer>
        {currentTab === 'viewProfile' ? (
          isLoadedData.viewProfile ? (
            <>
              <UserProfileContainer>
                <div>
                  {/* <div>내 프로필</div> */}
                  {/* <div>이름</div> */}
                  {/* <div>핸드폰 번호 수정</div> */}
                  <div>
                    <div>이메일</div>
                    <div>수정</div>
                  </div>
                  <Divider type='thin' />
                </div>
                <div>
                  <div>자기소개</div>
                  <div>수정</div>
                </div>

                <Divider type='thin' />

                <div>
                  <div>온/오프라인</div>
                  <div>모임장소</div>
                  <div>모임시간</div>
                  <div>관심분야</div>
                  <div>경력사항</div>
                </div>
                <div>
                  <div>온/오프라인</div>
                  <div>모임장소</div>
                  <div>모임시간</div>
                  <div>관심분야</div>
                  <div>경력사항</div>
                </div>
                <div>
                  <div>온/오프라인</div>
                  <div>모임장소</div>
                  <div>모임시간</div>
                  <div>관심분야</div>
                  <div>경력사항</div>
                </div>
                <div>
                  <div>온/오프라인</div>
                  <div>모임장소</div>
                  <div>모임시간</div>
                  <div>관심분야</div>
                  <div>경력사항</div>
                </div>
                <div>
                  <div>온/오프라인</div>
                  <div>모임장소</div>
                  <div>모임시간</div>
                  <div>관심분야</div>
                  <div>경력사항</div>
                </div>
                <div>
                  <div>온/오프라인</div>
                  <div>모임장소</div>
                  <div>모임시간</div>
                  <div>관심분야</div>
                  <div>경력사항</div>
                </div>
                <div>
                  <div>온/오프라인</div>
                  <div>모임장소</div>
                  <div>모임시간</div>
                  <div>관심분야</div>
                  <div>경력사항</div>
                </div>
                <div>
                  <div>온/오프라인</div>
                  <div>모임장소</div>
                  <div>모임시간</div>
                  <div>관심분야</div>
                  <div>경력사항</div>
                </div>
                <div>
                  <div>온/오프라인</div>
                  <div>모임장소</div>
                  <div>모임시간</div>
                  <div>관심분야</div>
                  <div>경력사항</div>
                </div>

                <Divider type='thin' />
                <div>
                  <div>사용 프로그램 또는 기술</div>
                  <div>수정</div>
                </div>
              </UserProfileContainer>

              <SettingsContainer>
                <div>이메일 공개</div>

                <div>on/off 토글</div>
              </SettingsContainer>

              <DeleteUser>{`회원탈퇴 >`}</DeleteUser>
            </>
          ) : (
            <Skeleton />
          )
        ) : null}
      </SwipeableViewContainer>
      <SwipeableViewContainer>
        {currentTab === 'viewProjects' ? (
          isLoadedData.viewProjects ? (
            <>
              <div>프로젝트</div>
              <div>프로젝트</div>
              <div>프로젝트</div>
              <div>프로젝트</div>
            </>
          ) : (
            <Skeleton />
          )
        ) : null}
      </SwipeableViewContainer>
      <SwipeableViewContainer>
        {currentTab === 'viewBookmarks' ? (
          isLoadedData.viewBookmarks ? (
            <>
              <div>북마크</div>
              <div>북마크</div>
              <div>북마크</div>
              <div>북마크</div>
            </>
          ) : (
            <Skeleton />
          )
        ) : null}
      </SwipeableViewContainer>
    </SwipeableTabView>
  );
};

export default ProfileMobileView;
