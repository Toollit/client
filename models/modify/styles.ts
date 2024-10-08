import { mediaQueryLaptop } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

const Form = styled.form`
  padding-bottom: ${(props) => props.theme.layout.bottomButtonHeight};

  ${mediaQueryLaptop} {
    padding-bottom: 0;
  }
`;

const TitleContainer = styled.div`
  padding: 0 1.5rem;
`;

const EditorContainer = styled.div`
  padding: 0 1.5rem;
`;

const HashtagContainer = styled.div`
  padding: 2rem 1.5rem 0 1.5rem;
`;

const MemberTypeContainer = styled.div`
  padding: 2rem 1.5rem 0 1.5rem;
`;
const RecruitContainer = styled.div`
  padding: 2rem 1.5rem 0 1.5rem;
`;

const RepresentativeImageContainer = styled.div`
  padding: 2rem 1.5rem 2rem 1.5rem;
`;

const RecruitCountInput = styled.input`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  width: 20rem;
  height: 4rem;
  padding: 0rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.border.base};
  border-radius: ${(props) => props.theme.borderRadius.sharp};

  /* always show up / down arrow. but mobile view not working*/
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

const SubmitContainer = styled.div``;

const DesktopSubmitContainer = styled.div`
  display: none;

  ${mediaQueryLaptop} {
    display: flex;
    justify-content: right;
    padding: 4rem 1.5rem 8rem 1.5rem;
  }
`;
const MobileSubmitContainer = styled.div`
  display: initial;

  ${mediaQueryLaptop} {
    display: none;
  }
`;

export {
  Form,
  TitleContainer,
  EditorContainer,
  HashtagContainer,
  MemberTypeContainer,
  RecruitContainer,
  RepresentativeImageContainer,
  SubmitContainer,
  DesktopSubmitContainer,
  MobileSubmitContainer,
  RecruitCountInput,
};
