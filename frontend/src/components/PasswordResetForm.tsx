import { FC, useState } from 'react';
import { Card, CardContent, Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import type { PasswordResetDTO } from '@src/types/models';
import { getErrorFormMessage } from '@src/utils/getErrorFormMessage';

const CssRootDiv = styled('div')`
  width: 100%;
  min-height: calc(50vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface PasswordResetFormProps<DTO> {
  callbackSave: (value: DTO) => Promise<void>;
}

const PasswordResetForm: FC<PasswordResetFormProps<PasswordResetDTO>> = ({ callbackSave }) => {
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: PasswordResetDTO) => {
    try {
      setLoading(true);
      await callbackSave(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const passwordResetFormFieldRules = {
    email: { required: true },
  };
  return (
    <CssRootDiv>
      <div>
        <Card sx={{ my: 2 }}>
          <CardContent>
            <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('email', passwordResetFormFieldRules.email)}
                label="E-mail при регистрации"
                type="email"
                error={!!errors?.email}
                helperText={getErrorFormMessage('email', errors?.email)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Box sx={{ justifyContent: 'flex-end', display: 'flex', mt: 2 }}>
                <LoadingButton
                  type="submit"
                  disabled={Object.keys(errors).length > 0}
                  variant="outlined"
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={<LoginIcon />}
                >
                  Сбросить пароль
                </LoadingButton>
              </Box>
            </form>
          </CardContent>
        </Card>
      </div>
    </CssRootDiv>
  );
};

export default PasswordResetForm;
