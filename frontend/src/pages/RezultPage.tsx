import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { PageBase, PageFetchBase, RezultTest } from '@src/components';
import { GeRezultTestDTO, RezultTestDTO, TypeNameEnum } from '@src/types/models';
import { PageBaseProps } from '@src/components/PageBase';
import { useQueryApp } from '@src/api/useQueryApp.hook';
import { RouteNames } from '@src/router/appRouterSettings';

const RezultPage: FC = () => {
  const { rezultId } = useParams();
  const { loading, data, error, fetchData } = useQueryApp<RezultTestDTO, GeRezultTestDTO>(
    TypeNameEnum.TEST_REZULT_ITEM,
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
    breadcrumbsList: [{ title: 'Статистика', to: RouteNames.USER_STATISTICS_PAGE }, { title: 'Результат' }],
  };

  return (
    <PageFetchBase {...bindPageFetchBase}>
      <PageBase {...bindPageBase}>{data && <RezultTest data={data} />}</PageBase>
    </PageFetchBase>
  );
};

export default RezultPage;
