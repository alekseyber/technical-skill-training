import { FC, useEffect, useMemo, useState } from 'react';
import { Card, CardContent, Box, TextField, Switch, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Controller, useForm } from 'react-hook-form';
import { SettingsDTO } from '@src/types/models';
import { useAppActions } from '@src/store/useRedux.hook';

interface SettingsFormProps {
  data: SettingsDTO;
  callbackSave: (value: SettingsDTO) => Promise<void>;
}

const SettingsForm: FC<SettingsFormProps> = ({ data, callbackSave }) => {
  const [isLoading, setLoading] = useState(false);
  const [on, setOn] = useState(true);
  const { loadPublicSettings } = useAppActions();

  const { register, handleSubmit, control } = useForm<SettingsDTO>({
    defaultValues: data,
  });

  const keys = useMemo(
    () => Object.keys(data).filter((key) => key !== '_id') as Array<keyof typeof data>,
    [data]
  );

  useEffect(() => {
    return () => {
      setOn(false);
    };
  }, []);

  const onSubmit = async (data: SettingsDTO) => {
    try {
      setLoading(true);
      await callbackSave(data);
      loadPublicSettings();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  if (!on) return null;
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ justifyContent: 'flex-end', display: 'flex', mb: 3 }}>
            <LoadingButton
              type="submit"
              variant="outlined"
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
            >
              Сохранить
            </LoadingButton>
          </Box>
          {keys.map((name) => (
            <Box key={name} sx={{ mb: 3 }}>
              {typeof data[name] === 'boolean' ? (
                <Controller
                  control={control}
                  name={name}
                  render={({ field: { onChange, value, ref } }) => (
                    <FormControlLabel
                      control={<Switch inputRef={ref} checked={Boolean(value)} onChange={onChange} />}
                      label={name}
                    />
                  )}
                />
              ) : (
                <TextField {...register(name)} label={name} fullWidth />
              )}
            </Box>
          ))}
        </form>
      </CardContent>
    </Card>
  );
};

export default SettingsForm;
