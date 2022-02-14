import { FC, useState, memo, useEffect, useCallback, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@mui/material';
import { HtmlTextToReact } from '@src/components';
import ItemQuestionRadio from './ItemQuestionRadio';
import ItemQuestionCheckboxes from './ItemQuestionCheckboxes';
import { ItemTestQuestionAnswersDTO, QuestionDTO } from '@src/types/models';

interface ItemQuestionProps {
  currentQuestion: QuestionDTO;
  nextQuestionHangler: (answer: ItemTestQuestionAnswersDTO) => void;
  btnNextText: string;
}

const ItemQuestionRadioMemo = memo(ItemQuestionRadio);
const ItemQuestionCheckboxesMemo = memo(ItemQuestionCheckboxes);

const ItemQuestion: FC<ItemQuestionProps> = ({ nextQuestionHangler, btnNextText, currentQuestion }) => {
  const [answersId, setAnswersId] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const clearErrorHangler = useCallback(() => {
    setError(false);
  }, [setError]);

  useEffect(() => {
    return () => {
      setAnswersId([]);
      clearErrorHangler();
    };
  }, [currentQuestion, clearErrorHangler]);

  const setQuestionHangler = () => {
    if (answersId.length === 0) {
      setError(true);
    } else {
      nextQuestionHangler({
        questionId: currentQuestion._id,
        answersId,
      });
    }
  };

  const answersSortedList = useMemo(
    () => currentQuestion.answers.sort((a, b) => a.orderValue - b.orderValue),
    [currentQuestion.answers]
  );

  const bindeControls = {
    answers: answersSortedList,
    setAnswersId,
    clearErrorHangler,
  };

  return (
    <Card>
      <CardContent>
        <HtmlTextToReact htmlText={currentQuestion.question} />
        <FormControl component="fieldset" error={error} sx={{ mt: 3 }}>
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 700 }}>
            Варианты ответов
          </FormLabel>
          {currentQuestion.multiple ? (
            <ItemQuestionCheckboxesMemo {...bindeControls} />
          ) : (
            <ItemQuestionRadioMemo {...bindeControls} />
          )}
          {error && <FormHelperText>Выберите, пожалуйта, ответ</FormHelperText>}
        </FormControl>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color={error ? 'error' : 'primary'}
          onClick={setQuestionHangler}
          // disabled={answersId.length === 0}
        >
          {btnNextText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemQuestion;
