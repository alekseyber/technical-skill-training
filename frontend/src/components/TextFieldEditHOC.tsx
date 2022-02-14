import { IconButton, Stack, SxProps, TextField, Theme } from '@mui/material';
import { ChangeEvent, MouseEvent, FC, useState, useEffect } from 'react';
import {
  Edit as EditIcon,
  EditOff as EditOffIcon,
  Save as SaveIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  DoDisturbOff as DoDisturbOffIcon,
} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { getErrorFetchApp } from '@src/utils/getErrorFetchApp';

interface TextFieldEditHOCProps<V = string> {
  dataInput: V;
  label?: string;
  required?: boolean;
  add?: boolean;
  callbackSaveField: (value: V) => Promise<void>;
  sx?: SxProps<Theme>;
}

const TextFieldEditHOC: FC<TextFieldEditHOCProps> = ({
  dataInput,
  label = 'Редактировать',
  required = true,
  add = false,
  callbackSaveField,
  sx,
  children,
}) => {
  const [value, setValue] = useState(dataInput);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [on, setOn] = useState(true);

  useEffect(() => {
    return () => {
      setOn(false);
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (error) setError('');
    setValue(event.target.value);
  };

  const handleStopPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation();

  const handleSetEdit = (event: MouseEvent<HTMLElement>) => {
    handleStopPropagation(event);
    setEdit((prev) => {
      if (!prev) {
        setValue(dataInput);
        setError('');
      }
      return !prev;
    });
  };

  const handleSave = async (event: MouseEvent<HTMLElement>) => {
    handleStopPropagation(event);
    if (!value && required) return setError('Значение не может быть пустым');
    try {
      setLoading(true);
      await callbackSaveField(value);
      setEdit(false);
    } catch (err) {
      setError(getErrorFetchApp(err, 'Неизвестная ошибка').message);
    } finally {
      setLoading(false);
    }
  };
  if (!on) return null;
  return (
    <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
      {edit ? (
        <TextField
          label={label}
          required={required}
          value={value}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          onClick={handleStopPropagation}
          fullWidth={true}
          sx={{ my: 1, minWidth: 300, ...sx }}
        />
      ) : (
        children
      )}
      <IconButton onClick={handleSetEdit} size="small">
        {add ? edit ? <DoDisturbOffIcon /> : <AddCircleOutlineIcon /> : edit ? <EditOffIcon /> : <EditIcon />}
      </IconButton>
      {edit && (
        <LoadingButton onClick={handleSave} loading={loading} sx={{ minWidth: 'auto' }}>
          <SaveIcon />
        </LoadingButton>
      )}
    </Stack>
  );
};

export default TextFieldEditHOC;
