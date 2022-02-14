import { useQueryApp } from '@src/api/useQueryApp.hook';
import { PageBase, PageFetchBase, UsersList } from '@src/components';
import { PageBaseProps } from '@src/components/PageBase';
import { TypeNameEnum, UserAdminListDTO } from '@src/types/models';
import { FC } from 'react';

const AdminUsersPage: FC = () => {
  const { loading, data, error, fetchData } = useQueryApp<UserAdminListDTO>(TypeNameEnum.ADMIN_USERS);

  const bindPageFetchBase = {
    error,
    loading,
    refetchHangler: fetchData,
  };

  const bindPageBase: PageBaseProps = {
    title: 'Пользователи',
    maxWidth: 'xl',
    breadcrumbsOn: true,
    breadcrumbsList: [{ title: 'Пользователи' }],
  };

  return (
    <PageFetchBase {...bindPageFetchBase}>
      <PageBase {...bindPageBase}>{data && <UsersList data={data} />}</PageBase>
    </PageFetchBase>
  );
};

export default AdminUsersPage;
