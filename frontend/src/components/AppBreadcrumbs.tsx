import { FC } from 'react';
import { Breadcrumbs, Link as LinkUI, Typography } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { RouteNames } from '@src/router/appRouterSettings';
import { NavLink } from 'react-router-dom';

export interface AppBreadcrumbsItemProps {
  title: string;
  to?: string;
}

interface AppBreadcrumbsProps {
  breadcrumbsHomeOn?: boolean;
  breadcrumbsList: AppBreadcrumbsItemProps[];
}

const BreadcrumbsItem: FC<AppBreadcrumbsItemProps> = ({ title, to }) => {
  return to ? (
    <LinkUI underline="hover" color="inherit" component={NavLink} to={to}>
      {title}
    </LinkUI>
  ) : (
    <Typography color="text.primary">{title}</Typography>
  );
};

const AppBreadcrumbs: FC<AppBreadcrumbsProps> = ({ breadcrumbsList, breadcrumbsHomeOn = true }) => {
  return (
    <Breadcrumbs sx={{ my: 4, mx: 1 }}>
      {breadcrumbsHomeOn && (
        <LinkUI
          underline="hover"
          color="inherit"
          sx={{ display: 'flex', alignItems: 'center' }}
          component={NavLink}
          to={RouteNames.MAIN_PAGE}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Главная
        </LinkUI>
      )}
      {breadcrumbsList.map((item, i) => (
        <BreadcrumbsItem key={i + item.title} {...item} />
      ))}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
