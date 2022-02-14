import { IconButton } from '@mui/material';
import { DeleteBtnEdit } from '@src/components';
import { FC } from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { TypeNameEnum } from '@src/types/models';
import { CallbackDeleteCompleteData, useMutationApp } from '@src/api/useMutationApp.hook';

interface DeleteQuestionBtnProps {
  _id: string;
  onDelete: (_id: string) => void;
}

const DeleteQuestionBtn: FC<DeleteQuestionBtnProps> = ({ _id, onDelete }) => {
  const { callbackDelete } = useMutationApp();
  return _id ? (
    <DeleteBtnEdit
      callbackDelete={callbackDelete({
        _id: _id,
        typeName: TypeNameEnum.ADMIN_TEST_ITEM_QUESTION,
        onComplete: ({ _id }: CallbackDeleteCompleteData) => onDelete(_id),
      })}
    />
  ) : (
    <IconButton onClick={() => onDelete(_id)} color="error">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteQuestionBtn;
