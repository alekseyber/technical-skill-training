import { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '@src/components';
import { RouteNames } from '@src/router/appRouterSettings';
import { useIsAuth } from '@src/router/useIsAuth.hook';

interface StateType {
  from: { pathname: string };
}

const LoginPage: FC = () => {
  const { isAuth } = useIsAuth();
  const navigate = useNavigate();
  const location = useLocation();

  let from: string = (location.state as Partial<StateType>)?.from?.pathname || '/';
  from = from === RouteNames.LOGIN_PAGE ? '/' : from;

  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth, from, navigate]);

  return <LoginForm />;
};

export default LoginPage;
