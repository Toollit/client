import React, { FC, useCallback, useEffect, useState } from 'react';
import ProjectView, { ViewProps } from './ProjectView';
import { Project } from '@/apis/profileProjectsFetcher';
import { useRouter } from 'next/router';
import { updateSwipeableViewHeight } from '@/features/swipeableView';
import { useAppDispatch, useAppSelector } from '@/store';
import useWindowSize from '@/hooks/useWindowSize';

import useUserProjectsSWR from '@/hooks/useSWR/useUserProjectsSWR';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

interface ControllerProps {}

const ProjectController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLaptop } = useWindowSize();

  const hasRendered = useAppSelector(
    (state) => state.profile.hasRenderedViewProjects,
  );
  const userNickname = useAppSelector((state) => state.profile.userNickname);
  const [postCount, setPostCount] = useState(5); // Load by 5
  const [posts, setPosts] = useState<Project[]>([]);

  const { projects, projectsTotalCount } = useUserProjectsSWR(
    userNickname,
    postCount,
  );

  const handleCapitalizeMemberTypes = useCallback((data?: Project[]) => {
    if (!data) {
      return;
    }

    // member type convert. developer -> Developer, designer -> Designer, pm -> PM, anyone -> Anyone
    const convertedMemberTypes = data.map((project) => {
      return {
        ...project,
        memberTypes: project.memberTypes.map((type) => {
          return type === 'pm'
            ? type.toUpperCase()
            : type.charAt(0).toUpperCase() + type.slice(1);
        }) as CustomMemberTypes,
      };
    });

    return convertedMemberTypes;
  }, []);

  const handlePostsLoadMore = useCallback(() => {
    setPostCount((prev) => prev + 5);
  }, []);

  useEffect(() => {
    if (projects) {
      setPosts((prev) => [...prev, ...projects]);
    }
  }, [projects]);

  // The reason data is write in the dependencies is to adjust the screen size when the data is updated.
  // Works only in non-desktop versions
  useEffect(() => {
    if (isLaptop !== null && !isLaptop) {
      dispatch(updateSwipeableViewHeight(true));
    }
  }, [dispatch, isLaptop]);

  const props: ViewProps = {
    hasRendered,
    projects: handleCapitalizeMemberTypes(posts),
    projectsTotalCount,
    handleLoadMore: handlePostsLoadMore,
    showLoadMore: posts.length !== projectsTotalCount,
  };

  return <ProjectView {...props} />;
};

export default ProjectController;
