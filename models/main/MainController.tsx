import React, { FC, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainView, { ViewProps } from './MainView';
import { errorMessage } from '@/apis/errorMessage';
import useAuth from '@/hooks/useAuth';
import projectDefaultImage from 'public/static/images/project.jpg';
import useMyBookmarkIdsSWR from '@/hooks/useSWR/useMyBookmarkIdsSWR';
import useProjectOverviewsSWR from '@/hooks/useSWR/useProjectOverviewsSWR';
import { CapitalizedMemberTypes, ProjectOverview } from '@/typings';

interface BookmarkStatusCheckProjects extends ProjectOverview {
  bookmark: boolean;
}

interface CapitalizedMemberTypesProjects
  extends Omit<BookmarkStatusCheckProjects, 'memberTypes'> {
  memberTypes: CapitalizedMemberTypes[];
}

interface ControllerProps {
  pageNumber: number;
  postOrder: 'new' | 'popularity';
}

const MainController: FC<ControllerProps> = ({
  pageNumber = 1,
  postOrder = 'new',
}) => {
  const router = useRouter();
  const { authMutate } = useAuth();

  const [page, setPage] = useState(pageNumber);
  const [order, setOrder] = useState<'new' | 'popularity'>(postOrder);

  const { projectOverviews, totalPage } = useProjectOverviewsSWR(
    page,
    order,
    '/',
    'projectOverviews',
  );
  const { bookmarkIds } = useMyBookmarkIdsSWR();

  const handleCreateProject = useCallback(async () => {
    try {
      const auth = await authMutate();

      if (auth?.success) {
        return router.push('/project/create');
      }

      if (!auth?.success) {
        return router.push('/signin');
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [router, authMutate]);

  const handleBookmarkStatusCheck = useCallback(
    (projectOverviews: ProjectOverview[], bookmarkIds: number[]) => {
      return projectOverviews.map((project) => {
        return bookmarkIds.includes(project.id)
          ? { ...project, bookmark: true }
          : { ...project, bookmark: false };
      });
    },
    [],
  );

  const handleCapitalizedMemberTypes = useCallback(
    (projectOverviews: BookmarkStatusCheckProjects[]) => {
      // member type convert. developer -> Developer, designer -> Designer, pm -> PM, anyone -> Anyone
      const capitalizedMemberTypes = projectOverviews.map((project) => {
        return {
          ...project,
          memberTypes: project.memberTypes?.map((type) => {
            return type === 'pm'
              ? type.toUpperCase()
              : type.charAt(0).toUpperCase() + type.slice(1);
          }) as CapitalizedMemberTypes[],
        };
      });

      return capitalizedMemberTypes;
    },
    [],
  );

  const handleImageFilter = useCallback(
    (projectOverviews: CapitalizedMemberTypesProjects[]) => {
      const filteredImage = projectOverviews.map((project) => {
        return {
          ...project,
          representativeImage:
            project.representativeImage === 'defaultImage'
              ? projectDefaultImage
              : project.representativeImage,
        };
      });

      return filteredImage;
    },
    [],
  );

  const handleProcessData = useCallback(
    (projectOverviews?: ProjectOverview[], bookmarkIds?: number[]) => {
      if (!projectOverviews || !bookmarkIds) {
        return;
      }

      const bookmarkStatusCheckResult = handleBookmarkStatusCheck(
        projectOverviews,
        bookmarkIds,
      );
      const capitalizedMemberTypesResult = handleCapitalizedMemberTypes(
        bookmarkStatusCheckResult,
      );

      const imageFilterResult = handleImageFilter(capitalizedMemberTypesResult);

      return imageFilterResult;
    },
    [
      handleBookmarkStatusCheck,
      handleCapitalizedMemberTypes,
      handleImageFilter,
    ],
  );

  // Set up page and order to request data to the server
  useEffect(() => {
    const pageQuery = router.query['page'];
    const orderQuery = router.query['order'];

    // Preventing Infinite Requests
    if (router.asPath === '/') {
      if (page === 1 && order === 'new') {
        return;
      }
    }

    if (Array.isArray(pageQuery) || Array.isArray(orderQuery)) {
      return;
    }

    if (
      pageQuery === undefined ||
      orderQuery === undefined ||
      pageQuery === '' ||
      orderQuery === ''
    ) {
      setPage(1);
      setOrder('new');
      router.replace('/', undefined, { shallow: true });
      return;
    }

    if (orderQuery !== 'new' && orderQuery !== 'popularity') {
      return;
    }

    setPage(Number(pageQuery));
    setOrder(orderQuery);
  }, [router, page, order]);

  const props: ViewProps = {
    projectOverviews: handleProcessData(projectOverviews, bookmarkIds),
    handleCreateProject,
    pagination: {
      totalPage: totalPage ?? 1,
    },
  };

  return <MainView {...props} />;
};

export default MainController;
