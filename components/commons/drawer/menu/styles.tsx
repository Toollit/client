import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Menu } from '@mui/icons-material';
import {
  AccountCircleOutlined,
  ArticleOutlined,
  BookmarkBorderOutlined,
  NotificationsNoneOutlined,
  CampaignOutlined,
  MouseOutlined,
  AdminPanelSettingsOutlined,
  LiveHelpOutlined,
  LogoutOutlined,
} from '@mui/icons-material';

const OpenButton = styled.button`
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
`;

const MenuIcon = styled(Menu)`
  width: 3.2rem;
  height: 3.2rem;
  color: #000;

  &.MuiSvgIcon-root {
    stroke: #fff;
    stroke-width: 1;
  }
`;

const Container = styled.div`
  max-width: 102.4rem;
  width: 100%;
  margin: 0 auto;
  min-height: ${(props) => `calc(100vh - ${props.theme.layout.navHeight} )`};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #eee;
  padding: 0 1.5rem;
  cursor: pointer;
`;

const Icon = styled.div`
  font-size: 1.4rem;
  width: 3.5rem;
  height: 3.5rem;
`;

const Text = styled.div`
  height: 8rem;
  line-height: 8rem;
  font-size: 1.4rem;
  padding-left: 1.5rem;
`;

const StyledLink = styled.a`
  color: #000;
`;

const commonIconStyles = () => css`
  width: 100%;
  height: 100%;
`;

const AccountCircleIcon = styled(AccountCircleOutlined)`
  ${commonIconStyles}
`;
const ArticleIcon = styled(ArticleOutlined)`
  ${commonIconStyles}
`;
const BookmarkIcon = styled(BookmarkBorderOutlined)`
  ${commonIconStyles}
`;
const NotificationsIcon = styled(NotificationsNoneOutlined)`
  ${commonIconStyles}
`;
const CampaignIcon = styled(CampaignOutlined)`
  ${commonIconStyles}
`;
const MouseIcon = styled(MouseOutlined)`
  ${commonIconStyles}
`;
const AdminPanelSettingsIcon = styled(AdminPanelSettingsOutlined)`
  ${commonIconStyles}
`;
const LiveHelpOutlinedIcon = styled(LiveHelpOutlined)`
  ${commonIconStyles}
`;
const LogoutOutlinedIcon = styled(LogoutOutlined)`
  ${commonIconStyles}
`;

export {
  OpenButton,
  MenuIcon,
  Container,
  Item,
  Icon,
  Text,
  AccountCircleIcon,
  ArticleIcon,
  BookmarkIcon,
  NotificationsIcon,
  CampaignIcon,
  MouseIcon,
  AdminPanelSettingsIcon,
  LiveHelpOutlinedIcon,
  LogoutOutlinedIcon,
  StyledLink,
};
