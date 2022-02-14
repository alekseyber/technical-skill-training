import { FC } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useAppActions, useAppSelector } from '@src/store/useRedux.hook';

const AppAlert: FC = () => {
  const { alert } = useAppSelector((state) => state.app);
  const { hideAlert } = useAppActions();

  return (
    <Snackbar onClose={hideAlert} open={alert.visible} autoHideDuration={alert.autoHideDuration}>
      <Alert onClose={hideAlert} severity={alert.severity} variant="filled">
        {alert.text}
      </Alert>
    </Snackbar>
  );
};

export default AppAlert;
