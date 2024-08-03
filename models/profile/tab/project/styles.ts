import { mediaQueryLaptop, mediaQueryTablet } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Link from 'next/link';

const BoxContent = styled.ul<{ isLastContent: boolean }>`
  li {
    &:nth-last-of-type(1) {
      &::after {
        border-bottom: none;
      }

      ${(props) => {
        if (!props.isLastContent) {
          return css`
            border-bottom-left-radius: ${props.theme.borderRadius.base};
            border-bottom-right-radius: ${props.theme.borderRadius.base};
          `;
        }
      }}
    }
  }
`;

const Content = styled.li`
  &:hover {
    background-color: #f0f0f0;
  }

  &::after {
    content: '';
    display: block;
    padding-top: 1rem;
    width: calc(100% - 1rem);
    border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
    margin: 0 auto;
  }
`;

const ContentLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #000;
  padding: 0.5rem;
`;

const RecruitmentTypeContainer = styled.div`
  margin: 0.6rem 0.4rem;
  display: flex;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RecruitmentType = styled.div<{
  type: 'Developer' | 'Designer' | 'PM' | 'Anyone';
}>`
  width: fit-content;
  margin-right: 0.2rem;
  padding: 0.4rem 0.4rem;
  border-radius: ${(props) => props.theme.borderRadius.sharp};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #fff;
  text-align: center;
  background-color: ${(props) => {
    const recruitmentType = props.type;

    switch (recruitmentType) {
      case 'Developer':
        return props.theme.colors.developer;

      case 'Designer':
        return props.theme.colors.designer;

      case 'PM':
        return props.theme.colors.pm;

      case 'Anyone':
        return props.theme.colors.anyone;

      default:
        break;
    }
  }};

  ${mediaQueryTablet} {
    margin-right: 0.4rem;
    padding: 0.4rem 0.8rem;
  }

  ${mediaQueryLaptop} {
    padding: 0.4rem 1rem;
  }
`;

const Title = styled.div`
  font-size: 1.4rem;
  padding: 0rem 0.8rem;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  isolation: isolate; // this attribute for overflow: hidden not working in safari Bug
`;

const HashtagContainer = styled.ul`
  margin: 0.8rem 0.5rem;
  display: flex;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SubInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 0.5rem;

  div {
    display: flex;
    line-height: 2.5rem;
    margin-left: 1rem;
    margin: 0 0.3rem;

    &:nth-last-of-type(1) {
      span {
        color: #3da571;
      }
    }

    span {
      font-size: 1.2rem;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
    }
  }
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0rem;
`;
const LoadMoreButton = styled.button`
  font-size: 1.4rem;
  padding: 1rem 3rem;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.base};
  background-color: ${(props) => props.theme.colors.lightGray};
  color: #000;
`;

const Notice = styled.p`
  font-size: 1.4rem;
  padding: 4rem 2rem;
`;

const ProjectCreateLink = styled(Link)`
  display: inline-block;
  font-size: 1.4rem;
  padding: 2rem;
  color: ${(props) => props.theme.colors.theme};
`;

export {
  Content,
  BoxContent,
  HashtagContainer,
  RecruitmentTypeContainer,
  RecruitmentType,
  Title,
  LoadMoreContainer,
  LoadMoreButton,
  ContentLink,
  Notice,
  ProjectCreateLink,
  SubInfo,
};
