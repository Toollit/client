import styled from '@emotion/styled';

const BoxContent = styled.ul`
  li:nth-last-of-type(1) {
    border-bottom: none;
  }
`;

const ContentContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
`;

const InfoCategory = styled.span`
  font-size: 1.4rem;
  word-break: keep-all;
`;

const Info = styled.span`
  font-size: 1.4rem;
  word-break: break-all;
  padding: 0 0.5rem;
`;

const Content = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IntroduceContentContainer = styled.li`
  min-height: 8rem;
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
`;

const ProgramSkillContainer = styled.div`
  min-height: 8rem;
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
`;

const HashtagContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.4rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const DeleteAccount = styled.div`
  padding: 3rem 0.5rem;
  /* text-align: right; */

  span {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.gray};
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 0.5rem;

    &:hover {
      color: #000;
    }
  }
`;

export {
  BoxContent,
  ContentContainer,
  InfoCategory,
  Info,
  Content,
  IntroduceContentContainer,
  ProgramSkillContainer,
  HashtagContainer,
  DeleteAccount,
};
