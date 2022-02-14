import { Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import { QuestionEditDTO } from '@src/types/models';
import { FC, memo, useEffect, useState } from 'react';
import { HtmlTextToReact } from '../..';
import { Edit as EditIcon } from '@mui/icons-material';
import DeleteQuestionBtn from './DeleteQuestionBtn';
import QuestionForm from './QuestionForm';

export interface ItemQuestionFormProps {
  data: QuestionEditDTO;
  onDelete: (_id: string) => void;
  callbackSave: (value: QuestionEditDTO) => Promise<void>;
}

const QuestionFormMemo = memo(QuestionForm);
const DeleteQuestionBtnMemo = memo(DeleteQuestionBtn);
const HtmlTextToReactMemo = memo(HtmlTextToReact);

const ItemQuestionForm: FC<ItemQuestionFormProps> = (props) => {
  const { data, onDelete } = props;
  const [onEdit, setOnEdit] = useState(!data._id);
  const [on, setOn] = useState(true);

  useEffect(() => {
    return () => {
      setOn(false);
    };
  }, []);

  if (!on) return null;
  return (
    <Card sx={{ my: 3 }}>
      <CardContent>
        {!onEdit ? (
          <>
            <Stack spacing={1} alignItems="start" justifyContent="end" direction="row">
              <IconButton onClick={() => setOnEdit(true)} color="primary">
                <EditIcon />
              </IconButton>
              <DeleteQuestionBtnMemo _id={data._id} onDelete={onDelete} />
            </Stack>
            {data._id ? (
              <HtmlTextToReactMemo htmlText={data.question} />
            ) : (
              <Typography component="div" variant="h5">
                Новый вопрос
              </Typography>
            )}
          </>
        ) : (
          <QuestionFormMemo {...props} offEdit={() => setOnEdit(false)} />
        )}
      </CardContent>
    </Card>
  );
};

export default ItemQuestionForm;
