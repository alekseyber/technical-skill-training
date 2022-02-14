import { FC, useMemo, useState } from 'react';
import { IconButton, Stack, Button } from '@mui/material';
import { Edit as EditIcon, QueryStats as QueryStatsIcon } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { getLinkByRoutePath, RouteNames } from '@src/router/appRouterSettings';
import { Column } from './AppTable';
import { AppTable, DeleteBtnEdit, SwitchEdit } from '@src/components';
import { UserAdminListItemDTO, UserAdminListDTO, TypeNameEnum } from '@src/types/models';
import { UserRole } from '@src/types/models/UserDTO';
import {
  CallbackDeleteCompleteData,
  CallbackSaveFieldCompleteData,
  useMutationApp,
} from '@src/api/useMutationApp.hook';

interface UsersListProps {
  data: UserAdminListDTO;
}

const UsersList: FC<UsersListProps> = ({ data }) => {
  const [dataList, setDataList] = useState(data);
  const { callbackSaveField, callbackDelete } = useMutationApp();

  const columns = useMemo<Column<UserAdminListItemDTO>[]>(() => {
    const handleChange = (props: CallbackSaveFieldCompleteData<UserAdminListItemDTO>) => {
      setDataList((prev) =>
        prev.map((item) => (item._id === props.data._id ? { ...item, ...props.data } : item))
      );
    };
    const handleDelete = ({ _id }: CallbackDeleteCompleteData) => {
      setDataList((prev) => prev.filter((item) => item._id !== _id));
    };
    return [
      {
        id: 'username',
        label: 'Логин',
        orderOn: true,
        searchOn: true,
      },
      {
        id: 'surname',
        label: 'Фамилия',
        orderOn: true,
        searchOn: true,
      },
      {
        id: 'name',
        label: 'Имя',
        orderOn: true,
        searchOn: true,
      },
      {
        id: 'userRole',
        label: 'Администратор',
        align: 'center',
        format: (value) => {
          if (UserRole.ADMIN === value) {
            return 'Да';
          }
          return 'Нет';
        },
        color: (row) => (row.userRole === UserRole.ADMIN ? green[900] : undefined),
        orderOn: true,
      },
      {
        id: 'status',
        label: 'Активен',
        align: 'center',
        component: ({ _id, status }) => (
          <SwitchEdit
            dataInput={status}
            callbackSaveField={callbackSaveField<UserAdminListItemDTO, boolean>({
              _id: _id,
              fieldName: 'status',
              typeName: TypeNameEnum.ADMIN_USER_ITEM,
              onComplete: handleChange,
            })}
          />
        ),
        orderOn: true,
      },
      {
        id: '_id',
        label: 'Управление',
        align: 'center',
        component: ({ _id }) => (
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton
              color="primary"
              size="small"
              component={Link}
              to={getLinkByRoutePath('ADMIN_USER_EDIT_PAGE', _id)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              color="primary"
              size="small"
              component={Link}
              to={getLinkByRoutePath('ADMIN_USER_STATISTICS_PAGE', _id)}
            >
              <QueryStatsIcon fontSize="inherit" />
            </IconButton>
            <DeleteBtnEdit
              callbackDelete={callbackDelete({
                _id,
                typeName: TypeNameEnum.ADMIN_USER_ITEM,
                onComplete: handleDelete,
              })}
            />
          </Stack>
        ),
      },
    ];
  }, [callbackDelete, callbackSaveField]);

  return (
    <>
      <Button sx={{ my: 3 }} variant="contained" component={Link} to={RouteNames.ADMIN_USER_NEW_PAGE}>
        Добавить пользователя
      </Button>
      <AppTable columns={columns} dataList={dataList} orderByStart="surname" />
    </>
  );
};

export default UsersList;
