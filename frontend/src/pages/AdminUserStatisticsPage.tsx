import { FC } from 'react';
import { PageBase, PageFetchBase, UserStatistics } from '@src/components';
import { GetUserStatisticAdminDTO, TypeNameEnum, UserStatisticDTO } from '@src/types/models';
import { useParams } from 'react-router-dom';
import { RouteNames } from '@src/router/appRouterSettings';
import { PageBaseProps } from '@src/components/PageBase';
import { useQueryApp } from '@src/api/useQueryApp.hook';

const AdminUserStatisticsPage: FC = () => {
  const { _id } = useParams();
  const { loading, data, error, fetchData } = useQueryApp<UserStatisticDTO, GetUserStatisticAdminDTO>(
    TypeNameEnum.ADMIN_TEST_REZULTS,
    { _id }
  );

  const bindPageFetchBase = {
    error,
    loading,
    refetchHangler: fetchData,
  };

  const bindPageBase: PageBaseProps = {
    title: `Статистика пользователя:  ${data?.surname} ${data?.name}`,
    breadcrumbsOn: true,
    maxWidth: 'lg',
    breadcrumbsList: [{ title: 'Пользователи', to: RouteNames.ADMIN_USERS_PAGE }, { title: 'Статистика' }],
  };

  return (
    <PageFetchBase {...bindPageFetchBase}>
      <PageBase {...bindPageBase}>{data && <UserStatistics data={data} />}</PageBase>
    </PageFetchBase>
  );
};

export default AdminUserStatisticsPage;
