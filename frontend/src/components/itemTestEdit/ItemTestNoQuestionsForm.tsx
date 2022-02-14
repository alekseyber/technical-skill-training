import { FC, memo, useEffect, useState } from 'react';
import { Card, CardContent, Box, TextField, Switch, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Controller, useForm } from 'react-hook-form';
import { getErrorFormMessage } from '@src/utils/getErrorFormMessage';
import { ItemTestNoQuestions } from './ItemTestEdit';
import { AppCategorySelector } from '..';

interface ItemTestNoQuestionsFormProps {
  data: ItemTestNoQuestions;
  callbackSave: (value: ItemTestNoQuestions) => Promise<void>;
}

const AppCategorySelectorMemo = memo(AppCategorySelector);

const ItemTestNoQuestionsForm: FC<ItemTestNoQuestionsFormProps> = ({ data, callbackSave }) => {
  const [isLoading, setLoading] = useState(false);
  const [on, setOn] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    //  clearErrors,
    // setError,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  useEffect(() => {
    return () => {
      setOn(false);
    };
  }, []);

  const margin = 2;
  const onSubmit = async (data: ItemTestNoQuestions) => {
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

  const UserFormFieldRules = {
    title: {
      required: true,
      minLength: 4,
    },
    timer: {
      required: true,
      min: 0,
    },
    numberOfQuestions: {
      required: true,
      min: 1,
    },
    correcToPass: {
      required: true,
      min: 1,
    },
  };
  if (!on) return null;
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Box
          component="form"
          sx={{ display: 'flex', flexWrap: 'wrap' }}
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <AppCategorySelectorMemo
            sx={{ my: margin, width: '90ch' }}
            defaultValue={data.categoryId}
            onChange={(v) => setValue('categoryId', v)}
          />
          <Box sx={{ my: margin, width: '10ch' }}>
            <LoadingButton
              type="submit"
              disabled={Object.keys(errors).length > 0}
              variant="outlined"
              loading={isLoading}
              loadingPosition="center"
            >
              <SaveIcon />
            </LoadingButton>
          </Box>
          <TextField
            {...register('title', UserFormFieldRules.title)}
            label="Название"
            error={!!errors?.title}
            helperText={getErrorFormMessage('название', errors?.title)}
            fullWidth
            sx={{ my: margin, width: '68ch' }}
          />
          <Box sx={{ my: 2, width: '30ch', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          </Box>
          <Box sx={{ width: '100ch' }}>
            <TextField
              {...register('timer', UserFormFieldRules.timer)}
              label="Время на тест, если 0 - бесконечно."
              type="number"
              error={!!errors?.timer}
              helperText={getErrorFormMessage('время на тест', errors?.timer)}
              fullWidth
              sx={{ m: margin, width: '29ch' }}
            />
            <TextField
              {...register('numberOfQuestions', UserFormFieldRules.numberOfQuestions)}
              label="Количество вопросов на сессию"
              type="number"
              error={!!errors?.numberOfQuestions}
              helperText={getErrorFormMessage('Количество вопросов на сессию', errors?.numberOfQuestions)}
              fullWidth
              sx={{ m: margin, width: '29ch' }}
            />
            <TextField
              {...register('correcToPass', UserFormFieldRules.correcToPass)}
              label="Критерий - кол-во верных ответов"
              type="number"
              error={!!errors?.correcToPass}
              helperText={getErrorFormMessage('Критерий сдано', errors?.correcToPass)}
              fullWidth
              sx={{ m: margin, width: '29ch' }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemTestNoQuestionsForm;
