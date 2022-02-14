import { UserRole } from '@src/types/models/UserDTO';
import { FC, lazy, LazyExoticComponent } from 'react';

const MainPage = lazy(() => import('@src/pages/MainPage'));
const LoginPage = lazy(() => import('@src/pages/LoginPage'));
const NoFoundPage = lazy(() => import('@src/pages/NoFoundPage'));
const AdminUsersPage = lazy(() => import('@src/pages/AdminUsersPage'));
const TestPage = lazy(() => import('@src/pages/TestPage'));
const UserStatisticsPage = lazy(() => import('@src/pages/UserStatisticsPage'));
const RezultPage = lazy(() => import('@src/pages/RezultPage'));
const ProfilePage = lazy(() => import('@src/pages/ProfilePage'));
const TestEditPage = lazy(() => import('@src/pages/TestEditPage'));
const RegistrationPage = lazy(() => import('@src/pages/RegistrationPage'));
const AdminUserEditPage = lazy(() => import('@src/pages/AdminUserEditPage'));
const AdminUserStatisticsPage = lazy(() => import('@src/pages/AdminUserStatisticsPage'));
const AdminUserAddPage = lazy(() => import('@src/pages/AdminUserAddPage'));
const StartAppPage = lazy(() => import('@src/pages/StartAppPage'));
const PasswordResetPage = lazy(() => import('@src/pages/PasswordResetPage'));
const AdminSettingsPage = lazy(() => import('@src/pages/AdminSettingsPage'));
const RezultAdminPage = lazy(() => import('@src/pages/RezultAdminPage'));

interface AppRoute {
  path: string;
  Element: LazyExoticComponent<FC>;
  auth?: boolean;
  role?: UserRole;
}

export enum RouteNames {
  MAIN_PAGE = '/',
  LOGIN_PAGE = '/login',
  ADMIN_USERS_PAGE = '/users',
  ADMIN_USER_EDIT_PAGE = '/users/:_id',
  ADMIN_USER_NEW_PAGE = '/admin-new-user',
  ADMIN_USER_STATISTICS_PAGE = '/admin-userstatistics/:_id',
  ADMIN_REZULT_PAGE = '/admin-rezult/:rezultId',
  ADMIN_SETTINGS = 'settings',
  PROFILE_PAGE = '/profile',
  NEW_USER_PAGE = '/registration',
  START_APP_PAGE = '/startapp',
  TEST_PAGE = '/test/:_id',
  TEST_EDIT_PAGE = '/testedit/:_id',
  USER_STATISTICS_PAGE = '/userstatistics',
  PASSWORD_RESET_PAGE = '/password-reset',
  REZULT_PAGE = '/rezult/:rezultId',
  NO_FOUND_PAGE_404 = '/404',
  NO_FOUND_PAGE = '*',
}

export const getLinkByRoutePath = (routeName: keyof typeof RouteNames, param = ''): string => {
  return RouteNames[routeName].split(':')[0] + param;
};

export const appRoutes: AppRoute[] = [
  { path: RouteNames.MAIN_PAGE, Element: MainPage, auth: true },
  { path: RouteNames.TEST_PAGE, Element: TestPage, auth: true },
  {
    path: RouteNames.USER_STATISTICS_PAGE,
    Element: UserStatisticsPage,
    auth: true,
  },
  { path: RouteNames.REZULT_PAGE, Element: RezultPage, auth: true },
  { path: RouteNames.PROFILE_PAGE, Element: ProfilePage, auth: true },
  { path: RouteNames.LOGIN_PAGE, Element: LoginPage },
  { path: RouteNames.NEW_USER_PAGE, Element: RegistrationPage },
  { path: RouteNames.START_APP_PAGE, Element: StartAppPage },
  { path: RouteNames.PASSWORD_RESET_PAGE, Element: PasswordResetPage },
  {
    path: RouteNames.ADMIN_USERS_PAGE,
    Element: AdminUsersPage,
    auth: true,
    role: UserRole.ADMIN,
  },
  {
    path: RouteNames.ADMIN_USER_EDIT_PAGE,
    Element: AdminUserEditPage,
    auth: true,
    role: UserRole.ADMIN,
  },
  {
    path: RouteNames.ADMIN_USER_NEW_PAGE,
    Element: AdminUserAddPage,
    auth: true,
    role: UserRole.ADMIN,
  },
  {
    path: RouteNames.ADMIN_USER_STATISTICS_PAGE,
    Element: AdminUserStatisticsPage,
    auth: true,
    role: UserRole.ADMIN,
  },
  {
    path: RouteNames.TEST_EDIT_PAGE,
    Element: TestEditPage,
    auth: true,
    role: UserRole.ADMIN,
  },
  {
    path: RouteNames.ADMIN_SETTINGS,
    Element: AdminSettingsPage,
    auth: true,
    role: UserRole.ADMIN,
  },
  {
    path: RouteNames.ADMIN_REZULT_PAGE,
    Element: RezultAdminPage,
    auth: true,
    role: UserRole.ADMIN,
  },
  { path: RouteNames.NO_FOUND_PAGE, Element: NoFoundPage, auth: true },
  { path: RouteNames.NO_FOUND_PAGE_404, Element: NoFoundPage, auth: true },
];
