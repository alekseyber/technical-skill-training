import { MouseEvent, FC, useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteBtnEditProps {
  callbackDelete: () => Promise<void>;
}

const DeleteBtnEdit: FC<DeleteBtnEditProps> = ({ callbackDelete }) => {
  const [loading, setLoading] = useState(false);
  const [on, setOn] = useState(true);

  useEffect(() => {
    return () => {
      setOn(false);
    };
  }, []);

  const handleDelete = async (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    try {
      if (!confirm('Подтвердите удаление!')) return;
      setLoading(true);
      await callbackDelete();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  if (!on) return null;
  return (
    <LoadingButton onClick={handleDelete} loading={loading} sx={{ minWidth: 'auto' }} color="error">
      <DeleteIcon />
    </LoadingButton>
  );
};

export default DeleteBtnEdit;
