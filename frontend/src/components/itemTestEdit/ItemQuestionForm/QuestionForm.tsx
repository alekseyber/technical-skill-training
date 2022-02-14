import { LoadingButton } from '@mui/lab';
import {
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { AnswerEditDTO, QuestionEditDTO } from '@src/types/models';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Save as SaveIcon,
  EditOff as EditOffIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { getErrorFormMessage } from '@src/utils/getErrorFormMessage';
import DeleteQuestionBtn from './DeleteQuestionBtn';
import { ItemQuestionFormProps } from './ItemQuestionForm';

interface QuestionFormProps extends ItemQuestionFormProps {
  offEdit: () => void;
}

const DeleteQuestionBtnMemo = memo(DeleteQuestionBtn);

const itemAnswerInitial: AnswerEditDTO = {
  _id: '',
  answer: '',
  loyal: false,
  orderValue: 0,
};

const QuestionForm: FC<QuestionFormProps> = ({ data, offEdit, onDelete, callbackSave }) => {
  const [isLoading, setLoading] = useState(false);
  const [question, setQuestion] = useState(data);
  const [on, setOn] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    //  clearErrors,
    // setError,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: question,
  });

  const onSubmit = async (data: QuestionEditDTO) => {
    try {
      setLoading(true);
      await callbackSave(data);
      offEdit();
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

  const handleAddAnswer = () => {
    setQuestion((prev) => ({ ...prev, answers: [itemAnswerInitial, ...prev.answers] }));
  };

  const handleDeleteAnswer = (_id: string) => {
    setQuestion((prev) => {
      const newValue = { ...prev, answers: prev.answers.filter((item) => item._id !== _id) };
      setValue('answers', newValue.answers);
      return newValue;
    });
  };

  const answersSortedList = useMemo(() => {
    return question.answers.sort((a, b) => (a._id > b._id ? 1 : -1));
  }, [question.answers]);

  const UserFormFieldRules = {
    question: {
      required: true,
    },
    answer: {
      required: true,
    },
    orderValue: {
      min: 0,
      validate: {
        integer: (value: number) => (Number(value) ^ 0) === Number(value),
      },
    },
  };

  useEffect(() => {
    return () => {
      setOn(false);
    };
  }, []);

  if (!on) return null;
  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexWrap: 'wrap' }}
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box sx={{ width: '79ch', display: 'flex', alignItems: 'center' }}>
        <Controller
          control={control}
          name="multiple"
          render={({ field: { onChange, value, ref } }) => (
            <FormControlLabel
              control={<Switch inputRef={ref} checked={value} onChange={onChange} />}
              label="Более одного ответа"
            />
          )}
        />
      </Box>
      <Stack sx={{ width: '20ch' }} spacing={2} alignItems="center" direction="row">
        <IconButton onClick={offEdit} color="primary">
          <EditOffIcon />
        </IconButton>
        <DeleteQuestionBtnMemo _id={question._id} onDelete={onDelete} />
        <LoadingButton
          type="submit"
          disabled={Object.keys(errors).length > 0}
          variant="outlined"
          loading={isLoading}
          loadingPosition="center"
        >
          <SaveIcon />
        </LoadingButton>
      </Stack>

      <TextField
        {...register('question', UserFormFieldRules.question)}
        label="Вопрос"
        error={!!errors?.question}
        helperText={getErrorFormMessage('вопрос', errors?.question)}
        fullWidth
        multiline
        rows={10}
        sx={{ mt: 2, width: '100ch' }}
      />

      <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100ch' }}>
        <Typography component="h3" variant="h6" sx={{ mr: 1 }}>
          Ответы
        </Typography>

        <IconButton color="secondary" onClick={handleAddAnswer}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
      {answersSortedList.map((answer, index: number) => (
        <Box sx={{ my: 2, width: '100ch' }} key={index + answer._id}>
          <Divider />
          <TextField
            {...register(`answers.${index}.answer`, UserFormFieldRules.answer)}
            label="Ответ"
            error={errors?.answers && errors.answers[index] && errors.answers[index].answer && true}
            helperText={getErrorFormMessage(
              'ответ',
              errors?.answers && errors.answers[index] && errors.answers[index].answer
            )}
            fullWidth
            multiline
            rows={2}
            sx={{ mt: 2, width: '100ch' }}
          />
          <Box sx={{ mt: 2, width: '100ch', display: 'flex' }}>
            <TextField
              {...register(`answers.${index}.orderValue`, UserFormFieldRules.orderValue)}
              label="Соритровка"
              type="number"
              error={errors?.answers && errors.answers[index] && errors.answers[index].orderValue && true}
              helperText={getErrorFormMessage(
                'поле сортировки',
                errors?.answers && errors.answers[index] && errors.answers[index].orderValue
              )}
              sx={{ width: '30ch' }}
            />
            <Box sx={{ width: '30ch', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FormControlLabel
                control={<Switch defaultChecked={answer.loyal} {...register(`answers.${index}.loyal`)} />}
                label="Правильный"
              />
            </Box>
            <Box sx={{ width: '30ch', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
              <IconButton onClick={() => handleDeleteAnswer(answer._id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default QuestionForm;
