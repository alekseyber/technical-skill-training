import { FC, useState, useMemo } from 'react';
import { TypeNameEnum, UserStatisticDTO, UserStatisticRezultDTO } from '@src/types/models';
import { IconButton, Link as MIULink, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { red, green } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { getLinkByRoutePath } from '@src/router/appRouterSettings';
import { Column } from './AppTable';
import { AppTable, DeleteBtnEdit } from '@src/components';
import { getFormarredDataTime } from '@src/utils/getFormarredDataTime';
import { CallbackDeleteCompleteData, useMutationApp } from '@src/api/useMutationApp.hook';
import { useIsAuth } from '@src/router/useIsAuth.hook';

interface UserStatisticsProps {
  data: UserStatisticDTO;
}

const UserStatistics: FC<UserStatisticsProps> = ({ data }) => {
  const { isAdmin } = useIsAuth();

  const [dataList, setDataList] = useState(data.rezults);
  const { callbackDelete } = useMutationApp();

  const columns = useMemo<Column<UserStatisticRezultDTO, 'quizId'>[]>(() => {
    const handleDelete = ({ _id }: CallbackDeleteCompleteData) => {
      setDataList((prev) => prev.filter((item) => item._id !== _id));
    };

    return [
      {
        id: 'createdAt',
        label: 'Дата',
        minWidth: 100,
        format: (value) => getFormarredDataTime(String(value)),
        orderOn: true,
      },
      {
        id: 'title',
        label: 'Тест',
        minWidth: 150,
        component: ({ quizId, title }) => (
          <MIULink color="primary" component={Link} to={getLinkByRoutePath('TEST_PAGE', quizId)}>
            {title}
          </MIULink>
        ),
        orderOn: true,
        searchOn: true,
      },
      {
        id: 'rezultTest',
        label: 'Тест сдан',
        align: 'center',
        format: (value) => {
          if (value) {
            return 'Да';
          }
          return 'Нет';
        },
        color: (row) => (!row.rezultTest ? red[900] : green[900]),
        orderOn: true,
      },
      {
        id: 'numberOfQuestions',
        label: 'Правильных ответов',
        format: (_, row) => `${row.numberOfСorrectQuestions} из ${row.numberOfQuestions}`,
      },
      {
        id: 'rezultTime',
        label: 'Время',
      },
      {
        id: '_id',
        label: isAdmin ? 'Управление' : 'Подробнее',
        align: 'center',
        component: ({ _id }) => (
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton
              color="primary"
              size="small"
              component={Link}
              to={
                isAdmin
                  ? getLinkByRoutePath('ADMIN_REZULT_PAGE', _id)
                  : getLinkByRoutePath('REZULT_PAGE', _id)
              }
            >
              <VisibilityIcon fontSize="inherit" />
            </IconButton>
            {isAdmin && (
              <DeleteBtnEdit
                callbackDelete={callbackDelete({
                  _id,
                  typeName: TypeNameEnum.ADMIN_USER_ITEM_STATISTICS,
                  onComplete: handleDelete,
                })}
              />
            )}
          </Stack>
        ),
      },
    ];
  }, [callbackDelete, isAdmin]);

  return <AppTable columns={columns} dataList={dataList} orderByStart="createdAt" />;
};

export default UserStatistics;
