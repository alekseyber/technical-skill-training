import { Box, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CallbackSaveCompleteData, useMutationApp } from '@src/api/useMutationApp.hook';
import { useAppActions } from '@src/store/useRedux.hook';
import { ItemTestEditDTO, QuestionEditDTO, TypeNameEnum } from '@src/types/models';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import ItemTestNoQuestionsForm from './ItemTestNoQuestionsForm';
import ItemQuestionForm from './ItemQuestionForm/ItemQuestionForm';

interface ItemTestEditProps {
  data: ItemTestEditDTO;
}

export type ItemTestNoQuestions = Omit<ItemTestEditDTO, 'questions'>;

const itemQuestionInitial: QuestionEditDTO = {
  _id: '',
  question: '',
  multiple: false,
  answers: [],
};

const ItemTestNoQuestionsFormMemo = memo(ItemTestNoQuestionsForm);
const ItemQuestionFormMemo = memo(ItemQuestionForm);

const ItemTestEdit: FC<ItemTestEditProps> = ({ data }) => {
  const { callbackSave } = useMutationApp();
  const { showAlert, resetExpiresProgTest } = useAppActions();

  const [itemTestNoQuestions, setItemTestNoQuestions] = useState<ItemTestNoQuestions>({
    _id: data._id,
    title: data.title,
    timer: data.timer,
    status: data.status,
    categoryId: data.categoryId,
    numberOfQuestions: data.numberOfQuestions,
    correcToPass: data.correcToPass,
  });
  const [questions, setQuestions] = useState<QuestionEditDTO[]>(data.questions);
  const [on, setOn] = useState(true);

  useEffect(() => {
    return () => {
      setOn(false);
      setQuestions([]);
    };
  }, []);

  const onComplete = useCallback(
    ({ data }: CallbackSaveCompleteData<ItemTestNoQuestions>) => {
      showAlert('Изменения сохранены.', 'success');

      if (
        data.categoryId !== itemTestNoQuestions.categoryId ||
        data.title !== itemTestNoQuestions.title ||
        data.status !== itemTestNoQuestions.status
      ) {
        resetExpiresProgTest();
      }
      setItemTestNoQuestions(data);
    },
    [showAlert, resetExpiresProgTest, setItemTestNoQuestions, itemTestNoQuestions]
  );

  const handleAddQuestion = () => {
    setQuestions((prev) => [{ parentId: data._id, ...itemQuestionInitial }, ...prev]);
  };

  const handleDeleteQuestion = useCallback(
    (_id: string) => {
      setQuestions((prev) => prev.filter((item) => item._id !== _id));
    },
    [setQuestions]
  );

  const onAddBtn = useMemo(() => {
    return questions.filter((question) => question._id === '').length === 0;
  }, [questions]);

  const onCompleteQuestion = useCallback(
    ({ data, added }: CallbackSaveCompleteData<QuestionEditDTO>) => {
      showAlert('Вопрос сохранен.', 'success');
      if (added) {
        setQuestions((prev) => prev.map((item) => (item._id === '' ? { ...item, ...data } : item)));
      } else {
        setQuestions((prev) => prev.map((item) => (item._id === data._id ? { ...item, ...data } : item)));
      }
    },
    [showAlert, setQuestions]
  );

  const questionsSortedList = useMemo(() => {
    return questions.sort((a, b) => (a._id > b._id ? 1 : -1));
  }, [questions]);

  if (!on) return null;

  return (
    <>
      <ItemTestNoQuestionsFormMemo
        data={itemTestNoQuestions}
        callbackSave={callbackSave<ItemTestNoQuestions>({
          _id: itemTestNoQuestions._id,
          typeName: TypeNameEnum.ADMIN_TEST_ITEM,
          onComplete,
        })}
      />
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography component="h2" variant="h5" sx={{ mr: 1 }}>
          Вопросы
        </Typography>
        {onAddBtn && (
          <IconButton color="secondary" onClick={handleAddQuestion}>
            <AddCircleOutlineIcon />
          </IconButton>
        )}
      </Box>
      {questionsSortedList.map((question, i) => (
        <ItemQuestionFormMemo
          data={question}
          onDelete={handleDeleteQuestion}
          callbackSave={callbackSave<QuestionEditDTO>({
            _id: question._id,
            typeName: TypeNameEnum.ADMIN_TEST_ITEM_QUESTION,
            onComplete: onCompleteQuestion,
          })}
          key={question._id + i}
        />
      ))}
    </>
  );
};

export default ItemTestEdit;
