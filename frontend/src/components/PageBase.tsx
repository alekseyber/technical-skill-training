import { FC } from 'react';
import { Breakpoint, Container, Typography } from '@mui/material';
import { AppBreadcrumbs } from '.';
import { AppBreadcrumbsItemProps } from './AppBreadcrumbs';

export interface PageBaseProps {
  title?: string;
  maxWidth?: Breakpoint | false;
  fixed?: boolean;
  breadcrumbsOn?: boolean;
  breadcrumbsHomeOn?: boolean;
  breadcrumbsList?: AppBreadcrumbsItemProps[];
}

const PageBase: FC<PageBaseProps> = ({
  children,
  title,
  maxWidth = 'md',
  fixed = false,
  breadcrumbsOn,
  breadcrumbsList,
  breadcrumbsHomeOn = true,
}) => {
  return (
    <Container maxWidth={maxWidth} fixed={fixed} sx={{ my: 3 }}>
      {title && (
        <Typography
          variant="h5"
          component="h1"
          align="center"
          sx={{
            my: 3,
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
      )}
      {breadcrumbsOn && breadcrumbsList && (
        <AppBreadcrumbs breadcrumbsList={breadcrumbsList} breadcrumbsHomeOn={breadcrumbsHomeOn} />
      )}
      {children}
    </Container>
  );
};

export default PageBase;
