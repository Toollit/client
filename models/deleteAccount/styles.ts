import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Content = styled.div`
  padding: 1.5rem;
`;

const Header = styled.div`
  padding: 2rem 1.5rem;
`;

const SubTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 500;

  span {
    color: ${(props) => props.theme.colors.theme};
  }
`;

const CheckList = styled.li`
  font-size: 1.4rem;
  padding: 1rem 0;
`;

const DropoutAgreeContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3rem 0 8rem 0;
`;

const DropoutAgreeCheckBox = styled.input`
  margin-right: 0.8rem;
  cursor: pointer;
`;

const DropoutAgreeLabel = styled.label`
  font-size: 1.4rem;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  padding: 1rem 0 15rem 0;
`;

export {
  Content,
  Header,
  SubTitle,
  CheckList,
  DropoutAgreeContainer,
  DropoutAgreeCheckBox,
  DropoutAgreeLabel,
  ButtonContainer,
};
