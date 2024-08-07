import React, { FC, useCallback, useEffect, useState } from 'react';
import SearchView, { ViewProps } from './SearchView';
import { useRouter } from 'next/router';
import { CapitalizedMemberTypes, ProjectOverview } from '@/typings';
import projectDefaultImage from 'public/static/images/project.jpg';
import useMyBookmarkIdsSWR from '@/hooks/useSWR/useMyBookmarkIdsSWR';
import useSearchProjectsSWR from '@/hooks/useSWR/useSearchProjectsSWR';

interface BookmarkStatusCheckProjects extends ProjectOverview {
  bookmark: boolean;
}

interface CapitalizedMemberTypesProjects
  extends Omit<BookmarkStatusCheckProjects, 'memberTypes'> {
  memberTypes: CapitalizedMemberTypes[];
}

export interface ControllerProps {}

const SearchController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');
  const { q } = router.query;

  const { projects } = useSearchProjectsSWR(true, searchText, {});
  const { bookmarkIds } = useMyBookmarkIdsSWR(true, {});

  const handleBookmarkStatusCheck = useCallback(
    (projects: ProjectOverview[], bookmarkIds: number[]) => {
      return projects.map((project) => {
        return bookmarkIds.includes(project.id)
          ? { ...project, bookmark: true }
          : { ...project, bookmark: false };
      });
    },
    [],
  );

  const handleCapitalizedMemberTypes = useCallback(
    (projects: BookmarkStatusCheckProjects[]) => {
      // member type convert. developer -> Developer, designer -> Designer, pm -> PM, anyone -> Anyone
      const capitalizedMemberTypes = projects.map((project) => {
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
    (projects: CapitalizedMemberTypesProjects[]) => {
      const filteredImage = projects.map((project) => {
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
    (projects?: ProjectOverview[], bookmarkIds?: number[]) => {
      if (!projects || !bookmarkIds) {
        return;
      }

      const bookmarkStatusCheckResult = handleBookmarkStatusCheck(
        projects,
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

  useEffect(() => {
    if (typeof q !== 'string') {
      return;
    }

    setSearchText(q);
  }, [router, q]);

  const props: ViewProps = {
    searchText,
    projects: handleProcessData(projects, bookmarkIds),
  };

  return <SearchView {...props} />;
};

export default SearchController;
