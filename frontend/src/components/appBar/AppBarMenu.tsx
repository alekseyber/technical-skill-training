import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ExitToApp as ExitToAppIcon,
  AccountBox as AccountBoxIcon,
  People as PeopleIcon,
  QueryStats as QueryStatsIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { RouteNames } from '@src/router/appRouterSettings';
import { useIsAuth } from '@src/router/useIsAuth.hook';
import { AppItemMenu } from '@src/components';
import type { MenuSettings } from '@src/components/AppItemMenu';

const AppBarAppMenu: FC = () => {
  const { isAuth, logout, isAdmin } = useIsAuth();

  const menuSettingsMain: MenuSettings = {
    title: 'Главная',
    divider: true,
    IconElement: HomeIcon,
    props: { component: NavLink, to: RouteNames.MAIN_PAGE },
  };

  const menuSettingsExit: MenuSettings = {
    title: 'Выход',
    dividerPrev: true,
    IconElement: ExitToAppIcon,
    onClickClosed: logout,
    props: {},
  };

  const menuSettingsUser: MenuSettings[] = [
    {
      title: 'Профиль',
      IconElement: AccountBoxIcon,
      props: { component: NavLink, to: RouteNames.PROFILE_PAGE },
    },
    {
      title: 'Статистика',
      IconElement: QueryStatsIcon,
      props: { component: NavLink, to: RouteNames.USER_STATISTICS_PAGE },
    },
  ];

  const menuSettingsAdmin: MenuSettings[] = [
    {
      title: 'Пользователи',
      IconElement: PeopleIcon,
      props: { component: NavLink, to: RouteNames.ADMIN_USERS_PAGE },
    },
    {
      title: 'Настройки',
      IconElement: SettingsIcon,
      divider: true,
      props: { component: NavLink, to: RouteNames.ADMIN_SETTINGS },
    },
  ];

  const menuSettingsList = isAdmin
    ? [menuSettingsMain, ...menuSettingsAdmin, ...menuSettingsUser, menuSettingsExit]
    : [menuSettingsMain, ...menuSettingsUser, menuSettingsExit];

  if (!isAuth) return null;
  return <AppItemMenu title="Меню" menuSettingsList={menuSettingsList} />;
};

export default AppBarAppMenu;
