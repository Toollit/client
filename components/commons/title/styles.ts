import styled from '@emotion/styled';

const TitleContainer = styled.div`
  height: 7.2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleText = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xxxlarge};
`;

export { TitleContainer, TitleText };
