import styled from '@emotion/styled';

const BoxContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border.base};
  border-radius: ${(props) => props.theme.borderRadius.base};
  border-top: none;
  box-shadow: ${(props) => props.theme.boxShadow.base};
  margin-top: 3rem;
`;

const BoxTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: ${(props) => props.theme.borderRadius.base}
    ${(props) => props.theme.borderRadius.base} 0 0;
  color: #fff;
  background-image: linear-gradient(
    98deg,
    ${(props) => props.theme.colors.theme},
    #49c6dd
  );
`;

const BoxContent = styled.ul`
  li:nth-last-of-type(1) {
    border-bottom: none;
  }
`;

const ContentBlock = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SubTitle = styled.span`
  font-size: 1.4rem;
  word-break: keep-all;
`;

const Content = styled.span`
  font-size: 1.4rem;
  word-break: break-all;
  padding: 0 0.5rem;
`;

const IntroduceContentContainer = styled.div`
  min-height: 8rem;
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
`;

const IntroduceContent = styled.div`
  font-size: 1.4rem;
  padding: 0rem 1rem;
  word-break: break-all;
`;

const ProgramOrSkillContainer = styled.div`
  min-height: 8rem;
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
`;

const HashtagContainer = styled.ul`
  /* padding: 0rem 1rem; */
  display: flex;
  flex-wrap: nowrap;
  overflow: scroll;

  font-size: 1.4rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export {
  BoxContainer,
  BoxTitle,
  BoxContent,
  ContentBlock,
  ContentContainer,
  SubTitle,
  Content,
  IntroduceContentContainer,
  IntroduceContent,
  ProgramOrSkillContainer,
  HashtagContainer,
};
