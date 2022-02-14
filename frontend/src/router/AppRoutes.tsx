import { Loader } from '@src/components';
import { FC, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { appRoutes } from './appRouterSettings';
import RequireAuth from './RequireAuth';
const Layout = lazy(() => import('@src/layout/Layout'));

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
            {appRoutes.map(({ path, Element, auth, role }) => (
              <Route
                path={path}
                element={
                  auth ? (
                    <RequireAuth role={role}>
                      <Element />
                    </RequireAuth>
                  ) : (
                    <Element />
                  )
                }
                key={path}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
