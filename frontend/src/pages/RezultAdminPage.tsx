import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { PageBase, PageFetchBase, RezultTest } from '@src/components';
import { GeRezultTestDTO, RezultTestDTO, TypeNameEnum } from '@src/types/models';
import { PageBaseProps } from '@src/components/PageBase';
import { useQueryApp } from '@src/api/useQueryApp.hook';
import { getLinkByRoutePath, RouteNames } from '@src/router/appRouterSettings';

const RezultAdminPage: FC = () => {
  const { rezultId } = useParams();
  const { loading, data, error, fetchData } = useQueryApp<RezultTestDTO, GeRezultTestDTO>(
    TypeNameEnum.ADMIN_USER_ITEM_STATISTICS,
    {
      _id: rezultId,
    }
  );

  const bindPageFetchBase = {
    error,
    loading,
    refetchHangler: fetchData,
  };

  const bindPageBase: PageBaseProps = {
    breadcrumbsOn: true,
    breadcrumbsList: [
      { title: 'Пользователи', to: RouteNames.ADMIN_USERS_PAGE },
      { title: 'Пользователь', to: getLinkByRoutePath('ADMIN_USER_STATISTICS_PAGE', data?.userId) },
      { title: 'Результат' },
    ],
  };

  return (
    <PageFetchBase {...bindPageFetchBase}>
      <PageBase {...bindPageBase}>{data && <RezultTest data={data} />}</PageBase>
    </PageFetchBase>
  );
};

export default RezultAdminPage;
