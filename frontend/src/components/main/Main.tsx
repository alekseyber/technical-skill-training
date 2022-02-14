import { FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import MainItem from './MainItem';
import { DirectProgrammingDTO, TestsDTO, TypeNameEnum } from '@src/types/models';
import { useIsAuth } from '@src/router/useIsAuth.hook';
import { TextFieldEditHOC } from '..';
import { useMutationApp } from '@src/api/useMutationApp.hook';
import { useAppActions } from '@src/store/useRedux.hook';

interface MainProps {
  data: TestsDTO;
}

const Main: FC<MainProps> = ({ data }) => {
  const { isAdmin } = useIsAuth();
  const { callbackSaveField } = useMutationApp();
  const { mutationProgTest } = useAppActions();
  const emptyText = 'К сожалению пока нет групп.';

  return (
    <Card elevation={0}>
      <CardContent>
        {isAdmin && (
          <TextFieldEditHOC
            dataInput={''}
            add={true}
            label="Имя раздела"
            callbackSaveField={callbackSaveField<DirectProgrammingDTO>({
              _id: '',
              fieldName: 'title',
              typeName: TypeNameEnum.DIRECT_PROGRAMMING,
              onComplete: mutationProgTest,
            })}
          >
            <Typography component="div">Добавить раздел</Typography>
          </TextFieldEditHOC>
        )}
        {data.length > 0 ? (
          data.map((item) => <MainItem key={item._id} data={item} edit={isAdmin} />)
        ) : (
          <Typography component="div">{emptyText}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Main;
