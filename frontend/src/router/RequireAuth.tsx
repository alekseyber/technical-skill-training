import { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { RouteNames } from './appRouterSettings';
// import { RequireAuthProps } from './types';
import { useIsAuth } from './useIsAuth.hook';
import { PageBase, AccessIsDenied } from '@src/components';
import { UserRole } from '@src/types/models/UserDTO';

export interface RequireAuthProps {
  role?: UserRole;
}

const RequireAuth: FC<RequireAuthProps> = ({ children, role = UserRole.USER }) => {
  const { isAuth, user } = useIsAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={RouteNames.LOGIN_PAGE} state={{ from: location }} />;
  }
  if (user.userRole !== role && role !== UserRole.USER) {
    return (
      <PageBase>
        <AccessIsDenied />
      </PageBase>
    );
  }

  return <>{children}</>;
};
export default RequireAuth;
