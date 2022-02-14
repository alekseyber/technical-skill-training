import { FC } from 'react';
import { Card, CardContent, Box, TextField, Typography, Link as LinkUI } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import type { UserCandidateDTO } from '@src/types/models';
import { useAppActions, useAppSelector } from '@src/store/useRedux.hook';
import { Link } from 'react-router-dom';
import { RouteNames } from '@src/router/appRouterSettings';
import { getErrorFormMessage } from '@src/utils/getErrorFormMessage';

const CssRootDiv = styled('div')`
  width: 100%;
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { login } = useAppActions();
  const { errorAuth, isLoading } = useAppSelector((state) => state.auth);

  const onSubmit = (data: UserCandidateDTO) => {
    login(data);
  };

  const loginFormFieldRules = {
    username: { required: true },
    password: { required: true },
  };
  return (
    <CssRootDiv>
      <div>
        <Card sx={{ maxWidth: 275, my: 2 }}>
          <CardContent>
            <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('username', loginFormFieldRules.username)}
                label="Логин"
                error={!!errors?.username}
                helperText={getErrorFormMessage('логин', errors?.username)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                {...register('password', loginFormFieldRules.password)}
                label="Пароль"
                type="password"
                error={!!errors?.password}
                helperText={getErrorFormMessage('пароль', errors?.password)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              {errorAuth && (
                <Typography variant="body2" mt={1} mb={2} sx={{ color: 'error.main' }}>
                  {errorAuth}
                </Typography>
              )}
              <LinkUI component={Link} to={RouteNames.NEW_USER_PAGE} sx={{ my: 1, display: 'block' }}>
                Регистрация
              </LinkUI>
              <LinkUI component={Link} to={RouteNames.PASSWORD_RESET_PAGE} sx={{ my: 1, display: 'block' }}>
                Забыли пароль
              </LinkUI>
              <Box sx={{ justifyContent: 'flex-end', display: 'flex', mt: 2 }}>
                <LoadingButton
                  type="submit"
                  disabled={Object.keys(errors).length > 0}
                  variant="outlined"
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={<LoginIcon />}
                >
                  Вход
                </LoadingButton>
              </Box>
            </form>
          </CardContent>
        </Card>
      </div>
    </CssRootDiv>
  );
};

export default LoginForm;
