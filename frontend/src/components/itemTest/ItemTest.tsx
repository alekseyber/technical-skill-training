import { Button, Box, Skeleton } from '@mui/material';
import {
  ItemTestDTO,
  ItemTestQuestionAnswersDTO,
  ItemTestQuestionsDTO,
  ItemTestQuestionsRezultDTO,
  TypeNameEnum,
} from '@src/types/models';
import { FC, useCallback, memo, useState, useEffect } from 'react';
import { AppTimer } from '@src/components';
import ItemQuestion from './ItemQuestion';
import { useNavigate } from 'react-router-dom';
import { getLinkByRoutePath, RouteNames } from '@src/router/appRouterSettings';
import CurrentStatus from './CurrentStatus';
import { HttpClient, RESTAPIMetodsEnum } from '@src/api/HttpClient';
import { useAppActions } from '@src/store/useRedux.hook';
import { getErrorFetchApp } from '@src/utils/getErrorFetchApp';

interface ItemTestProps {
  data: ItemTestDTO;
}

const AppTimerMemo = memo(AppTimer);
const ItemQuestionMemo = memo(ItemQuestion);
const CurrentStatusMemo = memo(CurrentStatus);

const ItemTest: FC<ItemTestProps> = ({ data }) => {
  const navigate = useNavigate();
  const [current, setСurrent] = useState(0);
  const [answers, setAnswers] = useState<ItemTestQuestionAnswersDTO[]>([]);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAppActions();

  const { sesionId, questions } = data;
  const questionsLength = questions.length;
  const btnStopText = 'Отменить тест';
  const endCurrentQuestion = questionsLength - 1 === current;
  const btnNextText = endCurrentQuestion ? 'Получить результат' : 'Следующий вопрос';
  const currentQuestion = questions[current];

  const requestRezult = useCallback(
    async (rezult: ItemTestQuestionsDTO) => {
      try {
        setLoading(true);

        const { data } = await HttpClient.getAppAPI<ItemTestQuestionsRezultDTO, ItemTestQuestionsDTO>(
          TypeNameEnum.TEST_REZULT_ITEM_REGISTRATION,
          rezult,
          RESTAPIMetodsEnum.POST
        );

        const to = getLinkByRoutePath('REZULT_PAGE', data.rezultId);
        navigate(to);
      } catch (e) {
        const error = getErrorFetchApp(e);
        showAlert(error.response?.data.message || error.message, 'error', 5000);
        navigate(RouteNames.MAIN_PAGE);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, navigate, showAlert]
  );

  const endTestHangler = useCallback(() => {
    requestRezult({
      sesionId,
      answers,
    });
  }, [answers, sesionId, requestRezult]);

  const cancellTestHangler = () => {
    navigate(RouteNames.MAIN_PAGE);
  };

  const nextQuestionHangler = useCallback(
    (answer: ItemTestQuestionAnswersDTO) => {
      setAnswers((prev) => [...prev, answer]);

      if (endCurrentQuestion) {
        setComplete(true);
      } else {
        setСurrent((prev) => prev + 1);
      }
    },
    [setAnswers, endCurrentQuestion, setComplete]
  );

  useEffect(() => {
    if (complete) {
      endTestHangler();
    }
    return () => {
      setComplete(false);
    };
  }, [complete, endTestHangler]);

  const bindItemQuestion = { currentQuestion, nextQuestionHangler, btnNextText };
  const bindAppTimer = { timerEndHangler: endTestHangler, timerValue: data.timer, complete };
  const bindCurrentStatus = { current, questionsLength };

  return (
    <div>
      {loading ? (
        <Skeleton variant="rectangular" height={400} />
      ) : (
        <>
          <Box
            sx={{
              my: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <CurrentStatusMemo {...bindCurrentStatus} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                '& > .MuiButton-root': { ml: 2 },
              }}
            >
              <AppTimerMemo {...bindAppTimer} />
              <Button variant="contained" color="secondary" onClick={cancellTestHangler}>
                {btnStopText}
              </Button>
            </Box>
          </Box>
          <ItemQuestionMemo {...bindItemQuestion} />
        </>
      )}
    </div>
  );
};

export default ItemTest;
