import styled from '@emotion/styled';
import { SearchOutlined, AccountCircleOutlined } from '@mui/icons-material';

const DefaultContainer = styled.nav<{ boundary?: boolean }>`
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

const Container = styled.nav<{ boundary?: boolean; fullSize?: boolean }>`
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

const ColumnLeftContainer = styled.ul`
  display: flex;
  height: 100%;
  align-items: center;
`;

const ColumnRightContainer = styled.ul`
  display: flex;
  height: 100%;
  align-items: center;

  li {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1.5rem;
  }
`;

const StyledLogoLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`;

const LogoTitle = styled.span`
  line-height: 1.1;
  font-size: 2rem;
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

const SearchIcon = styled(SearchOutlined)`
  width: 3.2rem;
  height: 3.2rem;
  color: #000;
  cursor: pointer;

  &.MuiSvgIcon-root {
    stroke: #fff;
    stroke-width: 1;
  }
`;

const AccountCircleIcon = styled(AccountCircleOutlined)`
  width: 3.2rem;
  height: 3.2rem;
  color: #000;
  cursor: pointer;

  &.MuiSvgIcon-root {
    stroke: #fff;
    stroke-width: 1;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  min-height: 6rem;
  height: 6rem;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 0.8rem;
`;

const StyledProfileLink = styled.a`
  height: 3.2rem;
`;

export {
  DefaultContainer,
  Container,
  ColumnContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  StyledLogoLink,
  LogoTitle,
  Title,
  SearchIcon,
  AccountCircleIcon,
  LayoutContainer,
  StyledProfileLink,
};
