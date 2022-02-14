import { FC } from 'react';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { grey, red, green } from '@mui/material/colors';
import { RezultTestDTO } from '@src/types/models';
import { HtmlTextToReact } from '.';

interface RezultTestProps {
  data: RezultTestDTO;
}

const RezultTest: FC<RezultTestProps> = ({ data }) => {
  const rezultColor = data.rezultTest ? green[900] : red[900];
  const wrongAnswersCount = data.numberOfQuestions - data.numberOfСorrectQuestions;
  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="h5" component="h1" align="center" gutterBottom color={rezultColor}>
          {data.rezultTest ? 'Tecт сдан' : 'Tecт не сдан'}
        </Typography>
        <Typography variant="body1" component="h2" align="center" gutterBottom color={rezultColor}>
          {data.title}
        </Typography>
        <Box sx={{ justifyContent: 'center', display: 'flex', textAlign: 'center' }}>
          <Box sx={{ p: 1 }}>
            <div>
              <Typography variant="h6" component="span" color={rezultColor}>
                {data.numberOfСorrectQuestions}
              </Typography>
              <Typography component="span"> из {data.numberOfQuestions}</Typography>
            </div>
            <Typography variant="caption" component="div" color={grey[600]}>
              результат
            </Typography>
          </Box>
          <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <Typography component="div">{data.rezultTime}</Typography>
            <Typography variant="caption" component="div" color={grey[600]}>
              время
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          {wrongAnswersCount > 0 && (
            <Typography variant="h6" component="h2" gutterBottom>
              Неправильные ответы: {wrongAnswersCount}
            </Typography>
          )}
          {data.failedDetails.map((question) => (
            <Box key={question._id} sx={{ my: 2 }}>
              <HtmlTextToReact htmlText={question.question} sx={{ mb: 2 }} />
              <Typography variant="body2" component="div" color={grey[600]}>
                Ваш ответ
              </Typography>
              <ul>
                {question.answers.map((answer) => (
                  <HtmlTextToReact key={answer._id} htmlText={answer.answer} component="li" />
                ))}
              </ul>
              <Divider />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RezultTest;
