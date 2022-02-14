import { FC } from 'react';
import { PageBase, PageFetchBase, UserStatistics } from '@src/components';
import { TypeNameEnum, UserStatisticDTO } from '@src/types/models';

import { PageBaseProps } from '@src/components/PageBase';
import { useQueryApp } from '@src/api/useQueryApp.hook';

const UserStatisticsPage: FC = () => {
  const { loading, data, error, fetchData } = useQueryApp<UserStatisticDTO>(TypeNameEnum.USER_TEST_REZULTS);

  const bindPageFetchBase = {
    error,
    loading,
    refetchHangler: fetchData,
  };

  const bindPageBase: PageBaseProps = {
    title: 'Статистика пользователя',
    breadcrumbsOn: true,
    breadcrumbsList: [{ title: 'Статистика' }],
  };

  return (
    <PageFetchBase {...bindPageFetchBase}>
      <PageBase {...bindPageBase} maxWidth="lg">
        {data && <UserStatistics data={data} />}
      </PageBase>
    </PageFetchBase>
  );
};

export default UserStatisticsPage;
