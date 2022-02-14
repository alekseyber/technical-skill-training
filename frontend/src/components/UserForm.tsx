import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
  FormControl,
  InputLabel,
  NativeSelect,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Controller, useForm } from 'react-hook-form';
import {
  GetValidUniqKeysEnum,
  UserAdminDTO,
  UserBaseDTO,
  UserNewAdminDTO,
  UserNewDTO,
} from '@src/types/models';
import { getErrorFormMessage } from '@src/utils/getErrorFormMessage';
import { UserRole } from '@src/types/models/UserDTO';
import { checkUniqValueFromApi } from '@src/utils/checkUniqValueFromApi';

interface BaseFormProps<DTO> {
  callbackSave: (value: DTO) => Promise<void>;
  textBtn?: string;
  username?: string;
}

interface UserProfileFormProps extends BaseFormProps<UserBaseDTO> {
  data: UserBaseDTO;
  edit: true;
  admin?: false;
}

interface UserAdminFormProps extends BaseFormProps<UserAdminDTO> {
  data: UserAdminDTO;
  edit: true;
  admin: true;
}

interface UserNewFormProps extends BaseFormProps<UserNewDTO> {
  data?: UserNewDTO;
  edit?: false;
  admin?: false;
}
interface UserNewAdminFormProps extends BaseFormProps<UserNewAdminDTO> {
  data: UserNewAdminDTO;
  edit?: false;
  admin?: true;
}

const defaultValue: UserNewDTO = {
  username: '',
  name: '',
  surname: '',
  email: '',
  password: '',
};

const UserForm: FC<UserProfileFormProps | UserAdminFormProps | UserNewFormProps | UserNewAdminFormProps> = ({
  data = defaultValue,
  edit = false,
  admin = false,
  textBtn = 'Сохранить',
  username = '',
  callbackSave,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [on, setOn] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditPassword, setEditPassword] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    // setError,
    formState: { errors },
  } = useForm<UserBaseDTO & UserAdminDTO & UserNewDTO & UserNewAdminDTO, object>({
    defaultValues: data,
  });

  useEffect(() => {
    return () => {
      setOn(false);
    };
  }, []);

  const onSubmit = async (data: UserBaseDTO & UserAdminDTO & UserNewDTO & UserNewAdminDTO) => {
    try {
      setLoading(true);
      await callbackSave(data);
    } catch (e) {
      // //==========обработка ошибки с API============
      // setError('name', { type: 'apiError', message: 'Ошибка с API' }, { shouldFocus: true });
      // register('name', {
      //   onChange: () => clearErrors('name'),
      // });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    clearErrors('password');
  };

  const UserFormFieldRules = {
    username: {
      required: true,
      minLength: 4,
      validate: {
        checkUniq: async (value: string) =>
          await checkUniqValueFromApi(value, GetValidUniqKeysEnum.LOGIN, data._id),
      },
    },
    password: {
      required: true,
      minLength: 4,
      validate: {
        confirm: (value: string) => value === confirmPassword,
      },
    },
    name: { required: true },
    surname: {},
    email: {
      required: true,
      pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      validate: {
        checkUniq: async (value: string) =>
          await checkUniqValueFromApi(value, GetValidUniqKeysEnum.EMAIL, data._id),
      },
    },
  };
  if (!on) return null;
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ justifyContent: 'flex-end', display: 'flex', mb: 3 }}>
            <LoadingButton
              type="submit"
              disabled={Object.keys(errors).length > 0}
              variant="outlined"
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
            >
              {textBtn}
            </LoadingButton>
          </Box>
          {admin && (
            <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
              <Controller
                control={control}
                name="status"
                render={({ field: { onChange, value, ref } }) => (
                  <FormControlLabel
                    control={<Switch inputRef={ref} checked={value} onChange={onChange} />}
                    label="Активный"
                  />
                )}
              />
              <FormControl>
                <InputLabel variant="standard" htmlFor="user-role-select">
                  Роль
                </InputLabel>
                <NativeSelect
                  defaultValue={data?.userRole || UserRole.USER}
                  {...register('userRole')}
                  inputProps={{
                    name: 'userRole',
                    id: 'user-role-select',
                  }}
                >
                  <option value={UserRole.USER}>Пользователь</option>
                  <option value={UserRole.ADMIN}>Администратор</option>
                </NativeSelect>
              </FormControl>
            </Stack>
          )}
          {edit && !admin && !!username && (
            <Typography variant="h6" component="div" sx={{ mb: 3 }}>
              Логин: {username}
            </Typography>
          )}
          {(!edit || admin) && (
            <TextField
              {...register('username', UserFormFieldRules.username)}
              label="Логин"
              error={!!errors?.username}
              helperText={getErrorFormMessage('логин', errors?.username)}
              fullWidth
              sx={{ mb: 3 }}
            />
          )}
          <TextField
            {...register('name', UserFormFieldRules.name)}
            label="Имя"
            error={!!errors?.name}
            helperText={getErrorFormMessage('имя', errors?.name)}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            {...register('surname', UserFormFieldRules.surname)}
            label="Фамилия"
            error={!!errors?.surname}
            helperText={getErrorFormMessage('фамилию', errors?.surname)}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            {...register('email', UserFormFieldRules.email)}
            label="E-mail"
            error={!!errors?.email}
            helperText={getErrorFormMessage('e-mail', errors?.email)}
            fullWidth
            sx={{ mb: 3 }}
          />
          {edit && (
            <FormControlLabel
              sx={{ mb: 1 }}
              control={<Switch checked={isEditPassword} onChange={(_, v) => setEditPassword(v)} />}
              label="Изменить пароль"
            />
          )}
          {(!edit || isEditPassword) && (
            <>
              <TextField
                {...register('password', UserFormFieldRules.password)}
                label="Пароль"
                type="password"
                error={!!errors?.password}
                helperText={getErrorFormMessage('пароль', errors?.password)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Повторите пароль"
                type="password"
                value={confirmPassword}
                onChange={handleChangeConfirm}
                error={!!errors?.password}
                helperText={getErrorFormMessage('пароль', errors?.password)}
                fullWidth
                sx={{ mb: 2 }}
              />
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
