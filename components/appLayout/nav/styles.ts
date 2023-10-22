import styled from '@emotion/styled';
import { css } from '@emotion/react';

const DefaultContainer = styled.nav<{ boundary: boolean }>`
  border-bottom: ${(props) => (props.boundary ? '1px solid #eee' : 'none')};
  width: 100%;
  margin: 0 auto;
  min-height: 6rem;
  height: 6rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #ffffff;
  /* backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.3); */
`;

const Container = styled.nav<{ boundary: boolean; fullSize?: boolean }>`
  border-bottom: ${(props) => (props.boundary ? '1px solid #eee' : 'none')};
  width: 100%;
  margin: 0 auto;
  max-width: ${(props) => (props.fullSize ? '100%' : '102.4rem')};
  min-height: 6rem;
  height: 6rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #ffffff;
  /* backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.3); */
`;

const ColumnContainer = styled.div`
  display: flex;
  min-height: 6rem;
  height: 6rem;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 0.8rem;
`;

const ColumnLeftContainer = styled.ul<{ isMobile: boolean }>`
  display: flex;
  height: 100%;
  align-items: center;

  ${(props) => {
    if (props.isMobile) {
      return css`
        li:active > button {
          border-radius: 25rem;
          background-color: ${props.theme.colors.button.activeGray};
        }
      `;
    }

    if (!props.isMobile) {
      return css`
        li:hover > button {
          border-radius: 25rem;
          background-color: ${props.theme.colors.button.hoverGray};
        }

        li:active > button {
          border-radius: 25rem;
          background-color: ${props.theme.colors.button.activeGray};
        }
      `;
    }
  }}

  li {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  a {
    height: 100%;
  }
`;

const ColumnRightContainer = styled.ul<{ isMobile: boolean }>`
  display: flex;
  height: 100%;
  align-items: center;

  li {
    height: 100%;
  }

  a {
    padding-left: 1.2rem;
    height: 100%;
  }
`;

const StyledLogoLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`;

const LogoText = styled.span`
  line-height: 1.1;
  font-size: 1.8rem;
  padding: 0rem 0.4rem;
  font-weight: 600;
`;

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  font-weight: 500;
`;

const StyledLink = styled.a`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export {
  DefaultContainer,
  Container,
  ColumnContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  StyledLogoLink,
  LogoText,
  Title,
  StyledLink,
};
