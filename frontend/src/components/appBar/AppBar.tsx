import { FC } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import AppBarAppMenu from './AppBarMenu';
import { useAppSelector } from '@src/store/useRedux.hook';

const AppBarApp: FC = () => {
  const { publicSettings } = useAppSelector((state) => state.app);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {publicSettings.serviceName}
          </Typography>
          <AppBarAppMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppBarApp;
