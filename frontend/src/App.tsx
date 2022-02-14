import { FC, useEffect } from 'react';
import { teal, deepOrange } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAppActions } from '@src/store/useRedux.hook';
import { UserAuth } from '@src/types/models';
import { getObjectLocalStorage } from '@src/utils/localStorageUtil';
import AppRoutes from '@src/router/AppRoutes';
import { AuthDTO } from '@src/types/models/AuthDTO';
import { ruRU } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: teal[900],
      },
      secondary: {
        main: deepOrange[900],
      },
    },
    typography: {
      h5: {
        fontWeight: 500,
      },
    },
  },
  ruRU
);

const App: FC = () => {
  const { setUser, loadPublicSettings } = useAppActions();

  useEffect(() => {
    loadPublicSettings();
    const user = getObjectLocalStorage<UserAuth>('user');
    const token = getObjectLocalStorage<AuthDTO>('token');

    if (user?.username && token?.access_token) {
      setUser(user, token);
    }
  }, [setUser, loadPublicSettings]);

  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
