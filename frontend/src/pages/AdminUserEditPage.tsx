import { CallbackSaveCompleteData, useMutationApp } from '@src/api/useMutationApp.hook';
import { useQueryApp } from '@src/api/useQueryApp.hook';
import { PageBase, PageFetchBase, UserForm } from '@src/components';
import { PageBaseProps } from '@src/components/PageBase';
import { RouteNames } from '@src/router/appRouterSettings';
import { useAppActions } from '@src/store/useRedux.hook';
import { GetUserAdminDTO, TypeNameEnum, UserAdminDTO } from '@src/types/models';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const AdminUserEditPage: FC = () => {
  const { _id } = useParams();
  const { showAlert } = useAppActions();

  const { loading, data, error, fetchData, setData } = useQueryApp<UserAdminDTO, GetUserAdminDTO>(
    TypeNameEnum.ADMIN_USER_ITEM,
    { _id }
  );
  const { callbackSave } = useMutationApp();

  const onComplete = ({ data }: CallbackSaveCompleteData<UserAdminDTO>) => {
    showAlert('Изменения сохранены.', 'success');
    setData(data);
  };

  const bindPageFetchBase = {
    error,
    loading,
    refetchHangler: fetchData,
  };

  const bindPageBase: PageBaseProps = {
    title: `Редактирование пользователя: ${data?.username}`,
    maxWidth: 'md',
    breadcrumbsOn: true,
    breadcrumbsList: [
      { title: 'Пользователи', to: RouteNames.ADMIN_USERS_PAGE },
      { title: 'Редактирование' },
    ],
  };

  return (
    <PageFetchBase {...bindPageFetchBase}>
      <PageBase {...bindPageBase}>
        {data && (
          <UserForm
            data={data}
            edit={true}
            admin={true}
            callbackSave={callbackSave<UserAdminDTO>({
              _id: data._id,
              typeName: TypeNameEnum.ADMIN_USER_ITEM,
              onComplete,
            })}
          />
        )}
      </PageBase>
    </PageFetchBase>
  );
};
export default AdminUserEditPage;
//
